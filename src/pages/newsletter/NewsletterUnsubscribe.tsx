import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type UnsubscribeStatus = 'loading' | 'success' | 'error' | 'no-email';

const NewsletterUnsubscribe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<UnsubscribeStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const email = searchParams.get('email');

  useEffect(() => {
    const processUnsubscribe = async () => {
      if (!email) {
        setStatus('no-email');
        return;
      }

      try {
        const decodedEmail = decodeURIComponent(email);
        console.log('[NewsletterUnsubscribe] Processing unsubscribe for:', decodedEmail);

        const { data, error } = await supabase.functions.invoke('weekly-newsletter', {
          body: {
            action: 'unsubscribe',
            email: decodedEmail
          }
        });

        if (error) {
          console.error('[NewsletterUnsubscribe] Edge function error:', error);
          setErrorMessage(error.message || 'Si è verificato un errore durante la disiscrizione.');
          setStatus('error');
          return;
        }

        if (data?.success) {
          console.log('[NewsletterUnsubscribe] Successfully unsubscribed');
          setStatus('success');
        } else {
          console.error('[NewsletterUnsubscribe] Unsubscribe failed:', data);
          setErrorMessage(data?.error || 'Si è verificato un errore durante la disiscrizione.');
          setStatus('error');
        }
      } catch (err) {
        console.error('[NewsletterUnsubscribe] Unexpected error:', err);
        setErrorMessage('Si è verificato un errore imprevisto. Riprova più tardi.');
        setStatus('error');
      }
    };

    processUnsubscribe();
  }, [email]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 text-center">
        {/* Logo/Brand */}
        <div className="mb-6">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold text-primary">MUV</span>
            <span className="text-sm text-muted-foreground ml-1">Fitness</span>
          </Link>
        </div>

        {/* Loading State */}
        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
            <h1 className="text-xl font-semibold text-foreground">
              Elaborazione in corso...
            </h1>
            <p className="text-muted-foreground">
              Stiamo processando la tua richiesta di disiscrizione.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
            <h1 className="text-xl font-semibold text-foreground">
              Disiscrizione completata
            </h1>
            <p className="text-muted-foreground">
              Sei stato disiscritto con successo dalla nostra newsletter.
              Non riceverai più le nostre email settimanali.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Se hai cambiato idea, puoi sempre iscriverti nuovamente dal nostro sito.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">Torna alla Home</Link>
            </Button>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="space-y-4">
            <XCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-xl font-semibold text-foreground">
              Errore durante la disiscrizione
            </h1>
            <p className="text-muted-foreground">
              {errorMessage}
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Riprova
              </Button>
              <Button asChild>
                <Link to="/contatti">Contattaci per assistenza</Link>
              </Button>
            </div>
          </div>
        )}

        {/* No Email State */}
        {status === 'no-email' && (
          <div className="space-y-4">
            <Mail className="h-16 w-16 text-muted-foreground mx-auto" />
            <h1 className="text-xl font-semibold text-foreground">
              Link non valido
            </h1>
            <p className="text-muted-foreground">
              Il link di disiscrizione non contiene un indirizzo email valido.
              Assicurati di utilizzare il link completo ricevuto via email.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">Torna alla Home</Link>
            </Button>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()} MUV Fitness - Tutti i diritti riservati
        </p>
      </div>
    </div>
  );
};

export default NewsletterUnsubscribe;
