import React from 'react';
import { XCircle, Clock, Users, Dumbbell, Droplets, Heart, Activity, Shirt } from 'lucide-react';
import { Gender } from './GenderSelector';

interface PercorsiProblemaProps {
  gender: Gender;
}

const painPointsDonna = [
  {
    icon: Droplets,
    title: "Cellulite e ritenzione che non vanno via?",
    description: "Trattamenti estetici costosi che non danno risultati duraturi."
  },
  {
    icon: Heart,
    title: "Braccia e glutei poco tonici nonostante la dieta?",
    description: "Il solo dimagrimento non basta per definire la silhouette."
  },
  {
    icon: Clock,
    title: "Postura compromessa da lavoro sedentario?",
    description: "Ore alla scrivania che causano tensioni e dolori."
  },
  {
    icon: Users,
    title: "Disagio nelle palestre affollate?",
    description: "Preferisci un ambiente riservato con attenzione personalizzata."
  }
];

const painPointsUomo = [
  {
    icon: Shirt,
    title: "Pancia che non si riduce nonostante gli sforzi?",
    description: "Dieta e corsa non bastano per eliminare il grasso addominale."
  },
  {
    icon: Activity,
    title: "Massa muscolare che non aumenta?",
    description: "Allenamenti in palestra che non portano i risultati sperati."
  },
  {
    icon: Dumbbell,
    title: "Mal di schiena e postura da scrivania?",
    description: "Dolori lombari e cervicali che limitano le tue attività."
  },
  {
    icon: Clock,
    title: "Poco tempo per allenamenti lunghi?",
    description: "Il lavoro ti lascia poco spazio per te stesso."
  }
];

const painPointsGeneric = [
  {
    icon: XCircle,
    title: "Hai provato diete e palestre senza risultati duraturi?",
    description: "Metodi generici che non tengono conto della tua situazione specifica."
  },
  {
    icon: Clock,
    title: "Non hai tempo per allenamenti lunghi?",
    description: "Il lavoro e la famiglia ti lasciano poco spazio per te stesso/a."
  },
  {
    icon: Users,
    title: "Le palestre affollate ti mettono a disagio?",
    description: "Preferisci un ambiente riservato con attenzione personalizzata."
  },
  {
    icon: Dumbbell,
    title: "Non sai da dove iniziare?",
    description: "Troppi servizi, troppe opzioni, nessuna guida chiara."
  }
];

const PercorsiProblema: React.FC<PercorsiProblemaProps> = ({ gender }) => {
  const painPoints = gender === 'donna' 
    ? painPointsDonna 
    : gender === 'uomo' 
      ? painPointsUomo 
      : painPointsGeneric;

  const titleText = gender === 'donna'
    ? "Ti riconosci in questa situazione?"
    : gender === 'uomo'
      ? "Ti riconosci in questa situazione?"
      : "Ti riconosci in questa situazione?";

  return (
    <section id="percorsi-problema" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {titleText}
            </h2>
            <p className="text-lg text-muted-foreground">
              Se almeno uno di questi punti ti è familiare, sei nel posto giusto.
            </p>
          </div>
          
          {/* Pain points grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <point.icon className="h-6 w-6 text-destructive" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Solution teaser */}
          <div className="mt-12 text-center">
            <p className="text-lg text-foreground">
              <span className="font-semibold text-primary">La soluzione?</span> Un percorso completo, 
              pensato per {gender === 'donna' ? 'te' : gender === 'uomo' ? 'te' : 'te'}, con tecnologie all'avanguardia e supporto costante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PercorsiProblema;
