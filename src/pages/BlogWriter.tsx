import React from 'react';
import { Helmet } from 'react-helmet';
import AIArticleWriter from '@/components/blog/AIArticleWriter';
import SimpleProtectedRoute from '@/components/blog/SimpleProtectedRoute';

const BlogWriter = () => {
  return (
    <SimpleProtectedRoute>
      <div className="min-h-screen bg-gray-900 pt-[var(--header-height)] py-8">
        <Helmet>
          <title>Scrivi Articolo con IA - MUV Fitness Blog</title>
          <meta name="description" content="Crea articoli di fitness ottimizzati SEO utilizzando l'intelligenza artificiale. Genera contenuti professionali in pochi minuti." />
          <meta name="keywords" content="AI blog writer, scrittura articoli IA, SEO fitness, content creation, MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          <AIArticleWriter />
        </div>
      </div>
    </SimpleProtectedRoute>
  );
};

export default BlogWriter;