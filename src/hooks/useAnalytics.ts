
import { useState, useEffect } from 'react';
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

  const trackSiteVisit = async (pagePath: string) => {
    try {
      const userAgent = navigator.userAgent;
      const referrer = document.referrer;
      
      await supabase.from('site_visits').insert({
        page_path: pagePath,
        user_agent: userAgent,
        referrer: referrer || null
      });
      
      // Update analytics summary
      await supabase.rpc('update_analytics_summary');
    } catch (error) {
      console.error('Error tracking site visit:', error);
    }
  };

  const trackPlannerUsage = async (actionType: string, calories?: number, planType?: string) => {
    try {
      await supabase.from('planner_usage').insert({
        action_type: actionType,
        calories: calories || null,
        plan_type: planType || null
      });
      
      // Update analytics summary
      await supabase.rpc('update_analytics_summary');
    } catch (error) {
      console.error('Error tracking planner usage:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('analytics_summary')
        .select('metric_name, metric_value');

      if (error) throw error;

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

      setAnalyticsData(metrics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analyticsData,
    isLoading,
    trackSiteVisit,
    trackPlannerUsage,
    fetchAnalytics
  };
};
