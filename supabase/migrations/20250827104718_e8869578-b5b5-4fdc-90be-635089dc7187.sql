-- Fix the table structure with proper columns
alter table public.secure_rate_limits add column if not exists updated_at timestamptz default now();

-- Recreate the trigger for updated_at
drop trigger if exists trg_secure_rate_limits_updated_at on public.secure_rate_limits;
create trigger trg_secure_rate_limits_updated_at
  before update on public.secure_rate_limits
  for each row execute function public.update_updated_at_column();