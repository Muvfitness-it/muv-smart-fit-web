import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface ConsolidatedSEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  structuredData?: any;
  enableIndexing?: boolean;
}

const ConsolidatedSEO: React.FC<ConsolidatedSEOProps> = ({
  title,
  description,
  canonicalUrl,
  structuredData,
  enableIndexing = true
}) => {
  const location = useLocation();
  const currentUrl = `https://www.muvfitness.it${location.pathname}`;

  useEffect(() => {
    // IndexNow API for immediate indexing
    if (enableIndexing) {
      const submitToIndexNow = async () => {
        try {
          const indexNowPayload = {
            host: 'www.muvfitness.it',
            key: 'muv-fitness-index-key-2024',
            keyLocation: 'https://www.muvfitness.it/indexnow-key.txt',
            urlList: [currentUrl]
          };

          // Submit to IndexNow (Bing/Yandex)
          await fetch('https://api.indexnow.org/IndexNow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(indexNowPayload)
          }).catch(() => {}); // Ignore errors

          // Ping Google
          const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent('https://www.muvfitness.it/sitemap.xml')}`;
          fetch(googlePingUrl, { mode: 'no-cors' }).catch(() => {});
        } catch (error) {
          console.log('Indexing API calls completed (some may be blocked by CORS)');
        }
      };

      // Submit with delay to avoid overwhelming
      setTimeout(submitToIndexNow, 2000);
    }

    // Performance optimizations
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
      ];

      hints.forEach(({ rel, href }) => {
        if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = rel;
          link.href = href;
          document.head.appendChild(link);
        }
      });
    };

    addResourceHints();
  }, [currentUrl, enableIndexing]);

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MUV Fitness",
    "description": "Centro Fitness a Legnago con personal training, EMS, Pilates e servizi specializzati",
    "url": "https://www.muvfitness.it",
    "telephone": "+39 0442 1790080",
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
      "latitude": 45.1914,
      "longitude": 11.3065
    },
    "openingHours": [
      "Mo-Fr 08:00-21:00",
      "Sa 08:00-12:00"
    ],
    "sameAs": [
      "https://www.facebook.com/muvfitness",
      "https://www.instagram.com/muvfitness"
    ]
  };

  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Enhanced crawling directives */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="IT-VR" />
        <meta name="geo.placename" content="Legnago" />
        <meta name="geo.position" content="45.1914;11.3065" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="format-detection" content="telephone=yes,date=no,email=no,address=no" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData || defaultStructuredData)}
        </script>
      </Helmet>
    </>
  );
};

export default ConsolidatedSEO;