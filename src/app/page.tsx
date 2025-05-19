import Image from 'next/image';
import Link from 'next/link';
import VideoFeature from '@/components/VideoFeature';
import AnimationWrapper from '@/components/AnimationWrapper';
import ReviewGrid from '@/components/ReviewGrid';
import BenefitsExplainer from '@/components/BenefitsExplainer';
import ScientificAdvisory from '@/components/ScientificAdvisory';
import HeroVideo from '@/components/HeroVideo';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Free Shipping Banner */}
      <div className="bg-secondary text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="inline-block mx-4">✨ FREE SHIPPING ON ALL ORDERS ✨</span>
          <span className="inline-block mx-4">✨ FREE SHIPPING ON ALL ORDERS ✨</span>
          <span className="inline-block mx-4">✨ FREE SHIPPING ON ALL ORDERS ✨</span>
          <span className="inline-block mx-4">✨ FREE SHIPPING ON ALL ORDERS ✨</span>
          <span className="inline-block mx-4">✨ FREE SHIPPING ON ALL ORDERS ✨</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Background video */}
        <HeroVideo />
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title fade-in">
            Introducing the Holistic Sleep Bundle
          </h1>
          <p className="hero-subtitle fade-in stagger-delay-1">
            Sleep how Mother Nature Intended
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in stagger-delay-2">
            <Link href="/bundle" className="btn-animated text-white">
              View Sleep Bundle
            </Link>
          </div>
        </div>
      </section>

      {/* Video Feature Section */}
      <VideoFeature />

      {/* Benefits Explainer Section */}
      <BenefitsExplainer />

      {/* Key Benefits Section */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="container">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 headline-animated" style={{ fontFamily: 'var(--neue-montreal)' }}>
              The best sleep you've <span className="text-secondary">ever had</span>
            </h2>
          </AnimationWrapper>
          
          <p className="text-lg text-accent-light mb-16 max-w-3xl mx-auto fade-in">
            Our products are scientifically proven to deliver real results for your sleep, every night
          </p>
          
          <div className="grid md:grid-cols-4 gap-10">
            <div className="fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">44%</h3>
              <p className="text-accent">Less time to fall asleep</p>
            </div>
            
            <div className="fade-in-up stagger-delay-1">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">34%</h3>
              <p className="text-accent">More deep sleep</p>
            </div>
            
            <div className="fade-in-up stagger-delay-2">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">45%</h3>
              <p className="text-accent">Reduction in snoring</p>
            </div>
            
            <div className="fade-in-up stagger-delay-3">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-2">23%</h3>
              <p className="text-accent">Fewer night wake ups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-20 bg-white text-center">
        <div className="container">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 headline-animated" style={{ fontFamily: 'var(--neue-montreal)' }}>
              The Complete <span className="text-secondary">Sleep Bundle</span>
            </h2>
          </AnimationWrapper>
          
          <p className="text-lg text-accent-light mb-10 max-w-3xl mx-auto fade-in">
            Everything you need for optimal sleep quality in one convenient package.
            Customize your bundle to fit your specific sleep needs.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center fade-in-up">
              <div className="aspect-square relative mb-4">
                <Image
                  src="/images/Untitled-1.PNG"
                  alt="Bedside Air Purifier"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-accent">Bedside Air Purifier</h3>
              <p className="text-sm text-accent-light mt-2">
                Ensures clean air while you sleep
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center fade-in-up stagger-delay-1">
              <div className="aspect-square relative mb-4">
                <Image
                  src="/images/Untitled-2.PNG"
                  alt="NasalBreathe Mouth Tape"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-accent">NasalBreathe Mouth Tape</h3>
              <p className="text-sm text-accent-light mt-2">
                Promotes nasal breathing
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center fade-in-up stagger-delay-2">
              <div className="aspect-square relative mb-4">
                <Image
                  src="/images/Untitled-3.PNG"
                  alt="Natural Cotton Fitted Sheet"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-accent">Natural Cotton Fitted Sheet</h3>
              <p className="text-sm text-accent-light mt-2">
                Regulates body temperature
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center fade-in-up stagger-delay-3">
              <div className="aspect-square relative mb-4">
                <Image
                  src="/images/Untitled-4.PNG"
                  alt="Blue Light Filter Glasses"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-accent">Blue Light Filter Glasses</h3>
              <p className="text-sm text-accent-light mt-2">
                Blocks harmful light before bed
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Link href="/bundle" className="btn-animated text-white">
              Build Your Bundle
            </Link>
          </div>
        </div>
      </section>

      {/* Scientific Advisory Section */}
      <ScientificAdvisory />

      {/* Testimonials Section with Interactive Cards */}
      <ReviewGrid />

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white text-center">
        <div className="container">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 headline-animated text-white" style={{ fontFamily: 'var(--neue-montreal)' }}>Ready to Transform Your Sleep?</h2>
          </AnimationWrapper>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto fade-in">
            Start your journey to better sleep and improved overall health with our scientifically-backed products.
          </p>
          
          <div className="fade-in stagger-delay-1">
            <Link href="/bundle" className="btn-animated text-white">
              Get Your Sleep Bundle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 