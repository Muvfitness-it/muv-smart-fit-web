import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ArticleManager from '@/components/blog/ArticleManager';
import SimpleProtectedRoute from '@/components/blog/SimpleProtectedRoute';

const BlogManager = () => {
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeedDrafts = async () => {
    try {
      setSeeding(true);
      const { data, error } = await supabase.functions.invoke('seed-blog-drafts', { body: {} });
      if (error) throw error;
      toast({ title: 'Bozze create', description: `${data?.created || 0} bozze generate` });
    } catch (e: any) {
      toast({ title: 'Errore', description: e.message || 'Impossibile creare le bozze', variant: 'destructive' });
    } finally {
      setSeeding(false);
    }
  };
  return (
    <SimpleProtectedRoute>
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <Helmet>
          <title>Gestione Articoli - MUV Fitness Blog</title>
          <meta name="description" content="Gestisci tutti i tuoi articoli del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="flex items-center justify-between mb-4">
          <h1 className="sr-only">Gestione Articoli</h1>
          <Button onClick={handleSeedDrafts} disabled={seeding} className="ml-auto">
            {seeding ? 'Creazione bozze…' : 'Crea 12 bozze automaticamente'}
          </Button>
        </div>

        <ArticleManager />
      </div>
    </SimpleProtectedRoute>
  );
};

export default BlogManager;