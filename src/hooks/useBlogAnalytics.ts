import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogAnalyticsData {
  totalBlogViews: number;
  totalBlogSessions: number;
  avgTimeOnPage: number;
  totalSearches: number;
  bounceRate: number;
  dailyViews: number;
  weeklyViews: number;
  monthlyViews: number;
  mostViewedPosts: Array<{
    post_id: string;
    title: string;
    views: number;
  }>;
  topSearchQueries: Array<{
    query: string;
    count: number;
  }>;
}

interface TrackingOptions {
  postId?: string;
  searchQuery?: string;
  searchPrompt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export const useBlogAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<BlogAnalyticsData>({
    totalBlogViews: 0,
    totalBlogSessions: 0,
    avgTimeOnPage: 0,
    totalSearches: 0,
    bounceRate: 0,
    dailyViews: 0,
    weeklyViews: 0,
    monthlyViews: 0,
    mostViewedPosts: [],
    topSearchQueries: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const startTime = useRef<number>(Date.now());
  const visitorId = useRef<string>(generateVisitorId());
  const sessionId = useRef<string>(generateSessionId());
  const scrollDepth = useRef<number>(0);
  const interactions = useRef<any[]>([]);

  // Generate unique visitor and session IDs
  function generateVisitorId(): string {
    const stored = localStorage.getItem('blog_visitor_id');
    if (stored) return stored;
    
    const newId = 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now();
    localStorage.setItem('blog_visitor_id', newId);
    return newId;
  }

  function generateSessionId(): string {
    const stored = sessionStorage.getItem('blog_session_id');
    if (stored) return stored;
    
    const newId = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now();
    sessionStorage.setItem('blog_session_id', newId);
    return newId;
  }

  // Track scroll depth
  const trackScrollDepth = useCallback(() => {
    const scrollPercent = Math.round(
      (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
    );
    scrollDepth.current = Math.max(scrollDepth.current, Math.min(scrollPercent, 100));
  }, []);

  // Track page view
  const trackPageView = useCallback(async (pagePath: string, options: TrackingOptions = {}) => {
    try {
      const consentRaw = localStorage.getItem('muv_cookie_consent');
      const consent = consentRaw ? JSON.parse(consentRaw) : null;
      
      if (!consent?.analytics) return;

      startTime.current = Date.now();
      scrollDepth.current = 0;
      interactions.current = [];

      // Set up scroll tracking
      window.addEventListener('scroll', trackScrollDepth, { passive: true });

      const { error } = await supabase.functions.invoke('blog-analytics', {
        body: {
          event_type: 'view',
          post_id: options.postId,
          page_path: pagePath,
          visitor_id: visitorId.current,
          session_id: sessionId.current,
          referrer: document.referrer,
          utm_source: options.utmSource || new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: options.utmMedium || new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: options.utmCampaign || new URLSearchParams(window.location.search).get('utm_campaign')
        }
      });

      if (error) {
        console.warn('Failed to track page view:', error);
      }
    } catch (error) {
      console.warn('Error tracking page view:', error);
    }
  }, [trackScrollDepth]);

  // Track page exit
  const trackPageExit = useCallback(async (pagePath: string, options: TrackingOptions = {}) => {
    try {
      const consentRaw = localStorage.getItem('muv_cookie_consent');
      const consent = consentRaw ? JSON.parse(consentRaw) : null;
      
      if (!consent?.analytics) return;

      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      
      window.removeEventListener('scroll', trackScrollDepth);

      const { error } = await supabase.functions.invoke('blog-analytics', {
        body: {
          event_type: 'exit',
          post_id: options.postId,
          page_path: pagePath,
          visitor_id: visitorId.current,
          session_id: sessionId.current,
          time_on_page: timeOnPage,
          scroll_depth: scrollDepth.current,
          interactions: interactions.current
        }
      });

      if (error) {
        console.warn('Failed to track page exit:', error);
      }
    } catch (error) {
      console.warn('Error tracking page exit:', error);
    }
  }, [trackScrollDepth]);

  // Track search
  const trackSearch = useCallback(async (query: string, prompt?: string) => {
    try {
      const consentRaw = localStorage.getItem('muv_cookie_consent');
      const consent = consentRaw ? JSON.parse(consentRaw) : null;
      
      if (!consent?.analytics) return;

      const { error } = await supabase.functions.invoke('blog-analytics', {
        body: {
          event_type: 'search',
          page_path: window.location.pathname,
          visitor_id: visitorId.current,
          session_id: sessionId.current,
          search_query: query,
          search_prompt: prompt
        }
      });

      if (error) {
        console.warn('Failed to track search:', error);
      }
    } catch (error) {
      console.warn('Error tracking search:', error);
    }
  }, []);

  // Track interaction
  const trackInteraction = useCallback((type: string, data: any = {}) => {
    interactions.current.push({
      type,
      data,
      timestamp: Date.now()
    });
  }, []);

  // Fetch blog analytics data
  const fetchBlogAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_performance_summary')
        .select('metric_name, metric_value, metric_data');

      if (error) {
        console.warn('Error fetching blog analytics:', error);
        return;
      }

      const metrics = data?.reduce((acc, item) => {
        switch (item.metric_name) {
          case 'total_blog_views':
            acc.totalBlogViews = item.metric_value;
            break;
          case 'total_blog_sessions':
            acc.totalBlogSessions = item.metric_value;
            break;
          case 'avg_time_on_page':
            acc.avgTimeOnPage = item.metric_value;
            break;
          case 'total_searches':
            acc.totalSearches = item.metric_value;
            break;
          case 'bounce_rate':
            acc.bounceRate = item.metric_value;
            break;
          case 'daily_views':
            acc.dailyViews = item.metric_value;
            break;
          case 'weekly_views':
            acc.weeklyViews = item.metric_value;
            break;
          case 'monthly_views':
            acc.monthlyViews = item.metric_value;
            break;
          case 'most_viewed_posts':
            acc.mostViewedPosts = Array.isArray(item.metric_data) ? item.metric_data : [];
            break;
          case 'top_search_queries':
            acc.topSearchQueries = Array.isArray(item.metric_data) ? item.metric_data : [];
            break;
        }
        return acc;
      }, {
        totalBlogViews: 0,
        totalBlogSessions: 0,
        avgTimeOnPage: 0,
        totalSearches: 0,
        bounceRate: 0,
        dailyViews: 0,
        weeklyViews: 0,
        monthlyViews: 0,
        mostViewedPosts: [],
        topSearchQueries: []
      });

      if (metrics) {
        setAnalyticsData(metrics);
      }
    } catch (error) {
      console.warn('Error fetching blog analytics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up page visibility tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackPageExit(window.location.pathname);
      }
    };

    const handleBeforeUnload = () => {
      trackPageExit(window.location.pathname);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [trackPageExit, trackScrollDepth]);

  return {
    analyticsData,
    isLoading,
    trackPageView,
    trackPageExit,
    trackSearch,
    trackInteraction,
    fetchBlogAnalytics
  };
};