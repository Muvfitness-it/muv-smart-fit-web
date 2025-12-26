import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { CONTACT_LINKS, WHATSAPP_MESSAGES } from '@/config/ctaConstants';

interface PercorsoKit {
  id: string;
  name: string;
  emotionalName: string;
  promise: string;
  duration: string;
  includes: string[];
  idealFor: string;
  icon: React.ElementType;
  featured?: boolean;
  color: string;
}

const percorsi: PercorsoKit[] = [
  {
    id: 'start',
    name: 'START',
    emotionalName: 'Il primo passo verso il cambiamento',
    promise: 'Inizia a sentirti meglio in poche settimane',
    duration: '[DA INSERIRE] settimane',
    includes: [
      'Consulenza iniziale gratuita',
      'Valutazione posturale e obiettivi',
      '[DA INSERIRE] sessioni EMS o Pilates',
      'Supporto via WhatsApp',
      'Scheda allenamento personalizzata'
    ],
    idealFor: 'Chi vuole provare il metodo MUV con un investimento contenuto',
    icon: Zap,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'trasformazione',
    name: 'TRASFORMAZIONE',
    emotionalName: 'Risultati visibili e duraturi',
    promise: 'Trasforma il tuo corpo con un percorso strutturato',
    duration: '[DA INSERIRE] settimane',
    includes: [
      'Tutto di START +',
      'Valutazione InBody (composizione corporea)',
      '[DA INSERIRE] sessioni combinate (EMS + Pilates/Vacuum)',
      'Check-in periodici con il trainer',
      'Accesso prioritario alle prenotazioni',
      'Programma nutrizionale base'
    ],
    idealFor: 'Chi cerca risultati concreti con un percorso completo',
    icon: Star,
    featured: true,
    color: 'from-primary to-accent'
  },
  {
    id: 'elite',
    name: 'ELITE',
    emotionalName: 'Trasformazione completa, zero compromessi',
    promise: 'Il massimo risultato con supporto premium',
    duration: '[DA INSERIRE] settimane',
    includes: [
      'Tutto di TRASFORMAZIONE +',
      'Consulenza nutrizionale completa',
      'Tecnologie combinate (EMS + Vacuum + Pilates + Sauna)',
      'Priorità assoluta prenotazioni',
      '[DA INSERIRE] benefit esclusivi',
      'Supporto WhatsApp prioritario'
    ],
    idealFor: 'Chi vuole il massimo risultato nel minor tempo',
    icon: Crown,
    color: 'from-amber-500 to-orange-600'
  }
];

const PercorsiCards: React.FC = () => {
  const handleCTAClick = (percorsoName: string) => {
    const message = `Ciao! Sono interessato/a al Percorso ${percorsoName}. Vorrei maggiori informazioni.`;
    window.open(CONTACT_LINKS.whatsappWithMessage(message), '_blank');
  };

  return (
    <section id="percorsi-cards" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scegli il tuo percorso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tre soluzioni complete, pensate per obiettivi diversi. 
            Ogni percorso include tecnologie avanzate e supporto personalizzato.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {percorsi.map((percorso) => (
            <Card 
              key={percorso.id}
              className={`relative flex flex-col transition-all duration-300 hover:shadow-xl ${
                percorso.featured 
                  ? 'border-primary border-2 scale-[1.02] md:scale-105 shadow-lg shadow-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Featured Badge */}
              {percorso.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold shadow-lg">
                    ⭐ PIÙ SCELTO
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`pt-8 ${percorso.featured ? 'pt-10' : ''}`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${percorso.color} flex items-center justify-center mb-4`}>
                  <percorso.icon className="h-7 w-7 text-white" />
                </div>
                
                {/* Name */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">
                    Percorso {percorso.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {percorso.emotionalName}
                  </p>
                </div>
                
                {/* Promise */}
                <p className="text-foreground font-medium mt-3">
                  {percorso.promise}
                </p>
                
                {/* Duration */}
                <p className="text-sm text-muted-foreground">
                  Durata: {percorso.duration}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1">
                {/* Includes */}
                <div className="space-y-3">
                  <p className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    Cosa include:
                  </p>
                  <ul className="space-y-2">
                    {percorso.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className={item.includes('[DA INSERIRE]') ? 'text-muted-foreground italic' : 'text-foreground'}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Ideal for */}
                <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">Ideale per:</span>{' '}
                    <span className="text-muted-foreground">{percorso.idealFor}</span>
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button 
                  className="w-full"
                  variant={percorso.featured ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handleCTAClick(percorso.name)}
                >
                  Inizia il tuo percorso
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Bottom note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          Non sai quale scegliere? <a href={CONTACT_LINKS.whatsapp} className="text-primary hover:underline font-medium">Prenota una consulenza gratuita</a> e ti guideremo nella scelta.
        </p>
      </div>
    </section>
  );
};

export default PercorsiCards;
