
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&crop=center')`
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            CENTRO FITNESS ESCLUSIVO A{" "}
            <span className="text-pink-600 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              LEGNAGO
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            <strong>Dimagrisci fino a 5kg in 30 giorni</strong> con solo 2 allenamenti a settimana. 
            Personal training 1-to-1, tecnologie avanzate EMS e Pancafit. 
            <span className="text-pink-400">Ambiente riservato, zero code, massimi risultati.</span>
          </p>
          
          <Link to="/contatti">
            <Button 
              className="bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              aria-label="Prenota check-up gratuito al centro fitness MUV Smart Fit"
            >
              PRENOTA LA TUA PROVA GRATUITA OGGI
            </Button>
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" aria-hidden="true">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              PERCHÉ IL METODO{" "}
              <span className="text-pink-600">MUV SMART FIT</span>{" "}
              FUNZIONA DAVVERO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <strong>Non una palestra tradizionale, ma un metodo scientifico</strong> che garantisce risultati misurabili 
              in tempi ridotti. Ecco cosa ci rende unici a Legnago e provincia di Verona.
            </p>
          </header>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white" aria-hidden="true">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Metodo Scientifico Garantito</h3>
              <p className="text-gray-300 leading-relaxed">
                <strong>Tecnologie EMS certificate</strong> che stimolano oltre 300 muscoli contemporaneamente. 
                Risultati misurabili già dalla terza seduta: <span className="text-pink-400">-2cm di girovita in 2 settimane</span>.
              </p>
            </article>
            
            <article className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white" aria-hidden="true">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Personal Training Esclusivo 1-to-1</h3>
              <p className="text-gray-300 leading-relaxed">
                <strong>Zero distrazioni, massima attenzione.</strong> Ogni programma è creato specificamente per te. 
                <span className="text-pink-400">Ambiente riservato</span> dove ti senti libero di esprimerti senza giudizi.
              </p>
            </article>
            
            <article className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white" aria-hidden="true">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Specialisti del Mal di Schiena</h3>
              <p className="text-gray-300 leading-relaxed">
                <strong>Tecnica Pancafit esclusiva</strong> per risolvere dolori posturali cronici. 
                <span className="text-pink-400">Il 95% dei nostri clienti</span> elimina il mal di schiena entro 6 settimane.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SMETTI DI RIMANDARE, INIZIA OGGI
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            <strong>Check-up corpo completo GRATUITO</strong> con analisi composizione corporea e piano personalizzato. 
            <span className="block mt-2">Scopri come perdere peso definitivamente in sole 8 settimane.</span>
          </p>
          <Link to="/contatti">
            <Button 
              className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold"
              aria-label="Prenota check-up gratuito centro fitness Legnago"
            >
              PRENOTA CHECK-UP GRATUITO (VALORE €80)
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
