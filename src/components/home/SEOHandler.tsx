
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
    metaKeywords.setAttribute('content', 'centro fitness Legnago, personal trainer Legnago, dimagrimento rapido Legnago, EMS allenamento elettrostimolazione, pancafit mal di schiena, pilates reformer Legnago, palestra esclusiva Verona, risultati garantiti fitness, trasformazione corporea 30 giorni');

    // Schema.org structured data per AI
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Centro fitness MUV",
      "description": "Centro fitness innovativo specializzato in personal training, EMS, Pancafit e Pilates Reformer a Legnago",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Legnago",
        "addressRegion": "Veneto",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.1884,
        "longitude": 11.3103
      },
      "url": "https://muvfitness.it",
      "telephone": "+39-XXX-XXXXXXX",
      "priceRange": "€€",
      "openingHours": "Mo-Fr 06:00-22:00, Sa-Su 08:00-20:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      }
    });
  }, []);

  return null;
};

export default SEOHandler;
