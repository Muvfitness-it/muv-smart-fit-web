import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'muv_cookie_consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        // Notify app about existing consent
        window.dispatchEvent(new CustomEvent('muv-consent-changed'));
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (consent: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, date: new Date().toISOString() }));
      window.dispatchEvent(new CustomEvent('muv-consent-changed'));
    } catch {}
  };

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
    setVisible(false);
  };
  const rejectAll = () => {
    saveConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl p-4">
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-xl backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="p-4 md:p-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-base md:text-lg font-semibold">La tua privacy è importante</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Usiamo cookie per analisi e marketing. Puoi accettare o rifiutare. I tracker sono disattivati finché non acconsenti.
              </p>
            </div>
            <div className="flex gap-2 md:justify-end">
              <Button variant="outline" onClick={rejectAll} className="min-w-28">Rifiuta</Button>
              <Button onClick={acceptAll} className="min-w-28">Accetta</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
