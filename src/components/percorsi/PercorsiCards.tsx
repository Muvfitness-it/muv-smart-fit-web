import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { CONTACT_LINKS } from '@/config/ctaConstants';
import { Gender } from './GenderSelector';

interface PercorsoKit {
  id: string;
  name: string;
  emotionalName: { donna: string; uomo: string; default: string };
  promise: { donna: string; uomo: string; default: string };
  duration: string;
  includes: string[];
  idealFor: { donna: string; uomo: string; default: string };
  icon: React.ElementType;
  featured?: boolean;
  color: string;
}

const percorsi: PercorsoKit[] = [
  {
    id: 'start',
    name: 'START',
    emotionalName: {
      donna: 'Ritorna in forma con leggerezza',
      uomo: 'Inizia il tuo percorso di forza',
      default: 'Il primo passo verso il cambiamento'
    },
    promise: {
      donna: 'Inizia a sentirti più leggera e tonica',
      uomo: 'Inizia a costruire forza e definizione',
      default: 'Inizia a sentirti meglio in poche settimane'
    },
    duration: '[DA INSERIRE] settimane',
    includes: [
      'Consulenza iniziale gratuita',
      'Valutazione posturale e obiettivi',
      '[DA INSERIRE] sessioni EMS o Pilates',
      'Supporto via WhatsApp',
      'Scheda allenamento personalizzata'
    ],
    idealFor: {
      donna: 'Chi vuole iniziare a tonificare con un approccio dolce ma efficace',
      uomo: 'Chi vuole iniziare a costruire forza con un metodo efficiente',
      default: 'Chi vuole provare il metodo MUV con un investimento contenuto'
    },
    icon: Zap,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'trasformazione',
    name: 'TRASFORMAZIONE',
    emotionalName: {
      donna: 'Silhouette definita e pelle tonica',
      uomo: 'Corpo scolpito e performance migliori',
      default: 'Risultati visibili e duraturi'
    },
    promise: {
      donna: 'Rimodella il corpo, riduci cellulite e ritenzione',
      uomo: 'Definisci i muscoli e riduci il grasso addominale',
      default: 'Trasforma il tuo corpo con un percorso strutturato'
    },
    duration: '[DA INSERIRE] settimane',
    includes: [
      'Tutto di START +',
      'Valutazione InBody (composizione corporea)',
      '[DA INSERIRE] sessioni combinate (EMS + Pilates/Vacuum)',
      'Check-in periodici con il trainer',
      'Accesso prioritario alle prenotazioni',
      'Programma nutrizionale base'
    ],
    idealFor: {
      donna: 'Chi vuole risultati visibili su cellulite, tonificazione e silhouette',
      uomo: 'Chi vuole scolpire il fisico e migliorare la composizione corporea',
      default: 'Chi cerca risultati concreti con un percorso completo'
    },
    icon: Star,
    featured: true,
    color: 'from-primary to-accent'
  },
  {
    id: 'elite',
    name: 'ELITE',
    emotionalName: {
      donna: 'Trasformazione totale anti-age',
      uomo: 'Massima definizione, zero limiti',
      default: 'Trasformazione completa, zero compromessi'
    },
    promise: {
      donna: 'Il massimo per pelle, corpo e benessere',
      uomo: 'Il massimo per definizione, forza e performance',
      default: 'Il massimo risultato con supporto premium'
    },
    duration: '[DA INSERIRE] settimane',
    includes: [
      'Tutto di TRASFORMAZIONE +',
      'Consulenza nutrizionale completa',
      'Tecnologie combinate (EMS + Vacuum + Pilates + Sauna)',
      'Priorità assoluta prenotazioni',
      '[DA INSERIRE] benefit esclusivi',
      'Supporto WhatsApp prioritario'
    ],
    idealFor: {
      donna: 'Chi vuole una trasformazione completa senza compromessi',
      uomo: 'Chi vuole il massimo risultato nel minor tempo possibile',
      default: 'Chi vuole il massimo risultato nel minor tempo'
    },
    icon: Crown,
    color: 'from-amber-500 to-orange-600'
  }
];

interface PercorsiCardsProps {
  gender: Gender;
}

const PercorsiCards: React.FC<PercorsiCardsProps> = ({ gender }) => {
  const getGenderContent = (content: { donna: string; uomo: string; default: string }) => {
    if (gender === 'donna') return content.donna;
    if (gender === 'uomo') return content.uomo;
    return content.default;
  };

  const handleCTAClick = (percorsoName: string) => {
    const genderText = gender === 'donna' ? 'donna' : gender === 'uomo' ? 'uomo' : '';
    const message = `Ciao! Sono interessat${gender === 'donna' ? 'a' : 'o'} al Percorso ${percorsoName}${genderText ? ` (${genderText})` : ''}. Vorrei maggiori informazioni.`;
    window.open(CONTACT_LINKS.whatsappWithMessage(message), '_blank');
  };

  return (
    <section id="percorsi-cards" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {gender === 'donna' 
              ? 'I percorsi pensati per te' 
              : gender === 'uomo' 
                ? 'I percorsi pensati per te' 
                : 'Scegli il tuo percorso'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {gender === 'donna'
              ? 'Tre soluzioni complete per tonificazione, silhouette e benessere femminile.'
              : gender === 'uomo'
                ? 'Tre soluzioni complete per definizione, forza e performance maschile.'
                : 'Tre soluzioni complete, pensate per obiettivi diversi.'}
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {percorsi.map((percorso, index) => (
            <Card 
              key={percorso.id}
              className={`relative flex flex-col transition-all duration-300 hover:shadow-xl animate-fade-in ${
                percorso.featured 
                  ? 'border-primary border-2 scale-[1.02] md:scale-105 shadow-lg shadow-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
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
                    {getGenderContent(percorso.emotionalName)}
                  </p>
                </div>
                
                {/* Promise */}
                <p className="text-foreground font-medium mt-3">
                  {getGenderContent(percorso.promise)}
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
                    {percorso.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className={item.includes('[DA INSERIRE]') ? 'text-muted-foreground italic' : 'text-foreground'}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Ideal for */}
                <div className="mt-6 p-3 bg-background rounded-lg border border-border/50">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">Ideale per:</span>{' '}
                    <span className="text-muted-foreground">{getGenderContent(percorso.idealFor)}</span>
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
