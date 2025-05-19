'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video loads and plays when component mounts
    if (videoRef.current) {
      videoRef.current.load();
      
      // Try to play the video after a short delay
      setTimeout(() => {
        try {
          if (videoRef.current) {
            videoRef.current.play()
              .catch(error => {
                console.log('Video autoplay not allowed:', error);
              });
          }
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }, 100);
    }
  }, []);

  return (
    <div className="hero-video-bg">
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className="object-cover w-full h-full"
        preload="auto"
      >
        <source src="/videos/homepagevid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback image in case video doesn't load */}
      <div className="fallback-image absolute inset-0 z-[-1] hidden">
        <Image 
          src="/images/hero-bundle.jpg" 
          alt="Sleep background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
} 