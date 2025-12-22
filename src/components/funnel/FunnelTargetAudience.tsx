import React from 'react';
import { Check, X } from 'lucide-react';
import FunnelCTA from './FunnelCTA';

const FunnelTargetAudience: React.FC = () => {
  const forYou = [
    'Vuole risultati concreti',
    'Vuole essere seguito',
    'Ha poco tempo',
    'Cerca privacy e qualità',
  ];

  const notForYou = [
    'Cerca palestra low-cost',
    'Vuole allenarsi da solo',
    'Non vuole un metodo',
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questo percorso è adatto a te se…
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Per chi è */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border-2 border-primary/20 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Per chi è</h3>
            </div>
            <ul className="space-y-4">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Per chi NON è */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <X className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-muted-foreground">Per chi NON è</h3>
            </div>
            <ul className="space-y-4">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA intermedia */}
        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-medium mb-6">
            👉 Se ti riconosci nella prima colonna, continua.
          </p>
          <FunnelCTA 
            text="Scopri se MUV è adatto a te"
            href="/funnel/qualifica"
          />
        </div>
      </div>
    </section>
  );
};

export default FunnelTargetAudience;
