import { useAuth } from '@/hooks/useAuth';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import SEOHandler from '@/components/home/SEOHandler';
import { Button } from '@/components/ui/button';
import { LogIn, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHandler />
      
      {/* Auth Status Bar */}
      <div className="bg-gray-800 border-b border-gray-700 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {user ? (
              <span>Benvenuto, {user.email}</span>
            ) : (
              <span>Non autenticato</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {!user ? (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  Accedi
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link to="/blog/admin">
                    <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Blog
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Existing content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;
