
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
            IL TUO OBIETTIVO,<br />
            LA NOSTRA{" "}
            <span className="text-pink-600 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              MISSIONE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Siamo specializzati in dimagrimento, mal di schiena e allenamenti personalizzati 
            con tecnologie avanzate. Scopri il centro MUV.
          </p>
          
          <Link to="/contatti">
            <Button className="bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl">
              INIZIA LA TUA TRASFORMAZIONE
            </Button>
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              PERCHÉ SCEGLIERE{" "}
              <span className="text-pink-600">MUV FITNESS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Il fitness intelligente che unisce scienza, tecnologia e passione per il tuo benessere.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Approccio Scientifico</h3>
              <p className="text-gray-300 leading-relaxed">
                Metodologie basate su ricerca scientifica e tecnologie all'avanguardia per risultati garantiti.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Personalizzazione Totale</h3>
              <p className="text-gray-300 leading-relaxed">
                Ogni programma è studiato su misura per te, i tuoi obiettivi e le tue esigenze specifiche.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Team Qualificato</h3>
              <p className="text-gray-300 leading-relaxed">
                Professionisti certificati e in costante aggiornamento per offrirti il meglio del fitness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            PRONTO A TRASFORMARE LA TUA VITA?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Prenota ora il tuo check-up gratuito e inizia il percorso verso il tuo obiettivo.
          </p>
          <Link to="/contatti">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-xl rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold">
              PRENOTA CHECK-UP GRATUITO
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
