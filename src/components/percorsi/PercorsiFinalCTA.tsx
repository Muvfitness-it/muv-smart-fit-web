import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { CONTACT_LINKS, WHATSAPP_MESSAGES } from '@/config/ctaConstants';
import { BUSINESS_DATA } from '@/config/businessData';
import { Gender } from './GenderSelector';

interface PercorsiFinalCTAProps {
  gender?: Gender;
}

const PercorsiFinalCTA: React.FC<PercorsiFinalCTAProps> = ({ gender }) => {
  const getHeadline = () => {
    if (gender === 'donna') {
      return 'Inizia il tuo percorso di benessere';
    }
    if (gender === 'uomo') {
      return 'Inizia il tuo percorso di forza';
    }
    return 'Inizia il tuo percorso di trasformazione';
  };

  const getWhatsAppMessage = () => {
    if (gender === 'donna') {
      return 'Ciao! Sono interessata ai Percorsi Donna. Vorrei prenotare una consulenza gratuita.';
    }
    if (gender === 'uomo') {
      return 'Ciao! Sono interessato ai Percorsi Uomo. Vorrei prenotare una consulenza gratuita.';
    }
    return WHATSAPP_MESSAGES.consultation;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {getHeadline()}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Prenota una consulenza gratuita e scopri quale percorso è perfetto per te. 
            Nessun impegno, solo una chiacchierata per capire come possiamo aiutarti.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button 
              size="lg"
              className="group w-full sm:w-auto text-base"
              asChild
            >
              <a 
                href={CONTACT_LINKS.whatsappWithMessage(getWhatsAppMessage())} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Prenota la consulenza
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto text-base"
              asChild
            >
              <a href={CONTACT_LINKS.phone}>
                <Phone className="mr-2 h-5 w-5" />
                Chiamaci
              </a>
            </Button>
          </div>
          
          {/* Trust/Urgency */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Risposta entro 2 ore</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{BUSINESS_DATA.address.street}, {BUSINESS_DATA.address.city}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PercorsiFinalCTA;
