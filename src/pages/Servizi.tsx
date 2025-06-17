
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Dumbbell, Heart, Zap, Users, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Servizi = () => {
  const servizi = [
    {
      icon: <Dumbbell className="w-12 h-12 text-pink-600 mb-4" />,
      title: "Personal Training",
      description: "Allenamenti personalizzati one-to-one con i nostri trainer qualificati per raggiungere i tuoi obiettivi specifici."
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Allenamento EMS",
      description: "Tecnologia di elettrostimolazione muscolare per massimizzare i risultati in tempi ridotti."
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-500 mb-4" />,
      title: "Pancafit",
      description: "Metodologia specifica per il trattamento del mal di schiena e il riequilibrio posturale."
    },
    {
      icon: <Users className="w-12 h-12 text-pink-600 mb-4" />,
      title: "Small Group Training",
      description: "Allenamenti in piccoli gruppi per unire motivazione sociale ed attenzione personalizzata."
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Consulenza Nutrizionale",
      description: "Piani alimentari personalizzati studiati in base ai tuoi obiettivi e stile di vita."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              UN SERVIZIO PER OGNI{" "}
              <span className="text-pink-600">ESIGENZA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Scopri tutti i nostri percorsi, studiati per garantirti la massima efficacia e un supporto costante.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servizi.map((servizio, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center">{servizio.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{servizio.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{servizio.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
