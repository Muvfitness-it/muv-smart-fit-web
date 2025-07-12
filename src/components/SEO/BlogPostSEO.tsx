import React from 'react';
import SEOOptimizer from './SEOOptimizer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  updated_at?: string;
  views_count?: number;
  reading_time?: number;
  author_name?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

interface BlogPostSEOProps {
  post: BlogPost;
}

const BlogPostSEO: React.FC<BlogPostSEOProps> = ({ post }) => {
  const canonicalUrl = `https://muvfitness.it/blog/${post.slug}`;
  
  // Ottimizza il title per la SERP
  const seoTitle = post.meta_title || `${post.title} | Blog MUV Fitness Legnago`;
  
  // Ottimizza la description
  const seoDescription = post.meta_description || 
    post.excerpt || 
    `Scopri tutto su ${post.title.toLowerCase()} nel blog di MUV Fitness. Consigli professionali per fitness, alimentazione e benessere a Legnago.`;
  
  // Keywords ottimizzate
  const seoKeywords = post.meta_keywords || 
    `${post.title.toLowerCase()}, fitness legnago, blog fitness, allenamento, nutrizione, MUV fitness, benessere, personal training legnago`;
  
  // Extract tags from content or use default
  const contentWords = post.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .toLowerCase()
    .split(/\s+/)
    .slice(0, 50)
    .filter(word => word.length > 4)
    .slice(0, 10);
  
  const tags = [
    'fitness',
    'allenamento',
    'benessere',
    'legnago',
    'MUV fitness',
    ...contentWords
  ].slice(0, 8);

  // Structured data specifico per blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": seoDescription,
    "image": {
      "@type": "ImageObject",
      "url": post.featured_image?.startsWith('http') 
        ? post.featured_image 
        : `https://muvfitness.it${post.featured_image || '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png'}`,
      "width": 1200,
      "height": 630
    },
    "url": canonicalUrl,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Person",
      "name": post.author_name || "MUV Fitness Team",
      "url": "https://muvfitness.it/team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MUV Fitness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
        "width": 400,
        "height": 400
      },
      "url": "https://muvfitness.it",
      "sameAs": [
        "https://www.facebook.com/muvsmartfit",
        "https://www.instagram.com/muvsmartfit"
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": "Fitness e Benessere",
    "keywords": tags.join(', '),
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    "timeRequired": `PT${post.reading_time || 5}M`,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/ReadAction",
      "userInteractionCount": post.views_count || 0
    },
    "isPartOf": {
      "@type": "Blog",
      "name": "MUV Fitness Blog",
      "url": "https://muvfitness.it/blog"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Fitness",
        "sameAs": "https://en.wikipedia.org/wiki/Physical_fitness"
      },
      {
        "@type": "Thing",
        "name": "Personal Training",
        "sameAs": "https://en.wikipedia.org/wiki/Personal_trainer"
      }
    ]
  };

  return (
    <SEOOptimizer
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
      canonicalUrl={canonicalUrl}
      ogImage={post.featured_image}
      structuredData={structuredData}
      articleData={{
        publishedTime: post.published_at,
        modifiedTime: post.updated_at,
        author: post.author_name,
        section: "Fitness e Benessere",
        tags: tags
      }}
    />
  );
};

export default BlogPostSEO;