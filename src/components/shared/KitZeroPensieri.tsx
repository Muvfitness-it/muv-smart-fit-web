import { Sparkles, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

const KitZeroPensieri = () => {
  const items = [
    "Asciugamano da doccia personalizzato MUV",
    "Asciugamano da palestra per ogni sessione",
    "Vestiario tecnico completo per l'allenamento",
    "Borraccia termica e integratori quando necessari",
    "Prodotti doccia professionali inclusi"
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10" aria-label="Kit Zero Pensieri">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <Card className="relative overflow-hidden border-2 border-accent/30 bg-background/95 backdrop-blur-sm p-8 md:p-12 shadow-2xl animate-scale-in">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl -z-10 opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full blur-3xl -z-10 opacity-50" />
            
            <div className="relative z-10">
              {/* Icon and Title */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary mb-6 shadow-lg animate-pulse">
                  <Sparkles className="w-10 h-10 text-white" strokeWidth={2} aria-hidden="true" />
                </div>
                
                <h2 className="text-heading-lg mb-3 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                  Kit Zero Pensieri Incluso
                </h2>
                
                <p className="text-body-lg text-muted-foreground max-w-2xl">
                  Da noi vieni e pensi solo ad allenarti. Forniamo tutto il necessario per ogni sessione.
                </p>
              </div>
              
              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" role="list" aria-label="Contenuto Kit Zero Pensieri">
                {items.map((item, index) => (
                  <div 
                    key={index}
                    role="listitem" 
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Check className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden="true" />
                    <span className="text-body-md font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Bottom Message */}
              <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <p className="text-body-lg font-semibold text-primary mb-2">
                  Nessun Pensiero, Solo Risultati
                </p>
                <p className="text-body-md text-muted-foreground">
                  Vieni in ufficio, in pausa pranzo o dopo il lavoro: trovi tutto pronto per te. 
                  Noi pensiamo ai dettagli, tu concentrati sulla tua trasformazione.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KitZeroPensieri;
