import React from 'react';
import { MessageSquare, ClipboardCheck, TrendingUp } from 'lucide-react';
import FunnelCTA from './FunnelCTA';

const FunnelJourney: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      step: '1',
      title: 'Consulenza iniziale',
      description: 'Analizziamo obiettivi, tempo disponibile e condizioni fisiche.',
    },
    {
      icon: ClipboardCheck,
      step: '2',
      title: 'Piano personalizzato',
      description: 'Allenamenti, tecnologie e supporto scelti in base a te.',
    },
    {
      icon: TrendingUp,
      step: '3',
      title: 'Risultati misurabili',
      description: 'Monitoriamo i progressi e adattiamo il percorso.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Non sei mai lasciato solo. Mai.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ogni persona che entra da MUV viene seguita da un professionista dedicato,
            con un programma chiaro, monitorato e adattato nel tempo.
          </p>
        </div>

        <p className="text-center text-primary font-semibold mb-8">I 3 step del metodo</p>

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
              <div className="text-2xl font-bold text-primary mb-2">{step.step}️⃣</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <FunnelCTA 
            text="Scopri se MUV è adatto a te"
            href="/funnel/qualifica"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Rispondi a 4 semplici domande. Scopri se possiamo aiutarti davvero.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FunnelJourney;
