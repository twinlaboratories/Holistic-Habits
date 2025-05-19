export type ProductSize = 'Twin' | 'Full' | 'Queen' | 'King';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  options?: {
    sizes?: ProductSize[];
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: ProductSize;
  name?: string;
  price?: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled';
  paymentMethod: 'stripe' | 'paypal';
  createdAt: string;
} 