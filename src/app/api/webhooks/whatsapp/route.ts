import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processAiResponse } from '@/lib/ai/anthropic';

// Meta Webhook Verification (GET)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED');
      return new Response(challenge, { status: 200 });
    } else {
      return new Response(null, { status: 403 });
    }
  }
  return new Response(null, { status: 400 });
}

// Webhook Message Receiver (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if it's a WhatsApp message
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return NextResponse.json({ status: 'ignored' });

    const customerPhone = message.from;
    const messageText = message.text?.body;
    const merchantPhone = body.entry?.[0]?.changes?.[0]?.value?.metadata?.display_phone_number;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    // Use Service Role Key for Admin Access (bypasses RLS)
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    // 1. Identify Merchant
    const { data: merchants } = await supabase.from('merchants').select('*');

    console.log('Incoming Phone:', merchantPhone);
    console.log('Merchants in DB:', merchants?.map(m => m.whatsapp_number));

    const merchant = merchants?.find(m => {
      const dbPhone = m.whatsapp_number?.replace(/\D/g, '');
      const incomingPhone = merchantPhone?.replace(/\D/g, '');
      return dbPhone === incomingPhone && !!dbPhone;
    });

    if (!merchant) {
      return NextResponse.json({ 
        status: 'merchant_not_found', 
        debug: {
          incoming: merchantPhone,
          merchant_count: merchants?.length || 0,
          merchants: merchants?.map(m => m.whatsapp_number)
        }
      });
    }

    // 2. Identify/Create Customer
    let { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('merchant_id', merchant.id)
      .eq('phone', customerPhone)
      .single();

    if (!customer) {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert({
          merchant_id: merchant.id,
          phone: customerPhone,
          name: body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile?.name || 'Client WhatsApp',
        })
        .select()
        .single();
      customer = newCustomer;
    }

    // 3. Find or Create Conversation
    let { data: conversation } = await supabase
      .from('conversations')
      .select('*')
      .eq('merchant_id', merchant.id)
      .eq('customer_id', customer?.id)
      .eq('status', 'active')
      .single();

    if (!conversation) {
      const { data: newConv } = await supabase
        .from('conversations')
        .insert({
          merchant_id: merchant.id,
          customer_id: customer?.id,
          channel: 'whatsapp',
          status: 'active',
          last_message_at: new Date().toISOString()
        })
        .select()
        .single();
      conversation = newConv;
    }

    // 4. Save Customer Message
    await supabase.from('messages').insert({
      conversation_id: conversation?.id,
      text: messageText,
      type: 'user'
    });

    // 5. Get History for AI
    const { data: history } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation?.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // 6. Generate AI Response and Handle Messaging
    try {
      const { processGroqResponse } = await import('@/lib/ai/groq');
      const aiResponse = await processGroqResponse(merchant.id, customer?.id || '', messageText, history?.reverse() || []);

      if (aiResponse) {
        // 7. Send WhatsApp Message
        const { sendWhatsAppMessage } = await import('@/lib/whatsapp');
        await sendWhatsAppMessage(customerPhone, aiResponse);

        // 8. Save AI Message
        await supabase.from('messages').insert({
          conversation_id: conversation?.id,
          text: aiResponse,
          type: 'agent'
        });
      }
    } catch (aiError: any) {
      console.error('AI Processing Error:', aiError.message);
    }

    // 9. Update Conversation
    await supabase.from('conversations').update({
      last_message_at: new Date().toISOString()
    }).eq('id', conversation?.id);

    return NextResponse.json({ status: 'success' });

  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
