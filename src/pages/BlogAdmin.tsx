
import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, FileText, Plus, BarChart3 } from 'lucide-react';
import ArticleManager from '@/components/blog/ArticleManager';
import BlogAdminStats from '@/components/blog/BlogAdminStats';
import ProtectedRoute from '@/components/blog/ProtectedRoute';

const BlogAdmin = () => {
  return (
    <ProtectedRoute requireBlogAccess={true}>
      <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
        <Helmet>
          <title>Blog Admin - Gestione Completa | MUV Fitness</title>
          <meta name="description" content="Area amministrativa completa per la gestione del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Blog Admin Dashboard</h1>
            <p className="text-muted-foreground">Gestione completa del tuo blog fitness</p>
          </div>

          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="bg-card border-border">
              <TabsTrigger value="articles" className="flex items-center space-x-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                <FileText className="w-4 h-4" />
                <span>Gestione Articoli</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center space-x-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4" />
                <span>Statistiche</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                <Settings className="w-4 h-4" />
                <span>Impostazioni</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <ArticleManager />
            </TabsContent>

            <TabsContent value="stats">
              <BlogAdminStats />
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-brand">
                  <CardHeader>
                    <CardTitle className="text-foreground">Controllo SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Status attuali:</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          <span className="text-muted-foreground">Sitemap XML configurata</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          <span className="text-muted-foreground">Robots.txt ottimizzato</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          <span className="text-muted-foreground">Google Analytics attivo</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                          <span className="text-muted-foreground">Google Search Console da verificare</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          <span className="text-muted-foreground">Schema.org implementato</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-2 text-foreground">Azioni necessarie:</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>1. Verifica il sito in Google Search Console</p>
                        <p>2. Invia la sitemap a Google</p>
                        <p>3. Monitora le performance delle parole chiave</p>
                        <p>4. Ottimizza la velocità del sito</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-brand">
                  <CardHeader>
                    <CardTitle className="text-foreground">Analytics & Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-brand-accent/10 border border-brand-accent/20 p-4 rounded-lg">
                      <h4 className="font-medium text-brand-accent mb-2">Google Analytics 4</h4>
                      <p className="text-brand-accent/80 text-sm mb-3">
                        ID: G-440977387 (configurato e attivo)
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="text-foreground"><strong>Funzionalità:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
                          <li>Enhanced Ecommerce</li>
                          <li>Custom Dimensions</li>
                          <li>Page View Tracking</li>
                          <li>Conversioni personalizzate</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Link utili:</h4>
                      <div className="space-y-1 text-sm">
                        <a 
                          href="https://search.google.com/search-console" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-brand-accent hover:text-brand-accent/80 transition-colors"
                        >
                          • Google Search Console
                        </a>
                        <a 
                          href="https://analytics.google.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-brand-accent hover:text-brand-accent/80 transition-colors"
                        >
                          • Google Analytics
                        </a>
                        <a 
                          href="https://pagespeed.web.dev" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-brand-accent hover:text-brand-accent/80 transition-colors"
                        >
                          • PageSpeed Insights
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BlogAdmin;
