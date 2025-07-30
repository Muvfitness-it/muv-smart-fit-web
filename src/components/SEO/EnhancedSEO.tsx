import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  schemaType?: 'WebPage' | 'Article' | 'LocalBusiness';
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  articleData,
  schemaType = 'WebPage',
  breadcrumbs
}) => {
  const location = useLocation();
  const baseUrl = 'https://www.muvfitness.it';
  const fullCanonical = canonical || `${baseUrl}${location.pathname}`;
  
  // Schema markup generato dinamicamente
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": title,
      "description": description,
      "url": fullCanonical,
      "image": ogImage,
      "publisher": {
        "@type": "Organization",
        "name": "MUV Fitness",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
        }
      }
    };

    if (schemaType === 'Article' && articleData) {
      return {
        ...baseSchema,
        "@type": "Article",
        "headline": title,
        "datePublished": articleData.publishedTime,
        "dateModified": articleData.modifiedTime || articleData.publishedTime,
        "author": {
          "@type": "Person",
          "name": articleData.author || "MUV Team"
        },
        "articleSection": articleData.section || "Fitness",
        "keywords": articleData.tags?.join(', ') || keywords,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullCanonical
        }
      };
    }

    if (breadcrumbs) {
      return {
        ...baseSchema,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${baseUrl}${crumb.url}`
          }))
        }
      };
    }

    return baseSchema;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Enhanced meta tags */}
      <meta name="author" content="MUV Fitness" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="it" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="IT-VR" />
      <meta name="geo.placename" content="Legnago" />
      <meta name="geo.position" content="45.1914;11.3065" />
      <meta name="ICBM" content="45.1914, 11.3065" />
      
      {/* Open Graph Enhanced */}
      <meta property="og:site_name" content="MUV Fitness" />
      <meta property="og:type" content={schemaType === 'Article' ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Article specific OG tags */}
      {schemaType === 'Article' && articleData && (
        <>
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime || articleData.publishedTime} />
          <meta property="article:author" content={articleData.author || "MUV Team"} />
          <meta property="article:section" content={articleData.section || "Fitness"} />
          {articleData.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Cards Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@muvfitness" />
      <meta name="twitter:creator" content="@muvfitness" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Social Meta */}
      <meta property="fb:app_id" content="MUVFitness" />
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* Performance and SEO hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Hreflang for internationalization */}
      <link rel="alternate" hrefLang="it" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchema(), null, 2)}
      </script>
    </Helmet>
  );
};

export default EnhancedSEO;