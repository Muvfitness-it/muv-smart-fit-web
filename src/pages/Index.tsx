
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
                  variant="default" 
                  size="sm" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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
                      variant="secondary" 
                      size="sm" 
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
