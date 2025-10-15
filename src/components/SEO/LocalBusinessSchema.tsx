import React from 'react';
import { Helmet } from 'react-helmet';
import { getGEOLocalBusinessSchema } from '@/utils/schemas/localBusiness';
import { BUSINESS_DATA } from '@/config/businessData';

/**
 * Componente LocalBusinessSchema - GEO Optimized
 * Schema markup ottimizzato per motori generativi
 */
const LocalBusinessSchema: React.FC = () => {
  const localBusinessSchema = getGEOLocalBusinessSchema();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BUSINESS_DATA.web.domain}/#organization`,
    "name": BUSINESS_DATA.name,
    "url": BUSINESS_DATA.web.domain,
    "logo": {
      "@type": "ImageObject",
      "url": BUSINESS_DATA.branding.logo,
      "width": 400,
      "height": 400
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": BUSINESS_DATA.contact.phone,
        "contactType": "customer service",
        "email": BUSINESS_DATA.contact.email,
        "areaServed": BUSINESS_DATA.address.countryCode,
        "availableLanguage": ["Italian", "English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_DATA.address.street,
      "addressLocality": BUSINESS_DATA.address.city,
      "addressRegion": BUSINESS_DATA.address.region,
      "postalCode": BUSINESS_DATA.address.postalCode,
      "addressCountry": BUSINESS_DATA.address.countryCode
    },
    "sameAs": [
      BUSINESS_DATA.social.facebook,
      BUSINESS_DATA.social.instagram
    ].filter(Boolean)
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
