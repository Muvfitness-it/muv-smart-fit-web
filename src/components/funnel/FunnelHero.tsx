import React from "react";
import FunnelCTA from "./FunnelCTA";
import { CheckCircle } from "lucide-react";

const FunnelHero: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Trasforma il tuo corpo con un{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            percorso guidato e personalizzato.
          </span>
        </h1>

        {/* Sottotitolo */}
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-3xl mx-auto">
          Anche se hai poco tempo o hai già fallito in altre palestre.
        </p>

        {/* Descrizione */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
          Non siamo una palestra tradizionale. Siamo un Centro Fitness Boutique che lavora su obiettivi reali attraverso
          tecnologie avanzate, personal training e consulenza dedicata.
        </p>

        {/* CTA primaria */}
        <FunnelCTA text="Scopri se il percorso è adatto a te" href="/funnel/qualifica" />

        {/* Micro-trust */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Consulenza conoscitiva gratuita</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Ambiente riservato · massimo 3 nuovi clienti a settimana</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelHero;
