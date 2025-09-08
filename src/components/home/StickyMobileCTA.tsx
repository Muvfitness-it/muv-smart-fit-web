import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // 80vh
      
      if (scrollY > heroHeight && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-600 p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold text-sm">Prenota ora la tua consulenza gratuita!</span>
          <button 
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-3">
          <a 
            href="https://wa.me/393291070374"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors min-h-[48px]"
            aria-label="Scrivici su WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">WhatsApp</span>
          </a>
          
          <a 
            href="tel:+393291070374" 
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent text-black font-bold py-3 px-4 rounded-lg transition-all min-h-[48px]"
            aria-label="Chiama ora"
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm">Chiama</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;