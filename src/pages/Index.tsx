import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Users, Target, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/professional-bg.jpg')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/70 to-green-900/80"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            MUV FITNESS CENTER
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Trasforma il tuo corpo, cambia la tua vita. Il tuo viaggio verso il benessere inizia qui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? <>
                <Link to="/muv-planner" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center">
                  Vai a MUV Planner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/profile" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center">
                  Il Mio Profilo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </> : <>
                
                <Link to="/servizi" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center">
                  Scopri i Servizi
                </Link>
              </>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
              Perché Scegliere MUV?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Offriamo un approccio completo al fitness con tecnologie innovative e un team di professionisti qualificati.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition-colors">
              <Dumbbell className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Attrezzature All'avanguardia</h3>
              <p className="text-gray-300">
                Macchinari di ultima generazione per allenamenti efficaci e sicuri in ogni disciplina.
              </p>
            </div>
            
            <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition-colors">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Personal Trainer Certificati</h3>
              <p className="text-gray-300">
                Il nostro team di esperti ti guiderà verso il raggiungimento dei tuoi obiettivi personali.
              </p>
            </div>
            
            <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition-colors">
              <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Programmi Personalizzati</h3>
              <p className="text-gray-300">
                Piani di allenamento e nutrizione su misura per le tue esigenze specifiche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Membri Attivi</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Anni di Esperienza</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-lg opacity-90">Trainer Professionali</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Accessibilità</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Star className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto a Trasformare la Tua Vita?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Unisciti alla famiglia MUV e inizia il tuo percorso verso una versione migliore di te stesso.
          </p>
          {!user && <Link to="/auth" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center">
              Registrati Ora
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>}
        </div>
      </section>
    </div>
  );
};

export default Index;
