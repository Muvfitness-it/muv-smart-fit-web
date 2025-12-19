import { Check, Gift } from 'lucide-react';

const OfferSection = () => {
  const includes = [
    "Valutazione posturale completa (30 min)",
    "Analisi composizione corporea",
    "Sessione trial EMS o Pilates (30 min)",
    "Piano d'azione personalizzato (30 min)"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Gift className="w-4 h-4" />
            <span>Offerta Speciale</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            La tua prova gratuita include:
          </h2>
          
          <div className="bg-background border border-border rounded-2xl p-6 md:p-8 mt-8 mb-8">
            <ul className="space-y-4 text-left max-w-md mx-auto">
              {includes.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-4">
                <span className="text-muted-foreground line-through text-lg">€150</span>
                <span className="text-3xl md:text-4xl font-bold text-primary">GRATIS</span>
              </div>
              <p className="text-muted-foreground mt-2">
                Durata totale: 90 minuti · Zero impegno
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
