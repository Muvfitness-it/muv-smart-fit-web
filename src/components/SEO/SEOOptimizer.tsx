import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface SEOOptimizerProps {
  title: string;
  description: string;
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
  canonicalUrl,
  ogImage = '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  noIndex = false,
  structuredData,
  articleData
}) => {
  const fullImage = ogImage.startsWith('http') ? ogImage : `https://muvfitness.it${ogImage}`;

  // RIMOSSO: La logica che tronca il titolo e la descrizione è stata eliminata.

  // Schema.org per ArticlePosting se è un articolo
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title, // Usa il titolo completo
    "description": description, // Usa la descrizione completa
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
    "keywords": articleData.tags?.join(', ') // Qui le parole chiave (tags) per Schema.org vanno bene
  } : null;

  // La sezione useEffect per Google Analytics rimane invariata...
  useEffect(() => {
    // ...il tuo codice di tracking...
  }, [title, canonicalUrl, articleData]);

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title> {/* CORRETTO: Usa il titolo completo */}
      <meta name="description" content={description} /> {/* CORRETTO: Usa la descrizione completa */}
      {/* RIMOSSO: Meta tag 'keywords' obsoleto */}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      
      {/* Open Graph ottimizzato */}
      <meta property="og:type" content={articleData ? 'article' : 'website'} />
      <meta property="og:title" content={title} /> {/* Usa il titolo completo */}
      <meta property="og:description" content={description} /> {/* CORRETTO: Usa la descrizione completa */}
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MUV Fitness" />
      <meta property="og:locale" content="it_IT" />
      
      {/* Twitter Card ottimizzato */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} /> {/* Usa il titolo completo */}
      <meta name="twitter:description" content={description} /> {/* CORRETTO: Usa la descrizione completa */}
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@muvfitness" />
      <meta name="twitter:creator" content="@muvfitness" />
      
      {/* ...resto del codice Helmet... */}
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
      
      {(structuredData || articleSchema) && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData || articleSchema)}
        </script>
      )}

      {/* ...resto del codice... */}
    </Helmet>
  );
};

export default SEOOptimizer;