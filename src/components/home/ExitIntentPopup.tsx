import React, { useState, useEffect, useCallback } from 'react';
import { X, Gift, Check, Download, Star, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const COOKIE_NAME = 'muv_exit_popup_dismissed';
const COOKIE_DAYS = 7;
const GUIDE_URL = '/guide/7-segreti-per-dimagrire.pdf';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false
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

  // Track events - GA4 + Clarity
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    // GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'exit_intent',
        event_label: 'lead_magnet',
        ...params
      });
    }
    // Clarity
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('event', eventName);
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

  // Track form start
  const handleInputFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('exit_intent_form_started');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setDismissedCookie();
    trackEvent('exit_intent_closed');
  };

  // Download guide
  const downloadGuide = () => {
    const link = document.createElement('a');
    link.href = GUIDE_URL;
    link.download = '7-segreti-per-dimagrire-MUV-Fitness.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackEvent('exit_intent_downloaded');
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

    if (!formData.consent) {
      toast({
        title: "Consenso richiesto",
        description: "Accetta di ricevere la guida via email",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    trackEvent('exit_intent_submitted');

    try {
      // Call edge function to send email and save lead
      const { data, error } = await supabase.functions.invoke('send-lead-magnet', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          source: 'exit-intent-popup'
        }
      });

      if (error) {
        throw error;
      }

      // Success!
      setIsSuccess(true);
      setDismissedCookie();
      trackEvent('exit_intent_converted', { value: 1 });
      
      // Immediate download
      downloadGuide();
      
      toast({
        title: "Perfetto! 🎉",
        description: "Download iniziato! Controlla anche la tua email."
      });

    } catch (error) {
      console.error('Lead magnet error:', error);
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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary p-6 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Aspetta! 🎁
            </h3>
            <p className="text-white/90 text-sm md:text-base">
              Non perdere questa guida gratuita
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {isSuccess ? (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Download Iniziato! 🎉
              </h4>
              <p className="text-muted-foreground mb-4">
                Ti abbiamo anche inviato il link via email per averla sempre a portata di mano.
              </p>
              <Button 
                onClick={downloadGuide}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Scarica di nuovo
              </Button>
            </div>
          ) : (
            <>
              {/* Guide Preview */}
              <div className="flex gap-4 mb-5">
                <div className="flex-shrink-0 w-20 h-28 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground leading-tight">
                    "7 Segreti per Dimagrire in 30 Giorni"
                  </h4>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">4.9/5</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>150+ download questo mese</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-muted/50 rounded-xl p-4 mb-5">
                <p className="text-sm font-medium text-foreground mb-2">
                  ✨ Cosa troverai:
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>7 strategie testate su 100+ clienti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Piano alimentare esempio per 7 giorni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3 esercizi efficaci da fare a casa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Bonus: Lista alimenti brucia-grassi</span>
                  </li>
                </ul>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="exit-name" className="text-xs">Nome *</Label>
                    <Input
                      id="exit-name"
                      type="text"
                      placeholder="Mario"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      onFocus={handleInputFocus}
                      required
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exit-phone" className="text-xs">WhatsApp</Label>
                    <Input
                      id="exit-phone"
                      type="tel"
                      placeholder="+39 333..."
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      onFocus={handleInputFocus}
                      className="h-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="exit-email" className="text-xs">Email *</Label>
                  <Input
                    id="exit-email"
                    type="email"
                    placeholder="mario@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={handleInputFocus}
                    required
                    className="h-10"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="exit-consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                    className="mt-0.5"
                  />
                  <Label htmlFor="exit-consent" className="text-xs text-muted-foreground cursor-pointer leading-tight">
                    Accetto di ricevere la guida e consigli fitness via email. Niente spam!
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Invio in corso...
                    </span>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Scarica Gratis la Guida
                    </>
                  )}
                </Button>
              </form>

              <p className="text-[10px] text-muted-foreground text-center mt-3">
                🔒 I tuoi dati sono al sicuro e protetti. Zero spam garantito.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
