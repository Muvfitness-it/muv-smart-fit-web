import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flower, Flame, Heart, Target } from 'lucide-react';
import pilatesInfographic from '@/assets/infographic-pilates-visual.jpg';

const PilatesInfographic: React.FC = () => {
  const benefits = [
    {
      icon: Flower,
      title: "Corpo più lungo",
      description: "Allunga e tonifica senza volume"
    },
    {
      icon: Flame,
      title: "Core potente",
      description: "Rafforza il centro del corpo"
    },
    {
      icon: Heart,
      title: "Postura perfetta",
      description: "Corregge squilibri muscolari"
    },
    {
      icon: Target,
      title: "Controllo totale",
      description: "Precisione e fluidità del movimento"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-orange-50 p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-black mb-4">
          Cos'è il <span className="text-purple-600">Pilates Reformer</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <strong>Il Metodo Pilates Autentico:</strong> Allenamento su macchinario originale 
          per un corpo tonico, flessibile e posturalmente perfetto
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={pilatesInfographic} 
            alt="Infografica Pilates Reformer - Esercizi e benefici del metodo autentico"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-4">
                🏋️ Come funziona il Reformer
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                  <p>Sdraiati sul carrello mobile del Reformer</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                  <p>Le molle offrono resistenza controllata</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                  <p>Movimenti fluidi e precisi coinvolgono tutto il corpo</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                  <p>Core sempre attivo per stabilità e controllo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-orange-200">
                  <CardContent className="p-4 text-center">
                    <div className="bg-orange-100 p-2 rounded-full w-fit mx-auto mb-2">
                      <Icon className="text-orange-600" size={20} />
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
        <div className="p-6 bg-purple-100 rounded-xl">
          <h3 className="text-lg font-bold text-purple-700 mb-2">
            ✅ Ideale per chi vuole:
          </h3>
          <ul className="text-sm text-purple-600 space-y-1">
            <li>• Tonificare senza "ingrossare"</li>
            <li>• Migliorare postura e flessibilità</li>
            <li>• Rafforzare il core profondo</li>
            <li>• Riabilitazione sicura ed efficace</li>
            <li>• Equilibrio mente-corpo</li>
          </ul>
        </div>

        <div className="p-6 bg-orange-100 rounded-xl">
          <h3 className="text-lg font-bold text-orange-700 mb-2">
            🎯 Risultati garantiti:
          </h3>
          <ul className="text-sm text-orange-600 space-y-1">
            <li>• Corpo più tonico in 4 settimane</li>
            <li>• Postura migliorata del 60%</li>
            <li>• Maggiore flessibilità e forza</li>
            <li>• Riduzione dolori lombari</li>
            <li>• Equilibrio e coordinazione</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PilatesInfographic;