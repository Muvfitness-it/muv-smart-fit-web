
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, CheckCircle, Clock, Dumbbell, TrendingUp, Heart, RefreshCw } from "lucide-react";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const EMS = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "EMS Training Legnago",
    "description": "Allenamento EMS, Vacuum, Roll Shape e Pressoterapia a Legnago. Tecnologie avanzate per dimagrimento rapido e recupero muscolare ottimale.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago"
    },
    "areaServed": "Legnago",
    "serviceType": "EMS Training",
    "offers": {
      "@type": "Offer",
      "name": "Prova Gratuita EMS",
      "description": "Prima sessione EMS gratuita con valutazione completa"
    }
  };

  return (
    <>
      <SEOOptimizer
        title="EMS Training Legnago | Elettrostimolazione, Vacuum, Pressoterapia – MUV Fitness"
        description="Allenamento EMS a Legnago: 20 minuti = 3 ore palestra. Vacuum therapy, Roll Shape, Pressoterapia. Tecnologie avanzate per dimagrimento e recupero. Prova gratuita."
        canonicalUrl="https://www.muvfitness.it/servizi/ems"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600/20 via-gray-900 to-blue-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Zap className="w-16 h-16 text-purple-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Tecnologie <span className="text-purple-500">Avanzate</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            EMS, Vacuum, Roll Shape e Pressoterapia - Il futuro del fitness e del recupero
          </p>
          <Link to="/contatti">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
              Prova le Tecnologie Avanzate
            </Button>
          </Link>
        </div>
      </section>

      {/* Technologies Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* EMS Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-purple-500">EMS</span> - Elettrostimolazione Muscolare
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-lg text-gray-300 mb-6">
                  L'EMS (Elettrostimolazione Muscolare) utilizza impulsi elettrici per attivare i muscoli 
                  durante l'allenamento, amplificando l'intensità e l'efficacia di ogni movimento.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                    <span>20 minuti = 3 ore di palestra tradizionale</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                    <span>Attiva oltre 300 muscoli contemporaneamente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                    <span>Brucia il 30% di calorie in più</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-center mb-6">Vantaggi EMS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="font-semibold">Tempo Ridotto</p>
                    <p className="text-sm text-gray-300">Solo 20 minuti</p>
                  </div>
                  <div className="text-center">
                    <Dumbbell className="w-8 h-8 text-blue-500 mx-auto mb-2" />
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
          </div>

          {/* Recovery Technologies */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Tecnologie per il <span className="text-blue-500">Recupero</span>
          </h2>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <RefreshCw className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-400 text-center">Vacuum Therapy</h3>
                <p className="text-gray-300 mb-4">Terapia del vuoto che migliora la circolazione sanguigna e linfatica, riducendo cellulite e gonfiori.</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Riduzione cellulite</li>
                  <li>• Miglioramento circolazione</li>
                  <li>• Drenaggio linfatico</li>
                  <li>• Tonificazione tessuti</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-pink-400 text-center">Roll Shape</h3>
                <p className="text-gray-300 mb-4">Massaggio meccanico con rulli che stimola la circolazione e scioglie le tensioni muscolari.</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Rilascio tensioni muscolari</li>
                  <li>• Stimolazione circolatoria</li>
                  <li>• Recupero post-allenamento</li>
                  <li>• Rilassamento profondo</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-green-400 text-center">Pressoterapia</h3>
                <p className="text-gray-300 mb-4">Compressione pneumatica sequenziale per migliorare il ritorno venoso e ridurre ritenzione idrica.</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Riduzione ritenzione idrica</li>
                  <li>• Miglioramento circolazione</li>
                  <li>• Gambe leggere</li>
                  <li>• Prevenzione varici</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Combined Benefits */}
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Protocolli Combinati</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-purple-400 mb-4">EMS + Recupero</h4>
                <p className="text-gray-300 mb-4">
                  Combiniamo l'allenamento EMS con le tecnologie di recupero per massimizzare i risultati 
                  e accelerare i tempi di guarigione.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Allenamento più intenso</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Recupero accelerato</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Risultati ottimali</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-blue-400 mb-4">Benefici Combinati</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Dimagrimento accelerato</li>
                  <li>• Tonificazione profonda</li>
                  <li>• Riduzione cellulite</li>
                  <li>• Miglioramento circolazione</li>
                  <li>• Recupero ottimale</li>
                  <li>• Benessere completo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hai poco tempo ma vuoi risultati massimi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Vuoi accelerare il dimagrimento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Soffri di cellulite e ritenzione</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Cerchi il recupero ottimale</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Risultati Tipici</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Dimagrimento visibile in 2-3 settimane</li>
                <li>• Tonificazione muscolare profonda</li>
                <li>• Riduzione significativa della cellulite</li>
                <li>• Miglioramento della circolazione</li>
                <li>• Recupero muscolare accelerato</li>
                <li>• Benessere generale aumentato</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Scopri il Futuro del Fitness</h3>
            <p className="text-lg text-gray-300 mb-6">Prova una sessione completa con le nostre tecnologie avanzate</p>
            <Link to="/contatti">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Prova Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default EMS;
