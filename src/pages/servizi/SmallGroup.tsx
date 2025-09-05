
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Heart, Zap, Target, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getServiceSchema, getFAQSchema } from "@/utils/seoSchemas";

const SmallGroup = () => {
  const faqs = [
    {
      question: "Quante persone al massimo in un HIIT Small Group?",
      answer: "Massimo 3 persone per sessione per garantire attenzione personalizzata mantenendo l'energia motivante del gruppo."
    },
    {
      question: "È adatto ai principianti l'HIIT Small Group?",
      answer: "Sì, ogni esercizio viene adattato al livello dei partecipanti. Il trainer personalizza intensità e movimenti per tutti."
    },
    {
      question: "Quanto dura una sessione HIIT Small Group?",
      answer: "Ogni sessione dura 45 minuti: 10 minuti riscaldamento, 25 minuti HIIT intenso, 10 minuti defaticamento e stretching."
    },
    {
      question: "Posso partecipare con amici o familiari?",
      answer: "Assolutamente sì! È perfetto per allenarsi con amici, partner o familiari condividendo motivazione e divertimento."
    }
  ];

  const structuredData = [
    getServiceSchema("HIIT Small Group Legnago", "HIIT Small Group a Legnago: massimo 3 persone per sessione. Allenamento ad alta intensità con l'energia del gruppo. Cardio, forza e divertimento.", "https://www.muvfitness.it/servizi/small-group"),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="HIIT Small Group Legnago | Allenamento di Gruppo ad Alta Intensità – MUV Fitness"
        description="HIIT Small Group a Legnago: massimo 3 persone per sessione. Allenamento ad alta intensità con l'energia del gruppo. Cardio, forza e divertimento."
        keywords="HIIT small group legnago, allenamento gruppo alta intensità, fitness gruppo verona, hiit motivazionale"
        structuredData={structuredData}
      />
      
      <Navigation />
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600/20 via-gray-900 to-red-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Users className="w-16 h-16 text-orange-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            HIIT <span className="text-orange-600">Small Group</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Alta intensità in piccoli gruppi - Massimo 3 persone per l'energia perfetta
          </p>
          <Link to="/contatti">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full">
              Unisciti al Gruppo HIIT
            </Button>
          </Link>
        </div>
      </section>

      {/* What is HIIT Small Group */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                HIIT con l'<span className="text-orange-600">Energia del Gruppo</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Il HIIT Small Group combina l'intensità dell'allenamento ad alta intensità con la motivazione 
                del gruppo. Con massimo 3 persone per sessione, ogni partecipante riceve attenzione personalizzata 
                mentre si allena in un ambiente energico e stimolante.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Allenamento HIIT personalizzato</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Motivazione extra del gruppo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Risultati accelerati</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Vantaggi Esclusivi</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-orange-500 mr-3" />
                  <span>Intensità HIIT ottimale</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  <span>Cardio e forza combinati</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-yellow-400 mr-3" />
                  <span>Obiettivi di gruppo</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
                  <span>Performance migliorate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché Scegliere <span className="text-orange-600">HIIT Small Group</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">Brucia Grassi Massimo</h3>
                <p className="text-gray-300">Il HIIT in gruppo amplifica l'effetto brucia-grassi, continuando a bruciare calorie per ore dopo l'allenamento.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Motivazione Contagiosa</h3>
                <p className="text-gray-300">L'energia del gruppo ti spinge oltre i tuoi limiti, rendendo ogni sessione una sfida divertente.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Varietà Continua</h3>
                <p className="text-gray-300">Ogni sessione è diversa con esercizi sempre nuovi per non annoiarsi mai.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Resistenza e Forza</h3>
                <p className="text-gray-300">Migliora simultaneamente capacità cardiovascolare e forza muscolare.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Supporto Sociale</h3>
                <p className="text-gray-300">Crea legami con persone che condividono la tua passione per le sfide.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Tempo Efficiente</h3>
                <p className="text-gray-300">Massimi risultati in 30-45 minuti di allenamento intenso.</p>
              </CardContent>
            </Card>
          </div>

          {/* Workout Structure */}
          <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Come Funziona una Sessione</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Warm-Up</h4>
                <p className="text-gray-300 text-sm">Riscaldamento dinamico per preparare il corpo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">HIIT Cardio</h4>
                <p className="text-gray-300 text-sm">Intervalli ad alta intensità per il sistema cardiovascolare</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Strength</h4>
                <p className="text-gray-300 text-sm">Esercizi di forza funzionale</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Cool Down</h4>
                <p className="text-gray-300 text-sm">Defaticamento e stretching</p>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Ami le sfide e l'adrenalina</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Vuoi dimagrire velocemente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Cerchi motivazione extra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hai poco tempo disponibile</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Risultati Tipici</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Dimagrimento accelerato (3-5kg/mese)</li>
                <li>• Miglioramento resistenza cardiovascolare</li>
                <li>• Aumento forza e potenza</li>
                <li>• Maggiore fiducia in se stessi</li>
                <li>• Divertimento e socializzazione</li>
                <li>• Abitudini di allenamento solide</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Sfida Te Stesso in Gruppo!</h3>
            <p className="text-lg text-gray-300 mb-6">Unisciti al nostro HIIT Small Group e scopri di cosa sei capace</p>
            <Link to="/contatti">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Sessione HIIT
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

export default SmallGroup;
