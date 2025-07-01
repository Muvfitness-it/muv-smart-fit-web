
import React from 'react';
import { Helmet } from 'react-helmet';
import BlogLanding from '@/components/blog/BlogLanding';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const { posts, loading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-gray-900 pt-[var(--header-height)] py-8">
      <Helmet>
        <title>Blog - MUV Fitness | Articoli su Fitness, Allenamento e Nutrizione</title>
        <meta name="description" content="Scopri il blog di MUV Fitness con articoli professionali su allenamento, nutrizione e benessere. Contenuti creati con intelligenza artificiale e ottimizzati SEO." />
        <meta name="keywords" content="blog fitness, articoli allenamento, nutrizione sportiva, benessere, AI content, MUV Fitness" />
        <link rel="canonical" href="https://www.muvfitness.it/blog" />
      </Helmet>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-lg">Caricamento articoli...</div>
          </div>
        ) : (
          <BlogLanding recentArticles={posts} />
        )}
      </div>
    </div>
  );
};

export default Blog;
