import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY_OPENAI = 'override_sticky_done_v2_openai';
const STORAGE_KEY_GEMINI = 'override_sticky_done_v1_gemini';

const OverrideStickyRunner = () => {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const runProvider = async (provider: 'openai' | 'gemini', key: string, attempt = 1) => {
      const already = localStorage.getItem(key);
      if (already === 'yes') return;
      try {
        const { data, error } = await supabase.functions.invoke('override-orchestrator', { body: { provider, limit: 2 } });
        if (error) {
          console.error(`Override orchestrator (${provider}) error:`, error);
          if (attempt < 3) setTimeout(() => runProvider(provider, key, attempt + 1), 1500 * attempt);
          return;
        }
        console.log(`Override orchestrator (${provider}) results:`, data);
        if (data?.ok) {
          localStorage.setItem(key, 'yes');
        } else if (attempt < 3) {
          setTimeout(() => runProvider(provider, key, attempt + 1), 1500 * attempt);
        }
      } catch (e) {
        console.error(`Override orchestrator (${provider}) exception:`, e);
        if (attempt < 3) setTimeout(() => runProvider(provider, key, attempt + 1), 1500 * attempt);
      }
    };

    // Esegui test automatici per entrambi i provider
    runProvider('openai', STORAGE_KEY_OPENAI);
    setTimeout(() => runProvider('gemini', STORAGE_KEY_GEMINI), 2500);
  }, []);

  return null;
};

export default OverrideStickyRunner;
