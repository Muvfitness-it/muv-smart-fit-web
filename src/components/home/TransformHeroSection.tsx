import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Zap, Target, Heart } from 'lucide-react';

const TransformHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-light via-muted/30 to-brand-light">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-brand-accent/15 to-brand-primary/15 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-brand-secondary/10 to-brand-accent/10 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="container-width relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Trust indicator */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-primary/20 rounded-full px-6 py-3 mb-8 shadow-soft">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-brand-dark font-semibold text-sm">
              Oltre 500+ Trasformazioni di Successo
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-responsive-2xl font-black text-brand-dark mb-8 leading-tight animate-fade-in">
            <span className="block mb-4">
              Trasforma il tuo <span className="gradient-text">Corpo</span>
            </span>
            <span className="block mb-4">
              e la tua <span className="gradient-text">Vita</span>
            </span>
            <span className="block text-responsive-lg text-brand-dark/80 font-normal">
              con MUV Fitness Legnago
            </span>
          </h1>

          {/* Value proposition */}
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-responsive text-brand-dark/80 mb-8 leading-relaxed">
              <strong className="text-brand-primary">Risultati visibili in 30 giorni</strong> con il nostro metodo scientifico che combina Personal Training, tecnologie avanzate e supporto completo.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-brand-primary/10 shadow-soft hover:shadow-primary transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">EMS + Personal Training</h3>
                <p className="text-sm text-brand-dark/70">20 minuti = 4 ore di palestra tradizionale</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-brand-secondary/10 shadow-soft hover:shadow-secondary transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Pilates + Pancafit</h3>
                <p className="text-sm text-brand-dark/70">Risolvi mal di schiena e postura</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-brand-accent/10 shadow-soft hover:shadow-accent transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Vacuum + Pressoterapia</h3>
                <p className="text-sm text-brand-dark/70">Elimina cellulite e ritenzione idrica</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link 
              to="/contatti" 
              className="group btn-primary text-xl px-12 py-5 rounded-2xl shadow-primary hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 min-h-[64px]"
            >
              🎯 INIZIA LA TUA TRASFORMAZIONE
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/chi-siamo" 
              className="btn-outline text-lg px-10 py-4 rounded-2xl inline-flex items-center gap-2 min-h-[56px]"
            >
              📖 Scopri il Metodo MUV
            </Link>
          </div>

          {/* Social proof */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-brand-dark/60 mb-6">
              ✅ Prima consulenza GRATUITA • ✅ Nessun impegno • ✅ Risultati garantiti
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-brand-dark/50 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                500+ Clienti Trasformati
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                10+ Anni di Esperienza
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Centro Certificato
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformHeroSection;