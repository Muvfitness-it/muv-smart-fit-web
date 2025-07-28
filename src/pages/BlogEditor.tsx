import React from 'react';
import { Helmet } from 'react-helmet';
import BlogEditor from '@/components/blog/BlogEditor';
import SimpleProtectedRoute from '@/components/blog/SimpleProtectedRoute';

const BlogEditorPage = () => {
  return (
    <SimpleProtectedRoute>
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <Helmet>
          <title>Editor Articoli - MUV Fitness Blog</title>
          <meta name="description" content="Crea e gestisci articoli del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <BlogEditor />
      </div>
    </SimpleProtectedRoute>
  );
};

export default BlogEditorPage;