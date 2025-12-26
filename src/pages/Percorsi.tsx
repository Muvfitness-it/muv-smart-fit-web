import React from 'react';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import PercorsiHero from '@/components/percorsi/PercorsiHero';
import PercorsiProblema from '@/components/percorsi/PercorsiProblema';
import PercorsiCards from '@/components/percorsi/PercorsiCards';
import PercorsiComparison from '@/components/percorsi/PercorsiComparison';
import PercorsiFAQ from '@/components/percorsi/PercorsiFAQ';
import PercorsiFinalCTA from '@/components/percorsi/PercorsiFinalCTA';
import { BUSINESS_DATA } from '@/config/businessData';

// Structured Data for the page
const getPercorsiStructuredData = () => {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Percorsi Fitness Personalizzati | MUV Fitness Legnago",
      "description": "Scegli tra 3 percorsi completi: START, TRASFORMAZIONE, ELITE. Tecnologie avanzate, personal trainer dedicato, risultati garantiti a Legnago.",
      "url": "https://www.muvfitness.it/percorsi",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_DATA.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_DATA.address.street,
          "addressLocality": BUSINESS_DATA.address.city,
          "postalCode": BUSINESS_DATA.address.postalCode,
          "addressRegion": BUSINESS_DATA.address.province,
          "addressCountry": "IT"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Percorsi Fitness MUV",
      "description": "I nostri percorsi di trasformazione personalizzati",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Percorso START",
          "description": "Il primo passo verso il cambiamento. Ideale per chi vuole provare il metodo MUV."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Percorso TRASFORMAZIONE",
          "description": "Risultati visibili e duraturi. Il percorso più scelto dai nostri clienti."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Percorso ELITE",
          "description": "Trasformazione completa, zero compromessi. Il massimo risultato con supporto premium."
        }
      ]
    }
  ];
};

const Percorsi: React.FC = () => {
  return (
    <>
      <UnifiedSEOHead
        title="Percorsi Fitness Personalizzati | MUV Fitness Legnago"
        description="Scegli tra 3 percorsi completi: START, TRASFORMAZIONE, ELITE. Tecnologie avanzate, personal trainer dedicato, risultati garantiti a Legnago."
        keywords="percorsi fitness Legnago, allenamento personalizzato, personal trainer Legnago, EMS training, Pilates Reformer, trasformazione corporea"
        canonicalUrl="https://www.muvfitness.it/percorsi"
        structuredData={getPercorsiStructuredData()}
      />
      
      <div className="min-h-screen">
        {/* Hero - Above the fold */}
        <PercorsiHero />
        
        {/* Problem Section */}
        <PercorsiProblema />
        
        {/* Solution: S-M-L Cards - Core content */}
        <PercorsiCards />
        
        {/* Comparison Table */}
        <PercorsiComparison />
        
        {/* FAQ Section */}
        <PercorsiFAQ />
        
        {/* Final CTA */}
        <PercorsiFinalCTA />
      </div>
    </>
  );
};

export default Percorsi;
