
import React from 'react';
import { Helmet } from 'react-helmet';
import BlogLanding from '@/components/blog/BlogLanding';
import BlogSitemap from '@/components/blog/BlogSitemap';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const { posts, loading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
      <BlogSitemap />
      <Helmet>
        <title>Blog - MUV Fitness | Articoli su Fitness, Allenamento e Nutrizione</title>
        <meta name="description" content="Scopri il blog di MUV Fitness con articoli professionali su allenamento, nutrizione e benessere. Contenuti ottimizzati per Google News e sistemi AI." />
        <meta name="keywords" content="blog fitness, articoli allenamento, nutrizione sportiva, benessere, personal training, MUV Fitness, Google News" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="news_keywords" content="fitness, allenamento, nutrizione, benessere, salute" />
        <link rel="canonical" href="https://www.muvfitness.it/blog" />
        
        {/* Open Graph per social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog MUV Fitness - Articoli su Fitness e Allenamento" />
        <meta property="og:description" content="Articoli professionali su fitness, allenamento e nutrizione. Ottimizzati per Google News e AI." />
        <meta property="og:url" content="https://www.muvfitness.it/blog" />
        <meta property="og:site_name" content="MUV Fitness" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog MUV Fitness - Articoli Professionali" />
        <meta name="twitter:description" content="Scopri articoli su fitness, allenamento e nutrizione ottimizzati per AI e Google News" />
      </Helmet>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-foreground text-lg">Caricamento articoli...</div>
          </div>
        ) : (
          <BlogLanding recentArticles={posts} />
        )}
      </div>
    </div>
  );
};

export default Blog;
