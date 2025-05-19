import axios from 'axios';

/**
 * Interface for WooCommerce product
 */
interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  attributes: {
    id: number;
    name: string;
    options: string[];
  }[];
  variations: number[];
  stock_status: string;
}

/**
 * Gets products from WooCommerce API using basic auth
 * @param params Optional query parameters for the API call
 * @returns Promise containing an array of WooCommerce products
 */
export const getProducts = async (params?: Record<string, string>): Promise<WooCommerceProduct[]> => {
  try {
    // Get environment variables
    const apiUrl = process.env.WOOCOMMERCE_API_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    // Check if required environment variables are set
    if (!apiUrl || !consumerKey || !consumerSecret) {
      throw new Error('WooCommerce API credentials not found in environment variables');
    }

    // Base64 encode the consumer key and secret for basic auth
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Make the API request
    const response = await axios.get(`${apiUrl}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      params,
    });

    // Return the products
    return response.data;
  } catch (error) {
    console.error('Error fetching products from WooCommerce:', error);
    throw error;
  }
};

/**
 * Gets a specific product from WooCommerce API by ID
 * @param id Product ID
 * @returns Promise containing the WooCommerce product
 */
export const getProductById = async (id: number): Promise<WooCommerceProduct> => {
  try {
    // Get environment variables
    const apiUrl = process.env.WOOCOMMERCE_API_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    // Check if required environment variables are set
    if (!apiUrl || !consumerKey || !consumerSecret) {
      throw new Error('WooCommerce API credentials not found in environment variables');
    }

    // Base64 encode the consumer key and secret for basic auth
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Make the API request
    const response = await axios.get(`${apiUrl}/wp-json/wc/v3/products/${id}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    // Return the product
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id} from WooCommerce:`, error);
    throw error;
  }
}; 