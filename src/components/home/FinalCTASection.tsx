import { UnifiedContactForm } from '@/features/forms';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FinalCTASection = () => {
  return (
    <section id="prenota-form" className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-white">
            Prenota la Tua Prova Gratuita
          </h2>
          <p className="text-lg text-center mb-8 text-white/90">
            90 minuti di valutazione completa. Zero impegno, massima trasparenza.
          </p>
          
          <UnifiedContactForm
            campaign="Homepage CTA"
            source="homepage-final-cta"
            showMessage={false}
            showObjective={true}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
          />
          
          {/* Alternative contact */}
          <div className="mt-8 text-center">
            <p className="text-white/80 text-sm mb-4">Preferisci contattarci direttamente?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <a href="tel:+393291070374">
                  <Phone className="mr-2 w-4 h-4" />
                  329 107 0374
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="bg-green-600/90 border-green-500 text-white hover:bg-green-600"
                asChild
              >
                <a 
                  href="https://wa.me/393291070374?text=Ciao,%20vorrei%20prenotare%20una%20prova%20gratuita"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
