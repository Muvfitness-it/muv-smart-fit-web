import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Activity, Heart, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Servizi = () => {
  const servizi = [
    {
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-600 mb-3 sm:mb-4" />,
      title: "EMS",
      subtitle: "Dimagrire e tonificare in 20'",
      description: "Elettrostimolazione guidata, 20' reali, ideale se hai poco tempo.",
      benefits: "✓ Dimagrimento rapido ✓ Attivazione profonda ✓ Protezione articolare",
      link: "/servizi/ems-legnago"
    },
    {
      icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 mb-3 sm:mb-4" />,
      title: "Pancafit & Postura",
      subtitle: "Stop al mal di schiena",
      description: "Riorganizzazione posturale in decompensazione, respirazione mirata.",
      benefits: "✓ Riduzione rigidità ✓ Allungamento globale ✓ Respiro migliore",
      link: "/servizi/pancafit-postura-legnago"
    },
    {
      icon: <Activity className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 mb-3 sm:mb-4" />,
      title: "Pilates Reformer",
      subtitle: "Core, mobilità e postura",
      description: "Controllo motorio e stabilità del core in sicurezza.",
      benefits: "✓ Stabilità lombare ✓ Mobilità anche/colonna ✓ Forza controllata",
      link: "/servizi/pilates-reformer-legnago"
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500 mb-3 sm:mb-4" />,
      title: "Cellulite (Vacuum + Pressoterapia)",
      subtitle: "Gambe leggere e drenaggio",
      description: "Migliora microcircolo e drenaggio, riduci i cm dove serve.",
      benefits: "✓ Drenaggio efficace ✓ Gambe leggere ✓ Pelle più uniforme",
      link: "/servizi/cellulite-vacuum-pressoterapia-legnago"
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-600 mb-3 sm:mb-4" />,
      title: "Personal Training 1:1 & Small Group",
      subtitle: "Coaching su misura, senza caos",
      description: "Un coach vero al tuo fianco; obiettivi chiari e progressioni misurabili.",
      benefits: "✓ Tecnica corretta ✓ Motivazione costante ✓ Programmazione su misura",
      link: "/servizi/personal-trainer-legnago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Servizi MUV Fitness Legnago – EMS, Pancafit, Pilates, Vacuum</title>
        <meta name="description" content="5 servizi specializzati per fitness intelligente: EMS, Pancafit, Pilates Reformer, Vacuum+Pressoterapia, Personal Training. Scegli il tuo percorso ideale." />
        <link rel="canonical" href="https://www.muvfitness.it/servizi/" />
      </Helmet>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Servizi di Fitness Intelligente a{" "}
              <span className="text-pink-600 block sm:inline">Legnago</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              <strong>5 servizi specializzati</strong> per ogni obiettivo: dimagrimento rapido, postura corretta, 
              cellulite, ricomposizione corporea. <span className="text-pink-400">Scegli il tuo percorso ideale</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {servizi.map((servizio, index) => (
              <Link to={servizio.link} key={index} className="group">
                <Card className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105 h-full min-h-[44px] focus-within:ring-4 focus-within:ring-pink-600/50">
                  <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col">
                    <div className="flex justify-center" aria-hidden="true">{servizio.icon}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{servizio.title}</h3>
                    <p className="text-pink-400 font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">{servizio.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base flex-grow">{servizio.description}</p>
                    <div className="text-xs sm:text-sm text-green-400 font-medium mb-4">
                      {servizio.benefits}
                    </div>
                    <div className="flex items-center justify-center text-pink-400 group-hover:text-white transition-colors">
                      <span className="mr-2 font-semibold underline">Scopri di più</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-600/20 via-purple-500/20 to-blue-500/20 p-6 sm:p-8 rounded-lg border border-pink-600/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
              Non Sai Quale Servizio Scegliere?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-2 leading-relaxed">
              <strong>Prenota una consulenza gratuita</strong> e scopriremo insieme il percorso perfetto per i tuoi obiettivi. 
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="https://wa.me/393291070374"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
              >
                Scrivici su WhatsApp
              </a>
              <Link to="/contatti">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-pink-600/50">
                  Prenota Consulenza Gratuita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
