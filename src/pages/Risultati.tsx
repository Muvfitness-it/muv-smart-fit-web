import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Risultati = () => {
  const testimonianze = [
    {
      name: "Maria B.",
      age: "42 anni",
      obiettivo: "Dimagrimento",
      risultato: "-15kg in 6 mesi",
      quote: "Dopo 3 gravidanze pensavo fosse impossibile tornare in forma. Con il metodo EMS di MUV ho perso 15kg in 6 mesi, allenandomi solo 2 volte a settimana. Ora mi sento più bella che a 20 anni!",
      avatar: "MB",
      tempo: "6 mesi fa"
    },
    {
      name: "Giuseppe R.",
      age: "55 anni", 
      obiettivo: "Mal di schiena cronico",
      risultato: "Dolore eliminato al 100%",
      quote: "15 anni di mal di schiena, visite specialistiche inutili. Christian con il Pancafit ha risolto tutto in 8 settimane. Non prendo più antidolorifici e ho ripreso a giocare a tennis.",
      avatar: "GR",
      tempo: "3 mesi fa"
    },
    {
      name: "Anna V.",
      age: "38 anni",
      obiettivo: "Tonificazione post-parto", 
      risultato: "-12kg e +30% forza",
      quote: "Dopo il parto mi sentivo a pezzi. Serena mi ha seguita con pazienza e professionalità. In 4 mesi ho ritrovato la mia forma fisica e conquistato una forza che non avevo mai avuto.",
      avatar: "AV",
      tempo: "4 mesi fa"
    },
    {
      name: "Luca N.",
      age: "29 anni",
      obiettivo: "Massa muscolare",
      risultato: "+8kg massa magra",
      quote: "Mauro ha trasformato il mio fisico in 12 settimane. Da magro a muscoloso, con un programma su misura che non mi ha mai annoiato. Risultati che in palestra non avevo mai ottenuto.",
      avatar: "LN",
      tempo: "5 mesi fa"
    },
    {
      name: "Francesca G.",
      age: "47 anni",
      obiettivo: "Riabilitazione ginocchio",
      risultato: "Mobilità completa recuperata",
      quote: "Dopo l'operazione al ginocchio i medici mi avevano dato poche speranze. Il team MUV mi ha fatto tornare a correre in 6 mesi. Ora faccio sport come una ragazzina.",
      avatar: "FG",
      tempo: "8 mesi fa"
    },
    {
      name: "Marco B.",
      age: "34 anni",
      obiettivo: "Preparazione atletica",
      risultato: "Record personale maratona",
      quote: "Grazie all'allenamento scientifico di MUV ho migliorato il mio tempo in maratona di 12 minuti. Approccio completamente diverso dalle solite palestre. Qui si studia ogni dettaglio.",
      avatar: "MB",
      tempo: "2 mesi fa"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              RISULTATI REALI DI CLIENTI{" "}
              <span className="text-pink-600">VERI</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <strong>Non promesse vuote, ma trasformazioni documentate.</strong> Queste sono le storie di persone come te 
              che hanno scelto MUV Smart Fit per cambiare la loro vita. 
              <span className="text-pink-400">Il prossimo potresti essere tu.</span>
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonianze.map((testimonianza, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonianza.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonianza.name}</h3>
                      <p className="text-gray-400 text-sm">{testimonianza.age}</p>
                      <p className="text-pink-600 text-sm font-semibold">{testimonianza.obiettivo}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex mb-2" aria-label="Valutazione 5 stelle">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-green-400 font-bold text-sm mb-3">
                      ✅ RISULTATO: {testimonianza.risultato}
                    </p>
                  </div>
                  
                  <blockquote className="text-gray-300 italic leading-relaxed mb-3">
                    "{testimonianza.quote}"
                  </blockquote>
                  
                  <p className="text-xs text-gray-500">
                    Testimonianza raccolta {testimonianza.tempo}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-pink-600/20 via-purple-500/20 to-blue-500/20 p-8 rounded-lg border border-pink-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vuoi Essere il Prossimo Caso di Successo?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              <strong>Queste persone hanno iniziato esattamente come te:</strong> piene di dubbi, con obiettivi che sembravano impossibili. 
              <span className="text-pink-400 block mt-2">
                Oggi sono la prova vivente che il metodo MUV funziona davvero.
              </span>
            </p>
            <div className="flex justify-center">
              <Link to="/contatti">
                <Button 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                  aria-label="Inizia la tua trasformazione con MUV Smart Fit Legnago"
                >
                  Inizia la Tua Trasformazione
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Risultati;
