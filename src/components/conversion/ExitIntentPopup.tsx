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
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-sm border border-border shadow-lg">
          <div className="relative p-4">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-1 -right-1 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              onClick={handleClose}
            >
              <X size={16} />
            </Button>
            
            {/* Compact header */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-brand-primary mb-1">
                🎯 Prova Gratuita + Consulenza
              </h2>
              <p className="text-sm text-muted-foreground">
                Personal trainer dedicato • Risposta in 2h
              </p>
            </div>

            {/* Social proof - compact */}
            <div className="bg-muted/50 p-2 rounded-md mb-4 text-center">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600 font-medium">487 persone</span> hanno già prenotato • 
                <span className="text-blue-600 font-medium">95% soddisfazione</span>
              </p>
            </div>

            {/* Booking form - compact */}
            <div onClick={handleBookingStart}>
              <BookingForm onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExitIntentPopup;