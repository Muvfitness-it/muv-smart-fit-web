
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
      {isAdmin && (
        <div className="bg-gray-800 border-b border-gray-700 py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                <User className="inline w-4 h-4 mr-1" />
                Connesso come Admin: {user?.email}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/blog/nuovo">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Editor Manuale
                </Button>
              </Link>
              <Link to="/blog/gestisci">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Gestisci Blog
                </Button>
              </Link>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
      

      {/* Existing content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;
