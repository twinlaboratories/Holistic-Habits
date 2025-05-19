'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { getProductById, getBundleProducts, getBundlePrice } from '@/lib/products';
import { ProductSize } from '@/lib/types';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, updateSize, removeItem, cartTotal, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  
  // Check if all bundle products are in the cart
  const bundleProducts = getBundleProducts();
  const bundleProductIds = bundleProducts.map(product => product.id);
  const cartProductIds = items.map(item => item.productId);
  const isFullBundle = bundleProductIds.every(id => cartProductIds.includes(id));
  
  // Calculate bundle discount if applicable
  let bundleDiscount = 0;
  if (isFullBundle) {
    const bundlePrice = getBundlePrice();
    const regularTotal = bundleProducts.reduce((sum, product) => sum + product.price, 0);
    bundleDiscount = regularTotal - bundlePrice;
  }
  
  // Calculate final totals with discount
  const discountedSubtotal = cartTotal - bundleDiscount;
  
  // Calculate shipping cost (free over $50)
  const shipping = discountedSubtotal > 50 ? 0 : 5.99;
  const totalWithShipping = discountedSubtotal + shipping;
  
  if (orderSuccess) {
    return (
      <div className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-accent mb-2">Order Placed Successfully!</h1>
            <p className="text-accent-light mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-accent mb-4">Your Cart is Empty</h1>
            <p className="text-accent-light mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            
            <Link href="/bundle" className="btn-primary">
              Shop Sleep Bundle
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      // Prepare cart items with product details for Stripe
      const cartItemsWithDetails = items.map(item => {
        const product = getProductById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        
        return {
          ...item,
          name: product.name,
          price: product.price
        };
      });
      
      // Call the checkout API to create a Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItemsWithDetails,
          customerEmail: email || undefined, // Only include if email is provided
          isBundle: isFullBundle,
          bundleDiscount: bundleDiscount
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('Invalid checkout session URL');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong with checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-3xl font-bold text-accent mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  
                  return (
                    <div key={item.productId} className="p-6 flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-24 sm:h-24 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="rounded-md object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="text-lg font-medium text-accent">{product.name}</h3>
                          <span className="text-accent font-medium mt-1 sm:mt-0">
                            ${(product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        {item.size && (
                          <div className="mt-2">
                            <span className="text-accent-light">Size: {item.size}</span>
                          </div>
                        )}
                        
                        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {/* Quantity Selector */}
                          <div className="flex items-center">
                            <span className="mr-2 text-sm text-accent-light">Qty:</span>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                type="button"
                                className="px-3 py-1 text-accent"
                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, Math.max(1, parseInt(e.target.value)))}
                                className="w-12 text-center border-none focus:ring-0"
                              />
                              <button
                                type="button"
                                className="px-3 py-1 text-accent"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          {/* Size Selector */}
                          {product.options?.sizes && (
                            <div className="flex items-center">
                              <span className="mr-2 text-sm text-accent-light">Size:</span>
                              <select
                                value={item.size}
                                onChange={(e) => updateSize(item.productId, e.target.value as ProductSize)}
                                className="select py-1"
                              >
                                {product.options.sizes.map((size) => (
                                  <option key={size} value={size}>{size}</option>
                                ))}
                              </select>
                            </div>
                          )}
                          
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-accent mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-accent-light">Subtotal</span>
                  <span className="text-accent">${cartTotal.toFixed(2)}</span>
                </div>
                
                {isFullBundle && (
                  <div className="flex justify-between text-green-600">
                    <span>Bundle Discount</span>
                    <span>-${bundleDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-accent-light">Shipping</span>
                  <span className="text-accent">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {discountedSubtotal < 50 && (
                  <div className="text-sm text-secondary mt-2">
                    Add ${(50 - discountedSubtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${totalWithShipping.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <form onSubmit={handleCheckout}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-accent-light mb-1">
                      Email (for order confirmation)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input w-full"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn-primary w-full ${isProcessing ? 'opacity-75 cursor-wait' : ''}`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </form>
                
                <div className="text-center">
                  <Link href="/products" className="text-secondary hover:text-secondary-dark text-sm">
                    Continue Shopping
                  </Link>
                </div>
                
                {/* Payment Method Icons */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-accent-light mb-3 text-center">
                    Secure payment options
                  </div>
                  <div className="flex justify-center space-x-4">
                    {/* Visa */}
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">VISA</span>
                    </div>
                    
                    {/* Mastercard */}
                    <div className="w-10 h-6 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute left-0 w-6 h-6 bg-red-500 rounded-full"></div>
                        <div className="absolute right-0 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
                      </div>
                    </div>
                    
                    {/* Apple Pay */}
                    <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                      <span className="text-white font-medium text-xs">Apple</span>
                    </div>
                    
                    {/* PayPal */}
                    <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs tracking-tight">Pay</span>
                      <span className="text-blue-300 font-bold text-xs tracking-tight">Pal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 