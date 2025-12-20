import React from 'react';
import FunnelCTA from './FunnelCTA';
import { CheckCircle, Shield, Users } from 'lucide-react';

const FunnelHero: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Shield className="w-4 h-4" />
          <span>Centro Fitness Boutique a Legnago</span>
        </div>

        {/* Headline - Correzione #1: Niente tempo fisso */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Trasforma il tuo corpo con un{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            percorso guidato e personalizzato
          </span>
        </h1>

        {/* Sottotitolo */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
          Anche se hai poco tempo o hai già fallito altre palestre
        </p>

        {/* Value props */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>Consulenza gratuita</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Personal trainer dedicato</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Ambiente riservato</span>
          </div>
        </div>

        {/* CTA primaria */}
        <FunnelCTA 
          text="Scopri se il percorso è adatto a te"
          href="/funnel/qualifica"
        />

        {/* Micro-copy */}
        <p className="mt-6 text-sm text-muted-foreground">
          Rispondi a 5 semplici domande · Tempo: 2 minuti
        </p>
      </div>
    </section>
  );
};

export default FunnelHero;
