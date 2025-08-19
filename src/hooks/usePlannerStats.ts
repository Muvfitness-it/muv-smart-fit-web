
import { useState, useEffect, useCallback } from 'react';

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
    
    try {
      // TODO: Implement database access when planner_usage table is created
      // For now, use a mock value
      console.log('Using mock planner usage stats...');
      
      const mockUsage = 1250 + Math.floor(Math.random() * 100); // Mock incrementing usage
      setTotalUsage(mockUsage);
      setLastFetch(now);
      
      console.log('Mock planner usage count:', mockUsage);
      
    } catch (error) {
      console.error('Error in mock planner stats:', error);
      // Fallback value
      setTotalUsage(1250);
    } finally {
      setIsLoading(false);
    }
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
