
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Heart, Zap, Target } from "lucide-react";

const SmallGroup = () => {
  useEffect(() => {
    document.title = "Small Group Training Legnago | Allenamento di Gruppo Esclusivo – MUV Smart Fit";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Small Group Training a Legnago: massimo 3 persone per sessione. L\'energia del gruppo con l\'attenzione del personal trainer. Prenota la tua sessione.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-600/20 via-gray-900 to-orange-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Users className="w-16 h-16 text-pink-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Small Group <span className="text-pink-600">Training</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            L'energia del gruppo con l'attenzione del personal trainer - Massimo 3 persone per sessione
          </p>
          <Link to="/contatti">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full">
              Prenota Sessione di Prova
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Small Group */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Il Meglio di <span className="text-pink-600">Due Mondi</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Il Small Group Training combina l'energia motivante dell'allenamento di gruppo con l'attenzione 
                personalizzata del personal training. Con massimo 3 persone per sessione, ogni partecipante 
                riceve un programma adattato alle proprie esigenze.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Motivazione e supporto del gruppo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Attenzione personalizzata per ognuno</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Costi contenuti rispetto al personal training</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-orange-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">Vantaggi Esclusivi</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-pink-500 mr-3" />
                  <span>Ambiente sociale e divertente</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-orange-500 mr-3" />
                  <span>Maggiore intensità grazie al gruppo</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-yellow-400 mr-3" />
                  <span>Obiettivi personalizzati per tutti</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-500 mr-3" />
                  <span>Supporto reciproco e amicizie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché Scegliere il <span className="text-pink-600">Small Group Training</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Motivazione Extra</h3>
                <p className="text-gray-300">L'energia del gruppo ti spinge oltre i tuoi limiti, rendendo l'allenamento più divertente ed efficace.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">Attenzione Personalizzata</h3>
                <p className="text-gray-300">Con massimo 3 persone, il trainer può dedicare attenzione a ogni partecipante e correggere la tecnica.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Rapporto Qualità-Prezzo</h3>
                <p className="text-gray-300">Ottieni i benefici del personal training a un costo significativamente ridotto.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Varietà di Allenamenti</h3>
                <p className="text-gray-300">Combinazioni di functional training, circuit training e allenamenti tematici sempre diversi.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Supporto Sociale</h3>
                <p className="text-gray-300">Crea legami con persone che condividono i tuoi obiettivi di benessere e forma fisica.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Flessibilità</h3>
                <p className="text-gray-300">Programmi adattabili ai diversi livelli di fitness dei partecipanti.</p>
              </CardContent>
            </Card>
          </div>

          {/* How it Works */}
          <div className="bg-gradient-to-r from-pink-600/10 to-orange-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Come Funziona</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Valutazione Iniziale</h4>
                <p className="text-gray-300">Ogni partecipante viene valutato individualmente per creare un programma su misura.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Formazione Gruppi</h4>
                <p className="text-gray-300">Creiamo gruppi omogenei per livello e obiettivi, massimo 3 persone.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Allenamenti Personalizzati</h4>
                <p className="text-gray-300">Programmi diversificati che rispettano le esigenze di ogni partecipante.</p>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-pink-400 mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Ami socializzare durante l'allenamento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Cerchi motivazione extra per allenarti</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Vuoi i benefici del personal training a costi ridotti</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Ti piace la varietà negli allenamenti</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Risultati Tipici</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Maggiore consistenza negli allenamenti</li>
                <li>• Miglioramenti più rapidi grazie alla motivazione</li>
                <li>• Sviluppo di nuove amicizie e supporto sociale</li>
                <li>• Aumento della fiducia in se stessi</li>
                <li>• Divertimento durante l'esercizio fisico</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-pink-600/20 to-orange-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Unisciti al Gruppo!</h3>
            <p className="text-lg text-gray-300 mb-6">Scopri l'energia del Small Group Training. Prenota una sessione di prova gratuita</p>
            <Link to="/contatti">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Sessione di Prova
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmallGroup;
