import React from 'react';
import { Helmet } from 'react-helmet';

interface AdvancedSEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: Array<{name: string; url: string}>;
  noindex?: boolean;
}

const AdvancedSEO: React.FC<AdvancedSEOProps> = ({
  title,
  description,
  canonical,
  ogImage = 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  breadcrumbs,
  noindex = false
}) => {
  const siteUrl = 'https://www.muvfitness.it';
  const fullCanonical = canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Website SearchBox Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite", 
    "name": "MUV Fitness Legnago",
    "url": "https://www.muvfitness.it/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.muvfitness.it/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // LocalBusiness Schema (sempre presente)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": "https://www.muvfitness.it/#org",
    "name": "MUV Fitness Legnago",
    "image": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
    "telephone": "+39 351 338 0770",
    "email": "info@muvfitness.it",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Venti Settembre, 5/7",
      "addressLocality": "Legnago",
      "addressRegion": "VR", 
      "postalCode": "37045",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.1913,
      "longitude": 11.3043
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Legnago e Bassa Veronese"
    },
    "sameAs": [
      "https://www.facebook.com/MuvLegnago/",
      "https://www.instagram.com/MuvLegnago/"
    ],
    "url": "https://www.muvfitness.it/",
    "hasMap": "https://maps.google.com/?q=45.1913,11.3043"
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta */}
      <html lang="it" dir="ltr" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullCanonical} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="theme-color" content="#ffffff" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="preconnect" href="https://www.muvfitness.it" crossOrigin="" />
      
      {/* Hreflang self-referencing */}
      <link rel="alternate" hrefLang="it" href={fullCanonical} />
      
      {/* Feed Links */}
      <link rel="alternate" type="application/rss+xml" title="MUV Fitness Blog RSS" href="https://www.muvfitness.it/blog/rss.xml" />
      <link rel="alternate" type="application/atom+xml" title="MUV Fitness Blog Atom" href="https://www.muvfitness.it/blog/atom.xml" />
      
      {/* SEO Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="MUV Fitness Legnago" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* JSON-LD Schemas */}
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
};

export default AdvancedSEO;