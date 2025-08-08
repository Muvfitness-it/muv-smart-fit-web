-- Enable required extensions
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Conditionally unschedule if the job exists to avoid errors
do $$
begin
  if exists (select 1 from cron.job where jobname = 'publish-scheduled-blog-posts-every-minute') then
    perform cron.unschedule('publish-scheduled-blog-posts-every-minute');
  end if;
end$$;

-- Schedule the auto-publish job to run every minute
do $$
begin
  perform cron.schedule(
    'publish-scheduled-blog-posts-every-minute',
    '* * * * *',
    $$
    select
      net.http_post(
        url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/auto-publish-posts',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw"}'::jsonb,
        body := '{}'::jsonb
      );
    $$
  );
end$$;