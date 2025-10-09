/**
 * Schema JSON-LD per LocalBusiness (MUV Fitness)
 * Da utilizzare su homepage e pagine principali
 */

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "MUV Fitness Legnago",
  "image": "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png",
  "description": "Centro fitness boutique a Legnago (VR) specializzato in dimagrimento rapido, correzione posturale e riabilitazione funzionale mediante tecnologie certificate: EMS Training, Pilates Reformer, Vacuum Therapy, Sauna Infrarossi.",
  "@id": "https://www.muvfitness.it/#organization",
  "url": "https://www.muvfitness.it",
  "telephone": "+39-YOUR-PHONE",
  "email": "info@muvfitness.it",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via [Indirizzo Completo]",
    "addressLocality": "Legnago",
    "addressRegion": "VR",
    "postalCode": "37045",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.1919,
    "longitude": 11.3047
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "€€",
  "sameAs": [
    "https://www.facebook.com/muvfitness",
    "https://www.instagram.com/muvfitness"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servizi MUV Fitness",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "EMS Training - Dimagrimento Rapido",
          "description": "Elettrostimolazione muscolare integrale per perdita grasso accelerata"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pilates Reformer - Postura e Benessere",
          "description": "Correzione posturale e riabilitazione mal di schiena"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vacuum & Pressoterapia - Cellulite",
          "description": "Rimodellamento corporeo e riduzione cellulite"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sauna Infrarossi - Detox & Recovery",
          "description": "Detossificazione profonda e recupero muscolare"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Programma Over 60 - Active Aging",
          "description": "Mantenimento forza, equilibrio e autonomia"
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
};
