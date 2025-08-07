import React from 'react';
import SEOOptimizer from './SEOOptimizer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  published_at?: string;
  author_name?: string;
  author_email?: string;
  views_count?: number;
  reading_time?: number;
}

interface BlogPostSEOProps {
  post: BlogPost;
}

const BlogPostSEO: React.FC<BlogPostSEOProps> = ({ post }) => {
  const baseUrl = 'https://www.muvfitness.it';
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;
  
  // SEO optimized title and description
  const seoTitle = post.meta_title || `${post.title} | MUV Fitness Blog`;
  const seoDescription = post.meta_description || 
    post.excerpt || 
    post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  
  const seoKeywords = post.meta_keywords || 
    `fitness, allenamento, ${post.title.toLowerCase().split(' ').slice(0, 3).join(', ')}, MUV Fitness`;

  // Extract tags from content for better SEO
  const extractTags = (content: string): string[] => {
    const words = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  };

  const contentTags = extractTags(post.content);

  // Schema.org Article completo per rich result
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    "headline": post.title,
    "description": seoDescription,
    "image": {
      "@type": "ImageObject", 
      "url": post.featured_image || `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`,
      "width": 1200,
      "height": 630
    },
    "datePublished": post.published_at || new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author_name || "MUV Team",
      "email": post.author_email || "info@muvfitness.it",
      "url": `${baseUrl}/team`,
      "jobTitle": "Fitness Expert",
      "worksFor": {
        "@type": "Organization",
        "name": "MUV Fitness"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "MUV Fitness",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`,
        "width": 400,
        "height": 400
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Esempio 123",
        "addressLocality": "Legnago",
        "addressRegion": "VR",
        "postalCode": "37045",
        "addressCountry": "IT"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+39-0000-000000",
        "contactType": "Customer Service",
        "email": "info@muvfitness.it"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.reading_time || 5}M`,
    "articleSection": "Fitness & Wellness",
    "keywords": [...contentTags, ...seoKeywords.split(', ')].filter((keyword, index, self) => self.indexOf(keyword) === index).join(', '),
    "about": [
      {
        "@type": "Thing",
        "name": "Fitness Training",
        "description": "Professional fitness training and wellness guidance"
      },
      {
        "@type": "Thing", 
        "name": "Health and Wellness",
        "description": "Complete health and wellness solutions"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "MUV Fitness",
        "url": baseUrl
      }
    ],
    "isAccessibleForFree": true,
    "inLanguage": "it-IT",
    "articleBody": post.content.replace(/<[^>]*>/g, '').substring(0, 500) + "...",
    "url": canonicalUrl,
    "potentialAction": {
      "@type": "ReadAction",
      "target": [canonicalUrl]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".blog-title", ".blog-excerpt"]
    }
  };

  const articleData = {
    title: post.title,
    author: post.author_name || "MUV Team",
    publishedAt: post.published_at,
    readingTime: post.reading_time,
    viewsCount: post.views_count,
    category: "Fitness & Wellness"
  };

  return (
    <SEOOptimizer
      title={seoTitle}
      description={seoDescription}
      canonicalUrl={canonicalUrl}
      ogImage={post.featured_image}
      structuredData={articleSchema}
      articleData={{
        publishedTime: post.published_at,
        modifiedTime: new Date().toISOString(),
        author: post.author_name || "MUV Team",
        section: "Fitness & Wellness",
        tags: [...contentTags, ...seoKeywords.split(', ')]
      }}
    />
  );
};

export default BlogPostSEO;