
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle, Flower, Flame, Heart } from "lucide-react";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const Pilates = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pilates Reformer Legnago",
    "description": "Pilates con Reformer a Legnago: lezioni individuali e small group su macchinari professionali. Tonificazione, flessibilità e postura perfetta.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago"
    },
    "areaServed": "Legnago",
    "serviceType": "Pilates Reformer",
    "offers": {
      "@type": "Offer",
      "name": "Lezione Pilates Reformer",
      "description": "Lezione individuale o small group su macchinari Reformer professionali"
    }
  };

  return (
    <>
      <SEOOptimizer
        title="Pilates Reformer Legnago | Lezioni Individuali e Small Group – MUV Fitness"
        description="Pilates con Reformer a Legnago: lezioni individuali e small group su macchinari professionali. Tonificazione, flessibilità e postura perfetta. Prenota la tua lezione."
        canonicalUrl="https://www.muvfitness.it/servizi/pilates"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600/20 via-gray-900 to-pink-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Star className="w-16 h-16 text-purple-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Pilates con <span className="text-purple-500">Reformer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Il metodo originale Pilates su macchinari professionali per un corpo tonico e flessibile
          </p>
          <Link to="/contatti">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Lezione di Prova
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Pilates Reformer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Il Vero <span className="text-purple-500">Pilates Reformer</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Il Reformer è il macchinario originale ideato da Joseph Pilates. Utilizza un sistema di molle 
                e cavi che permette di eseguire movimenti fluidi e controllati, adattandosi perfettamente 
                alle capacità di ogni persona.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Allenamento a basso impatto ma alta intensità</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Sviluppo della forza profonda del core</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Miglioramento posturale e flessibilità</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Benefici Unici</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Flower className="w-6 h-6 text-purple-500 mr-3" />
                  <span>Corpo più lungo e snello</span>
                </div>
                <div className="flex items-center">
                  <Flame className="w-6 h-6 text-pink-500 mr-3" />
                  <span>Tonificazione senza volume</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  <span>Miglioramento della postura</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 mr-3" />
                  <span>Equilibrio e coordinazione</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché Scegliere il <span className="text-purple-500">Pilates Reformer</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Tonificazione Profonda</h3>
                <p className="text-gray-300">Lavora su tutti i gruppi muscolari in modo equilibrato, creando un fisico tonico ma elegante.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Flessibilità Aumentata</h3>
                <p className="text-gray-300">Allunga e rafforza i muscoli contemporaneamente per un corpo più flessibile e funzionale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Core Stability</h3>
                <p className="text-gray-300">Rinforza il "powerhouse" del corpo migliorando stabilità e controllo motorio.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Riabilitazione Sicura</h3>
                <p className="text-gray-300">Ideale per il recupero da infortuni e la prevenzione di problematiche fisiche.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Mente-Corpo</h3>
                <p className="text-gray-300">Connessione profonda tra movimento, respirazione e concentrazione mentale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-400">Risultati Duraturi</h3>
                <p className="text-gray-300">Cambiamenti posturali e di forza che si mantengono nel tempo.</p>
              </CardContent>
            </Card>
          </div>

          {/* Perfect For */}
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Perfetto Per...</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Donne che vogliono tonificare senza "ingrossare"</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Chi soffre di mal di schiena cronico</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Atleti che vogliono migliorare le performance</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Over 50 che cercano un movimento sicuro ed efficace</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Riabilitazione post-infortunio o post-parto</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                  <span>Chi cerca equilibrio tra mente e corpo</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Types of Lessons */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Lezioni Individuali</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Programma completamente personalizzato</li>
                <li>• Attenzione dedicata al 100%</li>
                <li>• Progressione adattata alle tue capacità</li>
                <li>• Ideale per principianti o esigenze specifiche</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-pink-400 mb-4">Small Group (2-3 persone)</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Energia motivante del gruppo</li>
                <li>• Costi più contenuti</li>
                <li>• Attenzione comunque personalizzata</li>
                <li>• Perfetto per amiche o coppie</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Scopri il Pilates Autentico</h3>
            <p className="text-lg text-gray-300 mb-6">Prenota una lezione di prova e scopri come il Reformer può trasformare il tuo corpo</p>
            <Link to="/contatti">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Lezione di Prova
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Pilates;
