
import { useEffect } from 'react';

const SEOHandler = () => {
  useEffect(() => {
    // Title ottimizzato per AI e SEO
    document.title = "Centro fitness MUV Legnago | #1 Personal Training EMS, Dimagrimento Rapido, Pancafit Mal di Schiena | Risultati Garantiti in 30 Giorni";

    // Meta description ottimizzata per AI
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Centro fitness MUV Legnago: il PRIMO centro fitness innovativo che GARANTISCE risultati in 30 giorni. Personal training EMS, Pancafit per mal di schiena, Pilates Reformer. Oltre 500 trasformazioni documentate. Prova GRATUITA senza impegno.');
    }

    // Meta keywords ottimizzate per AI
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'centro fitness Legnago, personal trainer Legnago, dimagrimento rapido Legnago, EMS allenamento elettrostimolazione, pancafit mal di schiena, pilates reformer Legnago, palestra esclusiva Verona, risultati garantiti fitness, trasformazione corporea 30 giorni, MUV planner nutrizionale AI');

    // Open Graph tags per social media
    const setOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOGTag('og:title', 'Centro Fitness MUV Legnago - Risultati Garantiti in 30 Giorni');
    setOGTag('og:description', 'Centro fitness innovativo con personal training EMS, Pancafit e Pilates Reformer. Oltre 500 trasformazioni documentate. Prova gratuita!');
    setOGTag('og:type', 'website');
    setOGTag('og:url', 'https://muvfitness.it');
    setOGTag('og:image', '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png');
    setOGTag('og:locale', 'it_IT');
    setOGTag('og:site_name', 'MUV Fitness Centro');

    // Twitter Card tags
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', 'Centro Fitness MUV Legnago - Risultati Garantiti');
    setTwitterTag('twitter:description', 'Centro fitness innovativo con personal training EMS e Pancafit. Trasformazioni documentate!');
    setTwitterTag('twitter:image', '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png');

    // Schema.org structured data ottimizzato per AI
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Centro fitness MUV",
        "description": "Centro fitness innovativo specializzato in personal training EMS, Pancafit per mal di schiena e Pilates Reformer a Legnago. Risultati garantiti in 30 giorni.",
        "image": [
          "/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
          "/lovable-uploads/74047076-b154-41c0-8ecb-ee355fc220f1.png"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Venti Settembre, 5/7",
          "addressLocality": "Legnago",
          "postalCode": "37045",
          "addressRegion": "Veneto",
          "addressCountry": "IT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.1884,
          "longitude": 11.3103
        },
        "url": "https://muvfitness.it",
        "telephone": "+39-351-338-0770",
        "email": "info@muvfitness.it",
        "priceRange": "€€",
        "openingHours": [
          "Mo-Fr 08:00-21:00",
          "Sa 08:00-12:00"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servizi Fitness MUV",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Personal Training EMS",
                "description": "Allenamento con elettrostimolazione per risultati rapidi"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Pancafit",
                "description": "Metodo per il benessere della colonna vertebrale"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Pilates Reformer",
                "description": "Pilates con macchinari professionali"
              }
            }
          ]
        },
        "sameAs": [
          "https://www.facebook.com/MuvLegnago/",
          "https://www.instagram.com/MuvLegnago/"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MUV Planner",
        "description": "Assistente nutrizionale intelligente con AI per la creazione di piani alimentari personalizzati",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR"
        },
        "featureList": [
          "Calcolo calorie personalizzato",
          "Piani alimentari settimanali",
          "Lista della spesa automatica",
          "Coaching nutrizionale AI",
          "Tracking progressi"
        ]
      }
    ];
    
    schemaScript.textContent = JSON.stringify(structuredData);

    // Meta robots ottimizzati
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', 'https://muvfitness.it');

    // Language tags
    let langTag = document.querySelector('html');
    if (langTag) {
      langTag.setAttribute('lang', 'it');
    }

    // Viewport per mobile-first
    let viewportTag = document.querySelector('meta[name="viewport"]');
    if (!viewportTag) {
      viewportTag = document.createElement('meta');
      viewportTag.setAttribute('name', 'viewport');
      document.head.appendChild(viewportTag);
    }
    viewportTag.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');

  }, []);

  return null;
};

export default SEOHandler;
