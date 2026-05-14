import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateResponse } from '@/lib/ai/anthropic';
import { getSystemPrompt } from '@/lib/ai/prompts';

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
    
    if (!message) {
      return NextResponse.json({ status: 'ignored' });
    }

    const customerPhone = message.from;
    const messageText = message.text?.body;
    const merchantPhone = body.entry?.[0]?.changes?.[0]?.value?.metadata?.display_phone_number;

    if (!messageText) {
      return NextResponse.json({ status: 'no_text' });
    }

    const supabase = await createClient();

    // 1. Identify Merchant
    const { data: merchant, error: merchantError } = await supabase
      .from('merchants')
      .select('*, agent_configs(*)')
      .eq('whatsapp_number', merchantPhone)
      .single();

    if (merchantError || !merchant) {
      console.error('Merchant not found for phone:', merchantPhone);
      return NextResponse.json({ status: 'merchant_not_found' });
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
          name: 'Nouveau Client',
        })
        .select()
        .single();
      customer = newCustomer;
    }

    // 3. Get Conversation History
    const { data: conversations } = await supabase
      .from('conversations')
      .select('*')
      .eq('merchant_id', merchant.id)
      .eq('customer_id', customer?.id)
      .order('created_at', { ascending: false })
      .limit(5);

    // 4. Get Order Context (if relevant)
    let orderContext = "No recent order found.";
    const isAskingAboutOrder = /order|commande|suivi|finahwa|finkom|ach wqa3|status/i.test(messageText);

    if (isAskingAboutOrder) {
      // Mocked merchant platform and token (this would come from merchant table)
      const platform = merchant.sector; // Using sector field for now
      const token = process.env.ECOMMERCE_ACCESS_TOKEN; 

      if (platform === 'YouCan' && token) {
        const { findYouCanOrderByPhone, formatYouCanStatus } = await import('@/lib/ecommerce/youcan');
        const order = await findYouCanOrderByPhone(token, customerPhone);
        if (order) {
          orderContext = `Order #${order.order_number}: Status is ${formatYouCanStatus(order.status)}. Total: ${order.total} MAD. Created at: ${order.created_at}.`;
        }
      } else if (platform === 'Shopify' && token) {
        const { findShopifyOrderByPhone } = await import('@/lib/ecommerce/shopify');
        const order = await findShopifyOrderByPhone('kalam-demo', token, customerPhone);
        if (order) {
          orderContext = `Order #${order.order_number}: Status is ${order.financial_status}/${order.fulfillment_status}. Total: ${order.total_price} ${order.currency}.`;
        }
      }
    }

    // 5. Generate AI Response
    const config = merchant.agent_configs?.[0] || {};
    const systemPrompt = getSystemPrompt({
      business_name: merchant.business_name,
      agent_name: config.agent_name || 'Kalam Assistant',
      return_policy: config.return_policy,
      delivery_policy: config.delivery_policy,
    }) + `\n\nCUSTOMER ORDER CONTEXT: ${orderContext}`;

    // Mock history for now
    const messages = [
      { role: 'user', content: messageText }
    ];

    const aiResponse = await generateResponse(messages, systemPrompt);

    // 5. Send WhatsApp Message
    const { sendWhatsAppMessage } = await import('@/lib/whatsapp');
    await sendWhatsAppMessage(customerPhone, aiResponse);

    // 6. Log Conversation
    await supabase.from('conversations').insert({
      merchant_id: merchant.id,
      customer_id: customer?.id,
      channel: 'whatsapp',
      status: 'active',
    });

    return NextResponse.json({ status: 'success', response: aiResponse });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
