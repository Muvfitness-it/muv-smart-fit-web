import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface UnifiedSEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>[];
  noindex?: boolean;
  hreflang?: Record<string, string>;
}

const UnifiedSEOHead: React.FC<UnifiedSEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  structuredData,
  noindex = false,
  hreflang = { 'it': 'it_IT' }
}) => {
  const location = useLocation();
  const fullCanonicalUrl = canonicalUrl || `https://www.muvfitness.it${location.pathname.replace(/\/$/, '') || '/'}`;
  
  // Ensure canonical URL uses www and https
  const normalizedCanonical = fullCanonicalUrl
    .replace(/^http:\/\//, 'https://')
    .replace(/^https:\/\/muvfitness\.it/, 'https://www.muvfitness.it');
  
  const robotsContent = noindex 
    ? 'noindex, nofollow' 
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={normalizedCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={normalizedCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="MUV Fitness" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* hreflang */}
      {Object.entries(hreflang).map(([lang, locale]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={normalizedCanonical} />
      ))}
      
      {/* Additional SEO optimizations */}
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="IT-VR" />
      <meta name="geo.placename" content="Legnago" />
      <meta name="geo.position" content="45.1927;11.3007" />
      <meta name="ICBM" content="45.1927, 11.3007" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Structured Data */}
      {structuredData && structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default UnifiedSEOHead;