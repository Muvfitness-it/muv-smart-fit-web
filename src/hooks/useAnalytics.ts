
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalSiteVisits: number;
  totalPlannerUsage: number;
  uniqueVisitorsToday: number;
  plannerUsageToday: number;
}

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalSiteVisits: 0,
    totalPlannerUsage: 0,
    uniqueVisitorsToday: 0,
    plannerUsageToday: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Function to get user's IP address
  const getUserIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch (error) {
      console.warn('Failed to get user IP:', error);
      return 'unknown';
    }
  };

  const trackSiteVisit = useCallback(async (pagePath: string) => {
    try {
      const userAgent = navigator.userAgent;
      const referrer = document.referrer;
      const ipAddress = await getUserIP();
      
      const { error } = await supabase.from('site_visits').insert({
        page_path: pagePath,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer || null
      });

      if (error) {
        console.warn('Failed to track site visit:', error);
        return;
      }
      
      // Update analytics summary with better error handling
      const { error: updateError } = await supabase.rpc('update_analytics_summary');
      if (updateError) {
        console.warn('Failed to update analytics summary:', updateError);
      } else {
        // Refresh analytics data after successful update
        await fetchAnalytics();
      }
    } catch (error) {
      console.warn('Error tracking site visit:', error);
    }
  }, []);

  const trackPlannerUsage = useCallback(async (actionType: string, calories?: number, planType?: string) => {
    try {
      console.log('Tracking planner usage:', { actionType, calories, planType });
      
      const { error } = await supabase.from('planner_usage').insert({
        action_type: actionType,
        calories: calories || null,
        plan_type: planType || null,
        user_id: null // Allow anonymous usage tracking
      });

      if (error) {
        console.warn('Failed to track planner usage:', error);
        return;
      }
      
      console.log('Planner usage tracked successfully');
      
      // Update analytics summary with better error handling
      const { error: updateError } = await supabase.rpc('update_analytics_summary');
      if (updateError) {
        console.warn('Failed to update analytics summary:', updateError);
      } else {
        // Refresh analytics data after successful update
        await fetchAnalytics();
      }
    } catch (error) {
      console.warn('Error tracking planner usage:', error);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('analytics_summary')
        .select('metric_name, metric_value');

      if (error) {
        console.warn('Error fetching analytics:', error);
        return;
      }

      const metrics = data?.reduce((acc, item) => {
        switch (item.metric_name) {
          case 'total_site_visits':
            acc.totalSiteVisits = item.metric_value;
            break;
          case 'total_planner_usage':
            acc.totalPlannerUsage = item.metric_value;
            break;
          case 'unique_visitors_today':
            acc.uniqueVisitorsToday = item.metric_value;
            break;
          case 'planner_usage_today':
            acc.plannerUsageToday = item.metric_value;
            break;
        }
        return acc;
      }, {
        totalSiteVisits: 0,
        totalPlannerUsage: 0,
        uniqueVisitorsToday: 0,
        plannerUsageToday: 0
      });

      if (metrics) {
        setAnalyticsData(metrics);
      }
    } catch (error) {
      console.warn('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analyticsData,
    isLoading,
    trackSiteVisit,
    trackPlannerUsage,
    fetchAnalytics
  };
};
