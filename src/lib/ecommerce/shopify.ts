export async function getShopifyOrders(shopName: string, accessToken: string) {
  const url = `https://${shopName}.myshopify.com/admin/api/2024-04/orders.json?status=any`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.error('Error fetching Shopify orders:', error);
    return [];
  }
}

export async function findShopifyOrderByPhone(shopName: string, accessToken: string, phone: string) {
  const orders = await getShopifyOrders(shopName, accessToken);
  const normalizedSearch = phone.replace(/\D/g, '').slice(-9);
  
  return orders.find((order: any) => {
    const orderPhone = order.customer?.phone?.replace(/\D/g, '').slice(-9) || 
                       order.phone?.replace(/\D/g, '').slice(-9);
    return orderPhone === normalizedSearch;
  });
}

export async function getShopifyProducts(shopName: string, accessToken: string) {
  const url = `https://${shopName}.myshopify.com/admin/api/2024-04/products.json`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`Shopify API error: ${response.statusText}`);

    const data = await response.json();
    return data.products.map((p: any) => ({
      name: p.title,
      price: p.variants[0]?.price || 0,
      stock: p.variants[0]?.inventory_quantity || 0,
      image_url: p.image?.src || null,
      external_id: p.id.toString()
    }));
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
}
