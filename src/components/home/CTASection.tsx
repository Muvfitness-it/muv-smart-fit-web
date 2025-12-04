import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-heading text-foreground">
          Pronto a iniziare il tuo percorso?
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Ogni grande trasformazione inizia con una decisione. 
          <span className="text-primary font-semibold"> Oggi</span> può essere il giorno in cui inizi a costruire la versione migliore di te.
        </p>
        
        <div className="bg-primary/10 p-8 rounded-2xl border border-primary/20 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Consulenza gratuita senza impegno
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            <strong className="text-foreground">Vieni a conoscerci.</strong> 
            {" "}Valutazione completa inclusa.{" "}
            <strong className="text-secondary">Se non ti convince, nessun problema.</strong>
          </p>
          <p className="text-primary font-semibold text-lg">
            Zero impegni • Percorso personalizzato • Attenzione 1-to-1
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/form-contatti" 
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Prenota la tua consulenza
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-primary/10 transition-colors"
          >
            Scopri il nostro blog
          </Link>
        </div>
        
        <p className="text-sm md:text-base text-muted-foreground mt-6">
          Posti limitati per garantire attenzione personalizzata a ogni cliente
        </p>
      </div>
    </section>
  );
};

export default CTASection;
