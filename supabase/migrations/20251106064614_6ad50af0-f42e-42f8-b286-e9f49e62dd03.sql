-- Create table for A/B test tracking of prefetch thresholds
CREATE TABLE IF NOT EXISTS public.prefetch_ab_test (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  variant TEXT NOT NULL CHECK (variant IN ('A', 'B', 'C')), -- A=30%, B=50%, C=70%
  threshold NUMERIC NOT NULL CHECK (threshold IN (0.3, 0.5, 0.7)),
  article_slug TEXT NOT NULL,
  
  -- Events
  prefetch_triggered BOOLEAN DEFAULT false,
  related_article_clicked BOOLEAN DEFAULT false,
  clicked_article_slug TEXT,
  clicked_position INTEGER,
  
  -- Metrics
  time_to_click INTEGER, -- milliseconds from page load to click
  time_on_target_page INTEGER, -- time spent on clicked article (if navigated)
  bounced BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT,
  
  UNIQUE(session_id, article_slug)
);

-- Create indexes for performance
CREATE INDEX idx_prefetch_ab_variant ON public.prefetch_ab_test(variant);
CREATE INDEX idx_prefetch_ab_created ON public.prefetch_ab_test(created_at DESC);
CREATE INDEX idx_prefetch_ab_session ON public.prefetch_ab_test(session_id);

-- Enable RLS
ALTER TABLE public.prefetch_ab_test ENABLE ROW LEVEL SECURITY;

-- Public can insert their own tracking data
CREATE POLICY "Anyone can insert prefetch AB test data"
  ON public.prefetch_ab_test
  FOR INSERT
  WITH CHECK (true);

-- Public can update their own session data
CREATE POLICY "Users can update their own session data"
  ON public.prefetch_ab_test
  FOR UPDATE
  USING (true);

-- Only admins can view AB test data
CREATE POLICY "Admins can view all AB test data"
  ON public.prefetch_ab_test
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
    )
  );

-- Create materialized view for AB test results
CREATE MATERIALIZED VIEW IF NOT EXISTS public.prefetch_ab_test_results AS
SELECT 
  variant,
  threshold,
  COUNT(*) as total_sessions,
  COUNT(*) FILTER (WHERE prefetch_triggered = true) as prefetch_triggered_count,
  COUNT(*) FILTER (WHERE related_article_clicked = true) as clicks_count,
  ROUND(
    (COUNT(*) FILTER (WHERE related_article_clicked = true)::NUMERIC / 
     NULLIF(COUNT(*), 0) * 100), 
    2
  ) as ctr_percentage,
  ROUND(
    AVG(time_to_click) FILTER (WHERE time_to_click IS NOT NULL), 
    0
  ) as avg_time_to_click_ms,
  ROUND(
    AVG(time_on_target_page) FILTER (WHERE time_on_target_page IS NOT NULL), 
    0
  ) as avg_time_on_page_ms,
  COUNT(*) FILTER (WHERE bounced = true) as bounce_count,
  ROUND(
    (COUNT(*) FILTER (WHERE bounced = true)::NUMERIC / 
     NULLIF(COUNT(*), 0) * 100), 
    2
  ) as bounce_rate_percentage,
  MAX(created_at) as last_updated
FROM public.prefetch_ab_test
GROUP BY variant, threshold;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_ab_results_variant ON public.prefetch_ab_test_results(variant);

-- Function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_prefetch_ab_test_results()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.prefetch_ab_test_results;
END;
$$;

-- Function to get winning variant (called automatically after 1000 sessions)
CREATE OR REPLACE FUNCTION get_winning_prefetch_variant()
RETURNS TABLE(
  winning_variant TEXT,
  winning_threshold NUMERIC,
  total_sessions BIGINT,
  ctr_percentage NUMERIC,
  avg_time_on_page_ms NUMERIC,
  bounce_rate_percentage NUMERIC,
  confidence_level TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_count BIGINT;
  min_sessions_per_variant INTEGER := 300; -- Minimum 300 sessions per variant
BEGIN
  -- Check if we have enough data
  SELECT COUNT(*) INTO total_count FROM public.prefetch_ab_test;
  
  IF total_count < 1000 THEN
    RETURN QUERY SELECT 
      'B'::TEXT, -- Default to 50%
      0.5::NUMERIC,
      total_count,
      0::NUMERIC,
      0::NUMERIC,
      0::NUMERIC,
      'INSUFFICIENT_DATA'::TEXT;
    RETURN;
  END IF;
  
  -- Refresh results
  PERFORM refresh_prefetch_ab_test_results();
  
  -- Calculate composite score: CTR (50%) + Time on Page (30%) - Bounce Rate (20%)
  RETURN QUERY
  WITH scored_variants AS (
    SELECT 
      r.variant,
      r.threshold,
      r.total_sessions,
      r.ctr_percentage,
      r.avg_time_on_page_ms,
      r.bounce_rate_percentage,
      (
        (COALESCE(r.ctr_percentage, 0) * 0.5) +
        (LEAST(COALESCE(r.avg_time_on_page_ms, 0) / 1000, 300) / 300 * 100 * 0.3) -
        (COALESCE(r.bounce_rate_percentage, 0) * 0.2)
      ) as composite_score,
      CASE
        WHEN r.total_sessions >= min_sessions_per_variant THEN 'HIGH'
        WHEN r.total_sessions >= 200 THEN 'MEDIUM'
        ELSE 'LOW'
      END as confidence
    FROM public.prefetch_ab_test_results r
    ORDER BY composite_score DESC
    LIMIT 1
  )
  SELECT 
    sv.variant,
    sv.threshold,
    sv.total_sessions,
    sv.ctr_percentage,
    sv.avg_time_on_page_ms,
    sv.bounce_rate_percentage,
    sv.confidence
  FROM scored_variants sv;
END;
$$;

-- Auto-update timestamp trigger
CREATE TRIGGER update_prefetch_ab_test_updated_at
  BEFORE UPDATE ON public.prefetch_ab_test
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
