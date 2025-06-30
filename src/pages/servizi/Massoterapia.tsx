
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HandHeart, CheckCircle, Sparkles, Heart, Zap, Shield } from "lucide-react";

const Massoterapia = () => {
  useEffect(() => {
    document.title = "Massoterapia Legnago | Massaggio Terapeutico e Benessere – MUV Smart Fit";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Massoterapia a Legnago: massaggi terapeutici, decontratturanti e rilassanti. Recupero muscolare, riduzione stress e benessere totale. Prenota il tuo trattamento.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600/20 via-gray-900 to-blue-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <HandHeart className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-green-500">Massoterapia</span> e Benessere
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Recupero muscolare, rilassamento profondo e benessere totale per corpo e mente
          </p>
          <Link to="/contatti">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Massaggio
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Massage Therapy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Il Potere del <span className="text-green-500">Tocco Terapeutico</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                La massoterapia è molto più di un semplice rilassamento. I nostri massoterapisti qualificati 
                utilizzano tecniche specifiche per accelerare il recupero muscolare, ridurre le tensioni 
                e migliorare il benessere generale.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Accelera il recupero post-allenamento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Riduce tensioni e contratture</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Migliora la circolazione sanguigna</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Benefici Immediati</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-green-500 mr-3" />
                  <span>Rilassamento profondo</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Recupero muscolare</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-purple-500 mr-3" />
                  <span>Prevenzione infortuni</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 text-yellow-400 mr-3" />
                  <span>Benessere mentale</span>
                </div>
              </div>
            </div>
          </div>

          {/* Types of Massage */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Tipologie di <span className="text-green-500">Massaggio</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Massaggio Decontratturante</h3>
                <p className="text-gray-300">Tecnica specifica per sciogliere tensioni muscolari e contratture dovute ad allenamento intenso.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Massaggio Sportivo</h3>
                <p className="text-gray-300">Preparazione pre-gara e recupero post-allenamento per atleti e sportivi.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Massaggio Rilassante</h3>
                <p className="text-gray-300">Riduzione dello stress e tensione generale per un benessere completo.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Linfodrenaggio</h3>
                <p className="text-gray-300">Stimolazione del sistema linfatico per ridurre gonfiori e migliorare la circolazione.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Massaggio Miofasciale</h3>
                <p className="text-gray-300">Tecniche specifiche per rilasciare le tensioni delle fasce muscolari.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-400">Trigger Point</h3>
                <p className="text-gray-300">Trattamento di punti specifici per eliminare dolori e tensioni localizzate.</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Benefici della Massoterapia</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-green-400 mb-4">Benefici Fisici</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Riduzione delle tensioni muscolari</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Miglioramento della flessibilità</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Accelerazione del recupero</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Prevenzione degli infortuni</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-blue-400 mb-4">Benefici Mentali</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Riduzione dello stress</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Miglioramento del sonno</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Rilassamento profondo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span>Benessere generale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hai tensioni e contratture muscolari</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Pratichi sport intensamente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Soffri di stress quotidiano</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Vuoi prevenire infortuni</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Quando Prenotare</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Dopo allenamenti intensi</li>
                <li>• In caso di dolori muscolari</li>
                <li>• Per il mantenimento del benessere</li>
                <li>• Prima di competizioni sportive</li>
                <li>• Per il rilassamento settimanale</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-green-600/20 to-blue-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Regalati un Momento di Benessere</h3>
            <p className="text-lg text-gray-300 mb-6">Prenota il tuo massaggio terapeutico e senti la differenza sul tuo corpo</p>
            <Link to="/contatti">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Massaggio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Massoterapia;
