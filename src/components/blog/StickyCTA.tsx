import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { X } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const navigate = useNavigate();
  const { trackSiteVisit } = useAnalytics();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show CTA only after the user has scrolled a bit and not dismissed recently
  useEffect(() => {
    const key = 'stickyCtaDismissedAt';
    const ts = Number(localStorage.getItem(key) || 0);
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (ts && Date.now() - ts < threeDays) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const threshold = Math.max(400, window.innerHeight * 0.4);
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem('stickyCtaDismissedAt', String(Date.now())); } catch {}
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none">
      <div className="mx-3 mb-[max(12px,env(safe-area-inset-bottom))] rounded-xl shadow-lg bg-primary text-primary-foreground flex items-center justify-between px-4 py-3 pointer-events-auto transition-transform duration-300">
        <div className="text-sm font-medium pr-2">Prenota la tua prova gratuita</div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => { trackSiteVisit('/cta/free-trial'); navigate('/contatti'); }}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Prenota
          </Button>
          <button aria-label="Chiudi" onClick={handleDismiss} className="ml-1 opacity-80 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
