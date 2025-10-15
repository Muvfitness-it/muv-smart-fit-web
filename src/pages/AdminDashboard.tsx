import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, BarChart3, Settings, Users, LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { BlogThemeNormalizer } from '@/components/admin/BlogThemeNormalizer';
import { BlogContentFixer } from '@/components/admin/BlogContentFixer';
import BlogSEOAuditor from '@/components/SEO/BlogSEOAuditor';
import BlogCopyHumanizer from '@/components/admin/BlogCopyHumanizer';
import { GEOBlogGenerator } from '@/components/admin/GEOBlogGenerator';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const navigate = useNavigate();
  const { signOut, user } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Dashboard Amministratore - MUV Fitness</title>
          <meta name="description" content="Pannello di controllo per la gestione del blog e contenuti MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard Amministratore</h1>
                <p className="text-muted-foreground">Benvenuto {user?.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Esci
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:flex">
              <TabsTrigger value="articles" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Gestisci Articoli</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Statistiche</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Impostazioni</span>
              </TabsTrigger>
            </TabsList>

            {/* Articles Management Tab */}
            <TabsContent value="articles" className="mt-6">
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                        onClick={() => navigate('/admin/blog/create/ai')}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Crea con IA</h3>
                      <p className="text-sm text-muted-foreground">
                        Scrivi articoli ottimizzati SEO con l'intelligenza artificiale
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate('/admin/blog/create/manual')}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-semibold mb-2">Crea Manualmente</h3>
                      <p className="text-sm text-muted-foreground">
                        Scrivi articoli personalizzati con l'editor avanzato
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-semibold mb-2">Analisi Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitora visualizzazioni e engagement degli articoli
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* GEO Blog Generator */}
                <GEOBlogGenerator />

                {/* SEO Blog Auditor */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Audit SEO Blog
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BlogSEOAuditor />
                  </CardContent>
                </Card>

                {/* Articles List */}
                <div className="text-muted-foreground">Il blog è stato dismesso.</div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <div className="space-y-6">
                <div className="text-muted-foreground">Statistiche blog non disponibili.</div>
              </div>
            </TabsContent>


            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                {/* Blog Content Fixer */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Content Processor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <BlogContentFixer />
                    <BlogThemeNormalizer />
                    <BlogCopyHumanizer />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Impostazioni Blog</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Configurazione Generale</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Nome del Blog</label>
                          <p className="text-sm text-muted-foreground">MUV Fitness Blog</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Descrizione</label>
                          <p className="text-sm text-muted-foreground">
                            Blog ufficiale di MUV Fitness con consigli su allenamento e nutrizione
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Amministratori</h4>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user?.email}</p>
                            <p className="text-xs text-muted-foreground">Amministratore Principale</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;