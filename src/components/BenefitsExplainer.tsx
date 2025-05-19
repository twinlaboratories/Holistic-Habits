'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from './AnimationWrapper';

// Benefit data
const benefits = [
  {
    id: 'air',
    name: 'Air Quality',
    description: 'The Bedside Air Purifier removes allergens, dust, and pollutants from your bedroom air, creating an optimal breathing environment during sleep. Clean air has been shown to improve sleep quality and reduce respiratory issues.',
    quote: '"Air quality is one of the most overlooked aspects of sleep health. Breathing clean air while you sleep can improve oxygen uptake by 20%." - Dr. Andrew Huberman, Neuroscientist',
    image: '/images/Untitled-1.PNG',
  },
  {
    id: 'breathing',
    name: 'Nasal Breathing',
    description: 'Mouth tape promotes nasal breathing during sleep, which increases nitric oxide production, improves oxygen circulation, reduces snoring, and prevents dry mouth. It\'s a simple but powerful sleep hack.',
    quote: '"Mouth taping is a game-changer for sleep quality. When you breathe through your nose, you filter the air, produce nitric oxide, and maintain proper CO2 levels." - James Nestor, Author of "Breath"',
    image: '/images/Untitled-2.PNG',
  },
  {
    id: 'temperature',
    name: 'Temperature Regulation',
    description: '100% natural cotton sheets help regulate your body temperature throughout the night, keeping you cool in summer and warm in winter. Temperature regulation is critical for proper sleep cycles.',
    quote: '"The optimal sleeping temperature is between 65-68°F. Natural cotton sheets help maintain this temperature range by wicking away moisture and allowing proper airflow." - Dr. Matthew Walker, Sleep Scientist',
    image: '/images/Untitled-3.PNG',
  },
  {
    id: 'light',
    name: 'Blue Light Filtering',
    description: 'Blue light glasses block harmful light from screens in the evening, helping maintain your natural circadian rhythm and melatonin production for better sleep quality.',
    quote: '"Blocking blue light 2-3 hours before bed can increase melatonin production by up to 58%, helping you fall asleep faster and achieve deeper sleep." - Dr. Rhonda Patrick, Biochemist',
    image: '/images/Untitled-4.PNG',
  },
];

export default function BenefitsExplainer() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0].id);
  
  const activeBenefitData = benefits.find(benefit => benefit.id === activeBenefit) || benefits[0];
  
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container">
        <AnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center headline-animated" style={{ fontFamily: 'var(--neue-montreal)' }}>
            Four Elements. <span className="text-secondary">Complete Sleep Optimization.</span>
          </h2>
        </AnimationWrapper>
        
        <p className="text-lg text-accent-light text-center mb-16 max-w-3xl mx-auto fade-in">
          Our sleep bundle actively optimizes every aspect of your sleep environment, from air quality to temperature regulation.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden fade-in">
            {benefits.map((benefit) => (
              <motion.div 
                key={benefit.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeBenefit === benefit.id ? 1 : 0,
                  transition: { duration: 0.5 }
                }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <img 
                    src={benefit.image}
                    alt={benefit.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{benefit.name}</h3>
                    <p className="text-sm text-gray-200">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Controls side */}
          <div className="space-y-6 fade-in-up">
            {benefits.map((benefit, index) => (
              <button
                key={benefit.id}
                className={`w-full text-left p-6 rounded-lg transition-all duration-300 border ${
                  activeBenefit === benefit.id 
                    ? 'bg-secondary text-white border-secondary shadow-lg' 
                    : 'bg-white text-accent-light border-gray-200 hover:border-secondary/50'
                }`}
                onClick={() => setActiveBenefit(benefit.id)}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    activeBenefit === benefit.id 
                      ? 'bg-white text-secondary' 
                      : 'bg-gray-100 text-accent'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium">{benefit.name}</h3>
                </div>
                
                {activeBenefit === benefit.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 text-sm"
                  >
                    <p className="mb-4 italic">{benefit.quote}</p>
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 