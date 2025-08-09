import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AutoOptimizerRunner: React.FC = () => {
  useEffect(() => {
    const key = 'muv-auto-optimizer-last-run';
    const last = localStorage.getItem(key);
    const now = Date.now();
    // Run at most once every 24h per browser
    if (last && now - Number(last) < 24 * 60 * 60 * 1000) return;

    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('auto-optimizer', {
          body: { source: 'client_boot', limit: 50 }
        });
        if (!error) {
          localStorage.setItem(key, String(now));
          // lightweight toast to confirm run (hidden on mobile)
          toast.success('Retro-ottimizzazione avviata', {
            description: 'Il sito verrà aggiornato in background.',
            duration: 2500
          });
        }
      } catch {
        // silent
      }
    })();
  }, []);

  return null;
};

export default AutoOptimizerRunner;
