
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
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-900 pt-[var(--header-height)] py-8">
        <Helmet>
          <title>Blog Admin - Gestione Completa | MUV Fitness</title>
          <meta name="description" content="Area amministrativa completa per la gestione del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Blog Admin Dashboard</h1>
            <p className="text-gray-400">Gestione completa del tuo blog fitness</p>
          </div>

          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="articles" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Gestione Articoli</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Statistiche</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
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
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Impostazioni Blog</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-300">
                    <p>Funzionalità in sviluppo:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Configurazione SEO globale</li>
                      <li>Gestione categorie e tag</li>
                      <li>Impostazioni di pubblicazione</li>
                      <li>Backup e export contenuti</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BlogAdmin;
