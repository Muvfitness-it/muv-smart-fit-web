-- FASE 1: Create SEO Monitoring Tables

-- Table: seo_monitoring_log
CREATE TABLE IF NOT EXISTS public.seo_monitoring_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  check_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexing status
  indexing_status TEXT NOT NULL CHECK (indexing_status IN ('indexed', 'crawled_not_indexed', 'not_found', 'error', 'pending_first_check')),
  last_crawled TIMESTAMPTZ,
  
  -- SEO Metadata snapshot
  title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  featured_image TEXT,
  
  -- Performance metrics
  response_time_ms INTEGER,
  http_status_code INTEGER,
  
  -- Change tracking
  status_changed_from TEXT,
  days_in_current_status INTEGER DEFAULT 0,
  
  -- Diagnostics
  issues_detected JSONB DEFAULT '[]'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_seo_monitoring_post_id ON public.seo_monitoring_log(post_id);
CREATE INDEX IF NOT EXISTS idx_seo_monitoring_status ON public.seo_monitoring_log(indexing_status);
CREATE INDEX IF NOT EXISTS idx_seo_monitoring_date ON public.seo_monitoring_log(check_date DESC);

-- Table: seo_monitoring_summary
CREATE TABLE IF NOT EXISTS public.seo_monitoring_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT UNIQUE NOT NULL,
  metric_value INTEGER DEFAULT 0,
  metric_data JSONB DEFAULT '{}'::jsonb,
  last_check TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial metrics
INSERT INTO public.seo_monitoring_summary (metric_name, metric_value) 
VALUES
  ('total_articles', 0),
  ('indexed_articles', 0),
  ('crawled_not_indexed', 0),
  ('critical_articles', 0),
  ('articles_resolved_week', 0)
ON CONFLICT (metric_name) DO NOTHING;

-- Enable RLS
ALTER TABLE public.seo_monitoring_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_monitoring_summary ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view seo monitoring logs" 
ON public.seo_monitoring_log
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can manage seo monitoring" 
ON public.seo_monitoring_log
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view seo summary" 
ON public.seo_monitoring_summary
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can manage seo summary" 
ON public.seo_monitoring_summary
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- FASE 6: Auto-submit trigger for new published posts
CREATE OR REPLACE FUNCTION public.auto_submit_to_indexnow()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') THEN
    -- Trigger IndexNow submission via pg_net
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/indexnow-submitter',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := jsonb_build_object('urls', ARRAY['https://www.muvfitness.it/' || NEW.slug])
    );
    
    -- Schedule first SEO check - insert initial log
    INSERT INTO public.seo_monitoring_log (
      post_id,
      url,
      indexing_status,
      title,
      meta_description,
      canonical_url,
      days_in_current_status
    ) VALUES (
      NEW.id,
      'https://www.muvfitness.it/' || NEW.slug,
      'pending_first_check',
      COALESCE(NEW.meta_title, NEW.title),
      NEW.meta_description,
      'https://www.muvfitness.it/' || NEW.slug,
      0
    )
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_auto_submit_indexnow ON public.blog_posts;
CREATE TRIGGER trigger_auto_submit_indexnow
  AFTER INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_submit_to_indexnow();