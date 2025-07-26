import React from 'react';
import { Helmet } from 'react-helmet';
import ArticleManager from '@/components/blog/ArticleManager';
import ProtectedRoute from '@/components/blog/ProtectedRoute';

const BlogManager = () => {
  return (
    <ProtectedRoute requireBlogAccess={true}>
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <Helmet>
          <title>Gestione Articoli - MUV Fitness Blog</title>
          <meta name="description" content="Gestisci tutti i tuoi articoli del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <ArticleManager />
      </div>
    </ProtectedRoute>
  );
};

export default BlogManager;