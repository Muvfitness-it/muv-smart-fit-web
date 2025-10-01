/**
 * Optimized Analytics Hook
 * Reduces tracking frequency and batches requests
 */

import { useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsQueue {
  siteVisits: Array<{ page_path: string; timestamp: number }>;
  plannerUsage: Array<{ action_type: string; calories?: number; plan_type?: string; timestamp: number }>;
}

const BATCH_INTERVAL = 5000; // Send batched events every 5 seconds
const MAX_QUEUE_SIZE = 10; // Or when queue reaches 10 items

export const useOptimizedAnalytics = () => {
  const queueRef = useRef<AnalyticsQueue>({ siteVisits: [], plannerUsage: [] });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const flushQueue = useCallback(async () => {
    const queue = queueRef.current;
    
    if (queue.siteVisits.length === 0 && queue.plannerUsage.length === 0) return;

    // Send site visits
    if (queue.siteVisits.length > 0) {
      try {
        await supabase.functions.invoke('log-visit-public', {
          body: { 
            visits: queue.siteVisits 
          }
        });
        queue.siteVisits = [];
      } catch (error) {
        console.error('Failed to send site visits:', error);
      }
    }

    // Send planner usage
    if (queue.plannerUsage.length > 0) {
      try {
        await supabase.functions.invoke('log-visit-public', {
          body: { 
            plannerUsage: queue.plannerUsage 
          }
        });
        queue.plannerUsage = [];
      } catch (error) {
        console.error('Failed to send planner usage:', error);
      }
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleFlush = useCallback(() => {
    if (timerRef.current) return;
    
    timerRef.current = setTimeout(() => {
      flushQueue();
    }, BATCH_INTERVAL);
  }, [flushQueue]);

  const trackSiteVisit = useCallback((pagePath: string) => {
    // Check consent
    const consentRaw = typeof window !== 'undefined' ? localStorage.getItem('muv_cookie_consent') : null;
    const consent = consentRaw ? JSON.parse(consentRaw) : null;
    
    if (!consent?.analytics) return;

    queueRef.current.siteVisits.push({
      page_path: pagePath,
      timestamp: Date.now()
    });

    if (queueRef.current.siteVisits.length >= MAX_QUEUE_SIZE) {
      flushQueue();
    } else {
      scheduleFlush();
    }
  }, [flushQueue, scheduleFlush]);

  const trackPlannerUsage = useCallback((actionType: string, calories?: number, planType?: string) => {
    const consentRaw = typeof window !== 'undefined' ? localStorage.getItem('muv_cookie_consent') : null;
    const consent = consentRaw ? JSON.parse(consentRaw) : null;
    
    if (!consent?.analytics) return;

    queueRef.current.plannerUsage.push({
      action_type: actionType,
      calories,
      plan_type: planType,
      timestamp: Date.now()
    });

    if (queueRef.current.plannerUsage.length >= MAX_QUEUE_SIZE) {
      flushQueue();
    } else {
      scheduleFlush();
    }
  }, [flushQueue, scheduleFlush]);

  // Flush on unmount
  useCallback(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      flushQueue();
    };
  }, [flushQueue]);

  return {
    trackSiteVisit,
    trackPlannerUsage,
    flushQueue
  };
};
