-- Ensure required extensions
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Create or replace the cron job safely
DO $outer$
BEGIN
  -- Unschedule if it already exists
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'publish-scheduled-blog-posts-every-minute') THEN
    PERFORM cron.unschedule('publish-scheduled-blog-posts-every-minute');
  END IF;

  -- Schedule every minute
  PERFORM cron.schedule(
    'publish-scheduled-blog-posts-every-minute',
    '* * * * *',
    $cmd$
      select net.http_post(
        url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/auto-publish-posts',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw"}'::jsonb,
        body := '{}'::jsonb
      );
    $cmd$
  );
END
$outer$;