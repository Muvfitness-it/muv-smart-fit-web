import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
const STORAGE_KEY_OPENAI = 'override_sticky_done_v2_openai';
const STORAGE_KEY_GEMINI = 'override_sticky_done_v1_gemini';
const STORAGE_KEY_BATCH = 'batch_rewrite_done_v1';
const STORAGE_OFFSET = 'batch_rewrite_offset_v1';

const OverrideStickyRunner = () => {
  const started = useRef(false);
  const { toast } = useToast();

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

    const runBatchRewrite = async (attempt = 1) => {
      try {
        if (localStorage.getItem(STORAGE_KEY_BATCH) === 'yes') return;
        const offset = Number(localStorage.getItem(STORAGE_OFFSET) || '0');
        const { data, error } = await supabase.functions.invoke('blog-batch-rewrite', {
          body: { provider: 'gemini', batchSize: 10, offset }
        });
        if (error) {
          console.error('blog-batch-rewrite error:', error);
          if (attempt < 3) setTimeout(() => runBatchRewrite(attempt + 1), 1500 * attempt);
          return;
        }
        console.log('blog-batch-rewrite data:', data);
if (data?.ok) {
          localStorage.setItem(STORAGE_OFFSET, String(data.nextOffset ?? 0));
          if (data?.done) {
            localStorage.setItem(STORAGE_KEY_BATCH, 'yes');
            toast({
              title: 'Riscrittura completata',
              description: 'Tutti gli articoli sono stati riscritti e ottimizzati.',
              duration: 6000,
            });
          } else {
            // Continua finché non è finito
            setTimeout(() => runBatchRewrite(1), 1200);
          }
        } else if (attempt < 3) {
          setTimeout(() => runBatchRewrite(attempt + 1), 1500 * attempt);
        }
      } catch (e) {
        console.error('blog-batch-rewrite exception:', e);
        if (attempt < 3) setTimeout(() => runBatchRewrite(attempt + 1), 1500 * attempt);
      }
    };

    // Avvio test orchestrator (2 task) e batch rewrite completo
    runProvider('openai', STORAGE_KEY_OPENAI);
    setTimeout(() => runProvider('gemini', STORAGE_KEY_GEMINI), 2500);
    setTimeout(() => runBatchRewrite(), 4000);
  }, []);

  return null;
};

export default OverrideStickyRunner;
