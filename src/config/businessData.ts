/**
 * FONTE DI VERITÀ UNICA - Dati Business MUV Fitness
 * ⚠️ IMPORTANTE: Questo file contiene i dati ufficiali NAP (Name, Address, Phone)
 * Ogni modifica qui si propaga automaticamente a tutti gli schema markup del sito
 */

export const BUSINESS_DATA = {
  // === IDENTITÀ AZIENDALE ===
  name: "MUV Fitness Legnago",
  alternateName: "MUV Fitness",
  legalName: "MUV Fitness S.r.l.",
  slogan: "Fitness Intelligente",
  description: "Centro fitness boutique a Legnago (VR) specializzato in dimagrimento rapido, correzione posturale e riabilitazione funzionale mediante tecnologie certificate: EMS Training, Pilates Reformer, Vacuum Therapy, Sauna Infrarossi.",
  
  // === CONTATTI UFFICIALI (NAP) ===
  contact: {
    phone: "+39 329 107 0374",
    phoneDisplay: "329 107 0374",
    phoneInternational: "+393291070374",
    email: "info@muvfitness.it",
    whatsapp: "+393291070374",
    whatsappLink: "https://wa.me/393291070374"
  },
  
  // === INDIRIZZO COMPLETO (verificato Google Maps) ===
  address: {
    street: "Piazzetta Don Walter Soave, 2",
    city: "Legnago",
    province: "Verona",
    provinceCode: "VR",
    region: "Veneto",
    postalCode: "37045",
    country: "Italia",
    countryCode: "IT",
    fullAddress: "Piazzetta Don Walter Soave, 2, 37045 Legnago (VR), Italia"
  },
  
  // === COORDINATE GPS (precisione 4 decimali - verificate su Google Maps) ===
  geo: {
    latitude: 45.1914,
    longitude: 11.3065,
    // URL Google Maps con coordinate esatte
    googleMapsUrl: "https://maps.google.com/?q=45.1914,11.3065",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.234!2d11.3065!3d45.1914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDExJzI5LjAiTiAxMcKwMTgnMjMuNCJF!5e0!3m2!1sit!2sit!4v1234567890"
  },
  
  // === ORARI DI APERTURA (formato standardizzato) ===
  openingHours: {
    // Orari per schema markup (formato Schema.org)
    schemaFormat: [
      "Mo-Fr 08:00-21:00",
      "Sa 08:00-12:00"
    ],
    // Orari per display UI
    structured: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "21:00",
        displayDays: "Lunedì - Venerdì",
        displayHours: "8:00 - 21:00"
      },
      {
        days: ["Saturday"],
        opens: "08:00",
        closes: "12:00",
        displayDays: "Sabato",
        displayHours: "8:00 - 12:00"
      },
      {
        days: ["Sunday"],
        opens: null,
        closes: null,
        displayDays: "Domenica",
        displayHours: "Chiuso"
      }
    ]
  },
  
  // === SOCIAL MEDIA (URL verificati) ===
  social: {
    facebook: "https://www.facebook.com/MuvLegnago/",
    instagram: "https://www.instagram.com/MuvLegnago/",
    // Altri social (se disponibili in futuro)
    linkedin: null,
    youtube: null,
    tiktok: null
  },
  
  // === GOOGLE BUSINESS PROFILE ===
  google: {
    placeId: "ChIJM13JkjgTf0cR98DTc4p0qJA",
    businessProfileUrl: "https://g.page/r/CXKiWEQjMq5oEBM",
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJM13JkjgTf0cR98DTc4p0qJA"
  },
  
  // === BRAND ASSETS ===
  branding: {
    logo: "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png",
    logoAlt: "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
    ogImage: "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png",
    favicon: "/favicon.ico"
  },
  
  // === WEB & SEO ===
  web: {
    domain: "https://www.muvfitness.it",
    canonicalUrl: "https://www.muvfitness.it/",
    language: "it-IT",
    locale: "it_IT"
  },
  
  // === BUSINESS INFO ===
  business: {
    type: "HealthAndBeautyBusiness",
    foundingYear: "2020",
    employeeRange: "5-10",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    vatNumber: "05281920289",
  },
  
  // === ZONE SERVITE (per Local SEO) ===
  areasServed: [
    {
      type: "City",
      name: "Legnago",
      distance: "0 km",
      isPrimary: true
    },
    {
      type: "City",
      name: "Cerea",
      distance: "10 km",
      isPrimary: false
    },
    {
      type: "City",
      name: "Bovolone",
      distance: "15 km",
      isPrimary: false
    },
    {
      type: "City",
      name: "San Bonifacio",
      distance: "20 km",
      isPrimary: false
    },
    {
      type: "City",
      name: "Minerbe",
      distance: "12 km",
      isPrimary: false
    },
    {
      type: "City",
      name: "Castagnaro",
      distance: "8 km",
      isPrimary: false
    },
    {
      type: "City",
      name: "Angiari",
      distance: "9 km",
      isPrimary: false
    },
    {
      type: "Place",
      name: "Bassa Veronese",
      distance: "Area",
      isPrimary: false
    }
  ],
  
  // === SERVIZI PRINCIPALI ===
  services: [
    {
      id: "ems-training",
      name: "EMS Training - Dimagrimento Rapido",
      shortName: "EMS Training",
      description: "Elettrostimolazione muscolare integrale per perdita grasso accelerata e tonificazione completa in 20 minuti",
      url: "/servizi/ems-legnago/",
      category: "Fitness Technology"
    },
    {
      id: "pilates-reformer",
      name: "Pilates Reformer - Postura e Benessere",
      shortName: "Pilates Reformer",
      description: "Correzione posturale e riabilitazione mal di schiena su macchinari Reformer professionali",
      url: "/servizi/pilates-reformer-legnago/",
      category: "Postural Rehabilitation"
    },
    {
      id: "vacuum-pressoterapia",
      name: "Vacuum & Pressoterapia - Cellulite",
      shortName: "Vacuum Therapy",
      description: "Rimodellamento corporeo, riduzione cellulite e drenaggio linfatico con tecnologie mediche",
      url: "/servizi/cellulite-vacuum-pressoterapia-legnago/",
      category: "Body Shaping"
    },
    {
      id: "sauna-infrarossi",
      name: "Sauna Infrarossi - Detox & Recovery",
      shortName: "Sauna Infrarossi",
      description: "Detossificazione profonda, recupero muscolare e riduzione stress",
      url: "/servizi/sauna-infrarossi-legnago/",
      category: "Wellness & Recovery"
    },
    {
      id: "programma-over-60",
      name: "Programma Over 60 - Active Aging",
      shortName: "Over 60",
      description: "Protocolli specifici per mantenimento forza, equilibrio e autonomia",
      url: "/servizi/over-60-legnago/",
      category: "Senior Fitness"
    },
    {
      id: "personal-training",
      name: "Personal Training 1:1",
      shortName: "Personal Training",
      description: "Allenamento personalizzato con coach certificati per obiettivi specifici",
      url: "/servizi/personal-trainer-legnago/",
      category: "Personal Training"
    }
  ],
  
  // === KEYWORDS GEO (per ottimizzazione Local SEO) ===
  geoKeywords: {
    primary: [
      "muv fitness legnago",
      "palestra legnago",
      "personal trainer legnago",
      "ems legnago"
    ],
    secondary: [
      "pilates reformer legnago",
      "dimagrimento legnago",
      "mal di schiena legnago",
      "cellulite legnago",
      "fitness verona"
    ],
    longTail: [
      "dove allenarsi a legnago",
      "miglior palestra legnago",
      "centro fitness bassa veronese",
      "ems training vicino a me",
      "pilates reformer verona provincia"
    ]
  },
  
  // === FAQ GEO-LOCALIZZATE ===
  geoFAQs: [
    {
      question: "Dove si trova MUV Fitness a Legnago?",
      answer: "MUV Fitness si trova in Piazzetta Don Walter Soave, 2 a Legnago (VR), nel centro storico. A 5 minuti a piedi dalla stazione ferroviaria e a 300 metri da Piazza Libertà. Parcheggi disponibili nelle vie limitrofe."
    },
    {
      question: "MUV Fitness ha parcheggio?",
      answer: "Sono disponibili parcheggi gratuiti nelle vie limitrofe al centro (Via Matteotti, Via Frattini) e parcheggi a pagamento con strisce blu nel centro storico. In bicicletta, rastrelliere disponibili in Piazzetta Don Walter Soave."
    },
    {
      question: "Da quali zone arrivano i clienti MUV Fitness?",
      answer: "I nostri clienti provengono principalmente da Legnago e dalla Bassa Veronese: Cerea (10km), Bovolone (15km), San Bonifacio (20km), Minerbe, Castagnaro e Angiari. Alcuni arrivano anche da Verona città per le nostre tecnologie esclusive."
    },
    {
      question: "Quanto costa un abbonamento a MUV Fitness Legnago?",
      answer: "I costi variano in base al servizio e alla frequenza. Il pacchetto Starter parte da €99/mese (2 sessioni/settimana), il pacchetto Focus €149/mese (3 sessioni + nutrizione). Offriamo una prova gratuita di 90 minuti senza impegno. Contattaci per un preventivo personalizzato."
    },
    {
      question: "MUV Fitness è aperto anche il sabato?",
      answer: "Sì, siamo aperti dal lunedì al sabato. Orari: Lun-Ven 8:00-21:00, Sabato 8:00-12:00. Domenica chiuso. Prenota il tuo slot online o tramite WhatsApp al 329 107 0374."
    }
  ],
  
  // === PUNTI DI RIFERIMENTO (per indicazioni stradali) ===
  landmarks: [
    {
      name: "Stazione Ferroviaria di Legnago",
      distance: "5 minuti a piedi",
      direction: "400 metri verso il centro storico"
    },
    {
      name: "Piazza Libertà",
      distance: "300 metri",
      direction: "Nel cuore del centro storico"
    },
    {
      name: "Duomo di Legnago",
      distance: "200 metri",
      direction: "Adiacente alla piazzetta"
    },
    {
      name: "Municipio di Legnago",
      distance: "250 metri",
      direction: "Via XX Settembre"
    }
  ]
} as const;

