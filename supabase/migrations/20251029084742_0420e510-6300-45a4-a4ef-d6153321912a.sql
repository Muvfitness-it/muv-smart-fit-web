-- Add Google Search Console OAuth tokens table
CREATE TABLE IF NOT EXISTS public.gsc_oauth_tokens (
  id INTEGER PRIMARY KEY DEFAULT 1,
  refresh_token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- RLS Policies
ALTER TABLE public.gsc_oauth_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can manage GSC tokens"
  ON public.gsc_oauth_tokens
  FOR ALL
  USING (auth.role() = 'service_role');

-- Add GSC fields to seo_monitoring_log
ALTER TABLE public.seo_monitoring_log 
ADD COLUMN IF NOT EXISTS gsc_verdict TEXT,
ADD COLUMN IF NOT EXISTS gsc_coverage_state TEXT,
ADD COLUMN IF NOT EXISTS gsc_last_crawl_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS gsc_mobile_usable BOOLEAN,
ADD COLUMN IF NOT EXISTS gsc_check_error TEXT;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_seo_monitoring_log_gsc_verdict 
  ON public.seo_monitoring_log(gsc_verdict);

CREATE INDEX IF NOT EXISTS idx_seo_monitoring_log_gsc_coverage 
  ON public.seo_monitoring_log(gsc_coverage_state);

-- Add comment for documentation
COMMENT ON TABLE public.gsc_oauth_tokens IS 'Stores Google Search Console OAuth refresh token for API access';
COMMENT ON COLUMN public.seo_monitoring_log.gsc_verdict IS 'Google Search Console URL Inspection verdict: PASS, PARTIAL, FAIL, or NEUTRAL';
COMMENT ON COLUMN public.seo_monitoring_log.gsc_coverage_state IS 'Google indexing coverage state: Submitted and indexed, Discovered, etc.';
COMMENT ON COLUMN public.seo_monitoring_log.gsc_last_crawl_time IS 'Last time Google crawled this URL according to Search Console';
COMMENT ON COLUMN public.seo_monitoring_log.gsc_mobile_usable IS 'Whether the page is mobile-friendly according to Google';
COMMENT ON COLUMN public.seo_monitoring_log.gsc_check_error IS 'Error message if GSC API check failed';
