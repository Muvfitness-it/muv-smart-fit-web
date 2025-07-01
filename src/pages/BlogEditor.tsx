
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import AdvancedArticleEditor from '@/components/blog/AdvancedArticleEditor';
import ProtectedRoute from '@/components/blog/ProtectedRoute';

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-900 pt-[var(--header-height)] py-8">
        <Helmet>
          <title>{isEdit ? 'Modifica Articolo' : 'Nuovo Articolo'} - MUV Fitness Blog</title>
          <meta name="description" content={isEdit ? 'Modifica il tuo articolo del blog' : 'Crea un nuovo articolo per il blog'} />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          <AdvancedArticleEditor articleId={id} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BlogEditor;
