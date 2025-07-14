import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import BookingForm from '@/components/booking/BookingForm';

interface ExitIntentPopupProps {
  children?: React.ReactNode;
}

const ExitIntentPopup = ({ children }: ExitIntentPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page and hasn't been shown yet
      if (e.clientY <= 0 && !hasShown && !hasTriggered) {
        hasTriggered = true;
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          
          // Track exit intent event
          if (typeof gtag !== 'undefined') {
            gtag('event', 'exit_intent_popup_shown', {
              page_location: window.location.pathname
            });
          }
        }, 200);
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        hasTriggered = false;
      }
    };

    // Add scroll-based trigger for mobile
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 80 && !hasShown && !hasTriggered) {
        hasTriggered = true;
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_intent_popup_shown', {
              scroll_percent: scrollPercent
            });
          }
        }, 1000);
      }
    };

    // Only add listeners if popup hasn't been shown yet
    if (!hasShown) {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exit_intent_popup_closed', {
        page_location: window.location.pathname
      });
    }
  };

  const handleBookingStart = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exit_intent_booking_started', {
        page_location: window.location.pathname
      });
    }
  };

  return (
    <>
      {children}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-lg border-2 border-brand-primary/30">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 z-10"
              onClick={handleClose}
            >
              <X size={20} />
            </Button>
            
            {/* Attention-grabbing header */}
            <div className="text-center mb-6 p-6 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-lg border border-brand-primary/30">
              <h2 className="text-3xl font-black text-brand-primary mb-2">
                ⚡ ASPETTA! Non Perdere Questa Opportunità
              </h2>
              <p className="text-xl font-semibold text-foreground mb-3">
                🎯 <span className="text-brand-secondary">PROVA GRATUITA</span> + 
                <span className="text-brand-primary"> CONSULENZA PERSONALIZZATA</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> Prenota ora
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> Risposta in 2h
                </span>
                <span className="flex items-center gap-1">
                  <User size={16} /> Personal trainer dedicato
                </span>
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20 mb-6">
              <p className="text-center text-sm">
                <strong className="text-green-400">✅ 487 persone</strong> hanno già prenotato questo mese • 
                <strong className="text-blue-400"> 95% tasso di soddisfazione</strong>
              </p>
            </div>

            {/* Booking form */}
            <div onClick={handleBookingStart}>
              <BookingForm onClose={() => setIsOpen(false)} />
            </div>

            {/* Bottom guarantee */}
            <div className="text-center mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">
                🛡️ GARANZIA 100%: Se non sei soddisfatto della prova, non paghi nulla!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExitIntentPopup;