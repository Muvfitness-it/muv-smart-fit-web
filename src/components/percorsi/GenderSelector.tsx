import React from 'react';
import { Card } from '@/components/ui/card';
import { trackEvent } from '@/hooks/useGoogleAnalytics';

export type Gender = 'donna' | 'uomo' | null;

interface GenderSelectorProps {
  selectedGender: Gender;
  onGenderSelect: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ selectedGender, onGenderSelect }) => {
  const handleSelect = (gender: 'donna' | 'uomo') => {
    onGenderSelect(gender);
    
    // Track GA4 event
    trackEvent('gender_selected', {
      gender,
      page: '/percorsi',
      timestamp: new Date().toISOString()
    });

    // Smooth scroll to next section
    setTimeout(() => {
      const problemSection = document.getElementById('percorsi-problema');
      if (problemSection) {
        problemSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <section id="gender-selector" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Per chi è questo percorso?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Seleziona per scoprire il percorso più adatto alle tue esigenze
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Card Donna */}
            <Card 
              className={`relative cursor-pointer transition-all duration-300 p-8 hover:shadow-xl group ${
                selectedGender === 'donna' 
                  ? 'border-primary border-2 shadow-lg shadow-primary/20 scale-[1.02]' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelect('donna')}
            >
              {selectedGender === 'donna' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                    Selezionato
                  </span>
                </div>
              )}
              
              <div className="flex flex-col items-center space-y-4">
                {/* Icon/Illustration */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  selectedGender === 'donna' ? 'scale-110' : ''
                }`}>
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Percorsi Donna
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Tonificazione, silhouette, benessere
                  </p>
                </div>
                
                <div className="w-full pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Soluzioni mirate per cellulite, ritenzione, tonificazione glutei e braccia
                  </p>
                </div>
              </div>
            </Card>

            {/* Card Uomo */}
            <Card 
              className={`relative cursor-pointer transition-all duration-300 p-8 hover:shadow-xl group ${
                selectedGender === 'uomo' 
                  ? 'border-primary border-2 shadow-lg shadow-primary/20 scale-[1.02]' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelect('uomo')}
            >
              {selectedGender === 'uomo' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                    Selezionato
                  </span>
                </div>
              )}
              
              <div className="flex flex-col items-center space-y-4">
                {/* Icon/Illustration */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  selectedGender === 'uomo' ? 'scale-110' : ''
                }`}>
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Percorsi Uomo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Definizione, forza, performance
                  </p>
                </div>
                
                <div className="w-full pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Soluzioni mirate per addome, massa muscolare, postura e performance
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderSelector;
