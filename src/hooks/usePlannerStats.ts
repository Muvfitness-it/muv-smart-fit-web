
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
      // Mock usage statistics
      const mockUsage = 1250 + Math.floor(Math.random() * 100);
      setTotalUsage(mockUsage);
      setLastFetch(now);
      
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
