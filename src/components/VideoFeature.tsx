'use client';

import { useEffect, useRef, useState } from 'react';
import { isElementInViewport } from '@/utils/animations';

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
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
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    
    // Get section dimensions and position
    const rect = sectionRef.current.getBoundingClientRect();
    
    // Calculate relative mouse position from 0 to 1
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  return (
    <section 
      ref={sectionRef} 
      className="video-feature fade-in relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated gradient background with mouse reactivity */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-800 animate-gradient-x z-0 transition-all duration-300"
        style={{
          backgroundPosition: isHovering ? `${mousePosition.x * 100}% ${mousePosition.y * 100}%` : '50% 50%',
          backgroundSize: isHovering ? '150% 150%' : '200% 200%',
        }}
      ></div>
      
      {/* Radial gradient overlay that follows the mouse */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent z-10 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.8 : 0.4,
          backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
          backgroundSize: '120% 120%',
          backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(74, 222, 128, 0.3), transparent 50%)`,
        }}
      ></div>
      
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