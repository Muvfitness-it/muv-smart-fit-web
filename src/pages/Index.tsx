
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
      <div className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-foreground">
            {user ? (
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-primary" />
                <span className="font-medium">Benvenuto, {user.email}</span>
                {isAdmin && (
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    ADMIN
                  </span>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">Non autenticato</span>
            )}
          </div>
            <div className="flex items-center space-x-3">
              {!user ? (
                <Link to="/auth">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
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
                        variant="outline" 
                        size="sm" 
                        className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 hover:border-blue-300/40"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Blog
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={signOut}
                    className="bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700"
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
