import React from 'react';
import { Check, X } from 'lucide-react';

const FunnelTargetAudience: React.FC = () => {
  const forYou = [
    'Adulti 25-60 anni che cercano risultati concreti',
    'Chi ha poco tempo ma vuole allenarsi in modo efficace',
    'Chi preferisce un ambiente riservato e professionale',
    'Chi desidera essere seguito passo passo',
    'Chi ha già provato palestre senza successo',
  ];

  const notForYou = [
    'Chi cerca una palestra low-cost con accesso libero',
    'Chi vuole allenarsi in totale autonomia',
    'Chi non è disposto a seguire un percorso strutturato',
    'Chi cerca risultati miracolosi senza impegno',
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            MUV è il percorso giusto per te?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Siamo selettivi perché vogliamo garantire risultati reali. Scopri se possiamo aiutarti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Per chi è */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border-2 border-primary/20 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Per chi è MUV</h3>
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
              <h3 className="text-xl font-bold text-muted-foreground">Per chi NON è MUV</h3>
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
      </div>
    </section>
  );
};

export default FunnelTargetAudience;
