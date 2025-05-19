import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/lib/types';
import { getBundleProducts, getBundlePrice } from '@/lib/products';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

/**
 * Creates a one-time coupon for the bundle discount
 * @param discountAmount Amount to discount in cents
 * @returns string ID of the created coupon
 */
async function createOneTimeCoupon(discountAmount: number): Promise<string> {
  // Create a unique coupon ID for this session
  const couponId = `BUNDLE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Create a one-time coupon with a fixed amount off
  const coupon = await stripe.coupons.create({
    id: couponId,
    amount_off: discountAmount,
    currency: 'usd',
    duration: 'once', // One-time use
    name: 'Bundle Discount',
  });
  
  return coupon.id;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerEmail } = body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }

    // Check if all bundle products are in the cart
    const bundleProducts = getBundleProducts();
    const bundleProductIds = bundleProducts.map(product => product.id);
    const cartProductIds = items.map((item: CartItem) => item.productId);
    
    // Check if cart contains all bundle products
    const isFullBundle = bundleProductIds.every(id => cartProductIds.includes(id));
    
    let lineItems;
    let session;
    
    if (isFullBundle) {
      // Apply bundle discount
      const bundlePrice = getBundlePrice();
      const regularTotal = bundleProducts.reduce((sum, product) => sum + product.price, 0);
      const discount = regularTotal - bundlePrice;
      
      // Create line items for Stripe with bundle pricing
      lineItems = items.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || `Product ID: ${item.productId}`, 
            description: item.size ? `Size: ${item.size}` : undefined,
            images: [item.image ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}` : undefined].filter(Boolean) as string[],
          },
          unit_amount: Math.round((item.price || 0) * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      }));

      // Instead of adding a negative line item, use Stripe's discounts
      const discountAmount = Math.round(discount * 100); // Discount in cents
      const couponId = await createOneTimeCoupon(discountAmount);
      
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        discounts: [{
          coupon: couponId,
        }],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        customer_email: customerEmail,
        payment_intent_data: {
          setup_future_usage: 'on_session',
        },
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU'],
        },
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        metadata: {
          cartItems: JSON.stringify(items),
          isBundle: isFullBundle.toString(),
        },
        payment_method_options: {
          card: {
            setup_future_usage: 'on_session',
          },
        },
      });
    } else {
      // Regular pricing (no bundle discount)
      lineItems = items.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || `Product ID: ${item.productId}`, 
            description: item.size ? `Size: ${item.size}` : undefined,
            images: [item.image ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}` : undefined].filter(Boolean) as string[],
          },
          unit_amount: Math.round((item.price || 0) * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      }));
      
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        customer_email: customerEmail,
        payment_intent_data: {
          setup_future_usage: 'on_session',
        },
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU'],
        },
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        metadata: {
          cartItems: JSON.stringify(items),
          isBundle: isFullBundle.toString(),
        },
        payment_method_options: {
          card: {
            setup_future_usage: 'on_session',
          },
        },
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 