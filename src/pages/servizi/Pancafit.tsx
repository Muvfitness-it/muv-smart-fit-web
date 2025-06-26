
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, CheckCircle, User, Shield, Target } from "lucide-react";

const Pancafit = () => {
  useEffect(() => {
    document.title = "Pancafit Legnago | Mal di Schiena, Postura, Riallineamento – MUV Smart Fit";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Pancafit a Legnago per eliminare il mal di schiena e migliorare la postura. 95% di successo nel risolvere dolori cronici. Prenota la tua sessione.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600/20 via-gray-900 to-green-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Heart className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-blue-500">Pancafit</span> per Mal di Schiena
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            95% di successo nell'eliminare i dolori cronici e riallineare la postura
          </p>
          <Link to="/contatti">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Valutazione Posturale
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Pancafit */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Cos'è il <span className="text-blue-500">Metodo Pancafit</span>?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Pancafit è un metodo di riequilibrio posturale che agisce sulle catene muscolari e fasciali 
                per eliminare le tensioni e i compensi che causano dolore e limitazioni funzionali.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Elimina le cause del dolore, non solo i sintomi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Ripristina l'equilibrio muscolo-scheletrico</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Migliora la funzionalità generale del corpo</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-green-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Problemi che Risolviamo</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Mal di schiena cronico</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-green-400 mr-3" />
                  <span>Cervicalgia e torcicollo</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Lombalgia e sciatalgia</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-green-400 mr-3" />
                  <span>Dolori articolari</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Tensioni muscolari</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefici del <span className="text-blue-500">Metodo Pancafit</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Eliminazione del Dolore</h3>
                <p className="text-gray-300">Risoluzione definitiva di dolori cronici che limitano la qualità della vita.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Postura Corretta</h3>
                <p className="text-gray-300">Riallineamento della colonna vertebrale e miglioramento della postura generale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Maggiore Flessibilità</h3>
                <p className="text-gray-300">Aumento significativo dell'elasticità muscolare e della mobilità articolare.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Benessere Generale</h3>
                <p className="text-gray-300">Miglioramento della qualità del sonno e riduzione dello stress fisico.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Prevenzione</h3>
                <p className="text-gray-300">Prevenzione di future problematiche e mantenimento dei risultati ottenuti.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-400">Approccio Globale</h3>
                <p className="text-gray-300">Trattamento dell'intera catena muscolo-fasciale, non solo del sintomo locale.</p>
              </CardContent>
            </Card>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-blue-600/10 to-green-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Risultati Comprovati</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">95%</div>
                <p className="text-gray-300">Successo nell'eliminare il dolore</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">3-5</div>
                <p className="text-gray-300">Sessioni per vedere miglioramenti</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-500 mb-2">100%</div>
                <p className="text-gray-300">Clienti soddisfatti del trattamento</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600/20 to-green-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Libertati dal Dolore</h3>
            <p className="text-lg text-gray-300 mb-6">Prenota una valutazione posturale gratuita e scopri come Pancafit può aiutarti</p>
            <Link to="/contatti">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Valutazione Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pancafit;
