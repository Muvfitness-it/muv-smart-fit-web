
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePlannerStats = () => {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlannerStats = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('analytics_summary')
        .select('metric_value')
        .eq('metric_name', 'total_planner_usage')
        .single();

      if (error) {
        console.error('Error fetching planner stats:', error);
      } else {
        setTotalUsage(data?.metric_value || 0);
      }
    } catch (error) {
      console.error('Error fetching planner stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlannerStats();
  }, []);

  return {
    totalUsage,
    isLoading,
    refreshStats: fetchPlannerStats
  };
};
