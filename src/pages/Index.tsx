
import { useAdminAuth } from '@/hooks/useAdminAuth';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import SEOHandler from '@/components/home/SEOHandler';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';

import { Button } from '@/components/ui/button';
import { LogIn, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLeadTracking from '@/hooks/useLeadTracking';

const Index = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAdminAuth();

  // Initialize lead tracking
  useLeadTracking();

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHandler />
      <LocalBusinessSchema />
      
      {/* Auth Status Bar */}
      

      {/* Existing content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;