// === UTILITY FUNCTIONS ===

/**
 * Ottieni schema LocalBusiness completo
 */
export const getLocalBusinessSchemaData = () => ({
  "@context": "https://schema.org",
  "@type": BUSINESS_DATA.business.type,
  "@id": `${BUSINESS_DATA.web.domain}/#organization`,
  "name": BUSINESS_DATA.name,
  "legalName": BUSINESS_DATA.legalName,
  "alternateName": BUSINESS_DATA.alternateName,
  "vatID": `IT${BUSINESS_DATA.business.vatNumber}`,
  "description": BUSINESS_DATA.description,
  "url": BUSINESS_DATA.web.domain,
  "telephone": BUSINESS_DATA.contact.phone,
  "email": BUSINESS_DATA.contact.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": BUSINESS_DATA.address.street,
    "addressLocality": BUSINESS_DATA.address.city,
    "addressRegion": BUSINESS_DATA.address.region,
    "postalCode": BUSINESS_DATA.address.postalCode,
    "addressCountry": BUSINESS_DATA.address.countryCode
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": BUSINESS_DATA.geo.latitude,
    "longitude": BUSINESS_DATA.geo.longitude
  },
  "openingHours": BUSINESS_DATA.openingHours.schemaFormat,
  "openingHoursSpecification": BUSINESS_DATA.openingHours.structured.filter(h => h.opens).map(hours => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": hours.days,
    "opens": hours.opens,
    "closes": hours.closes
  })),
  "priceRange": BUSINESS_DATA.business.priceRange,
  "currenciesAccepted": BUSINESS_DATA.business.currenciesAccepted,
  "paymentAccepted": BUSINESS_DATA.business.paymentAccepted,
  "image": [
    BUSINESS_DATA.branding.logo,
    BUSINESS_DATA.branding.logoAlt
  ],
  "logo": {
    "@type": "ImageObject",
    "url": BUSINESS_DATA.branding.logo,
    "width": 400,
    "height": 400
  },
  "sameAs": [
    BUSINESS_DATA.social.facebook,
    BUSINESS_DATA.social.instagram
  ].filter(Boolean),
  "areaServed": BUSINESS_DATA.areasServed.map(area => ({
    "@type": area.type,
    "name": area.name
  })),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servizi MUV Fitness Legnago",
    "itemListElement": BUSINESS_DATA.services.map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "url": `${BUSINESS_DATA.web.domain}${service.url}`
      }
    }))
  }
});

/**
 * Ottieni FAQ Schema per Local SEO
 */
export const getGeoFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": BUSINESS_DATA.geoFAQs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Ottieni schema Servizio specifico
 */
export const getServiceSchemaData = (serviceId: string) => {
  const service = BUSINESS_DATA.services.find(s => s.id === serviceId);
  if (!service) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${BUSINESS_DATA.web.domain}${service.url}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_DATA.name,
      "url": BUSINESS_DATA.web.domain,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BUSINESS_DATA.address.street,
        "addressLocality": BUSINESS_DATA.address.city,
        "addressRegion": BUSINESS_DATA.address.region,
        "postalCode": BUSINESS_DATA.address.postalCode,
        "addressCountry": BUSINESS_DATA.address.countryCode
      }
    },
    "areaServed": BUSINESS_DATA.areasServed.filter(a => a.isPrimary).map(area => ({
      "@type": area.type,
      "name": area.name
    })),
    "serviceType": service.category
  };
};
