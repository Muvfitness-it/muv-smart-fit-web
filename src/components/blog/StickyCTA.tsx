import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

const StickyCTA: React.FC = () => {
  const navigate = useNavigate();
  const { trackSiteVisit } = useAnalytics();
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="mx-3 mb-3 rounded-xl shadow-lg bg-primary text-primary-foreground flex items-center justify-between px-4 py-3">
        <div className="text-sm font-medium">Prenota la tua prova gratuita</div>
        <Button
          size="sm"
          onClick={() => { trackSiteVisit('/cta/free-trial'); navigate('/contatti'); }}
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          Prenota
        </Button>
      </div>
    </div>
  );
};

export default StickyCTA;
