'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FlipCardProps {
  frontImage: string;
  frontTitle: string;
  backTitle: string;
  backDescription: string;
  imageAlt: string;
}

export default function FlipCard({
  frontImage,
  frontTitle,
  backTitle,
  backDescription,
  imageAlt
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="flip-card-container relative w-full h-[400px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`flip-card w-full h-full transition-all duration-700 perspective-1000 relative ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div 
          className="flip-card-front absolute w-full h-full bg-white rounded-lg shadow-md overflow-hidden backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative w-full h-3/4">
            <Image
              src={frontImage}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-accent">{frontTitle}</h3>
          </div>
        </div>
        
        {/* Back */}
        <div 
          className="flip-card-back absolute w-full h-full bg-secondary text-white p-6 rounded-lg flex flex-col justify-center backface-hidden rotate-y-180"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-xl font-semibold mb-4">{backTitle}</h3>
          <p className="text-sm">{backDescription}</p>
        </div>
      </div>
    </div>
  );
} 