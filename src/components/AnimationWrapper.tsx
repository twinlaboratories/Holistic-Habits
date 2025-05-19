'use client';

import { useEffect, useRef } from 'react';
import { isElementInViewport } from '@/utils/animations';

interface AnimationWrapperProps {
  children: React.ReactNode;
  threshold?: number;
}

export default function AnimationWrapper({ 
  children, 
  threshold = 100 
}: AnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkScroll = () => {
      if (elementRef.current && isElementInViewport(elementRef.current, threshold)) {
        // Find any elements with animation classes and add 'visible' class
        const animatedElements = elementRef.current.querySelectorAll(
          '.fade-in, .fade-in-up, .headline-animated'
        );
        
        animatedElements.forEach(el => {
          el.classList.add('visible');
        });
      }
    };
    
    // Initial check
    checkScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', checkScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [threshold]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
} 