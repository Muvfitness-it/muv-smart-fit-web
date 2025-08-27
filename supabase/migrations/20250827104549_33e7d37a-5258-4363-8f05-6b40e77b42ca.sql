-- Create table if not exists and ensure proper columns
create table if not exists public.secure_rate_limits (
  id bigserial primary key,
  identifier text not null,
  endpoint text not null,
  requests_count integer not null default 0,
  window_start timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Add missing updated_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'secure_rate_limits'
      AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE public.secure_rate_limits
      ADD COLUMN updated_at timestamptz;
  END IF;
END $$;

-- Create unique index to avoid duplicates per identifier+endpoint
create unique index if not exists ux_secure_rate_limits_identifier_endpoint
  on public.secure_rate_limits(identifier, endpoint);

-- Enable RLS if not enabled (data is internal; restrict to service role only)
alter table public.secure_rate_limits enable row level security;

-- Drop overly permissive policies if exist and recreate tight ones
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='secure_rate_limits') THEN
    -- keep existing; we'll add precise ones below if missing
  END IF;
END $$;

-- Only service role can read/write (edge functions use service role key)
create policy if not exists "service role read secure_rate_limits"
  on public.secure_rate_limits for select
  to service_role
  using (true);

create policy if not exists "service role write secure_rate_limits"
  on public.secure_rate_limits for all
  to service_role
  using (true)
  with check (true);

-- Ensure timestamp trigger function exists (already present in project)
-- Attach BEFORE UPDATE trigger to maintain updated_at
DROP TRIGGER IF EXISTS trg_secure_rate_limits_updated_at ON public.secure_rate_limits;
CREATE TRIGGER trg_secure_rate_limits_updated_at
BEFORE UPDATE ON public.secure_rate_limits
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();