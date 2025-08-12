-- Create lead_tracking table to support useLeadTracking.upsert(onConflict: 'session_id')
CREATE TABLE IF NOT EXISTS public.lead_tracking (
  session_id TEXT PRIMARY KEY,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  pages_visited INTEGER NOT NULL DEFAULT 1,
  time_on_site INTEGER NOT NULL DEFAULT 0,
  form_submissions INTEGER NOT NULL DEFAULT 0,
  booking_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lead_tracking ENABLE ROW LEVEL SECURITY;

-- Policies: allow anonymous and authenticated inserts/updates (public tracking data)
CREATE POLICY "Allow insert lead tracking"
ON public.lead_tracking
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow update lead tracking"
ON public.lead_tracking
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Generic updated_at trigger (create or replace to be idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_lead_tracking_updated_at
BEFORE UPDATE ON public.lead_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();