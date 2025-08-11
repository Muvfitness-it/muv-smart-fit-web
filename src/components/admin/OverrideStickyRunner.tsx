import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'override_sticky_done_v2';

const OverrideStickyRunner = () => {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const already = localStorage.getItem(STORAGE_KEY);
    if (already === 'yes') return;

    const run = async (attempt = 1) => {
      try {
        const { data, error } = await supabase.functions.invoke('override-orchestrator', { body: {} });
        if (error) {
          console.error('Override orchestrator error:', error);
          if (attempt < 3) setTimeout(() => run(attempt + 1), 1500 * attempt);
          return;
        }
        console.log('Override orchestrator results:', data);
        if (data?.ok) {
          localStorage.setItem(STORAGE_KEY, 'yes');
        } else if (attempt < 3) {
          setTimeout(() => run(attempt + 1), 1500 * attempt);
        }
      } catch (e) {
        console.error('Override orchestrator exception:', e);
        if (attempt < 3) setTimeout(() => run(attempt + 1), 1500 * attempt);
      }
    };

    run();
  }, []);

  return null;
};

export default OverrideStickyRunner;
