import { Product } from '@/lib/types';

// Use embedded SVG data URLs as placeholders
const airPurifierSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400' fill='none'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23333' text-anchor='middle' dominant-baseline='middle'%3EBedside Air Purifier%3C/text%3E%3C/svg%3E`;
const mouthTapeSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400' fill='none'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23333' text-anchor='middle' dominant-baseline='middle'%3ENasalBreathe Mouth Tape%3C/text%3E%3C/svg%3E`;
const sheetsSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400' fill='none'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23333' text-anchor='middle' dominant-baseline='middle'%3E100%25 Natural Cotton Fitted Sheet%3C/text%3E%3C/svg%3E`;
const glassesSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400' fill='none'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23333' text-anchor='middle' dominant-baseline='middle'%3EBlue Light Filter Glasses%3C/text%3E%3C/svg%3E`;

export const products: Product[] = [
  {
    id: 'air-purifier',
    name: 'Bedside Air Purifier',
    description: 'Ensure you breathe clean, filtered air while you sleep. Our compact air purifier removes allergens, dust, and pollutants from your bedroom air, promoting better respiratory health during sleep. Features an ultra-quiet motor and night mode with dimmed lights for undisturbed rest.',
    price: 44.99,
    image: '/images/Untitled-1.PNG',
  },
  {
    id: 'mouth-tape',
    name: 'NasalBreathe Mouth Tape',
    description: 'Encourage nasal breathing during sleep with our gentle, skin-friendly mouth tape. Nasal breathing improves oxygen circulation, reduces snoring, and prevents dry mouth. Each box contains 30 strips - enough for a month of better sleep.',
    price: 9.99,
    image: '/images/Untitled-2.PNG',
  },
  {
    id: 'fitted-sheet',
    name: '100% Natural Cotton Fitted Sheet',
    description: 'Sleep on the natural comfort of 100% cotton. Our breathable fitted sheets regulate body temperature, keeping you cool in summer and warm in winter. The high thread count ensures durability while maintaining a soft, comfortable feel night after night.',
    price: 39.99,
    image: '/images/Untitled-3.PNG',
    options: {
      sizes: ['Twin', 'Full', 'Queen', 'King']
    },
  },
  {
    id: 'blue-light-glasses',
    name: 'Blue Light Filter Glasses',
    description: 'Protect your circadian rhythm from disruptive blue light emitted by screens. Wear these glasses in the evening to help your body naturally prepare for sleep. The stylish unisex design makes them perfect for reading, watching TV, or using digital devices before bed.',
    price: 12.99,
    image: '/images/Untitled-4.PNG',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getBundleProducts = (): Product[] => {
  return products;
};

export const getBundlePrice = (): number => {
  // Apply a discount for buying the bundle
  const individualTotal = products.reduce((sum, product) => sum + product.price, 0);
  const discountPercentage = 15; // 15% off when buying the bundle
  return Number((individualTotal * (1 - discountPercentage / 100)).toFixed(2));
}; 