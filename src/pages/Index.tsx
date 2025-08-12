
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import SEOHandler from '@/components/home/SEOHandler';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import useLeadTracking from '@/hooks/useLeadTracking';

const Index = () => {

  // Initialize lead tracking
  useLeadTracking();


  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHandler />
      <LocalBusinessSchema />
      

      {/* Existing content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;
