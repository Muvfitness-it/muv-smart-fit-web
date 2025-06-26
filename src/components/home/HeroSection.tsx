
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src="/lovable-uploads/13084a47-9519-4cd3-9d9e-6c4e3f48e43a.png" 
              alt="MUV Fitness Logo" 
              className="h-16 w-auto"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold">
              <span className="text-white">MUV</span>
              <span className="text-green-400"> Fitness</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
            Il tuo centro fitness all'avanguardia nel cuore di Brescia. 
            Tecnologie innovative, professionalità e risultati garantiti.
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
            Trasforma il tuo corpo con il 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Personal Training</span> più efficace
          </h2>

          {/* Subheading */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Raggiungi i tuoi obiettivi con allenamenti personalizzati, tecnologia EMS e Pancafit. 
            <span className="text-green-400 font-semibold">Risultati visibili in sole 4 settimane.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link to="/contatti">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Prenota Consulenza Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Guarda i Risultati
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">500+</div>
              <div className="text-gray-400">Clienti Soddisfatti</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">95%</div>
              <div className="text-gray-400">Obiettivi Raggiunti</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">4 Sett</div>
              <div className="text-gray-400">Primi Risultati</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
