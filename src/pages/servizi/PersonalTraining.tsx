import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, CheckCircle, Star, Users, Clock, Target } from "lucide-react";
const PersonalTraining = () => {
  useEffect(() => {
    document.title = "Personal Training Legnago | Allenamento Personalizzato 1-to-1 – MUV Smart Fit";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Personal Training esclusivo a Legnago con risultati garantiti in 30 giorni. Allenamenti 1-to-1 personalizzati, ambiente riservato, zero code. Prenota la tua prova gratuita.');
    }
  }, []);
  return <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-600/20 via-gray-900 to-purple-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Dumbbell className="w-16 h-16 text-pink-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Personal Training <span className="text-pink-600">Esclusivo</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Risultati garantiti in 30 giorni con allenamenti 1-to-1 completamente personalizzati
          </p>
          <Link to="/contatti">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Prova Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché Scegliere il Nostro <span className="text-pink-600">Personal Training</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-fuchsia-500">Programma Su Misura</h3>
                <p className="text-gray-300">Ogni allenamento è progettato specificamente per i tuoi obiettivi, il tuo livello e le tue esigenze.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-fuchsia-500">Ambiente Esclusivo</h3>
                <p className="text-gray-300">Zero code, massima privacy. Ti alleni in un ambiente riservato con attenzione dedicata.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-fuchsia-500">Risultati Rapidi</h3>
                <p className="text-gray-300">I nostri clienti perdono mediamente 3-5kg al mese e vedono risultati visibili in 2 settimane.</p>
              </CardContent>
            </Card>
          </div>

          {/* Metodologia */}
          <div className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">La Nostra Metodologia</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-pink-400 mb-4">1. Valutazione Iniziale Completa</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Analisi composizione corporea</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Test funzionali e posturali</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Definizione obiettivi SMART</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-purple-400 mb-4">2. Programmazione Personalizzata</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Allenamenti adattati alle tue capacità</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Progressione scientifica</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />Monitoraggio costante</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Risultati */}
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Risultati <span className="text-pink-600">Garantiti</span></h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-pink-600 mb-2">-5kg</div>
                <p className="text-gray-300">Media perdita peso primo mese</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-500 mb-2">95%</div>
                <p className="text-gray-300">Clienti soddisfatti</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-500 mb-2">30 giorni</div>
                <p className="text-gray-300">Per vedere i primi risultati</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Pronto a Trasformare il Tuo Corpo?</h3>
            <p className="text-lg text-gray-300 mb-6">Prenota una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi</p>
            <Link to="/contatti">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Consulenza Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>;
};
export default PersonalTraining;