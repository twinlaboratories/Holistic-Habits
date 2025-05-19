'use client';

import AnimationWrapper from './AnimationWrapper';
import { useState, useEffect } from 'react';

// Define the Research type
interface Research {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  clinicalFindings: string;
}

// Research findings with added clinical data
const research = [
  {
    id: 1,
    title: 'Nasal Breathing Study',
    category: 'Peer-Reviewed Research',
    image: '/images/research/nasal-breathing.jpg',
    description: 'A 2021 study in the Journal of Sleep Research found that nasal breathing during sleep increased REM sleep by 25% and decreased sleep fragmentation by 30% compared to mouth breathing.',
    clinicalFindings: 'Clinical trial participants using our NasalBreathe Mouth Tape showed 52% less snoring and 47% improvement in sleep quality scores after just 14 days of use.'
  },
  {
    id: 2,
    title: 'Air Quality Impact',
    category: 'Clinical Research',
    image: '/images/research/air-quality.jpg',
    description: 'Research from Harvard Medical School showed that improved bedroom air quality resulted in 23% better sleep efficiency and a significant reduction in next-day fatigue and cognitive impairment.',
    clinicalFindings: 'Users of our Bedside Air Purifier reported 67% fewer respiratory-related wake-ups and a 31% reduction in morning allergy symptoms in our 30-day home trial study.'
  },
  {
    id: 3,
    title: 'Blue Light Effects',
    category: 'Scientific Study',
    image: '/images/research/blue-light.jpg',
    description: 'A 2019 study published in Sleep Medicine Reviews demonstrated that blocking blue light 2 hours before bedtime increased melatonin production by 58% and reduced sleep onset time by an average of 22 minutes.',
    clinicalFindings: 'Our Blue Light Filter Glasses were tested in a 21-day sleep improvement study, with participants falling asleep 37% faster and experiencing 42% less digital eye strain in the evening.'
  },
];

// New FlipCard component directly in this file
interface FlipCardProps {
  research: Research;
}

const FlipCard = ({ research }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Add CSS to create the flip effect
  useEffect(() => {
    // Add global styles for the flip effect if they don't exist
    if (!document.getElementById('flip-card-styles')) {
      const style = document.createElement('style');
      style.id = 'flip-card-styles';
      style.innerHTML = `
        .flip-box {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .flipped {
          transform: rotateY(180deg);
        }
        .back, .front {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .back {
          transform: rotateY(180deg);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div className="container-flip relative w-full h-[350px]">
      <div 
        className={`flip-box w-full h-full transition-all duration-500 ${isFlipped ? 'flipped' : ''}`}
      >
        <div 
          className="front absolute w-full h-full rounded-lg overflow-hidden"
        >
          <div 
            className="w-full h-full bg-secondary p-8 flex flex-col justify-between"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${research.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div>
              <p className="text-sm font-medium text-gray-300 mb-4">{research.category}</p>
              <h3 className="text-2xl font-semibold text-white">{research.title}</h3>
            </div>
            <p className="text-white/80 text-sm mt-4">Click to see clinical findings</p>
          </div>
        </div>
        
        <div 
          className="back absolute w-full h-full bg-accent text-white p-8 rounded-lg flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">{research.title}</h3>
            <p className="text-white/90 text-base leading-relaxed mb-4">{research.description}</p>
            <div className="mt-2">
              <p className="text-white/90 text-sm italic">{research.clinicalFindings}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="r-wrap absolute right-4 bottom-4 z-10">
        <button 
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
          onClick={() => setIsFlipped(!isFlipped)}
          aria-label={isFlipped ? "Show front of card" : "Show back of card"}
        >
          <svg className={`w-5 h-5 text-white transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function ScientificAdvisory() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 headline-animated" style={{ fontFamily: 'var(--neue-montreal)' }}>
              Backed by <span className="text-secondary">Science</span>
            </h2>
          </AnimationWrapper>
          
          <p className="text-lg text-accent-light mb-16 max-w-3xl mx-auto fade-in">
            Our sleep optimization recommendations are supported by cutting-edge scientific research
          </p>
          
          {/* Scientific research */}
          <h3 className="text-2xl font-semibold mb-8 mx-auto">Latest Research</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {research.map((study) => (
            <div key={study.id} className="fade-in-up">
              <FlipCard research={study} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 