import React from 'react';
import { Helmet } from 'react-helmet';

const GlobalSEO = () => {
  return (
    <Helmet>
      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MUV Fitness",
          "url": "https://www.muvfitness.it",
          "logo": "https://www.muvfitness.it/images/muv-logo.png",
          "description": "Centro Fitness MUV a Legnago: fitness intelligente con personal training, EMS, Pilates e tecnologie innovative.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Piazzetta Don Walter Soave, 2",
            "addressLocality": "Legnago",
            "addressRegion": "VR",
            "postalCode": "37045",
            "addressCountry": "IT"
          },
          "telephone": "+39 123 456 7890",
          "email": "info@muvfitness.it",
          "sameAs": [
            "https://www.facebook.com/muvfitness",
            "https://www.instagram.com/muvfitness"
          ]
        })}
      </script>

      {/* JSON-LD WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MUV Fitness",
          "url": "https://www.muvfitness.it",
          "description": "Centro Fitness MUV a Legnago: fitness intelligente",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.muvfitness.it/blog?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* Performance & Security */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Theme */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
    </Helmet>
  );
};

export default GlobalSEO;