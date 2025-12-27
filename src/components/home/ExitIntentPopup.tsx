import React, { useState, useEffect, useCallback } from 'react';
import { X, Gift, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';

const COOKIE_NAME = 'muv_exit_popup_dismissed';
const COOKIE_DAYS = 7;

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  // Check if cookie exists
  const hasDismissedPopup = useCallback(() => {
    return document.cookie.includes(COOKIE_NAME);
  }, []);

  // Set cookie
  const setDismissedCookie = useCallback(() => {
    const date = new Date();
    date.setTime(date.getTime() + (COOKIE_DAYS * 24 * 60 * 60 * 1000));
    document.cookie = `${COOKIE_NAME}=true; expires=${date.toUTCString()}; path=/`;
  }, []);

  // Track events
  const trackEvent = useCallback((eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'exit_intent',
        event_label: 'lead_magnet'
      });
    }
  }, []);

  useEffect(() => {
    if (hasDismissedPopup()) return;

    let hasShown = false;
    let timeoutId: NodeJS.Timeout;

    // Desktop: Mouse leaves viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        hasShown = true;
        setIsVisible(true);
        trackEvent('exit_intent_shown');
      }
    };

    // Mobile: Show after inactivity or scroll to top
    const handleMobileExit = () => {
      if (!hasShown && window.scrollY === 0) {
        timeoutId = setTimeout(() => {
          if (!hasShown) {
            hasShown = true;
            setIsVisible(true);
            trackEvent('exit_intent_shown');
          }
        }, 3000);
      }
    };

    // Add listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleMobileExit);

    // Fallback: show after 30 seconds on page
    const fallbackTimeout = setTimeout(() => {
      if (!hasShown && !hasDismissedPopup()) {
        hasShown = true;
        setIsVisible(true);
        trackEvent('exit_intent_shown');
      }
    }, 30000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleMobileExit);
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeout);
    };
  }, [hasDismissedPopup, trackEvent]);

  const handleClose = () => {
    setIsVisible(false);
    setDismissedCookie();
    trackEvent('exit_intent_closed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Compila i campi richiesti",
        description: "Nome ed email sono obbligatori",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactViaWeb3Forms({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: 'Richiesta guida gratuita "7 Segreti per Dimagrire"',
        subject: '[Lead Magnet] Guida Gratuita - Exit Intent',
        campaign: 'exit-intent-popup'
      });

      if (result.success) {
        setIsSuccess(true);
        setDismissedCookie();
        trackEvent('exit_intent_converted');
        
        toast({
          title: "Perfetto! 🎉",
          description: "Riceverai la guida via email a breve."
        });

        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary via-secondary to-accent p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Aspetta! 🎁
          </h3>
          <p className="text-white/90">
            Prima di andare, scarica la nostra guida gratuita
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Grazie!
              </h4>
              <p className="text-muted-foreground">
                Controlla la tua email per la guida.
              </p>
            </div>
          ) : (
            <>
              <h4 className="text-lg font-bold text-foreground text-center mb-2">
                "7 Segreti per Dimagrire in 30 Giorni"
              </h4>
              <p className="text-muted-foreground text-sm text-center mb-6">
                La guida pratica usata dai nostri clienti per ottenere risultati reali.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="exit-name">Nome *</Label>
                  <Input
                    id="exit-name"
                    type="text"
                    placeholder="Il tuo nome"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="exit-email">Email *</Label>
                  <Input
                    id="exit-email"
                    type="email"
                    placeholder="La tua email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="exit-phone">WhatsApp (opzionale)</Label>
                  <Input
                    id="exit-phone"
                    type="tel"
                    placeholder="+39 333 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Invio...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Scarica la guida gratuita
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 I tuoi dati sono al sicuro. Niente spam, promesso!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
