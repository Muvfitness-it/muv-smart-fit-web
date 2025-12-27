import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
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

  const handlePercorsiClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sticky_cta_percorsi_click', {
        event_category: 'conversion',
        event_label: 'mobile_sticky'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom">
      <div className="bg-background/95 backdrop-blur-md border-t border-border p-3 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Primary CTA - Link to Percorsi */}
          <Link 
            to="/percorsi"
            onClick={handlePercorsiClick}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-4 rounded-xl transition-colors min-h-[52px]"
          >
            <span className="text-sm">Scopri il tuo percorso</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
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
