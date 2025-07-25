import React from 'react';
import { Helmet } from 'react-helmet';
import ProtectedRoute from '@/components/blog/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Calendar, PenTool, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { user, signOut } = useAuth();

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
        <Helmet>
          <title>Pannello Amministratore | MUV Fitness</title>
          <meta name="description" content="Pannello di controllo per amministratori - Gestione prenotazioni e blog" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          {/* Header with user info and logout */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pannello Amministratore</h1>
              <p className="text-muted-foreground mt-2">Benvenuto nell'area di amministrazione</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main admin actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Gestione Prenotazioni */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Gestione Prenotazioni
                </CardTitle>
                <CardDescription>
                  Visualizza e gestisci tutte le prenotazioni dei clienti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/prenotazioni">
                  <Button className="w-full">
                    Apri Prenotazioni
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gestione Blog */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  Gestione Blog
                </CardTitle>
                <CardDescription>
                  Scrivi, modifica e gestisci tutti gli articoli del blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/blog/admin">
                  <Button className="w-full">
                    Apri Blog Admin
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gestione Utenti */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestione Utenti
                </CardTitle>
                <CardDescription>
                  Gestisci utenti e assegna ruoli di amministrazione
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/utenti">
                  <Button className="w-full" variant="outline">
                    Gestisci Utenti
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blog Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Azioni Rapide - Blog</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/blog/nuovo">
                  <Button variant="outline" className="w-full justify-start">
                    <PenTool className="h-4 w-4 mr-2" />
                    Nuovo Articolo
                  </Button>
                </Link>
                <Link to="/blog/scrivi-con-ia">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Scrivi con IA
                  </Button>
                </Link>
                <Link to="/blog/gestisci">
                  <Button variant="outline" className="w-full justify-start">
                    <PenTool className="h-4 w-4 mr-2" />
                    Gestisci Articoli
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Statistiche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Visualizza Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;