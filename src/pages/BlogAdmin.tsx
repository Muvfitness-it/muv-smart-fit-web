
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogImportTool from '@/components/blog/BlogImportTool';
import { FileText, Upload, BarChart3 } from 'lucide-react';

const BlogAdmin = () => {
  useEffect(() => {
    document.title = "Blog Admin - MUV Fitness";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            📝 Gestione Blog
          </h1>
          <p className="text-gray-300 text-lg">
            Strumenti per importare e gestire gli articoli del blog
          </p>
        </header>

        <Tabs defaultValue="import" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importazione
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Articoli
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistiche
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import">
            <BlogImportTool />
          </TabsContent>

          <TabsContent value="posts">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gestione Articoli</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Sezione in sviluppo: qui potrai gestire, modificare e pubblicare gli articoli importati.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Statistiche Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Sezione in sviluppo: qui vedrai le statistiche di visualizzazione e engagement degli articoli.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogAdmin;
