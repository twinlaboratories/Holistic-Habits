'use client';

import { useEffect, useRef } from 'react';
import { isElementInViewport } from '@/utils/animations';

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const checkScroll = () => {
      // Check if video section is in viewport
      if (sectionRef.current && isElementInViewport(sectionRef.current, 200)) {
        sectionRef.current.classList.add('visible');
        
        // Play video if it's in viewport
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(err => {
            console.log('Auto-play prevented:', err);
          });
        }
      }
    };
    
    // Initial check
    checkScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', checkScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="video-feature fade-in relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-800 animate-gradient-x z-0"></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-600/20 via-transparent to-transparent animate-pulse z-10"></div>
      
      <div className="relative z-20 video-content text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 headline-animated">
          It doesn't replace your sleep,<br />it <span className="text-green-400 font-bold">transforms</span> it
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Our holistic approach works with your body's natural rhythms to enhance every aspect of your sleep cycle
        </p>
      </div>
    </section>
  );
} 