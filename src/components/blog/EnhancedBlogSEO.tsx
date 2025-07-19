import React from 'react';
import { Helmet } from 'react-helmet';

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

interface EnhancedBlogSEOProps {
  post: BlogPost;
}

const EnhancedBlogSEO: React.FC<EnhancedBlogSEOProps> = ({ post }) => {
  const baseUrl = 'https://www.muvfitness.it';
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;
  
  // Ottimizzazione SEO title e description
  const seoTitle = post.meta_title || `${post.title} | MUV Fitness - Allenamento Professionale`;
  const seoDescription = post.meta_description || 
    post.excerpt || 
    post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  
  // Keywords estratte automaticamente + quelle custom
  const extractKeywords = (content: string): string[] => {
    const fitnessKeywords = ['fitness', 'allenamento', 'nutrizione', 'benessere', 'salute', 'sport', 'palestra', 'personal trainer', 'dieta', 'esercizi'];
    const words = content.toLowerCase()
      .replace(/<[^>]*>/g, ' ')
      .match(/\b[a-zàáèéìíòóùú]{4,}\b/g) || [];
    
    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      if (!['questo', 'quello', 'essere', 'avere', 'fare', 'dire', 'andare', 'vedere', 'sapere', 'dare'].includes(word)) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });
    
    const contentKeywords = Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([word]) => word);
    
    return [...new Set([...fitnessKeywords, ...contentKeywords])].slice(0, 15);
  };

  const allKeywords = [
    ...(post.meta_keywords ? post.meta_keywords.split(',').map(k => k.trim()) : []),
    ...extractKeywords(post.content)
  ];

  // Dati strutturati avanzati per Google News e AI
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${canonicalUrl}#article`,
    "headline": post.title,
    "alternativeHeadline": seoTitle,
    "description": seoDescription,
    "image": {
      "@type": "ImageObject",
      "url": post.featured_image || `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`,
      "width": 1200,
      "height": 630,
      "caption": post.title
    },
    "datePublished": post.published_at || new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author_name || "MUV Fitness Team",
      "email": post.author_email || "info@muvfitness.it",
      "url": `${baseUrl}/team`,
      "jobTitle": "Personal Trainer & Fitness Expert"
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
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+39-XXX-XXXXXXX",
        "contactType": "customer service",
        "availableLanguage": "Italian"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": "Fitness & Wellness",
    "articleBody": post.content.replace(/<[^>]*>/g, ''),
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    "timeRequired": `PT${post.reading_time || Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)}M`,
    "keywords": allKeywords.join(', '),
    "about": [
      {
        "@type": "Thing",
        "name": "Fitness Training",
        "description": "Professional fitness training and wellness guidance"
      },
      {
        "@type": "Thing", 
        "name": "Health & Wellness",
        "description": "Comprehensive health and wellness solutions"
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
    "copyrightHolder": {
      "@type": "Organization",
      "name": "MUV Fitness",
      "url": baseUrl
    },
    "copyrightYear": new Date().getFullYear(),
    "inLanguage": "it-IT",
    "audience": {
      "@type": "Audience",
      "audienceType": "fitness enthusiasts, health conscious individuals"
    }
  };

  // Schema per Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": canonicalUrl
      }
    ]
  };

  // Schema per FAQ (se il contenuto contiene domande)
  const faqMatches = post.content.match(/(?:<h[234][^>]*>|^#{2,4}\s)([^<\n]*\?[^<\n]*)/gm);
  const faqSchema = faqMatches && faqMatches.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqMatches.slice(0, 5).map((question, index) => ({
      "@type": "Question",
      "name": question.replace(/<[^>]*>/g, '').replace(/^#+\s/, ''),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Scopri la risposta completa nell'articolo: ${post.title}`
      }
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Google News specifico */}
      <meta name="news_keywords" content={allKeywords.slice(0, 10).join(', ')} />
      <meta name="standout" content={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* AI e ML optimization */}
      <meta name="AI-readable" content="true" />
      <meta name="content-language" content="it-IT" />
      <meta name="article:content_tier" content="free" />
      <meta name="article:opinion" content="false" />
      
      {/* Open Graph ottimizzato */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={post.featured_image || `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MUV Fitness Blog" />
      <meta property="og:locale" content="it_IT" />
      
      {/* Article specifico */}
      <meta property="article:published_time" content={post.published_at || new Date().toISOString()} />
      <meta property="article:modified_time" content={new Date().toISOString()} />
      <meta property="article:author" content={post.author_name || "MUV Fitness Team"} />
      <meta property="article:section" content="Fitness & Wellness" />
      {allKeywords.slice(0, 10).map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card ottimizzato */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={post.featured_image || `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`} />
      <meta name="twitter:site" content="@muvfitness" />
      <meta name="twitter:creator" content="@muvfitness" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {/* Performance e indexing hints */}
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://www.bing.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* Mobile ottimizzazione */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="#8B5CF6" />
      
      {/* Hreflang per futuro supporto multilingua */}
      <link rel="alternate" hrefLang="it" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default EnhancedBlogSEO;