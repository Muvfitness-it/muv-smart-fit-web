
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
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHandler />
      <AdminRoleAssigner />
      
      {/* Auth Status Bar */}
      <div className="bg-gray-800 border-b border-gray-700 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-gray-200">
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Benvenuto, {user.email}</span>
                {isAdmin && (
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">ADMIN</span>
                )}
              </div>
            ) : (
              <span>Non autenticato</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {!user ? (
              <Link to="/auth">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Accedi
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                {isAdmin && (
                  <Link to="/blog/admin">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Blog
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-medium px-4 py-2"
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
