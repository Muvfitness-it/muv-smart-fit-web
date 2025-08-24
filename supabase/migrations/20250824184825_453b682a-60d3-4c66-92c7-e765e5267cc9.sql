-- Call the blog-theme-normalizer edge function
SELECT net.http_post(
  url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/blog-theme-normalizer',
  headers := '{"Content-Type": "application/json"}'::jsonb,
  body := '{"batchSize": 50}'::jsonb
) as result;