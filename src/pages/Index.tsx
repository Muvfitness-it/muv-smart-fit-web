
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
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
            CENTRO FITNESS ESCLUSIVO A{" "}
            <span className="text-pink-600 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 bg-clip-text text-transparent block sm:inline">
              LEGNAGO
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-10 text-gray-200 leading-relaxed max-w-4xl mx-auto px-2">
            <strong>Dimagrisci fino a 5kg in 30 giorni</strong> con solo 2 allenamenti a settimana. 
            Personal training 1-to-1, tecnologie avanzate EMS e Pancafit. 
            <span className="text-pink-400 block mt-2 sm:mt-3">Ambiente riservato, zero code, massimi risultati.</span>
          </p>
          
          <Link to="/contatti">
            <Button 
              className="bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-4 lg:py-5 xl:py-6 text-xs sm:text-sm lg:text-base xl:text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto font-bold leading-tight"
              aria-label="Prenota check-up gratuito al centro fitness MUV Smart Fit"
            >
              <span className="block sm:hidden">PRENOTA PROVA GRATUITA</span>
              <span className="hidden sm:block lg:hidden">PRENOTA LA TUA PROVA GRATUITA</span>
              <span className="hidden lg:block">PRENOTA LA TUA PROVA GRATUITA OGGI</span>
            </Button>
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2" aria-hidden="true">
          <div className="w-6 h-10 sm:w-7 sm:h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white rounded-full mt-2 sm:mt-3 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <header className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 px-2 leading-tight">
              PERCHÉ IL METODO{" "}
              <span className="text-pink-600 block sm:inline">MUV SMART FIT</span>{" "}
              FUNZIONA DAVVERO
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
              <strong>Non una palestra tradizionale, ma un metodo scientifico</strong> che garantisce risultati misurabili 
              in tempi ridotti. Ecco cosa ci rende unici a Legnago e provincia di Verona.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <article className="text-center group">
              <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-pink-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" aria-hidden="true">1</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 px-2">Metodo Scientifico Garantito</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed px-2">
                <strong>Tecnologie EMS certificate</strong> che stimolano oltre 300 muscoli contemporaneamente. 
                Risultati misurabili già dalla terza seduta: <span className="text-pink-400">-2cm di girovita in 2 settimane</span>.
              </p>
            </article>
            
            <article className="text-center group">
              <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" aria-hidden="true">2</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 px-2">Personal Training Esclusivo 1-to-1</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed px-2">
                <strong>Zero distrazioni, massima attenzione.</strong> Ogni programma è creato specificamente per te. 
                <span className="text-pink-400">Ambiente riservato</span> dove ti senti libero di esprimerti senza giudizi.
              </p>
            </article>
            
            <article className="text-center group md:col-span-2 lg:col-span-1">
              <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-blue-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" aria-hidden="true">3</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 px-2">Specialisti del Mal di Schiena</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed px-2">
                <strong>Tecnica Pancafit esclusiva</strong> per risolvere dolori posturali cronici. 
                <span className="text-pink-400">Il 95% dei nostri clienti</span> elimina il mal di schiena entro 6 settimane.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 px-2 leading-tight">
            SMETTI DI RIMANDARE, INIZIA OGGI
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white mb-6 sm:mb-8 lg:mb-10 opacity-90 px-4 leading-relaxed max-w-4xl mx-auto">
            <strong>Check-up corpo completo GRATUITO</strong> con analisi composizione corporea e piano personalizzato. 
            <span className="block mt-2 sm:mt-3">Scopri come perdere peso definitivamente in sole 8 settimane.</span>
          </p>
          <Link to="/contatti">
            <Button 
              className="bg-white text-gray-900 hover:bg-gray-100 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-4 lg:py-5 xl:py-6 text-xs sm:text-sm lg:text-base xl:text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold w-full sm:w-auto leading-tight"
              aria-label="Prenota check-up gratuito centro fitness Legnago"
            >
              <span className="block sm:hidden">PRENOTA CHECK-UP GRATUITO</span>
              <span className="hidden sm:block">PRENOTA CHECK-UP GRATUITO (VALORE €80)</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
