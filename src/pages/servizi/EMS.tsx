
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, CheckCircle, Clock, Muscle, TrendingUp } from "lucide-react";

const EMS = () => {
  useEffect(() => {
    document.title = "Allenamento EMS Legnago | Elettrostimolazione Muscolare – MUV Smart Fit";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Allenamento EMS a Legnago: 20 minuti = 3 ore di palestra tradizionale. Elettrostimolazione muscolare avanzata per risultati rapidi. Prova gratuita disponibile.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600/20 via-gray-900 to-blue-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Zap className="w-16 h-16 text-purple-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Tecnologia <span className="text-purple-500">EMS</span> Avanzata
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            20 minuti di EMS = 3 ore di palestra tradizionale
          </p>
          <Link to="/contatti">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
              Prova l'Allenamento EMS
            </Button>
          </Link>
        </div>
      </section>

      {/* What is EMS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Cos'è l'<span className="text-purple-500">Allenamento EMS</span>?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                L'EMS (Elettrostimolazione Muscolare) è una tecnologia rivoluzionaria che utilizza impulsi elettrici 
                per attivare i muscoli durante l'allenamento, amplificando l'intensità e l'efficacia di ogni movimento.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Attiva oltre 300 muscoli contemporaneamente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Brucia il 30% di calorie in più</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Risultati visibili in 2-3 settimane</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Vantaggi dell'EMS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="font-semibold">Tempo Ridotto</p>
                  <p className="text-sm text-gray-300">Solo 20 minuti</p>
                </div>
                <div className="text-center">
                  <Muscle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-semibold">Più Muscoli</p>
                  <p className="text-sm text-gray-300">300+ attivati</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="font-semibold">Risultati Rapidi</p>
                  <p className="text-sm text-gray-300">2-3 settimane</p>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="font-semibold">Intensità Max</p>
                  <p className="text-sm text-gray-300">+30% calorie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefici dell'<span className="text-purple-500">Allenamento EMS</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Dimagrimento Accelerato</h3>
                <p className="text-gray-300">Bruci più calorie in meno tempo. L'EMS aumenta il metabolismo fino a 24 ore dopo l'allenamento.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Tonificazione Profonda</h3>
                <p className="text-gray-300">Raggiungi anche i muscoli più profondi che normalmente non attivi con l'allenamento tradizionale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Riduzione Cellulite</h3>
                <p className="text-gray-300">Migliora la circolazione e l'aspetto della pelle grazie alla stimolazione profonda dei tessuti.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Forza Muscolare</h3>
                <p className="text-gray-300">Aumenta la forza del 30% in più rispetto all'allenamento tradizionale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Recupero Veloce</h3>
                <p className="text-gray-300">Minor stress articolare e tempi di recupero ridotti tra le sessioni.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-400">Versatilità</h3>
                <p className="text-gray-300">Perfetto per tutti i livelli di fitness, dal principiante all'atleta professionista.</p>
              </CardContent>
            </Card>
          </div>

          {/* Perfect For */}
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Perfetto Per Chi...</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Ha poco tempo ma vuole risultati massimi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Vuole accelerare il dimagrimento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Ha problemi articolari o limitazioni fisiche</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Cerca un allenamento innovativo ed efficace</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Vuole tonificare tutto il corpo rapidamente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Desidera superare i plateau di allenamento</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Scopri il Futuro del Fitness</h3>
            <p className="text-lg text-gray-300 mb-6">Prova una sessione EMS gratuita e senti la differenza dal primo allenamento</p>
            <Link to="/contatti">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Prova EMS Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EMS;
