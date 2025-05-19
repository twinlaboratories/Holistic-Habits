import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios from 'axios';
import { CartItem } from '@/lib/types';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Retrieve the Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer_details.address'],
    });

    // Get cart items from metadata
    let items: CartItem[] = [];
    try {
      if (session.metadata?.cartItems) {
        items = JSON.parse(session.metadata.cartItems);
      }
    } catch (err) {
      console.error('Error parsing cart items from metadata:', err);
    }

    // Only create WooCommerce order if payment was successful
    if (session.payment_status === 'paid') {
      await createWooCommerceOrder(session, items);
    }

    // Format shipping address for response
    const shippingAddress = session.customer_details?.address ? {
      address1: session.customer_details.address.line1 || '',
      address2: session.customer_details.address.line2 || '',
      city: session.customer_details.address.city || '',
      state: session.customer_details.address.state || '',
      postalCode: session.customer_details.address.postal_code || '',
      country: session.customer_details.address.country || '',
    } : undefined;

    // Build response with order details
    const response = {
      id: session.id,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      items: items,
      amount: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
      status: session.status,
      payment_status: session.payment_status,
      shippingAddress
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session details' },
      { status: 500 }
    );
  }
} 

/**
 * Creates a new order in WooCommerce after successful Stripe payment
 * @param session Stripe checkout session
 * @param items Cart items
 */
async function createWooCommerceOrder(session: Stripe.Checkout.Session, items: CartItem[]) {
  try {
    // Get environment variables
    const apiUrl = process.env.WOOCOMMERCE_API_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    // Check if required environment variables are set
    if (!apiUrl || !consumerKey || !consumerSecret) {
      throw new Error('WooCommerce API credentials not found in environment variables');
    }

    // Get customer details from Stripe session
    const customer = session.customer_details;
    if (!customer) {
      throw new Error('No customer details found in session');
    }

    // Base64 encode the consumer key and secret for basic auth
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Format line items for WooCommerce
    const lineItems = items.map(item => ({
      product_id: parseInt(String(item.productId).replace(/\D/g, ''), 10) || 0, // Try to get a numeric ID
      quantity: item.quantity,
      // If item has size or other variations, you would handle that here
    }));

    // Format shipping address from Stripe session
    const shipping = customer.address ? {
      first_name: customer.name?.split(' ')[0] || '',
      last_name: customer.name?.split(' ').slice(1).join(' ') || '',
      address_1: customer.address.line1 || '',
      address_2: customer.address.line2 || '',
      city: customer.address.city || '',
      state: customer.address.state || '',
      postcode: customer.address.postal_code || '',
      country: customer.address.country || '',
    } : {};

    // Prepare order data
    const orderData = {
      payment_method: 'stripe',
      payment_method_title: 'Stripe',
      set_paid: true, // Mark the order as paid since Stripe payment was successful
      customer_id: 0, // Guest customer
      billing: {
        first_name: customer.name?.split(' ')[0] || '',
        last_name: customer.name?.split(' ').slice(1).join(' ') || '',
        address_1: customer.address?.line1 || '',
        address_2: customer.address?.line2 || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        postcode: customer.address?.postal_code || '',
        country: customer.address?.country || '',
        email: customer.email || '',
        phone: customer.phone || '',
      },
      shipping,
      line_items: lineItems,
      meta_data: [
        {
          key: 'stripe_session_id',
          value: session.id,
        },
      ],
    };

    // Make the API request to create an order in WooCommerce
    const response = await axios.post(`${apiUrl}/wp-json/wc/v3/orders`, orderData, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('WooCommerce order created:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Error creating WooCommerce order:', error);
    // Don't throw the error to prevent blocking the Stripe success flow
    // Just log it for now
  }
} 