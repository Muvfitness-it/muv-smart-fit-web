-- Create secure_rate_limits table for edge function rate limiting
CREATE TABLE IF NOT EXISTS public.secure_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  identifier TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  requests_count INTEGER NOT NULL DEFAULT 0,
  window_start TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_secure_rate_limits_identifier_endpoint UNIQUE (identifier, endpoint)
);

-- Enable Row Level Security (service role bypasses RLS)
ALTER TABLE public.secure_rate_limits ENABLE ROW LEVEL SECURITY;

-- Do not add permissive policies so regular clients cannot access this table
-- The edge function uses the service role key and bypasses RLS.

-- Trigger to auto-update updated_at
CREATE TRIGGER trg_secure_rate_limits_updated_at
BEFORE UPDATE ON public.secure_rate_limits
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful index for lookups by identifier + endpoint (redundant with unique but explicit)
CREATE INDEX IF NOT EXISTS idx_secure_rate_limits_identifier_endpoint
  ON public.secure_rate_limits (identifier, endpoint);
