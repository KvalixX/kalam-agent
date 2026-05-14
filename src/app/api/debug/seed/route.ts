import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Please log in first' }, { status: 401 });
  }

  const merchantId = user.id;

  try {
    // 1. Seed Products
    const products = [
      { merchant_id: merchantId, name: 'Tapis Azilal Artisanal', price: 2400, stock: 3, image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop' },
      { merchant_id: merchantId, name: 'Lanterne en Cuivre', price: 450, stock: 12, image_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1974&auto=format&fit=crop' },
      { merchant_id: merchantId, name: 'Caftan Royal Bleu', price: 1800, stock: 5, image_url: 'https://images.unsplash.com/photo-1585011664466-b7bcc905f991?q=80&w=1935&auto=format&fit=crop' },
      { merchant_id: merchantId, name: 'Service à Thé Complet', price: 850, stock: 8, image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1974&auto=format&fit=crop' }
    ];

    await supabase.from('products').upsert(products, { onConflict: 'merchant_id, name' });

    // 2. Seed Customers
    const customers = [
      { merchant_id: merchantId, name: 'Amine El Idrissi', phone: '212612345678', location: 'Casablanca', segment: 'VIP' },
      { merchant_id: merchantId, name: 'Sara Mansouri', phone: '212687654321', location: 'Marrakech', segment: 'New' },
      { merchant_id: merchantId, name: 'Youssef Alami', phone: '212600112233', location: 'Tanger', segment: 'Regular' }
    ];

    const { data: createdCustomers } = await supabase.from('customers').upsert(customers, { onConflict: 'merchant_id, phone' }).select();

    // 3. Seed Knowledge Base
    const knowledge = [
      { merchant_id: merchantId, name: 'Livraison au Maroc', type: 'doc', content: 'Livraison gratuite f Casablanca. Pour les autres villes, 45 MAD o katoussal f 48h.' },
      { merchant_id: merchantId, name: 'Politique de Retour', type: 'doc', content: '3ndkom l7aq trj3o l-mou3amala f dorf 7 jours ila kan fiha chi mouchkil.' }
    ];

    await supabase.from('knowledge_base').upsert(knowledge, { onConflict: 'merchant_id, name' });

    // 4. Seed a Conversation & Messages
    if (createdCustomers && createdCustomers.length > 0) {
      const targetCustomer = createdCustomers[0];
      
      const { data: conv } = await supabase.from('conversations').upsert({
        merchant_id: merchantId,
        customer_id: targetCustomer.id,
        channel: 'whatsapp',
        status: 'active'
      }, { onConflict: 'merchant_id, customer_id' }).select().single();

      if (conv) {
        const messages = [
          { conversation_id: conv.id, text: 'Salam! Bghit n3ref taman dial tapis Azilal svp', type: 'customer' },
          { conversation_id: conv.id, text: 'Ahlan khoya Amine! Taman dialo 2400 MAD. Tab9at lina gha 3 f stock. Bghiti n7jezo lik?', type: 'agent' }
        ];
        await supabase.from('messages').insert(messages);
      }
    }

    return NextResponse.json({ success: true, message: 'Demo data seeded successfully! 🇲🇦' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
