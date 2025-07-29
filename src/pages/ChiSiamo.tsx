import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ChiSiamo = () => {
  // SEO is now handled by SEOHandler component globally

  return (
    
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2 leading-tight">
              IL PRIMO CENTRO FITNESS{" "}
              <span className="text-pink-600 block sm:inline">SMART</span>{" "}
              DI LEGNAGO
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              <strong>Non una palestra qualsiasi</strong>, ma l'evoluzione del fitness. 
              Dove scienza, tecnologia e passione si uniscono per trasformare il tuo corpo 
              <span className="text-pink-400 block sm:inline"> in tempi da record</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center"
                alt="Centro fitness Centro fitness MUV Legnago con tecnologie avanzate e ambiente esclusivo"
                className="rounded-lg shadow-xl w-full h-64 sm:h-80 object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                Perché Abbiamo Creato Centro fitness MUV
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                <strong className="text-pink-400">Eravamo stanchi</strong> di vedere persone demotivate dalle palestre tradizionali. 
                Code infinite, ambienti rumorosi, risultati che non arrivano mai. 
                <span className="text-white font-semibold block sm:inline"> Così abbiamo creato qualcosa di completamente diverso.</span>
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
                <strong>Centro fitness MUV è il primo centro a Legnago</strong> che unisce tecnologie innovative 
                (EMS, Pancafit, analisi corporea avanzata) con l'attenzione esclusiva del personal training 1-to-1. 
                <span className="text-pink-400">Zero distrazioni, massimi risultati.</span>
              </p>
              
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3">La Nostra Promessa</h3>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
                  <strong>Se in 30 giorni non vedi risultati concreti</strong> - perdita di peso, 
                  miglioramento posturale, aumento della forza - 
                  <span className="text-pink-400 block sm:inline"> ti rimborsiamo completamente</span>. 
                  Questa è la fiducia che abbiamo nel nostro metodo.
                </p>
              </div>
              
              <Link to="/team">
                <Button 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto font-semibold leading-tight"
                  aria-label="Scopri il team di personal trainer specializzati Centro fitness MUV"
                >
                  <span className="block sm:hidden">Conosci gli Specialisti</span>
                  <span className="hidden sm:block">Conosci i Nostri Specialisti</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
