import React from 'react';
import { Helmet } from 'react-helmet';
import ArticleManager from '@/components/blog/ArticleManager';
import SimpleProtectedRoute from '@/components/blog/SimpleProtectedRoute';

const BlogManager = () => {
  return (
    <SimpleProtectedRoute>
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <Helmet>
          <title>Gestione Articoli - MUV Fitness Blog</title>
          <meta name="description" content="Gestisci tutti i tuoi articoli del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <ArticleManager />
      </div>
    </SimpleProtectedRoute>
  );
};

export default BlogManager;