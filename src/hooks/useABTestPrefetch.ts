import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Variant = 'A' | 'B' | 'C';

export interface ABTestConfig {
  variant: Variant;
  threshold: number;
}

interface ABTestMetrics {
  sessionId: string;
  visitorId: string;
  variant: Variant;
  threshold: number;
  articleSlug: string;
  prefetchTriggered: boolean;
  timeToClick?: number;
  pageLoadTime: number;
}

const VARIANT_THRESHOLDS: Record<Variant, number> = {
  'A': 0.3, // 30% scroll
  'B': 0.5, // 50% scroll
  'C': 0.7  // 70% scroll
};

/**
 * Hook for A/B testing different prefetch thresholds
 * Automatically assigns variants and tracks performance metrics
 */
export function useABTestPrefetch(articleSlug: string) {
  const [config, setConfig] = useState<ABTestConfig | null>(null);
  const [metrics, setMetrics] = useState<Partial<ABTestMetrics>>({});
  const [sessionId, setSessionId] = useState<string>('');
  const [visitorId, setVisitorId] = useState<string>('');

  // Initialize session and visitor IDs
  useEffect(() => {
    // Session ID (new per tab/session)
    let sid = sessionStorage.getItem('prefetch_ab_session_id');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      sessionStorage.setItem('prefetch_ab_session_id', sid);
    }
    setSessionId(sid);

    // Visitor ID (persistent across sessions)
    let vid = localStorage.getItem('prefetch_ab_visitor_id');
    if (!vid) {
      vid = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('prefetch_ab_visitor_id', vid);
    }
    setVisitorId(vid);
  }, []);

  // Assign variant on component mount
  useEffect(() => {
    if (!sessionId || !articleSlug) return;

    const assignVariant = async () => {
      // Check if we have a winning variant already determined
      const winningVariant = await getOptimalThreshold();
      
      let assignedVariant: Variant;
      
      if (winningVariant && winningVariant.confidence_level === 'HIGH') {
        // Use winning variant (90% of traffic)
        if (Math.random() < 0.9) {
          assignedVariant = winningVariant.winning_variant as Variant;
        } else {
          // 10% continue testing
          assignedVariant = getRandomVariant();
        }
      } else {
        // Uniform distribution for testing
        assignedVariant = getRandomVariant();
      }

      const threshold = VARIANT_THRESHOLDS[assignedVariant];
      
      setConfig({ variant: assignedVariant, threshold });
      
      // Initialize metrics tracking
      const initialMetrics: Partial<ABTestMetrics> = {
        sessionId,
        visitorId,
        variant: assignedVariant,
        threshold,
        articleSlug,
        prefetchTriggered: false,
        pageLoadTime: Date.now()
      };
      
      setMetrics(initialMetrics);

      // Insert initial tracking record
      try {
        await supabase.from('prefetch_ab_test').insert({
          session_id: sessionId,
          visitor_id: visitorId,
          variant: assignedVariant,
          threshold,
          article_slug: articleSlug,
          prefetch_triggered: false,
          user_agent: navigator.userAgent
        });
      } catch (error) {
        console.error('[AB Test] Failed to insert initial tracking:', error);
      }
    };

    assignVariant();
  }, [sessionId, visitorId, articleSlug]);

  // Track prefetch trigger
  const trackPrefetchTriggered = useCallback(async () => {
    if (!sessionId || !articleSlug) return;

    try {
      await supabase
        .from('prefetch_ab_test')
        .update({ prefetch_triggered: true })
        .eq('session_id', sessionId)
        .eq('article_slug', articleSlug);
      
      console.log(`[AB Test] Prefetch triggered for variant ${config?.variant}`);
    } catch (error) {
      console.error('[AB Test] Failed to track prefetch trigger:', error);
    }
  }, [sessionId, articleSlug, config?.variant]);

  // Track article click
  const trackArticleClick = useCallback(async (
    clickedSlug: string, 
    position: number
  ) => {
    if (!sessionId || !articleSlug || !metrics.pageLoadTime) return;

    const timeToClick = Date.now() - metrics.pageLoadTime;

    try {
      await supabase
        .from('prefetch_ab_test')
        .update({
          related_article_clicked: true,
          clicked_article_slug: clickedSlug,
          clicked_position: position,
          time_to_click: timeToClick
        })
        .eq('session_id', sessionId)
        .eq('article_slug', articleSlug);
      
      console.log(`[AB Test] Click tracked: ${clickedSlug} at position ${position + 1}, time: ${timeToClick}ms`);

      // Track with Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ab_test_click', {
          variant: config?.variant,
          threshold: config?.threshold,
          time_to_click: timeToClick,
          position
        });
      }
    } catch (error) {
      console.error('[AB Test] Failed to track click:', error);
    }
  }, [sessionId, articleSlug, metrics.pageLoadTime, config]);

  // Track bounce (user leaves without clicking)
  useEffect(() => {
    if (!sessionId || !articleSlug) return;

    const handleBeforeUnload = async () => {
      try {
        // Check if any click was registered
        const { data } = await supabase
          .from('prefetch_ab_test')
          .select('related_article_clicked')
          .eq('session_id', sessionId)
          .eq('article_slug', articleSlug)
          .single();

        if (data && !data.related_article_clicked) {
          // Mark as bounced
          await supabase
            .from('prefetch_ab_test')
            .update({ bounced: true })
            .eq('session_id', sessionId)
            .eq('article_slug', articleSlug);
        }
      } catch (error) {
        console.error('[AB Test] Failed to track bounce:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionId, articleSlug]);

  return {
    config,
    trackPrefetchTriggered,
    trackArticleClick
  };
}

/**
 * Get random variant with equal distribution
 */
function getRandomVariant(): Variant {
  const variants: Variant[] = ['A', 'B', 'C'];
  return variants[Math.floor(Math.random() * variants.length)];
}

/**
 * Get optimal threshold from database (winning variant)
 */
async function getOptimalThreshold(): Promise<{
  winning_variant: string;
  winning_threshold: number;
  confidence_level: string;
} | null> {
  try {
    const { data, error } = await supabase.rpc('get_winning_prefetch_variant');
    
    if (error) throw error;
    if (!data || data.length === 0) return null;
    
    return data[0];
  } catch (error) {
    console.error('[AB Test] Failed to get optimal threshold:', error);
    return null;
  }
}

/**
 * Hook to display A/B test results (for admin dashboard)
 */
export function useABTestResults() {
  const [results, setResults] = useState<any[]>([]);
  const [winner, setWinner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        // Refresh materialized view
        await supabase.rpc('refresh_prefetch_ab_test_results');

        // Get results
        const { data: resultsData } = await supabase
          .from('prefetch_ab_test_results')
          .select('*')
          .order('variant', { ascending: true });

        // Get winning variant
        const { data: winnerData } = await supabase.rpc('get_winning_prefetch_variant');

        setResults(resultsData || []);
        setWinner(winnerData?.[0] || null);
      } catch (error) {
        console.error('[AB Test] Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return { results, winner, loading };
}
