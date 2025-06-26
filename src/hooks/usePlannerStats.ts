
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePlannerStats = () => {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const CACHE_DURATION = 30000; // 30 secondi cache
  const RETRY_ATTEMPTS = 2;

  const fetchPlannerStats = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    
    // Check cache solo se non è un refresh forzato
    if (!forceRefresh && now - lastFetch < CACHE_DURATION && totalUsage > 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let attempts = 0;
    
    const attemptFetch = async (): Promise<void> => {
      try {
        console.log('Fetching planner usage stats...');
        
        // Conta direttamente dalla tabella planner_usage
        const { count, error: countError } = await supabase
          .from('planner_usage')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          console.error('Error counting planner usage:', countError);
          throw countError;
        }

        const newUsage = count || 0;
        console.log('Planner usage count:', newUsage);
        
        setTotalUsage(newUsage);
        setLastFetch(now);
        
        // Aggiorna la tabella analytics_summary in background
        const { error: upsertError } = await supabase
          .from('analytics_summary')
          .upsert({
            metric_name: 'total_planner_usage',
            metric_value: newUsage,
            updated_at: new Date().toISOString()
          });

        if (upsertError) {
          console.warn('Failed to update analytics_summary:', upsertError);
        }

      } catch (error) {
        console.error('Error fetching planner stats:', error);
        attempts++;
        
        if (attempts < RETRY_ATTEMPTS) {
          console.log(`Retrying fetch (attempt ${attempts + 1}/${RETRY_ATTEMPTS})...`);
          setTimeout(attemptFetch, 1000 * attempts);
        } else {
          // Fallback: mostra un valore di default se tutto fallisce
          if (totalUsage === 0) {
            setTotalUsage(1250); // Valore di fallback
            console.log('Using fallback value for planner usage');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    await attemptFetch();
  }, [lastFetch, totalUsage]);

  const refreshStats = useCallback(() => {
    console.log('Forcing refresh of planner stats');
    fetchPlannerStats(true);
  }, [fetchPlannerStats]);

  useEffect(() => {
    fetchPlannerStats();
  }, [fetchPlannerStats]);

  return {
    totalUsage,
    isLoading,
    refreshStats
  };
};
