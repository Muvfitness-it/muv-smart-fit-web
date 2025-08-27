-- Security Fix 1: Remove hardcoded Authorization header from database function
CREATE OR REPLACE FUNCTION public.update_sitemaps_on_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only trigger sitemap update when a post is published or updated
  IF (NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published')) 
     OR (NEW.status = 'published' AND OLD.status = 'published' AND NEW.updated_at != OLD.updated_at) THEN
    
    -- Call the sitemap update function without hardcoded auth (edge function handles its own auth)
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/update-sitemaps',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{"action": "update_all_sitemaps", "trigger": "blog_post_published"}'::jsonb
    );
    
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/news-sitemap',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{}'::jsonb
    );
  END IF;
  
  RETURN NEW;
END;
$function$