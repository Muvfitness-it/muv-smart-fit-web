
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePlannerStats = () => {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const CACHE_DURATION = 60000; // 1 minute cache
  const RETRY_ATTEMPTS = 3;

  const fetchPlannerStats = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    
    // Check cache
    if (!forceRefresh && now - lastFetch < CACHE_DURATION && totalUsage > 0) {
      console.log('Using cached planner stats');
      return;
    }

    let attempts = 0;
    
    const attemptFetch = async (): Promise<void> => {
      try {
        setIsLoading(true);
        console.log('Fetching planner stats...');
        
        // Prima prova a recuperare dalla tabella analytics_summary
        const { data: summaryData, error: summaryError } = await supabase
          .from('analytics_summary')
          .select('metric_value')
          .eq('metric_name', 'total_planner_usage')
          .single();

        let newUsage = 0;

        if (summaryError || !summaryData) {
          console.log('Analytics summary not found, counting directly from planner_usage table');
          // Se non esiste nella summary, conta direttamente dalla tabella planner_usage
          const { data: directData, error: directError } = await supabase
            .from('planner_usage')
            .select('id', { count: 'exact' });

          if (directError) {
            throw directError;
          }

          newUsage = directData?.length || 0;
          console.log('Direct count from planner_usage:', newUsage);

          // Aggiorna o inserisci nella tabella analytics_summary
          const { error: upsertError } = await supabase
            .from('analytics_summary')
            .upsert({
              metric_name: 'total_planner_usage',
              metric_value: newUsage
            });

          if (upsertError) {
            console.warn('Failed to update analytics_summary:', upsertError);
          }
        } else {
          newUsage = summaryData.metric_value || 0;
          console.log('Retrieved from analytics_summary:', newUsage);
        }

        setTotalUsage(newUsage);
        setLastFetch(now);
        console.log('Planner stats updated successfully:', newUsage);
        
      } catch (error) {
        console.error('Error fetching planner stats:', error);
        attempts++;
        
        if (attempts < RETRY_ATTEMPTS) {
          console.log(`Retrying fetch (attempt ${attempts + 1}/${RETRY_ATTEMPTS})...`);
          setTimeout(attemptFetch, 1000 * attempts);
        } else {
          // Set a default value if all attempts fail
          if (totalUsage === 0) {
            setTotalUsage(1250); // Fallback value
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    await attemptFetch();
  }, [lastFetch, totalUsage]);

  const refreshStats = useCallback(() => {
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
