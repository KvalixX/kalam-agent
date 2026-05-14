'use server';

import { createClient } from '@/lib/supabase/server';

// 1. Overview & Sidebar
export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: merchant } = await supabase.from('merchants').select('*').eq('id', user.id).single();
  const { count: convCount } = await supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id);
  const { count: orderCount } = await supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id).eq('status', 'resolved'); // Assuming resolved means order placed for now
  const { data: recentChats } = await supabase.from('conversations').select('*, customers(*)').eq('merchant_id', user.id).order('last_message_at', { ascending: false }).limit(5);
  const { data: customers } = await supabase.from('customers').select('total_spent, total_orders').eq('merchant_id', user.id);

  const totalRevenue = customers?.reduce((acc, c) => acc + (Number(c.total_spent) || 0), 0) || 0;
  const totalOrders = customers?.reduce((acc, c) => acc + (Number(c.total_orders) || 0), 0) || 0;

  return {
    merchant,
    stats: [
      { label: 'Conversations', value: convCount?.toLocaleString() || '0', trend: '+100%', icon: 'MessageSquare' },
      { label: 'Revenue Automated', value: `${totalRevenue.toLocaleString()} MAD`, trend: '+0%', icon: 'DollarSign' },
      { label: 'Conversion Rate', value: convCount ? `${((orderCount || 0) / convCount * 100).toFixed(1)}%` : '0%', trend: '+0%', icon: 'TrendingUp' },
      { label: 'Orders Placed', value: totalOrders.toString(), trend: '+0%', icon: 'ShoppingBag' },
    ],
    recentChats: recentChats?.map(chat => ({
      id: chat.id,
      name: chat.customers?.name || 'Client',
      message: 'Active conversation...',
      time: new Date(chat.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: chat.status === 'active' ? 'AI Handled' : 'Needs Human',
      revenue: chat.customers?.total_spent ? `${chat.customers.total_spent} MAD` : '--'
    })) || []
  };
}

export async function getSidebarData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: merchant } = await supabase.from('merchants').select('*').eq('id', user.id).single();
  const { count: activeCount } = await supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id).in('status', ['active', 'escalated']);
  const { count: totalMessages } = await supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('merchant_id', user.id);

  const limit = merchant?.plan === 'pro' ? 5000 : 500;
  
  return {
    businessName: merchant?.business_name || 'Kalam Store',
    activeConversations: activeCount || 0,
    usage: {
      used: totalMessages || 0,
      limit: limit,
      percentage: Math.min(Math.round(((totalMessages || 0) / limit) * 100), 100)
    }
  };
}

// 2. Customers Page
export async function getCustomers() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('customers')
    .select('*')
    .eq('merchant_id', user.id)
    .order('last_interaction_at', { ascending: false });

  return data || [];
}

// 3. Catalog Page
export async function getCatalog() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // If products table doesn't exist yet, we'll return an empty array and handle gracefully
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('merchant_id', user.id);

  if (error) {
    console.warn('Products table not found, using empty catalog.');
    return [];
  }
  return data || [];
}

// 4. Activity Page
export async function getActivity() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('conversations')
    .select('*, customers(*)')
    .eq('merchant_id', user.id)
    .order('created_at', { ascending: false });

  return data || [];
}

// 5. Settings
export async function getMerchantSettings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: merchant } = await supabase.from('merchants').select('*, agent_configs(*)').eq('id', user.id).single();
  return merchant;
}

// 6. Mutators
export async function addCustomer(formData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('customers')
    .insert([{
      ...formData,
      merchant_id: user.id,
      last_interaction_at: new Date().toISOString()
    }])
    .select();

  return { data, error };
}

export async function addProduct(formData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('products')
    .insert([{
      ...formData,
      merchant_id: user.id
    }])
    .select();

  return { data, error };
}

export async function syncCatalog() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  // 1. Get Merchant Credentials from DB
  const { data: merchant } = await supabase
    .from('merchants')
    .select('ecommerce_platform, ecommerce_shop_name, ecommerce_token')
    .eq('id', user.id)
    .single();

  if (!merchant?.ecommerce_token) return { error: 'No e-commerce token configured' };

  const platform = merchant.ecommerce_platform || 'Shopify';
  const shopName = merchant.ecommerce_shop_name;
  const accessToken = merchant.ecommerce_token;

  let products = [];

  if (platform === 'Shopify') {
    const { getShopifyProducts } = await import('@/lib/ecommerce/shopify');
    products = await getShopifyProducts(shopName, accessToken);
  } else if (platform === 'YouCan') {
    // YouCan sync logic could go here
    return { error: 'YouCan sync not yet implemented' };
  }

  if (!products || products.length === 0) return { error: 'No products found' };

  // 2. Upsert into Supabase
  for (const product of products) {
    await supabase.from('products').upsert({
      merchant_id: user.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url,
    }, { onConflict: 'merchant_id, name' });
  }
  
  return { success: true, count: products.length };
}

// 7. Knowledge Base
export async function getKnowledge() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('merchant_id', user.id)
    .order('created_at', { ascending: false });

  return data || [];
}

export async function addKnowledge(payload: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('knowledge_base')
    .insert([{ ...payload, merchant_id: user.id }])
    .select();

  return { data, error };
}

export async function deleteKnowledge(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('knowledge_base')
    .delete()
    .eq('id', id)
    .eq('merchant_id', user.id);

  return { error };
}

// 8. Campaigns
export async function getCampaigns() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .eq('merchant_id', user.id)
    .order('created_at', { ascending: false });

  return data || [];
}

export async function createCampaign(payload: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('campaigns')
    .insert([{ ...payload, merchant_id: user.id, status: 'Draft' }])
    .select();

  return { data, error };
}

// 9. Settings Update
export async function updateMerchantSettings(payload: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('merchants')
    .upsert({ 
      ...payload, 
      id: user.id 
    });

  return { error };
}

export async function updateAgentConfig(payload: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('agent_configs')
    .upsert({ 
      ...payload, 
      merchant_id: user.id 
    });

  return { error };
}

// 10. Live Chats
export async function getConversations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('conversations')
    .select('*, customers(*)')
    .eq('merchant_id', user.id)
    .order('last_message_at', { ascending: false });

  return data || [];
}

export async function getMessages(conversationId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  return data || [];
}

export async function sendMessage(conversationId: string, text: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('messages')
    .insert([{
      conversation_id: conversationId,
      text,
      type: 'agent',
      created_at: new Date().toISOString()
    }])
    .select();

  // Also update conversation last_message_at
  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId);

  return { data, error };
}

// 11. Generic CRUD (Missing Actions)
export async function deleteCustomer(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id)
    .eq('merchant_id', user.id);

  return { error };
}

export async function updateCustomer(id: string, payload: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('customers')
    .update(payload)
    .eq('id', id)
    .eq('merchant_id', user.id);

  return { error };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .eq('merchant_id', user.id);

  return { error };
}

export async function updateProduct(id: string, payload: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .eq('merchant_id', user.id);

  return { error };
}

export async function deleteCampaign(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id)
    .eq('merchant_id', user.id);

  return { error };
}
