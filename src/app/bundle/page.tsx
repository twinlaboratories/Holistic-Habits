'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBundleProducts, getBundlePrice } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { ProductSize } from '@/lib/types';

export default function BundlePage() {
  const products = getBundleProducts();
  const bundlePrice = getBundlePrice();
  const { addItem } = useCart();
  
  // State for selected items, selected sheet size, and bundle options
  const [selectedModel, setSelectedModel] = useState('full'); // 'basic', 'full', 'premium'
  const [sheetSize, setSheetSize] = useState<ProductSize>('Queen');
  const [isAdded, setIsAdded] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [step, setStep] = useState(1); // 1: model selection, 2: size selection, 3: review
  
  // Get product details
  const airPurifier = products.find(p => p.id === 'air-purifier')!;
  const mouthTape = products.find(p => p.id === 'mouth-tape')!;
  const sheets = products.find(p => p.id === 'fitted-sheet')!;
  const glasses = products.find(p => p.id === 'blue-light-glasses')!;
  
  // Define bundle models
  const bundleModels = {
    basic: {
      name: 'Essential',
      products: [mouthTape, glasses],
      price: (mouthTape.price + glasses.price) * 0.9, // 10% off
      savings: (mouthTape.price + glasses.price) * 0.1,
      description: 'Essential sleep optimization with nasal breathing support and blue light protection.'
    },
    full: {
      name: 'Complete',
      products: products,
      price: bundlePrice,
      savings: products.reduce((sum, product) => sum + product.price, 0) - bundlePrice,
      description: 'The complete sleep environment optimization with all four products for maximum benefit.'
    },
    premium: {
      name: 'Premium',
      products: [airPurifier, mouthTape, sheets],
      price: (airPurifier.price + mouthTape.price + sheets.price) * 0.85, // 15% off
      savings: (airPurifier.price + mouthTape.price + sheets.price) * 0.15,
      description: 'Premium sleep environment with air purification, nasal breathing, and temperature regulation.'
    }
  };
  
  // Get currently selected model
  const currentBundle = bundleModels[selectedModel as keyof typeof bundleModels];
  
  // Handle checkout
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Add each selected product to cart
      currentBundle.products.forEach(product => {
        // If this is the sheet product and it has size options, use the selected size
        const size = product.id === 'fitted-sheet' ? sheetSize : undefined;
        addItem(product.id, 1, size);
      });
      
      // Prepare cart items with product details for Stripe
      const cartItemsWithDetails = currentBundle.products.map(product => {
        return {
          productId: product.id,
          quantity: 1,
          size: product.id === 'fitted-sheet' ? sheetSize : undefined,
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
          isBundle: true,
          bundleDiscount: currentBundle.savings
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
      setIsCheckingOut(false);
    }
  };
  
  // Next step
  const nextStep = () => {
    if (step < 3) {
      // Skip sheet size selection (step 2) if Essential bundle is selected
      if (step === 1 && selectedModel === 'basic') {
        setStep(3);
      } else {
        setStep(step + 1);
      }
    } else {
      handleCheckout();
    }
  };
  
  // Previous step
  const prevStep = () => {
    if (step > 1) {
      // Skip sheet size selection when going back from step 3 to step 1 for Essential bundle
      if (step === 3 && selectedModel === 'basic') {
        setStep(1);
      } else {
        setStep(step - 1);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-10 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-accent tracking-tight" style={{ fontFamily: 'var(--neue-montreal)' }}>
            Transform your sleep with the <span className="text-secondary">Holistic Bundle</span>
          </h1>
          <p className="text-lg md:text-xl text-accent-light max-w-3xl">
            Our scientifically-backed sleep optimization bundle addresses all aspects of your sleep environment for the best rest possible.
          </p>
        </div>
      </section>
      
      {/* Product Display */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-3/5">
              <div className="bg-gray-100 rounded-xl p-8 h-[500px] flex items-center justify-center relative">
                <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
                  {currentBundle.products.map((product, index) => (
                    <div key={product.id} className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-contain rounded-lg transition-all w-full h-full"
                        priority={true}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                        <h3 className="text-white text-sm font-medium">{product.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Features */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-accent">Complete Sleep Optimization</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent">Air Quality</h3>
                      <p className="text-accent-light text-sm mt-1">Cleaner air for better breathing and reduced allergies during sleep.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent">Nasal Breathing</h3>
                      <p className="text-accent-light text-sm mt-1">Improved oxygen utilization and reduced snoring with nasal breathing.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent">Temperature Regulation</h3>
                      <p className="text-accent-light text-sm mt-1">Natural cotton sheets regulate body temperature for comfort all night.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent">Circadian Rhythm</h3>
                      <p className="text-accent-light text-sm mt-1">Blue light filtering protects your natural sleep-wake cycle.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Selection & Checkout */}
            <div className="lg:w-2/5">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
                {step === 1 && (
                  <div className="model-selection">
                    <h2 className="text-2xl font-semibold mb-6 text-accent">Choose your Bundle</h2>
                    
                    {/* Bundle Models Selection */}
                    <div className="space-y-4 mb-8">
                      <button 
                        className={`w-full text-left p-4 border rounded-lg transition ${selectedModel === 'basic' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setSelectedModel('basic')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-accent">Essential</h3>
                            <p className="text-sm text-accent-light mt-1">Basic sleep optimization</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-accent">${bundleModels.basic.price.toFixed(2)}</p>
                            <p className="text-xs text-green-600">Save ${bundleModels.basic.savings.toFixed(2)}</p>
                          </div>
                        </div>
                      </button>
                      
                      <button 
                        className={`w-full text-left p-4 border rounded-lg transition ${selectedModel === 'full' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setSelectedModel('full')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full inline-block mb-1">MOST POPULAR</div>
                            <h3 className="font-semibold text-accent">Complete</h3>
                            <p className="text-sm text-accent-light mt-1">Complete sleep optimization</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-accent">${bundleModels.full.price.toFixed(2)}</p>
                            <p className="text-xs text-green-600">Save ${bundleModels.full.savings.toFixed(2)}</p>
                          </div>
                        </div>
                      </button>
                      
                      <button 
                        className={`w-full text-left p-4 border rounded-lg transition ${selectedModel === 'premium' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setSelectedModel('premium')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-accent">Premium</h3>
                            <p className="text-sm text-accent-light mt-1">Premium sleep environment</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-accent">${bundleModels.premium.price.toFixed(2)}</p>
                            <p className="text-xs text-green-600">Save ${bundleModels.premium.savings.toFixed(2)}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
                
                {step === 2 && selectedModel !== 'basic' && sheets && sheets.options && sheets.options.sizes && (
                  <div className="size-selection">
                    <h2 className="text-2xl font-semibold mb-6 text-accent">Choose Sheet Size</h2>
                    
                    <div className="space-y-4 mb-8">
                      {sheets.options.sizes.map(size => (
                        <button 
                          key={size}
                          className={`w-full text-left p-4 border rounded-lg transition ${sheetSize === size ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setSheetSize(size)}
                        >
                          <h3 className="font-semibold text-accent">{size}</h3>
                          <p className="text-xs text-accent-light mt-1">
                            {size === 'King' && 'Standard King Size - 76" x 80"'}
                            {size === 'Queen' && 'Standard Queen Size - 60" x 80"'}
                            {size === 'Full' && 'Standard Full Size - 54" x 75"'}
                            {size === 'Twin' && 'Standard Twin Size - 39" x 75"'}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="order-summary">
                    <h2 className="text-2xl font-semibold mb-6 text-accent">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-lg font-medium text-accent">{currentBundle.name} Bundle</span>
                        <span className="text-accent">${currentBundle.price.toFixed(2)}</span>
                      </div>
                      
                      {currentBundle.products.map(product => (
                        <div key={product.id} className="flex justify-between text-sm">
                          <span className="text-accent-light">
                            {product.name}
                            {product.id === 'fitted-sheet' && selectedModel !== 'basic' ? ` (${sheetSize})` : ''}
                          </span>
                          <span className="text-accent-light">${product.price.toFixed(2)}</span>
                        </div>
                      ))}
                      
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Bundle Discount</span>
                        <span>-${currentBundle.savings.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${currentBundle.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="mt-6 space-y-3">
                  <button 
                    onClick={nextStep}
                    disabled={isCheckingOut}
                    className="btn-primary w-full py-4 flex items-center justify-center"
                  >
                    {isCheckingOut ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      step === 3 ? 'Checkout Now' : 'Continue'
                    )}
                  </button>
                  
                  {step > 1 && (
                    <button 
                      onClick={prevStep}
                      className="btn-secondary w-full py-3"
                    >
                      Back
                    </button>
                  )}
                </div>
                
                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-6 text-xs text-center text-accent-light">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <p>Secure Checkout</p>
                    </div>
                    
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      <p>Free Shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-12 text-accent">Sleep Better, Feel Better</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">44%</h3>
              <p className="text-accent">Less time to fall asleep</p>
            </div>
            
            <div className="fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">34%</h3>
              <p className="text-accent">More deep sleep</p>
            </div>
            
            <div className="fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">45%</h3>
              <p className="text-accent">Reduction in snoring</p>
            </div>
            
            <div className="fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">23%</h3>
              <p className="text-accent">Fewer night wake ups</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 