-- Ensure required extensions
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Create redirects table
create table if not exists public.url_redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text unique not null,
  to_path text not null,
  status_code int not null default 301,
  source_type text,
  created_at timestamptz not null default now()
);

alter table public.url_redirects enable row level security;

-- Policies for url_redirects
do $$ begin
  begin
    create policy "Public can read redirects"
      on public.url_redirects
      for select
      using (true);
  exception when duplicate_object then null; end;

  begin
    create policy "Service role can manage redirects"
      on public.url_redirects
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  exception when duplicate_object then null; end;

  begin
    create policy "Admins can manage redirects"
      on public.url_redirects
      for all
      using (is_admin())
      with check (is_admin());
  exception when duplicate_object then null; end;
end $$;

-- Create logs table
create table if not exists public.auto_optimizer_logs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null default gen_random_uuid(),
  content_type text,
  content_id uuid,
  path text,
  actions text[],
  before jsonb,
  after jsonb,
  errors text[],
  impact_score int,
  created_at timestamptz not null default now()
);

alter table public.auto_optimizer_logs enable row level security;

-- Policies for auto_optimizer_logs
do $$ begin
  begin
    create policy "Admins can read auto optimizer logs"
      on public.auto_optimizer_logs
      for select
      using (is_admin());
  exception when duplicate_object then null; end;

  begin
    create policy "Service role can insert auto optimizer logs"
      on public.auto_optimizer_logs
      for insert
      with check (auth.role() = 'service_role');
  exception when duplicate_object then null; end;
end $$;

-- Schedule daily job (unschedule previous if exists)
select cron.unschedule('daily-auto-optimizer-0300') where exists (
  select 1 from cron.job where jobname = 'daily-auto-optimizer-0300'
);

select cron.schedule(
  'daily-auto-optimizer-0300',
  '0 3 * * *',
  $$
  select net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/auto-optimizer',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{"source":"pg_cron"}'::jsonb
  );
  $$
);