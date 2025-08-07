-- Add cron job to auto-update sitemaps every hour
SELECT cron.schedule(
  'update-sitemaps-hourly',
  '0 * * * *', -- Every hour
  $$
  SELECT
    net.http_post(
        url:='https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/update-sitemaps',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw"}'::jsonb,
        body:='{"action": "update_all_sitemaps"}'::jsonb
    ) as request_id;
  $$
);