'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold text-accent flex items-center" style={{ fontFamily: 'var(--neue-montreal)' }}>
          <span className="text-secondary mr-1">Holistic</span>:<span>Habits</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/bundle" className="text-accent-light hover:text-secondary transition-colors">
            Sleep Bundle
          </Link>
          <Link href="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-t border-gray-200">
          <div className="container py-4 flex flex-col space-y-4">
            <Link href="/bundle" className="text-accent-light hover:text-secondary transition-colors">
              Sleep Bundle
            </Link>
            <Link href="/cart" className="text-accent-light hover:text-secondary transition-colors flex items-center">
              <span>Cart</span>
              <span className="ml-2 h-5 w-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 