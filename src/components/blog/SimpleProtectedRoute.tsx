import React from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface SimpleProtectedRouteProps {
  children: React.ReactNode;
}

const SimpleProtectedRoute: React.FC<SimpleProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifica autorizzazioni...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Accesso Richiesto</CardTitle>
            <CardDescription>
              Devi effettuare l'accesso per accedere a questa sezione
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate('/admin/auth')}>
              Vai al Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Accesso Non Autorizzato</CardTitle>
            <CardDescription>
              Non hai i permessi necessari per accedere a questa sezione
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Solo gli amministratori possono gestire il blog
            </p>
            <Button onClick={() => navigate('/')}>
              Torna alla Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default SimpleProtectedRoute;