'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, ProductSize } from '@/lib/types';
import { getProductById } from '@/lib/products';

interface CartContextProps {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, size?: ProductSize) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateSize: (productId: string, size: ProductSize) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Update cart count and total whenever items change
  useEffect(() => {
    setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    
    const total = items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    setCartTotal(Number(total.toFixed(2)));
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, quantity = 1, size?: ProductSize) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.productId === productId && (size ? item.size === size : true)
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { productId, quantity, size }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateSize = (productId: string, size: ProductSize) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, size } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateSize,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 