
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle, Brain, Apple, Heart, TrendingUp } from "lucide-react";

const Nutrizione = () => {
  useEffect(() => {
    document.title = "Consulenza Nutrizionale e Coaching Psicologico Legnago – MUV Smart Fit";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Consulenza nutrizionale e coaching psicologico a Legnago. Piani alimentari sostenibili e supporto mentale per risultati duraturi. Prenota la tua consulenza.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600/20 via-gray-900 to-blue-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Target className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Consulenza <span className="text-green-500">Nutrizionale</span><br />
            e <span className="text-blue-500">Coaching Psicologico</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Piani alimentari sostenibili e supporto mentale per una trasformazione completa e duratura
          </p>
          <Link to="/contatti">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Consulenza Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Un Approccio <span className="text-green-500">Completo</span> e <span className="text-blue-500">Integrato</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Non crediamo nelle diete estreme o nei sacrifici insostenibili. Il nostro approccio integra 
                nutrizione e psicologia per creare cambiamenti duraturi nel tempo, lavorando sia sul corpo 
                che sulla mente.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Educazione alimentare, non diete temporanee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Supporto psicologico per superare blocchi mentali</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Strategie sostenibili a lungo termine</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Il Nostro Metodo</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Apple className="w-6 h-6 text-green-500 mr-3" />
                  <span>Nutrizione personalizzata</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Coaching mentale</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  <span>Benessere emotivo</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-purple-500 mr-3" />
                  <span>Risultati misurabili</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            I Nostri <span className="text-green-500">Servizi</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Apple className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-2xl font-bold text-green-400">Consulenza Nutrizionale</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Analisi della composizione corporea</li>
                  <li>• Piano alimentare personalizzato</li>
                  <li>• Educazione nutrizionale</li>
                  <li>• Ricette e menu settimanali</li>
                  <li>• Monitoraggio e adattamenti</li>
                  <li>• Gestione di intolleranze e allergie</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-400">Coaching Psicologico</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Gestione dello stress e ansia</li>
                  <li>• Superamento del rapporto disfunzionale con il cibo</li>
                  <li>• Motivazione e autostima</li>
                  <li>• Tecniche di rilassamento</li>
                  <li>• Gestione delle emozioni</li>
                  <li>• Creazione di abitudini positive</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Benefici dell'Approccio Integrato</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-green-400">Perdita di Peso Sostenibile</h4>
                <p className="text-gray-300">Dimagrimento graduale e duraturo senza rinunce estreme o effetti yo-yo.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-blue-400">Miglioramento dell'Umore</h4>
                <p className="text-gray-300">Riduzione di stress, ansia e miglioramento del benessere mentale generale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-purple-400">Energia e Vitalità</h4>
                <p className="text-gray-300">Aumento dei livelli energetici e miglioramento della qualità del sonno.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-pink-400">Autostima</h4>
                <p className="text-gray-300">Maggiore fiducia in se stessi e miglioramento dell'immagine corporea.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-yellow-400">Abitudini Sane</h4>
                <p className="text-gray-300">Creazione di routine alimentari e comportamentali che durano nel tempo.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-indigo-400">Salute Ottimale</h4>
                <p className="text-gray-300">Miglioramento dei parametri ematici e riduzione del rischio di malattie.</p>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Il Nostro Percorso</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Valutazione Iniziale</h4>
                <p className="text-sm text-gray-300">Analisi completa di stato fisico, abitudini e obiettivi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Piano Personalizzato</h4>
                <p className="text-sm text-gray-300">Creazione di strategie nutrizionali e psicologiche su misura</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Monitoraggio</h4>
                <p className="text-sm text-gray-300">Controlli regolari e adattamenti del piano</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Mantenimento</h4>
                <p className="text-sm text-gray-300">Supporto per mantenere i risultati a lungo termine</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-green-600/20 to-blue-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Inizia la Tua Trasformazione Completa</h3>
            <p className="text-lg text-gray-300 mb-6">Prenota una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi</p>
            <Link to="/contatti">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Consulenza Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nutrizione;
