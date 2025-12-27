import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import PercorsiHero from '@/components/percorsi/PercorsiHero';
import GenderSelector, { Gender } from '@/components/percorsi/GenderSelector';
import PercorsiProblema from '@/components/percorsi/PercorsiProblema';
import PercorsiCards from '@/components/percorsi/PercorsiCards';
import PercorsiTestimonials from '@/components/percorsi/PercorsiTestimonials';
import PercorsiComparison from '@/components/percorsi/PercorsiComparison';
import PercorsiFAQ from '@/components/percorsi/PercorsiFAQ';
import PercorsiFinalCTA from '@/components/percorsi/PercorsiFinalCTA';
import { BUSINESS_DATA } from '@/config/businessData';
import { trackEvent } from '@/hooks/useGoogleAnalytics';

interface PercorsiProps {
  preselectedGender?: Gender;
}

// Structured Data for the page
const getPercorsiStructuredData = (gender?: Gender) => {
  const genderSuffix = gender === 'donna' ? ' Donna' : gender === 'uomo' ? ' Uomo' : '';
  
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `Percorsi Fitness Personalizzati${genderSuffix} | MUV Fitness Legnago`,
      "description": `Scegli tra 3 percorsi completi: START, TRASFORMAZIONE, ELITE. Tecnologie avanzate, personal trainer dedicato, risultati garantiti a Legnago.`,
      "url": `https://www.muvfitness.it/percorsi${gender ? `/${gender}` : ''}`,
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
      "name": `Percorsi Fitness MUV${genderSuffix}`,
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

const Percorsi: React.FC<PercorsiProps> = ({ preselectedGender }) => {
  const [searchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState<Gender>(preselectedGender || null);

  // Handle preselected gender from route or query params
  useEffect(() => {
    if (preselectedGender) {
      setSelectedGender(preselectedGender);
      // Track preselected gender from ADV campaign
      trackEvent('gender_preselected', {
        gender: preselectedGender,
        source: 'dedicated_route',
        page: `/percorsi/${preselectedGender}`,
        timestamp: new Date().toISOString()
      });
    } else {
      // Check for query param fallback
      const genderParam = searchParams.get('genere');
      if (genderParam === 'donna' || genderParam === 'uomo') {
        setSelectedGender(genderParam);
        trackEvent('gender_preselected', {
          gender: genderParam,
          source: 'query_param',
          page: '/percorsi',
          timestamp: new Date().toISOString()
        });
      }
    }
  }, [preselectedGender, searchParams]);

  const genderTitle = selectedGender === 'donna' 
    ? 'Percorsi Fitness Donna' 
    : selectedGender === 'uomo' 
      ? 'Percorsi Fitness Uomo' 
      : 'Percorsi Fitness Personalizzati';

  const genderDescription = selectedGender === 'donna'
    ? 'Percorsi fitness studiati per le esigenze femminili: tonificazione, silhouette, benessere. Tecnologie avanzate e personal trainer dedicato a Legnago.'
    : selectedGender === 'uomo'
      ? 'Percorsi fitness studiati per le esigenze maschili: definizione, forza, performance. Tecnologie avanzate e personal trainer dedicato a Legnago.'
      : 'Scegli tra 3 percorsi completi: START, TRASFORMAZIONE, ELITE. Tecnologie avanzate, personal trainer dedicato, risultati garantiti a Legnago.';

  return (
    <>
      <UnifiedSEOHead
        title={`${genderTitle} | MUV Fitness Legnago`}
        description={genderDescription}
        keywords="percorsi fitness Legnago, allenamento personalizzato, personal trainer Legnago, EMS training, Pilates Reformer, trasformazione corporea"
        canonicalUrl={`https://www.muvfitness.it/percorsi${selectedGender ? `/${selectedGender}` : ''}`}
        structuredData={getPercorsiStructuredData(selectedGender)}
      />
      
      <div className="min-h-screen">
        {/* Hero - Above the fold */}
        <PercorsiHero gender={selectedGender} />
        
        {/* Gender Selector - Show only if no preselection */}
        {!preselectedGender && (
          <GenderSelector 
            selectedGender={selectedGender} 
            onGenderSelect={setSelectedGender}
          />
        )}
        
        {/* Problem Section - Differentiated by gender */}
        <PercorsiProblema gender={selectedGender} />
        
        {/* Solution: S-M-L Cards - Core content with gender-specific messaging */}
        <PercorsiCards gender={selectedGender} />
        
        {/* Testimonials - Filtered by gender */}
        <PercorsiTestimonials gender={selectedGender} />
        
        {/* Comparison Table */}
        <PercorsiComparison />
        
        {/* FAQ Section */}
        <PercorsiFAQ />
        
        {/* Final CTA */}
        <PercorsiFinalCTA gender={selectedGender} />
      </div>
    </>
  );
};

export default Percorsi;
