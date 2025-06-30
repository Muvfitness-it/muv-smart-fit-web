
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, CheckCircle, Clock, TrendingUp, Target, Heart } from "lucide-react";

const HIIT = () => {
  useEffect(() => {
    document.title = "HIIT Legnago | Allenamento ad Alta Intensità – MUV Smart Fit";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Allenamento HIIT a Legnago: cardio e performance ad alta intensità. Brucia grassi, migliora la resistenza e aumenta le performance. Prova gratuita disponibile.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600/20 via-gray-900 to-red-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Zap className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Allenamento <span className="text-orange-500">HIIT</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Cardio e Performance ad Alta Intensità - Massimi risultati in minimo tempo
          </p>
          <Link to="/contatti">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full">
              Prova HIIT Gratuito
            </Button>
          </Link>
        </div>
      </section>

      {/* What is HIIT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Cos'è l'<span className="text-orange-500">Allenamento HIIT</span>?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                HIIT (High Intensity Interval Training) è un metodo di allenamento che alterna brevi periodi 
                di esercizio ad alta intensità a periodi di recupero. È il modo più efficace per migliorare 
                il sistema cardiovascolare e bruciare grassi.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Brucia grassi fino a 24 ore dopo l'allenamento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Migliora la capacità cardiovascolare del 15%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Aumenta il metabolismo basale</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Vantaggi HIIT</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="font-semibold">Tempo Efficiente</p>
                  <p className="text-sm text-gray-300">30-45 minuti</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="font-semibold">Brucia Grassi</p>
                  <p className="text-sm text-gray-300">24h dopo</p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <p className="font-semibold">Cardio Potente</p>
                  <p className="text-sm text-gray-300">+15% capacità</p>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="font-semibold">Performance</p>
                  <p className="text-sm text-gray-300">Atletica</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefici dell'<span className="text-orange-500">Allenamento HIIT</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">Dimagrimento Rapido</h3>
                <p className="text-gray-300">Bruci più calorie in meno tempo e continui a bruciare anche dopo l'allenamento.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Resistenza Cardiovascolare</h3>
                <p className="text-gray-300">Migliora significativamente la capacità del cuore e dei polmoni.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Performance Atletiche</h3>
                <p className="text-gray-300">Aumenta velocità, potenza e resistenza per ogni sport.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Metabolismo Accelerato</h3>
                <p className="text-gray-300">Aumenta il metabolismo basale per bruciare più calorie a riposo.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Efficienza Temporale</h3>
                <p className="text-gray-300">Risultati superiori alla corsa tradizionale in metà del tempo.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Versatilità</h3>
                <p className="text-gray-300">Adattabile a tutti i livelli di fitness e obiettivi specifici.</p>
              </CardContent>
            </Card>
          </div>

          {/* Perfect For */}
          <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Perfetto Per Chi...</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Vuole dimagrire velocemente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Ha poco tempo per allenarsi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Vuole migliorare le performance sportive</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Cerca un allenamento stimolante</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Vuole superare i plateau</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Ama le sfide fisiche</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Sfida Te Stesso</h3>
            <p className="text-lg text-gray-300 mb-6">Prova un allenamento HIIT gratuito e scopri di cosa sei capace</p>
            <Link to="/contatti">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota HIIT Gratuito
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HIIT;
