
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Zap, Target } from 'lucide-react';

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  onCtaClick: () => void;
  guarantee?: string;
  urgency?: string;
}

const LandingHero: React.FC<LandingHeroProps> = ({
  headline,
  subheadline,
  ctaText,
  onCtaClick,
  guarantee,
  urgency
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-magenta-900/40 to-viola-900/50 px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
        style={{
          backgroundImage: "url('/images/fitness-professional-bg.jpg')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-magenta-900/30 to-viola-900/40" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {urgency && (
          <div className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse inline-block">
            🔥 {urgency}
          </div>
        )}
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 font-heading leading-tight">
          <span className="bg-gradient-to-r from-magenta-400 via-viola-400 to-blu-400 bg-clip-text text-transparent">
            {headline}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 font-semibold leading-relaxed">
          {subheadline}
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <Button 
            onClick={onCtaClick}
            className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-12 py-6 rounded-full text-xl md:text-2xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse-glow border-4 border-white/30"
          >
            <Zap className="w-8 h-8 mr-3" />
            {ctaText}
          </Button>
          
          {guarantee && (
            <p className="text-sm md:text-base text-gray-300 font-semibold">
              <Target className="w-5 h-5 inline mr-2 text-green-400" />
              {guarantee}
            </p>
          )}
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <div className="text-2xl font-black text-magenta-400 mb-1">500+</div>
            <div className="text-sm text-gray-300">Trasformazioni</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <div className="text-2xl font-black text-viola-400 mb-1">95%</div>
            <div className="text-sm text-gray-300">Tasso Successo</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <div className="text-2xl font-black text-blu-400 mb-1">30</div>
            <div className="text-sm text-gray-300">Giorni Risultati</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
