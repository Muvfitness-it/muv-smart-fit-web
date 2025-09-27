import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Activity, Heart, Users, TrendingUp, Brain, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import BreadcrumbNavigation from '@/components/SEO/BreadcrumbNavigation';
import CTASection from '@/components/ui/CTASection';
import { getServiceSchema, getFAQSchema } from '@/utils/seoSchemas';

const Servizi = () => {
  const servizi = [
    {
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-600 mb-3 sm:mb-4" />,
      title: "EMS Dimagrimento",
      subtitle: "Perdi peso in 20 minuti",
      description: "Elettrostimolazione avanzata per dimagrimento rapido. Bruci 600 calorie in 20 minuti reali.",
      benefits: ["✅ -5kg in 30 giorni garantiti", "✅ 600 calorie bruciate/sessione", "✅ Zero stress articolare", "✅ Risultati dalla 1° settimana"],
      metrics: "-5kg in 30 giorni",
      price: "Da 80€/sessione",
      link: "/servizi/ems"
    },
    {
      icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 mb-3 sm:mb-4" />,
      title: "Pancafit Posturale",
      subtitle: "Addio mal di schiena",
      description: "Riallineamento posturale globale. Elimina dolori lombari e cervicali definitivamente.",
      benefits: ["✅ Dolore ridotto in 2 settimane", "✅ Postura corretta permanente", "✅ Respirazione migliorata", "✅ Più energia quotidiana"],
      metrics: "Dolore ridotto 80% in 2 settimane",
      price: "Da 60€/sessione",
      link: "/servizi/pancafit"
    },
    {
      icon: <Activity className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 mb-3 sm:mb-4" />,
      title: "Pilates Reformer",
      subtitle: "Core forte, corpo stabile",
      description: "Rafforzamento core e stabilizzazione profonda con macchinari professionali Pilates.",
      benefits: ["✅ Core 300% più forte", "✅ Stabilità lombare perfetta", "✅ Mobilità articolare ottimale", "✅ Equilibrio migliorato"],
      metrics: "Core +300% di forza in 8 settimane",
      price: "Da 65€/sessione",
      link: "/servizi/pilates"
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500 mb-3 sm:mb-4" />,
      title: "Vacuum + Pressoterapia",
      subtitle: "Cellulite addio per sempre",
      description: "Eliminazione cellulite e rimodellamento corporeo con tecnologie medicali avanzate.",
      benefits: ["✅ Cellulite ridotta 70%", "✅ Circonferenze -8cm", "✅ Pelle visibilmente più tonica", "✅ Ritenzione idrica eliminata"],
      metrics: "Cellulite -70% in 6 settimane",
      price: "Da 50€/sessione",
      link: "/servizi/vacuum-pressoterapia"
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-600 mb-3 sm:mb-4" />,
      title: "Personal Training 1:1",
      subtitle: "Il tuo coach esclusivo",
      description: "Allenamento personalizzato con coach dedicato. Risultati misurabili e programmazione scientifica.",
      benefits: ["✅ Programma 100% personalizzato", "✅ Tecnica perfetta garantita", "✅ Motivazione costante", "✅ Obiettivi raggiunti certi"],
      metrics: "Obiettivi raggiunti nel 95% dei casi",
      price: "Da 70€/sessione",
      link: "/servizi/personal-training"
    },
    {
      icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-600 mb-3 sm:mb-4" />,
      title: "Nutrizione + Psicocoach",
      subtitle: "Trasformazione completa",
      description: "Approccio integrato alimentazione e mindset per cambiamenti duraturi e sostenibili.",
      benefits: ["✅ Piano alimentare personalizzato", "✅ Supporto psicologico continuo", "✅ Abitudini sane permanenti", "✅ Relazione sana col cibo"],
      metrics: "Cambiamento permanente nel 90% dei casi",
      price: "Da 90€/sessione",
      link: "/servizi/nutrizione-psicocoach-legnago"
    }
  ];

  const faqs = [
    {
      question: "Quale servizio è più adatto per dimagrire velocemente?",
      answer: "L'EMS è perfetto per il dimagrimento rapido: in 45 minuti attivi tutti i muscoli con un'intensità impossibile da raggiungere con l'allenamento tradizionale. Combina resistenza e cardio per massimizzare il consumo calorico."
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
    <div className="min-h-screen bg-background text-foreground">
      <UnifiedSEOHead
        title="Servizi MUV Fitness Legnago – EMS, Pancafit, Pilates, Vacuum, Nutrizione"
        description="6 servizi specializzati per fitness intelligente: EMS, Pancafit, Pilates Reformer, Vacuum+Pressoterapia, Personal Training, Nutrizione e Psicocoach. Scegli il tuo percorso ideale."
        keywords="servizi fitness legnago, ems legnago, pilates legnago, personal trainer legnago, pancafit legnago, massoterapia legnago, nutrizione legnago"
        canonicalUrl="https://www.muvfitness.it/servizi"
        structuredData={structuredData}
      />

      <BreadcrumbNavigation />

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Servizi di Fitness Intelligente a{" "}
              <span className="text-primary block sm:inline">Legnago</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              <strong>6 servizi specializzati</strong> per ogni obiettivo: dimagrimento rapido, postura corretta, 
              cellulite, ricomposizione corporea, nutrizione e benessere mentale. <span className="text-primary">Scegli il tuo percorso ideale</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {servizi.map((servizio, index) => (
              <Link to={servizio.link} key={index} className="group">
                <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105 h-full min-h-[44px] focus-within:ring-4 focus-within:ring-pink-600/50">
                  <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col relative">
                    {/* Icon */}
                    <div className="flex justify-center mb-4" aria-hidden="true">{servizio.icon}</div>
                    
                    {/* Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{servizio.title}</h3>
                    <p className="text-pink-400 font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">{servizio.subtitle}</p>
                    
                    {/* Metrics Badge */}
                    <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-full px-3 py-1 text-green-400 text-xs font-bold mb-3 mx-auto">
                      {servizio.metrics}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base flex-grow">{servizio.description}</p>
                    
                    {/* Benefits List */}
                    <div className="text-xs sm:text-sm text-left mb-4 space-y-1">
                      {servizio.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start text-green-400 font-medium">
                          <CheckCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit.replace('✅ ', '')}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Price */}
                    <div className="text-white font-bold text-sm mb-4 bg-gray-700/50 rounded-lg px-3 py-2">
                      {servizio.price}
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-center text-pink-400 group-hover:text-white transition-colors mt-auto">
                      <span className="mr-2 font-semibold">Scopri di più</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

          {/* CTA Section Finale */}
          <CTASection
            title="Non Sai Quale Servizio Scegliere?"
            subtitle="Prenota una consulenza gratuita e scopriremo insieme il percorso perfetto per i tuoi obiettivi specifici"
            urgencyText="Solo 3 posti disponibili questa settimana!"
            variant="primary"
          />
        </div>
      </section>
    </div>
  );
};

export default Servizi;
