import { UnifiedContactForm } from '@/features/forms';
import { Phone, MessageCircle, ArrowRight, Check, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UrgencyBanner = () => {
  const [spotsLeft] = useState(3);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // Calculate days until end of week (Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    setDaysLeft(daysUntilSunday);
  }, []);

  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/30 animate-pulse-slow">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="text-white font-bold text-sm md:text-base">
            OFFERTA LIMITATA
          </span>
        </div>
        <div className="h-4 w-px bg-white/30 hidden sm:block" />
        <div className="flex items-center gap-4 text-white/90 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-primary text-lg">{spotsLeft}</span> 
            posti questa settimana
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {daysLeft === 0 ? 'Ultimo giorno!' : `${daysLeft} giorni rimasti`}
          </span>
        </div>
      </div>
      <p className="text-center text-white/80 text-xs mt-2">
        ✨ Consulenza + Prova Gratuita per i nuovi iscritti
      </p>
    </div>
  );
};

const FinalCTASection = () => {
  return (
    <section id="contatto" className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          {/* Urgency Banner */}
          <UrgencyBanner />

          {/* Header Form */}
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-white">
            Hai una domanda veloce?
          </h3>
          <p className="text-base text-center mb-8 text-white/90">
            Compila il modulo, ti ricontattiamo noi senza impegno.
          </p>
          
          <UnifiedContactForm
            campaign="Homepage Contatto Veloce"
            source="homepage-contatto-veloce"
            showMessage={true}
            showObjective={false}
            submitText="Richiedi informazioni"
            className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
          />
          
          {/* Micro-copy sotto form */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {["Nessun impegno", "Risposta rapida", "Dati protetti"].map((text, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                <Check className="w-4 h-4 text-white" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          
          {/* Link a tutti i percorsi */}
          <div className="mt-10 pt-8 border-t border-white/20 text-center">
            <p className="text-white/90 mb-4">
              Vuoi esplorare tutti i nostri servizi e tecnologie?
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              asChild
            >
              <Link to="/percorsi">
                Scopri tutti i percorsi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          
          {/* Alternative contact */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm mb-4">Preferisci contattarci direttamente?</p>
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
                  href="https://wa.me/393291070374?text=Ciao,%20vorrei%20informazioni%20su%20MUV%20Fitness"
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
