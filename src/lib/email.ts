import { init, send } from '@emailjs/browser';

// Initialize EmailJS with public key
const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    init(publicKey);
  } else {
    console.error('EmailJS Public Key not found in environment variables');
  }
};

// Initialize on the client side
if (typeof window !== 'undefined') {
  initEmailJS();
}

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

/**
 * Sends an order confirmation email using EmailJS
 * @param orderDetails Order details for the email template
 * @returns Promise with the result of the email sending operation
 */
export const sendOrderConfirmationEmail = async (orderDetails: OrderDetails): Promise<any> => {
  try {
    // Get environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID;

    // Check if required environment variables are set
    if (!serviceId || !templateId) {
      throw new Error('EmailJS Service ID or Template ID not found in environment variables');
    }

    // Prepare template parameters
    const templateParams = {
      order_number: orderDetails.orderNumber,
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      item_list: orderDetails.items.map(item => 
        `${item.name} (${item.quantity}) - $${item.price.toFixed(2)}`
      ).join('\n'),
      total_amount: `$${orderDetails.total.toFixed(2)}`,
      shipping_address: orderDetails.shippingAddress ? 
        `${orderDetails.shippingAddress.address1}
         ${orderDetails.shippingAddress.address2 ? orderDetails.shippingAddress.address2 + '\n' : ''}
         ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.postalCode}
         ${orderDetails.shippingAddress.country}` : 'N/A',
    };

    // Send email
    const response = await send(
      serviceId,
      templateId,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
}; 