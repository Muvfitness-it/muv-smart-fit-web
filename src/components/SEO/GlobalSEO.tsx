import React from 'react';
import { Helmet } from 'react-helmet';
import { BUSINESS_DATA } from '@/config/businessData';

const GlobalSEO = () => {
  return (
    <Helmet>
      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": BUSINESS_DATA.name,
          "url": BUSINESS_DATA.web.domain,
          "logo": BUSINESS_DATA.branding.logo,
          "description": BUSINESS_DATA.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": BUSINESS_DATA.address.street,
            "addressLocality": BUSINESS_DATA.address.city,
            "addressRegion": BUSINESS_DATA.address.region,
            "postalCode": BUSINESS_DATA.address.postalCode,
            "addressCountry": BUSINESS_DATA.address.countryCode
          },
          "telephone": BUSINESS_DATA.contact.phone,
          "email": BUSINESS_DATA.contact.email,
          "sameAs": [
            BUSINESS_DATA.social.facebook,
            BUSINESS_DATA.social.instagram
          ].filter(Boolean)
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