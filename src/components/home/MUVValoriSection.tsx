import { Target, Users, Zap, TrendingUp } from 'lucide-react';

const MUVValoriSection = () => {
  const valori = [
    {
      icon: Target,
      title: "Personalizzazione totale",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Community autentica",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "Tecnologia intelligente",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Risultati duraturi",
      color: "text-primary"
    }
  ];

  return (
    <section id="valori" className="section-white section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-6">
            Il nostro Metodo
          </h2>
          
          <p className="text-body-lg text-center mb-16 mx-auto max-w-3xl">
            MUV Fitness è l'unico spazio a Legnago che fonde allenamenti personalizzati, tecnologia EMS all'avanguardia e un'attenzione totale alla persona.<br />
            Crediamo in un fitness sostenibile, nella crescita graduale e nella motivazione che nasce dalla community.<br />
            Qui ogni traguardo è costruito su misura, senza stress e senza pressioni.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valori.map((valore, index) => {
              const Icon = valore.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-200"
                >
                  <div className="mb-4 flex justify-center">
                    <Icon size={48} className={valore.color} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-heading-sm">
                    {valore.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVValoriSection;
