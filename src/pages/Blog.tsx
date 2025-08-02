
import React, { useState } from 'react';
import UnifiedSEO from '@/components/SEO/UnifiedSEO';
import CrawlerOptimizer from '@/components/SEO/CrawlerOptimizer';
import StaticContentGenerator from '@/components/SEO/StaticContentGenerator';
import BlogLanding from '@/components/blog/BlogLanding';
import BlogSitemap from '@/components/blog/BlogSitemap';
import SitemapSubmitter from '@/components/SEO/SitemapSubmitter';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const { posts, loading } = useBlogPosts();
  const [showAllArticles, setShowAllArticles] = useState(false);

  // Generate dynamic content for crawlers
  const blogContent = `
    Il blog di MUV Fitness offre articoli professionali su fitness, allenamento e nutrizione.
    Articoli recenti: ${posts.slice(0, 5).map(post => post.title).join(', ')}.
    Contenuti aggiornati regolarmente da esperti del settore fitness.
    Tematiche trattate: allenamento personalizzato, nutrizione sportiva, benessere, salute, tecniche di allenamento avanzate.
  `;

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
    <BlogSitemap />
    <SitemapSubmitter />
      
      {/* Unified SEO */}
      <UnifiedSEO
        title="Blog - MUV Fitness | Articoli su Fitness, Allenamento e Nutrizione"
        description="Scopri il blog di MUV Fitness con articoli professionali su allenamento, nutrizione e benessere. Contenuti ottimizzati per Google News e sistemi AI."
        keywords="blog fitness, articoli allenamento, nutrizione sportiva, benessere, personal training, MUV Fitness, Google News"
        canonical="https://www.muvfitness.it/blog"
        ogImage="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
      />
      
      {/* Crawler Optimizer for AI and NotebookLM */}
      <CrawlerOptimizer
        title="Blog MUV Fitness"
        description="Hub di contenuti professionali su fitness, allenamento e nutrizione"
        content={blogContent}
        services={['Articoli fitness', 'Guide allenamento', 'Consigli nutrizione', 'Blog professionale']}
        location="Blog MUV Fitness - Centro di informazione fitness"
      />
      
      {/* Static Content Generator */}
      <StaticContentGenerator 
        pageType="blog" 
        additionalContent={blogContent}
      />

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-foreground text-lg">Caricamento articoli...</div>
          </div>
        ) : (
          <BlogLanding 
            recentArticles={posts} 
            showAllArticles={showAllArticles}
            onShowAllArticles={() => setShowAllArticles(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
