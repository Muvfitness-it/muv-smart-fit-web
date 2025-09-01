import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle, Brain, Apple, Heart, TrendingUp, Users, Lightbulb } from "lucide-react";
import { Helmet } from "react-helmet";

const NutrizionePsicocoach = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Nutrizione e Psicocoach Legnago – Approccio Integrato MUV Fitness</title>
        <meta name="description" content="Nutrizione e psicocoach integrato a Legnago. Piani alimentari personalizzati e supporto psicologico per una trasformazione completa e duratura. Consulenza gratuita." />
        <link rel="canonical" href="https://www.muvfitness.it/servizi/nutrizione-psicocoach-legnago/" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600/20 via-gray-900 to-purple-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Apple className="w-12 h-12 text-green-500" />
              <Brain className="w-16 h-16 text-indigo-500" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-green-500">Nutrizione</span> & <span className="text-indigo-500">Psicocoach</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            L'approccio completo che unisce <strong>alimentazione sana</strong> e <strong>supporto mentale</strong> 
            per una trasformazione duratura nel tempo
          </p>
          <Link to="/contatti">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
              Prenota Consulenza Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Perché Insieme */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Perché <span className="text-indigo-500">Nutrizione e Mente</span> Insieme?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Il <strong>70% dei fallimenti</strong> nelle diete è dovuto a fattori psicologici. 
              Ecco perché il nostro approccio integrato garantisce risultati duraturi.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-red-600/10 to-orange-600/10 border-red-600/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-3">Approccio Tradizionale</h3>
                <ul className="text-sm text-gray-300 space-y-2 text-left">
                  <li>• Solo dieta restrittiva</li>
                  <li>• Nessun supporto mentale</li>
                  <li>• Effetto yo-yo garantito</li>
                  <li>• Stress e frustrazione</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/10 to-indigo-600/10 border-green-600/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Il Nostro Metodo</h3>
                <ul className="text-sm text-gray-300 space-y-2 text-left">
                  <li>• Educazione alimentare</li>
                  <li>• Supporto psicologico</li>
                  <li>• Cambiamento delle abitudini</li>
                  <li>• Risultati duraturi</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border-indigo-600/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-3">Risultati</h3>
                <ul className="text-sm text-gray-300 space-y-2 text-left">
                  <li>• -15kg in 6 mesi (media)</li>
                  <li>• 95% mantiene i risultati</li>
                  <li>• Miglioramento benessere</li>
                  <li>• Autostima potenziata</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Cosa Include il Servizio */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Cosa Include il Nostro <span className="text-indigo-500">Servizio Integrato</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Apple className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-2xl font-bold text-green-400">Consulenza Nutrizionale</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span><strong>Analisi composizione corporea</strong> completa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span><strong>Piano alimentare personalizzato</strong> sui tuoi gusti</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span><strong>Ricette e menu settimanali</strong> pratici</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span><strong>Gestione intolleranze</strong> e allergie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <span><strong>Controlli mensili</strong> e adattamenti</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-indigo-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-indigo-500 mr-3" />
                  <h3 className="text-2xl font-bold text-indigo-400">Psicocoach Specializzato</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" />
                    <span><strong>Gestione fame emotiva</strong> e stress</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" />
                    <span><strong>Superamento blocchi mentali</strong> e sabotaggio</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" />
                    <span><strong>Costruzione abitudini positive</strong> durature</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" />
                    <span><strong>Motivazione e autostima</strong> potenziata</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" />
                    <span><strong>Tecniche di rilassamento</strong> e mindfulness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Il Nostro Percorso */}
          <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Il Nostro <span className="text-indigo-400">Percorso Integrato</span></h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-green-400">Valutazione 360°</h4>
                <p className="text-sm text-gray-300">Analisi fisica, psicologica e delle abitudini alimentari</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-indigo-400">Piano Integrato</h4>
                <p className="text-sm text-gray-300">Strategia nutrizionale + supporto psicologico personalizzato</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-purple-400">Monitoraggio</h4>
                <p className="text-sm text-gray-300">Controlli settimanali e adattamenti costanti</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-pink-400">Autonomia</h4>
                <p className="text-sm text-gray-300">Mantenimento risultati e gestione autonoma</p>
              </div>
            </div>
          </div>

          {/* Benefici Scientificamente Provati */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Benefici <span className="text-indigo-500">Scientificamente Provati</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3 text-green-400">Perdita Peso Duratura</h4>
                <p className="text-gray-300">Dimagrimento graduale (-2-4kg/mese) senza effetto yo-yo</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-indigo-500 transition-colors">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3 text-indigo-400">Benessere Mentale</h4>
                <p className="text-gray-300">Riduzione stress, ansia e miglioramento dell'umore</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
              <CardContent className="p-6 text-center">
                <Lightbulb className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3 text-purple-400">Energia Vitale</h4>
                <p className="text-gray-300">Aumento energia, concentrazione e qualità del sonno</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-pink-500 transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3 text-pink-400">Autostima Potenziata</h4>
                <p className="text-gray-300">Miglioramento immagine corporea e fiducia in sé</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3 text-yellow-400">Abitudini Solide</h4>
                <p className="text-gray-300">Routine alimentari sane che durano tutta la vita</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500 transition-colors">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-3 text-cyan-400">Salute Ottimale</h4>
                <p className="text-gray-300">Miglioramento parametri ematici e prevenzione malattie</p>
              </CardContent>
            </Card>
          </div>

          {/* Perfetto Per */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-red-600/10 to-orange-600/10 p-6 rounded-lg border border-red-600/30">
              <h3 className="text-2xl font-bold text-red-400 mb-4">⚠️ Hai Questi Problemi?</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Mangi per stress o noia (fame emotiva)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Hai provato 100 diete senza successo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Ti saboti sempre quando stai per raggiungere l'obiettivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Perdi motivazione dopo poche settimane</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Hai paura del giudizio degli altri</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-600/10 to-indigo-600/10 p-6 rounded-lg border border-green-600/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4">✅ Ecco la Soluzione</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span><strong>Gestione fame emotiva</strong> con tecniche specifiche</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span><strong>Piano sostenibile</strong> senza rinunce estreme</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span><strong>Superamento blocchi mentali</strong> e autosabotaggio</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span><strong>Motivazione costante</strong> e supporto continuo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span><strong>Autostima potenziata</strong> e fiducia ritrovata</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Finale */}
          <div className="text-center bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 p-8 rounded-lg border border-indigo-600/30">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trasforma <span className="text-indigo-400">Mente e Corpo</span> Insieme
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Non è solo questione di dieta. È un <strong>cambiamento completo</strong> che parte dalla mente 
              per arrivare al corpo. Prenota la tua consulenza gratuita e scopri il potere dell'approccio integrato.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="https://wa.me/393291070374"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Scrivici su WhatsApp – Nutrizione e Psicocoach Legnago"
              >
                Scrivici su WhatsApp
              </a>
              <Link to="/contatti">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-600/50">
                  Prenota Consulenza Gratuita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NutrizionePsicocoach;