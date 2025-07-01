
import React from 'react';
import { Helmet } from 'react-helmet';
import ArticleManager from '@/components/blog/ArticleManager';

const BlogManager = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-[var(--header-height)] py-8">
      <Helmet>
        <title>Gestione Articoli - MUV Fitness Blog</title>
        <meta name="description" content="Gestisci tutti i tuoi articoli del blog. Modifica, pubblica e organizza i contenuti del tuo blog fitness." />
        <meta name="keywords" content="gestione blog, articoli fitness, blog management, MUV Fitness" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4">
        <ArticleManager />
      </div>
    </div>
  );
};

export default BlogManager;
