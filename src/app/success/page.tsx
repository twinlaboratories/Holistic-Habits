'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { sendOrderConfirmationEmail } from '@/lib/email';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummary {
  id: string;
  customerEmail: string;
  customerName?: string;
  amount: number;
  items?: OrderItem[];
  shippingAddress?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderSummary(data);
        clearCart(); // Clear the cart after successful order

        // Send confirmation email if we have customer email
        if (data.customerEmail) {
          try {
            await sendOrderConfirmationEmail({
              orderNumber: data.id,
              customerName: data.customerName || 'Valued Customer',
              customerEmail: data.customerEmail,
              items: data.items?.map((item: OrderItem) => ({
                name: item.name || `Product ID: ${item.productId}`,
                quantity: item.quantity,
                price: item.price || 0
              })) || [],
              total: data.amount,
              shippingAddress: data.shippingAddress
            });
            setEmailSent(true);
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't set error state as the order was successful
          }
        }
      } catch (err) {
        setError('Failed to load order details. Please contact customer support.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl text-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="rounded-full bg-green-100 h-24 w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
          {orderSummary?.customerEmail && (
            <p className="text-lg text-gray-600">
              {emailSent 
                ? `Order confirmation has been sent to ${orderSummary.customerEmail}`
                : `A confirmation will be sent to ${orderSummary.customerEmail}`
              }
            </p>
          )}
          {orderSummary?.id && (
            <div className="mt-2 text-sm text-gray-500">
              Order ID: {orderSummary.id}
            </div>
          )}
        </div>

        {orderSummary?.amount && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between font-medium text-lg">
              <p>Total</p>
              <p>${orderSummary.amount.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Link 
            href="/bundle"
            className="w-full sm:w-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-center transition duration-150 ease-in-out"
          >
            Shop Sleep Bundle
          </Link>
          <Link 
            href="/"
            className="w-full sm:w-auto inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md text-center transition duration-150 ease-in-out"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 