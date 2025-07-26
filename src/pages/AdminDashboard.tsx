import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProtectedRoute from '@/components/blog/ProtectedRoute';

import ArticleManager from '@/components/blog/ArticleManager';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar, FileText, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { signOut, user } = useAuth();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'articles'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ProtectedRoute requireBlogAccess={true}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Helmet>
            <title>Dashboard Amministratori - MUV Fitness</title>
            <meta name="description" content="Dashboard per la gestione di prenotazioni e articoli MUV Fitness" />
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>

          <AdminSidebar />

          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
              <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div>
                    <h1 className="text-xl font-semibold">Dashboard Amministratori</h1>
                    <p className="text-sm text-muted-foreground">Benvenuto, {user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Esci
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="overview">Panoramica</TabsTrigger>
                  <TabsTrigger value="articles">Articoli</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Articoli Blog</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Crea e gestisci i contenuti del blog</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Statistiche</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Visualizza le analytics del sito</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Azioni Rapide</CardTitle>
                        <CardDescription>Operazioni frequenti per la gestione del sito</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleTabChange('articles')}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Gestisci Articoli
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Informazioni Account</CardTitle>
                        <CardDescription>Dettagli del tuo account amministratore</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span className="text-sm">{user?.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Ruolo:</span>
                            <span className="text-sm">Amministratore</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>


                <TabsContent value="articles">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestione Articoli</CardTitle>
                      <CardDescription>Crea, modifica e gestisci gli articoli del blog</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ArticleManager />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminDashboard;