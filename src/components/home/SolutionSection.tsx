import { Zap, UserCheck, Shield } from 'lucide-react';

const SolutionSection = () => {
  const pillars = [
    {
      icon: Zap,
      title: "Tecnologia Certificata",
      description: "EMS Training: 20 minuti equivalgono a 90 minuti di palestra tradizionale. Risultati 4x più veloci.",
      highlight: "20 min = 90 min"
    },
    {
      icon: UserCheck,
      title: "Personalizzazione Totale",
      description: "Zero schede standard. Ogni protocollo è costruito su di te, con valutazioni mensili e ottimizzazione costante.",
      highlight: "Su misura per te"
    },
    {
      icon: Shield,
      title: "Ambiente Riservato",
      description: "Massimo 3 clienti contemporaneamente. Niente attese, niente sguardi. Privacy garantita.",
      highlight: "Max 3 persone"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Il Metodo MUV
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              3 pilastri per risultati reali e duraturi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 mx-auto mb-5 bg-primary/10 rounded-xl flex items-center justify-center">
                  <pillar.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  {pillar.description}
                </p>
                <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
                  {pillar.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
