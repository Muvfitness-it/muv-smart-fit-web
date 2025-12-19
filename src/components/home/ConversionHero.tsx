import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';

const ConversionHero = () => {
  const badges = [
    "Prima valutazione gratuita",
    "Zero impegno",
    "Risultati in 4 settimane"
  ];

  const scrollToForm = () => {
    const formSection = document.getElementById('prenota-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Centro Fitness Boutique a Legnago
          </div>
          
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Perdi 4-8kg in 8 settimane
            <span className="block text-primary">senza palestra affollata</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sessioni da 20 minuti con tecnologia EMS. Niente attese, niente sguardi. 
            Solo risultati misurabili nel centro fitness più riservato di Legnago.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={scrollToForm}
            >
              Prenota la tua prova gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              asChild
            >
              <a 
                href="https://wa.me/393291070374?text=Ciao,%20vorrei%20prenotare%20una%20prova%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Scrivici su WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionHero;
