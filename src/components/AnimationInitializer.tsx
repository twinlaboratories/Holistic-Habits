'use client';

import { useEffect } from 'react';
import { initAllAnimations } from '@/utils/animations';

export default function AnimationInitializer() {
  useEffect(() => {
    // Initialize all animations on client side
    initAllAnimations();
  }, []);

  // This component doesn't render anything
  return null;
} 