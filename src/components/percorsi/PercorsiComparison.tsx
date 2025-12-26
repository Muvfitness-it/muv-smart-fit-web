import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ComparisonRow {
  feature: string;
  start: boolean | string;
  trasformazione: boolean | string;
  elite: boolean | string;
}

const comparisonData: ComparisonRow[] = [
  { feature: 'Consulenza iniziale gratuita', start: true, trasformazione: true, elite: true },
  { feature: 'Valutazione posturale', start: true, trasformazione: true, elite: true },
  { feature: 'Sessioni settimanali', start: '[DA INS.]', trasformazione: '[DA INS.]', elite: '[DA INS.]' },
  { feature: 'Tecnologie incluse', start: '1', trasformazione: '2-3', elite: 'Tutte' },
  { feature: 'Valutazione InBody', start: false, trasformazione: true, elite: true },
  { feature: 'Check-in periodici', start: false, trasformazione: true, elite: true },
  { feature: 'Supporto WhatsApp', start: true, trasformazione: true, elite: 'Prioritario' },
  { feature: 'Programma nutrizionale', start: false, trasformazione: 'Base', elite: 'Completo' },
  { feature: 'Priorità prenotazioni', start: false, trasformazione: true, elite: 'Assoluta' },
  { feature: 'Sauna infrarossi inclusa', start: false, trasformazione: false, elite: true },
];

const renderValue = (value: boolean | string) => {
  if (value === true) {
    return <Check className="h-5 w-5 text-primary mx-auto" />;
  }
  if (value === false) {
    return <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />;
  }
  return <span className="text-sm text-foreground">{value}</span>;
};

const PercorsiComparison: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Confronta i percorsi
            </h2>
            <p className="text-lg text-muted-foreground">
              Trova quello più adatto alle tue esigenze
            </p>
          </div>
          
          {/* Comparison Table - Desktop */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground">Caratteristica</th>
                  <th className="text-center p-4 font-semibold text-foreground w-28">
                    <span className="block text-sm text-muted-foreground">Percorso</span>
                    START
                  </th>
                  <th className="text-center p-4 font-semibold text-foreground w-36 bg-primary/5 border-x border-primary/20">
                    <Badge className="mb-1 bg-primary/10 text-primary border-0 text-xs">
                      ⭐ PIÙ SCELTO
                    </Badge>
                    <span className="block text-sm text-muted-foreground">Percorso</span>
                    TRASFORMAZIONE
                  </th>
                  <th className="text-center p-4 font-semibold text-foreground w-28">
                    <span className="block text-sm text-muted-foreground">Percorso</span>
                    ELITE
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border/50 last:border-0 ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                    }`}
                  >
                    <td className="p-4 text-foreground">{row.feature}</td>
                    <td className="p-4 text-center">{renderValue(row.start)}</td>
                    <td className="p-4 text-center bg-primary/5 border-x border-primary/10">
                      {renderValue(row.trasformazione)}
                    </td>
                    <td className="p-4 text-center">{renderValue(row.elite)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Comparison Cards - Mobile */}
          <div className="md:hidden space-y-6">
            {['start', 'trasformazione', 'elite'].map((plan) => (
              <div 
                key={plan}
                className={`rounded-xl border p-4 ${
                  plan === 'trasformazione' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-background'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-foreground capitalize">
                    Percorso {plan === 'trasformazione' ? 'TRASFORMAZIONE' : plan.toUpperCase()}
                  </h3>
                  {plan === 'trasformazione' && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      ⭐ PIÙ SCELTO
                    </Badge>
                  )}
                </div>
                <ul className="space-y-2">
                  {comparisonData.map((row, index) => {
                    const value = row[plan as keyof ComparisonRow];
                    if (value === false) return null;
                    return (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">
                          {row.feature}
                          {typeof value === 'string' && value !== 'true' && (
                            <span className="text-muted-foreground ml-1">({value})</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PercorsiComparison;
