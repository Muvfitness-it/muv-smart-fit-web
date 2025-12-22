import { UnifiedContactForm } from '@/features/forms';
import { Phone, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FinalCTASection = () => {
  return (
    <section id="contatto" className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-white">
            Hai una domanda veloce? Lasciaci i tuoi dati.
          </h2>
          <p className="text-lg text-center mb-2 text-white/90">
            Se vuoi una prima informazione o capire se possiamo aiutarti, scrivici qui.
            <br />Ti ricontattiamo noi, senza impegno.
          </p>
          <p className="text-sm text-center mb-8 text-white/70 italic">
            (Per un percorso personalizzato completo, ti consigliamo la consulenza in studio.)
          </p>
          
          {/* Form intro */}
          <p className="text-center text-white/80 text-sm mb-4">
            Compila il modulo con i tuoi dati essenziali.<br />
            Un nostro consulente ti contatterà per darti le prime indicazioni.
          </p>
          
          <UnifiedContactForm
            campaign="Homepage Contatto Veloce"
            source="homepage-contatto-veloce"
            showMessage={true}
            showObjective={false}
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
          
          {/* Orientamento funnel */}
          <div className="mt-10 pt-8 border-t border-white/20 text-center">
            <p className="text-white/90 mb-4">
              Vuoi un'analisi personalizzata e capire quale percorso è più adatto a te?
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              asChild
            >
              <Link to="/funnel">
                👉 Prenota la consulenza conoscitiva in studio
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
