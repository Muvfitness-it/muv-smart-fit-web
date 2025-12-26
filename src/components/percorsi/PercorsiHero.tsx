import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Phone } from 'lucide-react';
import { CONTACT_LINKS, STANDARD_CTAS } from '@/config/ctaConstants';

const PercorsiHero: React.FC = () => {
  const scrollToKits = () => {
    const element = document.getElementById('percorsi-cards');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-primary font-medium text-sm">Percorsi Personalizzati</span>
          </div>
          
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Scegli il <span className="text-primary">percorso giusto</span> per te
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            3 soluzioni complete per trasformare il tuo corpo con tecnologie avanzate, 
            personal trainer dedicato e risultati misurabili.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={scrollToKits}
              className="group w-full sm:w-auto"
            >
              Vedi i percorsi
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                {STANDARD_CTAS.primaryShort}
              </a>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">500+</span>
              <span>clienti soddisfatti</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">4.9/5</span>
              <span>su Google Reviews</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">95%</span>
              <span>raggiunge i propri obiettivi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PercorsiHero;
