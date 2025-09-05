import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Activity, Heart, Users, TrendingUp, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getServiceSchema, getFAQSchema } from '@/utils/seoSchemas';

const Servizi = () => {
  const servizi = [
    {
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-600 mb-3 sm:mb-4" />,
      title: "EMS",
      subtitle: "Dimagrire e tonificare in 20'",
      description: "Elettrostimolazione guidata, 20' reali, ideale se hai poco tempo.",
      benefits: "✓ Dimagrimento rapido ✓ Attivazione profonda ✓ Protezione articolare",
      link: "/servizi/ems"
    },
    {
      icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 mb-3 sm:mb-4" />,
      title: "Pancafit & Postura",
      subtitle: "Stop al mal di schiena",
      description: "Riorganizzazione posturale in decompensazione, respirazione mirata.",
      benefits: "✓ Riduzione rigidità ✓ Allungamento globale ✓ Respiro migliore",
      link: "/servizi/pancafit"
    },
    {
      icon: <Activity className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 mb-3 sm:mb-4" />,
      title: "Pilates Reformer",
      subtitle: "Core, mobilità e postura",
      description: "Controllo motorio e stabilità del core in sicurezza.",
      benefits: "✓ Stabilità lombare ✓ Mobilità anche/colonna ✓ Forza controllata",
      link: "/servizi/pilates"
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500 mb-3 sm:mb-4" />,
      title: "Massoterapia e Pressoterapia",
      subtitle: "Gambe leggere e drenaggio",
      description: "Migliora microcircolo e drenaggio, riduci i cm dove serve.",
      benefits: "✓ Drenaggio efficace ✓ Gambe leggere ✓ Pelle più uniforme",
      link: "/servizi/massoterapia"
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-600 mb-3 sm:mb-4" />,
      title: "Personal Training 1:1 & Small Group",
      subtitle: "Coaching su misura, senza caos",
      description: "Un coach vero al tuo fianco; obiettivi chiari e progressioni misurabili.",
      benefits: "✓ Tecnica corretta ✓ Motivazione costante ✓ Programmazione su misura",
      link: "/servizi/personal-training"
    },
    {
      icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-600 mb-3 sm:mb-4" />,
      title: "Nutrizione & Psicocoach",
      subtitle: "Mente e corpo in equilibrio",
      description: "Approccio integrato che unisce alimentazione sana e supporto mentale.",
      benefits: "✓ Piani alimentari su misura ✓ Supporto psicologico ✓ Cambiamento duraturo",
      link: "/servizi/nutrizione-psicocoach-legnago"
    }
  ];

  const faqs = [
    {
      question: "Quale servizio è più adatto per dimagrire velocemente?",
      answer: "L'EMS è perfetto per il dimagrimento rapido: in 20 minuti attivi tutti i muscoli con un'intensità impossibile da raggiungere con l'allenamento tradizionale. Combina resistenza e cardio per massimizzare il consumo calorico."
    },
    {
      question: "Posso combinare più servizi insieme?",
      answer: "Assolutamente sì! I nostri protocolli integrano perfettamente EMS + Pilates per forza e stabilità, o Massoterapia + Nutrizione per un approccio completo al benessere. Ti consigliamo la combinazione migliore in base ai tuoi obiettivi."
    },
    {
      question: "Quanto tempo serve per vedere i primi risultati?",
      answer: "Con l'EMS e il Personal Training 1:1 i primi cambiamenti sono visibili già dopo 2 settimane. Il nostro protocollo garantisce risultati misurabili entro 30 giorni o rimborsiamo il percorso."
    },
    {
      question: "I servizi sono adatti anche ai principianti?",
      answer: "Tutti i nostri servizi sono modulabili e adatti a ogni livello. Iniziamo sempre con un'analisi della composizione corporea e un test posturale per personalizzare completamente il percorso alle tue capacità attuali."
    },
    {
      question: "Che differenza c'è tra Personal Training 1:1 e Small Group?",
      answer: "Il Personal Training 1:1 offre attenzione esclusiva e programmazione completamente personalizzata. Lo Small Group (max 3 persone) mantiene l'alta qualità dell'allenamento con un costo più accessibile, ideale per chi cerca motivazione di gruppo."
    }
  ];

  const structuredData = [
    getServiceSchema(
      "Servizi Fitness MUV Legnago",
      "Centro fitness con 6 servizi specializzati: EMS, Personal Training, Pilates Reformer, Pancafit, Massoterapia e Nutrizione. Programmi personalizzati per ogni obiettivo.",
      "https://www.muvfitness.it/servizi"
    ),
    getFAQSchema(faqs)
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UnifiedSEOHead
        title="Servizi MUV Fitness Legnago – EMS, Pancafit, Pilates, Vacuum, Nutrizione"
        description="6 servizi specializzati per fitness intelligente: EMS, Pancafit, Pilates Reformer, Vacuum+Pressoterapia, Personal Training, Nutrizione e Psicocoach. Scegli il tuo percorso ideale."
        keywords="servizi fitness legnago, ems legnago, pilates legnago, personal trainer legnago, pancafit legnago, massoterapia legnago, nutrizione legnago"
        canonicalUrl="https://www.muvfitness.it/servizi"
        structuredData={structuredData}
      />

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Servizi di Fitness Intelligente a{" "}
              <span className="text-pink-600 block sm:inline">Legnago</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              <strong>6 servizi specializzati</strong> per ogni obiettivo: dimagrimento rapido, postura corretta, 
              cellulite, ricomposizione corporea, nutrizione e benessere mentale. <span className="text-pink-400">Scegli il tuo percorso ideale</span>.
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

          {/* FAQ Section */}
          <section className="mt-16 bg-gray-800/50 p-8 rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">
              Domande Frequenti sui Nostri Servizi
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold text-pink-400 mb-2">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

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
