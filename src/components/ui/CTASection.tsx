import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  urgencyText?: string;
  showStats?: boolean;
  variant?: 'primary' | 'secondary' | 'urgent';
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Pronto per la Trasformazione?",
  subtitle = "Prenota ora la tua consulenza gratuita e scopri come raggiungere i tuoi obiettivi in 30 giorni",
  urgencyText = "Solo 3 posti disponibili questa settimana!",
  showStats = true,
  variant = 'primary'
}) => {
  const bgClasses = {
    primary: 'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20',
    secondary: 'bg-gradient-to-r from-gray-800/50 to-gray-700/50',
    urgent: 'bg-gradient-to-r from-red-600/20 via-orange-500/20 to-yellow-500/20'
  };

  const borderClasses = {
    primary: 'border-primary/30',
    secondary: 'border-gray-600/30',
    urgent: 'border-red-500/30'
  };

  return (
    <section className={`py-16 ${bgClasses[variant]} border-t border-b ${borderClasses[variant]}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Urgency Badge */}
          {variant === 'urgent' && (
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-400/50 rounded-full text-red-300 text-sm font-semibold animate-pulse">
                🔥 {urgencyText}
              </span>
            </div>
          )}

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              to="/contatti" 
              className="group relative bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 min-h-[44px] flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span className="relative z-10">PRENOTA CONSULENZA GRATUITA</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <div className="flex gap-3">
              <a 
                href="https://wa.me/393291070374"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
              
              <a 
                href="tel:+393291070374"
                className="flex items-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                <Phone className="w-5 h-5 mr-2" />
                329 107 0374
              </a>
            </div>
          </div>

          {/* Stats Section */}
          {showStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-gray-300 text-sm">Clienti Trasformati</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-accent mb-1">95%</div>
                <div className="text-gray-300 text-sm">Successo Garantito</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-secondary mb-1">30</div>
                <div className="text-gray-300 text-sm">Giorni Risultati</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">4.9★</div>
                <div className="text-gray-300 text-sm">Recensioni</div>
              </div>
            </div>
          )}

          {/* Guarantee Badge */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center px-6 py-3 bg-green-600/20 border border-green-400/50 rounded-full text-green-400 text-sm font-semibold">
              ✅ 30 giorni o rimborso garantito
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;