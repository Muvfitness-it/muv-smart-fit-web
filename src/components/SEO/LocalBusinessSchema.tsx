
import React from 'react';
import { Helmet } from 'react-helmet';

const LocalBusinessSchema: React.FC = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.muvfitness.it/#localbusiness",
    "name": "MUV Fitness",
    "description": "Centro fitness a Legnago specializzato in personal training, EMS, Pilates, HIIT e nutrizione. Trasforma il tuo corpo in 30 giorni.",
    "url": "https://www.muvfitness.it",
    "telephone": "+39 3513380770",
    "email": "info@muvfitness.it",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Venti Settembre, 5/7",
      "addressLocality": "Legnago",
      "addressRegion": "Veneto",
      "postalCode": "37045",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.1919,
      "longitude": 11.3058
    },
    "openingHours": [
      "Mo-Fr 08:00-21:00",
      "Sa 08:00-12:00"
    ],
    "priceRange": "€€",
    "image": [
      "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
      "width": 400,
      "height": 400
    },
    "sameAs": [
      "https://www.facebook.com/MuvLegnago/",
      "https://www.instagram.com/MuvLegnago/"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.1919,
        "longitude": 11.3058
      },
      "geoRadius": "25000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Personal Training",
          "description": "Allenamento personalizzato con trainer certificati"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "EMS Training",
          "description": "Elettrostimolazione muscolare per risultati rapidi"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pilates",
          "description": "Corsi di Pilates per migliorare postura e flessibilità"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Consulenza Nutrizionale",
          "description": "Piani alimentari personalizzati per raggiungere i tuoi obiettivi"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Marco R."
        },
        "reviewBody": "Ottimo centro fitness, staff qualificato e risultati garantiti. Consiglio vivamente!"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.muvfitness.it/#organization",
    "name": "MUV Fitness",
    "url": "https://www.muvfitness.it",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
      "width": 400,
      "height": 400
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+39 3513380770",
        "contactType": "customer service",
        "email": "info@muvfitness.it",
        "areaServed": "IT",
        "availableLanguage": ["Italian", "English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Venti Settembre, 5/7",
      "addressLocality": "Legnago",
      "addressRegion": "Veneto",
      "postalCode": "37045",
      "addressCountry": "IT"
    },
    "sameAs": [
      "https://www.facebook.com/MuvLegnago/",
      "https://www.instagram.com/MuvLegnago/"
    ]
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
