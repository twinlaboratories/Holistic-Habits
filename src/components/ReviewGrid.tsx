'use client';

import { useEffect } from 'react';
import AnimationWrapper from './AnimationWrapper';
import { handleReviewCardInteractions } from '@/utils/animations';

// Define review type
type ReviewSize = 'small' | 'medium' | 'large';

interface Review {
  id: number;
  text: string;
  author: string;
  position: string;
  size: ReviewSize;
}

// Customer review data
const reviews: Review[] = [
  {
    id: 1,
    text: "I used to wake up 2-3 times a night due to overheating. The Holistic Habits bundle has eliminated temperature-based wake-ups completely.",
    author: "Jason S.",
    position: "Hot Sleeper",
    size: "large" // Extra sizing property
  },
  {
    id: 2,
    text: "The biggest difference for me is how I feel. I'm a hot sleeper & the cotton sheets have changed how I feel and limits middle of the night waking up.",
    author: "Jillian R.",
    position: "Hot Sleeper",
    size: "medium"
  },
  {
    id: 3,
    text: "Personally, I'm too sensitive of a sleeper to sleep without mouth tape now. It's one of those life upgrades that you didn't know you needed until you had it.",
    author: "Chase M.",
    position: "Fitness Enthusiast",
    size: "small"
  },
  {
    id: 4,
    text: "Amazing especially if one partner runs hot, the other cold. The natural materials make a huge difference for temperature regulation throughout the night.",
    author: "Martin L.",
    position: "Couple",
    size: "medium"
  },
  {
    id: 5,
    text: "Add a Holistic Habits bundle to keep your sleep just right during hot summer and cold winter nights. Game changer.",
    author: "Rowan T.",
    position: "Troubled Sleeper",
    size: "small"
  },
  {
    id: 6,
    text: "I've been using the sleep bundle for two months now. I've noticed a significant improvement in my sleep quality and I wake up feeling more refreshed.",
    author: "Sarah K.",
    position: "Troubled Sleeper",
    size: "large"
  }
];

export default function ReviewGrid() {
  // Initialize review card interactions
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      handleReviewCardInteractions();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to determine class based on review size
  const getReviewCardClass = (size: ReviewSize): string => {
    switch(size) {
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 md:col-span-1 row-span-2';
      case 'small':
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 headline-animated" style={{ fontFamily: 'var(--neue-montreal)' }}>
              50+ trusted reviews
            </h2>
          </AnimationWrapper>
          
          <p className="text-lg text-accent-light mb-16 max-w-3xl mx-auto fade-in">
            from extraordinary people like you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4 mb-10">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`${getReviewCardClass(review.size)} review-card bg-white p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md fade-in-up ${index > 0 ? `stagger-delay-${(index % 3) + 1}` : ''}`}
            >
              <div className="mb-6 flex justify-start">
                <svg className="h-6 w-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className={`text-accent-light leading-relaxed ${review.size === 'large' ? 'text-lg mb-8' : 'mb-6'}`}>
                "{review.text}"
              </p>
              
              <div className="mt-auto">
                <p className="font-medium text-accent">{review.author}</p>
                <p className="text-sm text-accent-light">{review.position}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-2 mt-10">
          <button className="w-3 h-3 rounded-full bg-secondary"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-secondary/50 transition-colors"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-secondary/50 transition-colors"></button>
        </div>
      </div>
    </section>
  );
} 