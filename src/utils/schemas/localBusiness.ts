/**
 * Schema JSON-LD per LocalBusiness (MUV Fitness) - GEO Optimized
 */

import { BUSINESS_DATA } from '@/config/businessData';

export const getGEOLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "@id": "https://www.muvfitness.it/#healthclub",
  "name": "MUV Fitness Legnago",
  "alternateName": "MUV Fitness - Centro Fitness Intelligente",
  "description": "Centro fitness intelligente a Legnago specializzato in EMS Training, Vacuum Therapy, Pilates Reformer e programmi personalizzati per dimagrimento e postura",
  "url": "https://www.muvfitness.it",
  "telephone": BUSINESS_DATA.contact.phone,
  "email": BUSINESS_DATA.contact.email,
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": BUSINESS_DATA.address.street,
    "addressLocality": "Legnago",
    "addressRegion": "Verona",
    "postalCode": "37045",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.1900",
    "longitude": "11.3080"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:30",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    BUSINESS_DATA.social.facebook,
    BUSINESS_DATA.social.instagram
  ].filter(Boolean),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servizi MUV Fitness",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "EMS Training",
          "description": "Allenamento con elettrostimolazione muscolare per dimagrimento rapido"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vacuum Therapy",
          "description": "Trattamento anticellulite e rimodellamento corporeo"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pilates Reformer",
          "description": "Ginnastica posturale per mal di schiena e postura corretta"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Personal Training",
          "description": "Allenamento personalizzato con personal trainer certificati"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sauna Infrarossi",
          "description": "Detox e recupero muscolare con sauna a infrarossi"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
});
