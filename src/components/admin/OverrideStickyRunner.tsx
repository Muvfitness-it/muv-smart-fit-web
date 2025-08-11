import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'override_sticky_done_v1';

const OverrideStickyRunner = () => {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const already = localStorage.getItem(STORAGE_KEY);
    if (already === 'yes') return;

    const run = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('override-orchestrator', { body: {} });
        if (error) {
          console.error('Override orchestrator error:', error);
          return;
        }
        console.log('Override orchestrator results:', data);
        localStorage.setItem(STORAGE_KEY, 'yes');
      } catch (e) {
        console.error('Override orchestrator exception:', e);
      }
    };

    run();
  }, []);

  return null;
};

export default OverrideStickyRunner;
