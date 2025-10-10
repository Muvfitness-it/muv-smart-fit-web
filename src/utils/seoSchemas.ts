// Comprehensive structured data schemas for MUV Fitness

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.muvfitness.it/#localbusiness",
  "name": "MUV Fitness",
  "alternateName": "MUV Fitness Legnago",
  "description": "Centro fitness intelligente a Legnago specializzato in EMS, Personal Training, Pilates Reformer, Pancafit, Massoterapia e Nutrizione. Risultati garantiti in 30 giorni.",
  "url": "https://www.muvfitness.it",
  "logo": "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png",
  "image": [
    "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
    "https://www.muvfitness.it/lovable-uploads/29b9c5b1-c958-454c-9d7f-5d1c1b4f38ff.png"
  ],
  "telephone": "+39 329 107 0374",
  "email": "info@muvfitness.it",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Piazzetta Don Walter Soave, 2",
    "addressLocality": "Legnago",
    "addressRegion": "Veneto",
    "postalCode": "37045",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.1927,
    "longitude": 11.3007
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "21:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "areaServed": [
    {
      "@type": "City",
      "name": "Legnago"
    },
    {
      "@type": "City", 
      "name": "Bovolone"
    },
    {
      "@type": "City",
      "name": "Cerea"
    },
    {
      "@type": "City",
      "name": "San Bonifacio"
    }
  ],
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
          "name": "EMS Training",
          "description": "Elettrostimolazione per dimagrimento e tonificazione in 20 minuti"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Personal Training",
          "description": "Allenamento personalizzato 1:1 con coach certificato"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pilates Reformer",
          "description": "Pilates su macchinari per core stability e postura"
        }
      }
    ]
  }
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.muvfitness.it/#organization",
  "name": "MUV Fitness",
  "url": "https://www.muvfitness.it",
  "logo": "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png",
  "description": "Centro fitness intelligente con tecnologie avanzate per il benessere completo",
  "foundingDate": "2020",
  "numberOfEmployees": "5-10",
  "slogan": "Fitness Intelligente",
  "knowsAbout": [
    "Fitness",
    "Personal Training", 
    "EMS Training",
    "Pilates",
    "Nutrizione",
    "Massoterapia",
    "Wellness"
  ]
});

export const getServiceSchema = (serviceName: string, serviceDescription: string, serviceUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": serviceDescription,
  "url": serviceUrl,
  "provider": {
    "@type": "LocalBusiness",
    "name": "MUV Fitness",
    "url": "https://www.muvfitness.it"
  },
  "areaServed": {
    "@type": "City",
    "name": "Legnago",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Verona"
    }
  },
  "serviceType": "Fitness Service",
  "category": "Health and Fitness"
});

export const getFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.muvfitness.it/#website",
  "name": "MUV Fitness",
  "url": "https://www.muvfitness.it",
  "description": "Centro fitness intelligente a Legnago",
  "publisher": {
    "@id": "https://www.muvfitness.it/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.muvfitness.it/blog?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "it-IT"
});