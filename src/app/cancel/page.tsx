'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Canceled</h1>
          <p className="text-lg text-gray-600">
            Your order has been canceled and no payment has been processed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Link 
            href="/cart"
            className="w-full sm:w-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-center transition duration-150 ease-in-out"
          >
            Return to Cart
          </Link>
          <Link 
            href="/bundle"
            className="w-full sm:w-auto inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md text-center transition duration-150 ease-in-out"
          >
            Shop Sleep Bundle
          </Link>
        </div>
      </div>
    </div>
  );
} 