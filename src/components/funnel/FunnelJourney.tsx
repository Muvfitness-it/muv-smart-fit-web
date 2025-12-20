import React from 'react';
import { MessageSquare, ClipboardCheck, TrendingUp } from 'lucide-react';
import FunnelCTA from './FunnelCTA';

const FunnelJourney: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      step: '01',
      title: 'Consulenza conoscitiva',
      description: 'Incontriamoci per capire i tuoi obiettivi, la tua storia e le tue esigenze. Nessun impegno.',
    },
    {
      icon: ClipboardCheck,
      step: '02',
      title: 'Piano personalizzato',
      description: 'Creiamo insieme un percorso su misura, con le tecnologie più adatte ai tuoi obiettivi.',
    },
    {
      icon: TrendingUp,
      step: '03',
      title: 'Risultati misurabili',
      description: 'Ti seguiamo passo passo, monitorando i progressi e adattando il programma alle tue esigenze.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Non sei solo: ti seguiamo dall'inizio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Il nostro metodo prevede un personal trainer dedicato che ti accompagna in ogni fase del percorso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-card rounded-2xl p-6 border border-border text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-6 h-0.5 bg-primary/30 translate-x-full" />
              )}
              
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground mb-4">
                <step.icon className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">STEP {step.step}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <FunnelCTA 
            text="Scopri se il percorso è adatto a te"
            href="/funnel/qualifica"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Rispondi a 5 semplici domande
          </p>
        </div>
      </div>
    </section>
  );
};

export default FunnelJourney;
