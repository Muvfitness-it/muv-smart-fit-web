import React from 'react';
import { XCircle, Clock, Users, Dumbbell } from 'lucide-react';

const painPoints = [
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

const PercorsiProblema: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ti riconosci in questa situazione?
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
                className="flex gap-4 p-6 bg-background rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
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
              pensato per te, con tecnologie all'avanguardia e supporto costante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PercorsiProblema;
