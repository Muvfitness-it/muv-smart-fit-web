
import React from 'react';
import SEOHandler from '../components/home/SEOHandler';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';
import BlogSection from '../components/blog/BlogSection';
import CTASection from '../components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SEOHandler />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <BlogSection />
      <CTASection />
    </div>
  );
};

export default Index;
