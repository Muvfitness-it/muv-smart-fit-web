
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Risultati = () => {
  const testimonianze = [
    {
      name: "Maria Bianchi",
      obiettivo: "Dimagrimento",
      quote: "Grazie al team di MUV Fitness ho perso 15 kg in 6 mesi. L'approccio personalizzato e la tecnologia EMS hanno fatto la differenza!",
      avatar: "MB"
    },
    {
      name: "Giuseppe Rossi",
      obiettivo: "Mal di schiena",
      quote: "Dopo anni di dolori alla schiena, il metodo Pancafit mi ha letteralmente cambiato la vita. Ora posso finalmente vivere senza dolore.",
      avatar: "GR"
    },
    {
      name: "Anna Verdi",
      obiettivo: "Tonificazione",
      quote: "Il personal training con MUV mi ha permesso di ottenere il corpo che ho sempre sognato. Staff competente e risultati straordinari!",
      avatar: "AV"
    },
    {
      name: "Luca Neri",
      obiettivo: "Benessere generale",
      quote: "L'ambiente professionale e l'attenzione ai dettagli di MUV Fitness mi hanno motivato a mantenere uno stile di vita attivo e salutare.",
      avatar: "LN"
    },
    {
      name: "Francesca Gialli",
      obiettivo: "Riabilitazione",
      quote: "Dopo un infortunio, il team mi ha seguito passo dopo passo nella riabilitazione. Ora sono tornata più forte di prima!",
      avatar: "FG"
    },
    {
      name: "Marco Blu",
      obiettivo: "Preparazione atletica",
      quote: "La preparazione per la mia maratona è stata perfetta. I metodi scientifici di MUV mi hanno portato a superare tutti i miei record personali.",
      avatar: "MB"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              LE LORO STORIE, I TUOI PROSSIMI{" "}
              <span className="text-pink-600">RISULTATI</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Scopri le trasformazioni straordinarie dei nostri clienti e lasciati ispirare per iniziare il tuo percorso.
            </p>
          </div>
          
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
                      <p className="text-pink-600 text-sm font-semibold">Obiettivo: {testimonianza.obiettivo}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-300 italic leading-relaxed">
                    "{testimonianza.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Risultati;
