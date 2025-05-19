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
    <section ref={sectionRef} className="video-feature fade-in">
      <div className="video-wrapper">
        <video 
          ref={videoRef}
          className="video-element"
          playsInline
          disablePictureInPicture  
          disableRemotePlayback
          muted
          loop
          poster="/images/hero-bundle.jpg"
        >
          {/* Will be replaced with your actual video */}
          <source 
            src="/videos/sleep-video-placeholder.mp4" 
            type="video/mp4" 
          />
          Your browser does not support HTML5 video.
        </video>
        
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="video-content text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 headline-animated">
          It doesn't replace your sleep,<br />it transforms it
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Our holistic approach works with your body's natural rhythms to enhance every aspect of your sleep cycle
        </p>
      </div>
    </section>
  );
} 