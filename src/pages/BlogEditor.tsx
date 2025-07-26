import React from 'react';
import { Helmet } from 'react-helmet';
import ArticleManager from '@/components/blog/ArticleManager';
import ProtectedRoute from '@/components/blog/ProtectedRoute';

const BlogEditor = () => {
  return (
    <ProtectedRoute requireBlogAccess={true}>
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <Helmet>
          <title>Editor Articoli - MUV Fitness Blog</title>
          <meta name="description" content="Crea e gestisci articoli del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <ArticleManager />
      </div>
    </ProtectedRoute>
  );
};

export default BlogEditor;