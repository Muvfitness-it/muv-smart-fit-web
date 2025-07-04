import { useAuth } from '@/hooks/useAuth';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import SEOHandler from '@/components/home/SEOHandler';
import AdminRoleAssigner from '@/components/auth/AdminRoleAssigner';
import { Button } from '@/components/ui/button';
import { LogIn, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
const Index = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  return <div className="min-h-screen bg-gray-900">
      <SEOHandler />
      <AdminRoleAssigner />
      
      {/* Auth Status Bar */}
      

      {/* Existing content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>;
};
export default Index;