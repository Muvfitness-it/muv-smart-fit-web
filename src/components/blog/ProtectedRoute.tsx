
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-lg">Caricamento...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Accesso Negato</h1>
          <p className="text-muted-foreground">
            Non hai i permessi necessari per accedere a questa pagina.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
