import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Spine, Heart, Shield, RefreshCw } from 'lucide-react';
import pancafitInfographic from '@/assets/infographic-pancafit.jpg';

const PancafitInfographic: React.FC = () => {
  const benefits = [
    {
      icon: Spine,
      title: "Postura corretta",
      description: "Riallineamento della colonna vertebrale"
    },
    {
      icon: Heart,
      title: "Addio dolori",
      description: "Riduzione mal di schiena, collo, spalle"
    },
    {
      icon: Shield,
      title: "Prevenzione",
      description: "Evita problemi futuri alla schiena"
    },
    {
      icon: RefreshCw,
      title: "Riequilibrio globale",
      description: "Lavora su tutto il sistema muscolare"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-black mb-4">
          Cos'è il <span className="text-orange-600">Pancafit®</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <strong>Il Metodo Raggi®:</strong> Un approccio rivoluzionario per il riequilibrio posturale 
          che agisce su muscoli, articolazioni e tensioni profonde
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={pancafitInfographic} 
            alt="Infografica Pancafit - Metodo di riequilibrio posturale globale"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <Card className="border-orange-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-orange-600 mb-4">
                🦴 Come funziona il Pancafit®
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                  <p>Valutazione posturale completa per identificare le tensioni</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                  <p>Allungamento decompensato sui muscoli retratti</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                  <p>Respirazione diaframmatica per rilasciare le tensioni</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                  <p>Riequilibrio globale di muscoli, ossa e organi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-red-200">
                  <CardContent className="p-4 text-center">
                    <div className="bg-red-100 p-2 rounded-full w-fit mx-auto mb-2">
                      <Icon className="text-red-600" size={20} />
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

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-orange-100 rounded-xl">
          <h3 className="text-lg font-bold text-orange-700 mb-2">
            ✅ Ideale per chi soffre di:
          </h3>
          <ul className="text-sm text-orange-600 space-y-1">
            <li>• Mal di schiena cronico</li>
            <li>• Cervicalgia e torcicollo</li>
            <li>• Sciatalgia e lombalgia</li>
            <li>• Dolori articolari</li>
            <li>• Problemi posturali</li>
          </ul>
        </div>

        <div className="p-6 bg-red-100 rounded-xl">
          <h3 className="text-lg font-bold text-red-700 mb-2">
            🎯 Risultati comprovati:
          </h3>
          <ul className="text-sm text-red-600 space-y-1">
            <li>• 85% riduzione dolore in 4 settimane</li>
            <li>• Miglioramento postura del 70%</li>
            <li>• Aumento mobilità articolare</li>
            <li>• Maggiore energia e benessere</li>
            <li>• Prevenzione recidive</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PancafitInfographic;