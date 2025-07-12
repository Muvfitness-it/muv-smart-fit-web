import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface SEOOptimizerProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: object;
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  noIndex = false,
  structuredData,
  articleData
}) => {
  const fullImage = ogImage.startsWith('http') ? ogImage : `https://muvfitness.it${ogImage}`;

  // Ottimizza il title per la SERP
  const optimizedTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  
  // Ottimizza la description per la SERP
  const optimizedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

  // Schema.org per ArticlePosting se è un articolo
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": fullImage,
    "url": canonicalUrl,
    "datePublished": articleData.publishedTime,
    "dateModified": articleData.modifiedTime || articleData.publishedTime,
    "author": {
      "@type": "Person",
      "name": articleData.author || "MUV Fitness Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MUV Fitness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": articleData.section || "Fitness",
    "keywords": articleData.tags?.join(', ') || keywords
  } : null;

  useEffect(() => {
    // Tracking per Google Analytics Enhanced Ecommerce
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-440977387', {
        page_title: title,
        page_location: canonicalUrl,
        custom_map: { dimension1: 'page_type', dimension2: 'content_category' }
      });
    }
  }, [title, canonicalUrl]);

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      
      {/* Open Graph ottimizzato */}
      <meta property="og:type" content={articleData ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MUV Fitness" />
      <meta property="og:locale" content="it_IT" />
      
      {/* Twitter Card ottimizzato */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@muvfitness" />
      <meta name="twitter:creator" content="@muvfitness" />
      
      {/* Article specifico per Open Graph */}
      {articleData && (
        <>
          <meta property="article:published_time" content={articleData.publishedTime} />
          {articleData.modifiedTime && (
            <meta property="article:modified_time" content={articleData.modifiedTime} />
          )}
          <meta property="article:author" content={articleData.author || 'MUV Fitness Team'} />
          <meta property="article:section" content={articleData.section || 'Fitness'} />
          {articleData.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Schema.org Structured Data */}
      {(structuredData || articleSchema) && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData || articleSchema)}
        </script>
      )}
      
      {/* Meta aggiuntivi per SEO tecnico */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#9333ea" />
      <meta name="msapplication-TileColor" content="#9333ea" />
      
      {/* DNS Prefetch per performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preconnect per risorse critiche */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Hreflang per internazionalizzazione futura */}
      <link rel="alternate" hrefLang="it" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOOptimizer;