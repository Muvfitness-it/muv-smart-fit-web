
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, CheckCircle, Heart, Target, Lightbulb, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getServiceSchema, getFAQSchema } from "@/utils/seoSchemas";

const Psicologo = () => {
  const faqs = [
    {
      question: "Come può aiutarmi lo psicologo per il fitness?",
      answer: "Lo psicologo del fitness ti aiuta a superare blocchi mentali, mantenere la motivazione, costruire abitudini durature e migliorare il rapporto con il tuo corpo."
    },
    {
      question: "È solo per persone con problemi psicologici?",
      answer: "Assolutamente no! Il coaching psicologico è per chiunque voglia ottimizzare le proprie performance mentali e raggiungere obiettivi fitness con maggiore facilità."
    },
    {
      question: "Quanto durano le sessioni di coaching psicologico?",
      answer: "Le sessioni durano solitamente 50 minuti. La frequenza viene personalizzata in base ai tuoi obiettivi e può variare da settimanale a mensile."
    },
    {
      question: "Il supporto psicologico è integrato con l'allenamento?",
      answer: "Sì, lavoriamo in sinergia con i personal trainer per creare un approccio olistico che unisce benessere mentale e fisico per risultati ottimali."
    }
  ];

  const structuredData = [
    getServiceSchema("Psicologo Legnago", "Psicologo e coaching motivazionale a Legnago. Supporto psicologico per raggiungere i tuoi obiettivi fitness e superare le barriere mentali.", "https://www.muvfitness.it/servizi/psicologo"),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Psicologo Legnago | Coaching Motivazionale Fitness – MUV Fitness"
        description="Psicologo e coaching motivazionale a Legnago. Supporto psicologico per raggiungere i tuoi obiettivi fitness e superare le barriere mentali. Consulenza gratuita."
        keywords="psicologo legnago, coaching motivazionale, supporto psicologico fitness, mindset benessere, psicologo sport verona"
        structuredData={structuredData}
      />
      
      <Navigation />
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600/20 via-gray-900 to-purple-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Coaching <span className="text-blue-500">Psicologico</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Supporto mentale per raggiungere i tuoi obiettivi fitness e superare ogni barriera
          </p>
          <Link to="/contatti">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Consulenza Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Psychological Coaching */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Il Potere della <span className="text-blue-500">Mente</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Il successo nel fitness inizia dalla mente. Il nostro psicologo specializzato in sport e benessere 
                ti aiuta a superare blocchi mentali, costruire abitudini durature e mantenere la motivazione 
                per raggiungere i tuoi obiettivi.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Superamento di blocchi e paure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Costruzione di abitudini positive</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Mantenimento della motivazione</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Aree di Intervento</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Definizione obiettivi realistici</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-pink-500 mr-3" />
                  <span>Gestione dello stress e ansia</span>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
                  <span>Cambio di mindset</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-green-500 mr-3" />
                  <span>Miglioramento autostima</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Servizi di <span className="text-blue-500">Coaching Psicologico</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Sessioni Individuali</h3>
                <p className="text-gray-300">Percorsi personalizzati per affrontare specifiche sfide mentali legate al fitness e benessere.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Coaching Motivazionale</h3>
                <p className="text-gray-300">Tecniche per mantenere alta la motivazione e superare i momenti di difficoltà.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Gestione dello Stress</h3>
                <p className="text-gray-300">Strategie per ridurre stress e ansia che possono ostacolare i tuoi progressi.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Cambiamento Abitudini</h3>
                <p className="text-gray-300">Supporto psicologico per costruire e mantenere abitudini salutari durature.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Autostima e Fiducia</h3>
                <p className="text-gray-300">Lavoro sull'immagine corporea e sulla fiducia in se stessi.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-400">Performance Mentale</h3>
                <p className="text-gray-300">Ottimizzazione delle performance attraverso tecniche di visualizzazione e concentrazione.</p>
              </CardContent>
            </Card>
          </div>

          {/* How it Works */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Come Funziona</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Valutazione Iniziale</h4>
                <p className="text-gray-300">Analisi della situazione attuale e definizione degli obiettivi psicologici.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Piano Personalizzato</h4>
                <p className="text-gray-300">Creazione di un percorso su misura con tecniche specifiche.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Supporto Continuo</h4>
                <p className="text-gray-300">Monitoraggio progressi e supporto costante nel raggiungimento degli obiettivi.</p>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hai difficoltà a mantenere la motivazione</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Soffri di ansia legata all'allenamento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Vuoi migliorare la tua autostima</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hai blocchi mentali sui tuoi obiettivi</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Risultati Tipici</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Maggiore motivazione e costanza</li>
                <li>• Riduzione di stress e ansia</li>
                <li>• Miglioramento dell'autostima</li>
                <li>• Abitudini più solide e durature</li>
                <li>• Maggiore soddisfazione personale</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Inizia il Tuo Cambiamento Mentale</h3>
            <p className="text-lg text-gray-300 mb-6">Prenota una consulenza gratuita e scopri come superare ogni barriera</p>
            <Link to="/contatti">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Consulenza Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default Psicologo;
