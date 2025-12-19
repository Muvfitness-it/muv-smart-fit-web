import { Check, X } from 'lucide-react';

const TargetAudienceSection = () => {
  const forYou = [
    "Vuoi dimagrire ma non hai tempo per ore in palestra",
    "Cerchi privacy e attenzione personalizzata",
    "Vuoi risultati misurabili, non promesse vaghe",
    "Hai provato diete e palestre senza successo"
  ];
  
  const notForYou = [
    "Cerchi la palestra low-cost con abbonamento illimitato",
    "Ti piace allenarti in mezzo a tante persone",
    "Non sei disposto a seguire un programma personalizzato"
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">
            MUV è per te?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Per chi è */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-6">
                MUV fa per te se:
              </h3>
              <ul className="space-y-4">
                {forYou.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Per chi non è */}
            <div className="bg-muted/50 border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-muted-foreground mb-6">
                MUV non fa per te se:
              </h3>
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
      </div>
    </section>
  );
};

export default TargetAudienceSection;
