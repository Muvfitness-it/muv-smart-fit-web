import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';
import { trackEvent } from '@/hooks/useGoogleAnalytics';

interface PercorsiIntermediateCTAProps {
  gender?: 'donna' | 'uomo' | null;
  variant?: 'primary' | 'secondary';
}

const ctaContent = {
  donna: {
    headline: "Pronta a vedere la differenza?",
    subtext: "Scopri come centinaia di donne hanno trasformato il loro corpo con il metodo MUV",
    buttonText: "Prenota la tua consulenza gratuita",
    highlight: "Solo 3 posti disponibili questa settimana"
  },
  uomo: {
    headline: "Pronto a ottenere risultati veri?",
    subtext: "Scopri come centinaia di uomini hanno raggiunto la forma migliore della loro vita",
    buttonText: "Prenota la tua consulenza gratuita",
    highlight: "Solo 3 posti disponibili questa settimana"
  },
  neutral: {
    headline: "Pronto/a a iniziare il tuo percorso?",
    subtext: "Scopri come centinaia di persone hanno trasformato il loro corpo con il metodo MUV",
    buttonText: "Prenota la tua consulenza gratuita",
    highlight: "Solo 3 posti disponibili questa settimana"
  }
};

const PercorsiIntermediateCTA: React.FC<PercorsiIntermediateCTAProps> = ({ 
  gender, 
  variant = 'primary' 
}) => {
  const content = gender ? ctaContent[gender] : ctaContent.neutral;

  const handleCTAClick = () => {
    trackEvent('intermediate_cta_click', {
      gender: gender || 'neutral',
      variant,
      timestamp: new Date().toISOString()
    });
    
    const message = gender === 'donna' 
      ? "Ciao! Ho visto i percorsi donna e vorrei prenotare una consulenza gratuita."
      : gender === 'uomo'
        ? "Ciao! Ho visto i percorsi uomo e vorrei prenotare una consulenza gratuita."
        : "Ciao! Ho visto i percorsi e vorrei prenotare una consulenza gratuita.";
    
    window.open(
      `https://wa.me/${BUSINESS_DATA.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const isPrimary = variant === 'primary';

  return (
    <section className={`py-12 md:py-16 ${isPrimary ? 'bg-primary/5' : 'bg-muted/30'}`}>
      <div className="container mx-auto px-4">
        <div className={`
          max-w-3xl mx-auto text-center p-8 md:p-10 rounded-2xl
          ${isPrimary 
            ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20' 
            : 'bg-background border border-border'
          }
        `}>
          {/* Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>{content.highlight}</span>
          </div>
          
          {/* Headline */}
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {content.headline}
          </h3>
          
          {/* Subtext */}
          <p className="text-muted-foreground text-lg mb-6">
            {content.subtext}
          </p>
          
          {/* CTA Button */}
          <Button 
            size="lg"
            onClick={handleCTAClick}
            className="group hover-scale"
          >
            {content.buttonText}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PercorsiIntermediateCTA;
