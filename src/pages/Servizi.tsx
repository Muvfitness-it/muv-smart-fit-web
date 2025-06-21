
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Dumbbell, Heart, Zap, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Servizi = () => {
  const servizi = [
    {
      icon: <Dumbbell className="w-12 h-12 text-pink-600 mb-4" />,
      title: "Personal Training Esclusivo",
      subtitle: "Risultati garantiti in 30 giorni",
      description: "Allenamenti 1-to-1 completamente personalizzati. Ambiente riservato, zero code, massima attenzione. I nostri clienti perdono mediamente 3-5kg al mese.",
      benefits: "✓ Programma su misura ✓ Ambiente esclusivo ✓ Risultati misurabili"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Tecnologia EMS Avanzata",
      subtitle: "20 minuti = 3 ore di palestra tradizionale",
      description: "Elettrostimolazione muscolare che attiva oltre 300 muscoli contemporaneamente. Bruci il 30% di calorie in più rispetto all'allenamento tradizionale.",
      benefits: "✓ Tempi ridotti ✓ Risultati amplificati ✓ Tonificazione rapida"
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-500 mb-4" />,
      title: "Pancafit per Mal di Schiena",
      subtitle: "95% di successo nel eliminare i dolori",
      description: "Metodo specifico per riallineamento posturale e risoluzione definitiva del mal di schiena cronico. Tecnica esclusiva a Legnago.",
      benefits: "✓ Addio al dolore ✓ Postura corretta ✓ Benessere duraturo"
    },
    {
      icon: <Users className="w-12 h-12 text-pink-600 mb-4" />,
      title: "Small Group Training",
      subtitle: "Massimo 3 persone per sessione",
      description: "L'energia del gruppo con l'attenzione del personal trainer. Perfetto per chi vuole socializzare mantenendo la qualità dell'allenamento.",
      benefits: "✓ Motivazione di gruppo ✓ Costi ridotti ✓ Attenzione personalizzata"
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Consulenza Nutrizionale",
      subtitle: "Piani alimentari che funzionano davvero",
      description: "Strategie nutrizionali semplici e sostenibili. Non diete estreme, ma abitudini che mantieni per sempre. Focus su risultati a lungo termine.",
      benefits: "✓ Approccio sostenibile ✓ Educazione alimentare ✓ Supporto continuo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              SERVIZI FITNESS INNOVATIVI A{" "}
              <span className="text-pink-600">LEGNAGO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <strong>Ogni servizio è progettato per un obiettivo specifico:</strong> dimagrimento rapido, 
              eliminazione del mal di schiena, tonificazione muscolare. 
              <span className="text-pink-400">Scegli quello che fa per te.</span>
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servizi.map((servizio, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center" aria-hidden="true">{servizio.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{servizio.title}</h3>
                  <p className="text-pink-400 font-semibold mb-4 text-sm">{servizio.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed mb-4">{servizio.description}</p>
                  <div className="text-sm text-green-400 font-medium">
                    {servizio.benefits}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-600/20 via-purple-500/20 to-blue-500/20 p-8 rounded-lg border border-pink-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Non Sai Quale Servizio Scegliere?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              <strong>Prenota una consulenza gratuita</strong> e scopriremo insieme il percorso perfetto per i tuoi obiettivi. 
              Zero impegno, massima chiarezza.
            </p>
            <Link to="/contatti">
              <Button 
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                aria-label="Prenota consulenza gratuita servizi fitness Legnago"
              >
                Prenota Consulenza Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
