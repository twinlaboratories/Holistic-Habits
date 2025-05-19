'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { Product, ProductSize } from '@/lib/types';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: ProductSize;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, selectedSize }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<ProductSize | undefined>(selectedSize);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // For products with size options, ensure a size is selected
    if (product.options?.sizes && !size) {
      alert('Please select a size');
      return;
    }

    addItem(product.id, quantity, size);
    
    // Show success indicator
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Size Selection for products with size options */}
      {product.options?.sizes && (
        <div>
          <label htmlFor="size-select" className="block text-sm font-medium text-accent-light mb-1">
            Size
          </label>
          <select
            id="size-select"
            value={size}
            onChange={(e) => setSize(e.target.value as ProductSize)}
            className="select w-full"
          >
            <option value="">Select Size</option>
            {product.options.sizes.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center">
        <label htmlFor="quantity" className="block text-sm font-medium text-accent-light mr-4">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-1 text-accent"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-12 text-center border-none focus:ring-0"
          />
          <button
            type="button"
            className="px-3 py-1 text-accent"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        className={`btn-primary w-full ${isAdded ? 'bg-green-500 hover:bg-green-600' : ''}`}
        onClick={handleAddToCart}
      >
        {isAdded ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartButton; 