import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ArrowRight, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Trigger faster at 200px
      if (scrollY > 200 && !isDismissed) {
        setIsVisible(true);
        if (!hasAnimated) {
          setHasAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, hasAnimated]);

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

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sticky_cta_whatsapp_click', {
        event_category: 'conversion',
        event_label: 'mobile_sticky'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom ${hasAnimated ? 'animate-slide-up' : ''}`}>
      {/* Urgency micro-copy */}
      <div className="bg-primary/95 text-center py-1.5 px-4">
        <p className="text-primary-foreground text-xs font-medium flex items-center justify-center gap-1.5">
          <Gift className="w-3.5 h-3.5" />
          <span>📞 Rispondiamo in 2h • Prova GRATIS</span>
        </p>
      </div>
      
      <div className="bg-background/98 backdrop-blur-md border-t border-border p-3 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Primary CTA - Link to Percorsi with GRATIS badge */}
          <Link 
            to="/percorsi"
            onClick={handlePercorsiClick}
            className="relative flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-4 rounded-xl transition-all min-h-[52px] hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* GRATIS badge */}
            <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              GRATIS
            </span>
            <span className="text-sm">Scopri il tuo percorso</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {/* WhatsApp button */}
          <a 
            href="https://wa.me/393291070374?text=Ciao,%20vorrei%20prenotare%20una%20prova%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold p-3.5 rounded-xl transition-all min-h-[52px] min-w-[52px] hover:scale-105 active:scale-95"
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
