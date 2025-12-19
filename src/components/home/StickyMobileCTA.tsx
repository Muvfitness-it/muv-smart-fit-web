import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling just 300px (very early visibility)
      if (scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('prenota-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom">
      <div className="bg-background/95 backdrop-blur-md border-t border-border p-3 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Primary CTA - Scroll to form */}
          <button 
            onClick={scrollToForm}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-4 rounded-xl transition-colors min-h-[52px]"
          >
            <span className="text-sm">Prenota prova gratuita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          {/* WhatsApp button */}
          <a 
            href="https://wa.me/393291070374?text=Ciao,%20vorrei%20prenotare%20una%20prova%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold p-3.5 rounded-xl transition-colors min-h-[52px] min-w-[52px]"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          
          {/* Dismiss button */}
          <button 
            onClick={handleDismiss}
            className="flex items-center justify-center text-muted-foreground hover:text-foreground p-2 rounded-lg"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
