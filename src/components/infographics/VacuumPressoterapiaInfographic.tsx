import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Wind, RotateCw, Heart } from 'lucide-react';
import vacuumInfographic from '@/assets/infographic-vacuum-visual.jpg';

const VacuumPressoterapiaInfographic: React.FC = () => {
  const benefits = [
    {
      icon: Droplets,
      title: "Riduce ritenzione",
      description: "Elimina liquidi in eccesso e gonfiori"
    },
    {
      icon: Wind,
      title: "Migliora circolazione",
      description: "Stimola il sistema linfatico e venoso"
    },
    {
      icon: RotateCw,
      title: "Tonifica tessuti",
      description: "Compatta la pelle e riduce la cellulite"
    },
    {
      icon: Heart,
      title: "Effetto relax",
      description: "Massaggio piacevole e rilassante"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-black mb-4">
          Cos'è <span className="text-purple-600">Vacuum + Pressoterapia</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <strong>Trattamenti estetici avanzati:</strong> La combinazione perfetta per eliminare cellulite, 
          ritenzione idrica e migliorare l'aspetto della pelle
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <img 
            src={vacuumInfographic} 
            alt="Infografica Vacuum e Pressoterapia - Trattamenti per cellulite e ritenzione idrica"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-4">
                🌪️ Come funziona il trattamento
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                  <p><strong>Vacuum:</strong> Aspirazione controllata che stimola i tessuti profondi</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                  <p><strong>Pressoterapia:</strong> Compressione sequenziale per drenaggio linfatico</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                  <p><strong>Roll endermologie:</strong> Massaggio meccanico per rimodellamento</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</div>
                  <p><strong>Risultato:</strong> Pelle più tonica, liscia e drenata</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-pink-200">
                  <CardContent className="p-4 text-center">
                    <div className="bg-pink-100 p-2 rounded-full w-fit mx-auto mb-2">
                      <Icon className="text-pink-600" size={20} />
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
            ✅ Ideale per chi ha:
          </h3>
          <ul className="text-sm text-purple-600 space-y-1">
            <li>• Cellulite localizzata su cosce e glutei</li>
            <li>• Ritenzione idrica e gonfiori</li>
            <li>• Pelle a "buccia d'arancia"</li>
            <li>• Cattiva circolazione periferica</li>
            <li>• Tessuti poco tonici e compatti</li>
          </ul>
        </div>

        <div className="p-6 bg-pink-100 rounded-xl">
          <h3 className="text-lg font-bold text-pink-700 mb-2">
            🎯 Risultati comprovati:
          </h3>
          <ul className="text-sm text-pink-600 space-y-1">
            <li>• 70% riduzione cellulite in 8 sedute</li>
            <li>• -2/3 cm di circonferenza cosce</li>
            <li>• Miglioramento texture pelle del 85%</li>
            <li>• Riduzione ritenzione idrica del 60%</li>
            <li>• Pelle più liscia e compatta</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl text-center">
        <h3 className="text-xl font-bold text-purple-700 mb-2">
          💆‍♀️ Trattamento Completo
        </h3>
        <p className="text-muted-foreground">
          Combinando <strong>Vacuum, Pressoterapia e Roll endermologie</strong> ottieni risultati superiori 
          rispetto ai singoli trattamenti. Un approccio completo per il rimodellamento corporeo.
        </p>
      </div>
    </div>
  );
};

export default VacuumPressoterapiaInfographic;