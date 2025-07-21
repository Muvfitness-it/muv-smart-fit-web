import { useAuth } from '@/hooks/useAuth';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import SEOHandler from '@/components/home/SEOHandler';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import AdminRoleAssigner from '@/components/auth/AdminRoleAssigner';
import ExitIntentPopup from '@/components/conversion/ExitIntentPopup';
import { Button } from '@/components/ui/button';
import { LogIn, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLeadTracking from '@/hooks/useLeadTracking';
const Index = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();

  // Initialize lead tracking
  useLeadTracking();
  return (
    <ExitIntentPopup>
      <div className="min-h-screen bg-gray-900">
        <SEOHandler />
        <LocalBusinessSchema />
        <AdminRoleAssigner />
        
        {/* Auth Status Bar */}
        {user && (
          <div className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{user.email}</span>
              </div>
              {isAdmin && (
                <Link to="/admin/utenti">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Admin
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="text-destructive hover:text-destructive"
              >
                <LogIn className="h-4 w-4 mr-1 rotate-180" />
                Logout
              </Button>
            </div>
          </div>
        )}

        {/* Existing content */}
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </div>
    </ExitIntentPopup>
  );
};
export default Index;