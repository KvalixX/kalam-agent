export interface YouCanOrder {
  id: string;
  order_number: string;
  status: number;
  total: number;
  created_at: string;
  customer?: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  shipping_address?: {
    city: string;
  };
}

export async function getYouCanOrders(accessToken: string) {
  const url = 'https://api.youcan.shop/orders';
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`YouCan API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data as YouCanOrder[];
  } catch (error) {
    console.error('Error fetching YouCan orders:', error);
    return [];
  }
}

export async function findYouCanOrderByPhone(accessToken: string, phone: string) {
  const orders = await getYouCanOrders(accessToken);
  // Normalize phone for comparison
  const normalizedSearch = phone.replace(/\D/g, '').slice(-9);
  
  return orders.find(order => {
    const orderPhone = order.customer?.phone.replace(/\D/g, '').slice(-9);
    return orderPhone === normalizedSearch;
  });
}

export function formatYouCanStatus(status: number): string {
  // Typical YouCan status codes (this might need refinement based on exact docs)
  const statuses: Record<number, string> = {
    1: 'Pending (En attente)',
    2: 'Confirmed (Confirmée)',
    3: 'Shipped (Expédiée)',
    4: 'Delivered (Livrée)',
    5: 'Cancelled (Annulée)',
    6: 'Returned (Retournée)',
  };
  return statuses[status] || 'Processing';
}
