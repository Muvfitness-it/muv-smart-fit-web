import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SiteOptimizerWeeklyRunner: React.FC = () => {
  useEffect(() => {
    const key = 'muv-site-optimizer-weekly';
    const last = Number(localStorage.getItem(key) || '0');
    const now = Date.now();
    // Run at most once every 7 days per browser
    if (now - last < 7 * 24 * 60 * 60 * 1000) return;

    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('site-optimizer', { body: {} });
        if (!error) {
          localStorage.setItem(key, String(now));
          toast.success('Ottimizzazione settimanale avviata', {
            description: 'Pulizia, linking, immagini e sitemap.',
            duration: 3000
          });
          console.log('site-optimizer weekly data:', data);
        }
      } catch (e) {
        console.warn('site-optimizer weekly exception:', e);
      }
    })();
  }, []);

  return null;
};

export default SiteOptimizerWeeklyRunner;
