import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Clock, Target, TrendingUp } from 'lucide-react';
import emsInfographic from '@/assets/infographic-ems.jpg';

const EMSInfographic: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: "20 minuti = 4 ore",
      description: "Una sessione EMS equivale a 4 ore di palestra tradizionale"
    },
    {
      icon: Zap,
      title: "300+ muscoli attivati",
      description: "Stimolazione simultanea di oltre 300 gruppi muscolari"
    },
    {
      icon: Target,
      title: "Risultati in 3 settimane",
      description: "Tonificazione visibile già dopo le prime sessioni"
    },
    {
      icon: TrendingUp,
      title: "Brucia fino a 500 cal",
      description: "Consumo calorico elevato anche a riposo"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-black mb-4">
          Cos'è l'<span className="text-brand-primary">EMS</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <strong>Elettrostimolazione Muscolare:</strong> La tecnologia che attiva i muscoli tramite impulsi elettrici, 
          amplificando l'efficacia dell'allenamento tradizionale
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={emsInfographic} 
            alt="Infografica EMS - Come funziona l'elettrostimolazione muscolare"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <Card className="border-brand-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-brand-primary mb-4">
                ⚡ Come funziona l'EMS
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                  <p>Indossi una tuta speciale con elettrodi</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                  <p>Impulsi elettrici attivano le contrazioni muscolari</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                  <p>Esegui movimenti semplici mentre i muscoli lavorano intensamente</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                  <p>Ottieni risultati superiori in molto meno tempo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-brand-secondary/20">
                  <CardContent className="p-4 text-center">
                    <div className="bg-brand-secondary/10 p-2 rounded-full w-fit mx-auto mb-2">
                      <Icon className="text-brand-secondary" size={20} />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-brand-accent/10 rounded-xl text-center">
        <h3 className="text-xl font-bold text-brand-accent mb-2">
          🔬 Scientificamente Provato
        </h3>
        <p className="text-muted-foreground">
          Studi universitari dimostrano che l'EMS aumenta la forza muscolare del <strong>30% in più</strong> 
          rispetto all'allenamento tradizionale, riducendo il tempo necessario dell'<strong>80%</strong>
        </p>
      </div>
    </div>
  );
};

export default EMSInfographic;