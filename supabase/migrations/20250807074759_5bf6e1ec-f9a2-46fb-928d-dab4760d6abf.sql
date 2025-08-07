-- Trigger function to update sitemaps when blog posts are published
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
    
    -- Call the sitemap update function asynchronously
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/update-sitemaps',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw"}'::jsonb,
      body := '{"action": "update_all_sitemaps", "trigger": "blog_post_published"}'::jsonb
    );
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for automatic sitemap updates
DROP TRIGGER IF EXISTS trigger_update_sitemaps_on_publish ON public.blog_posts;
CREATE TRIGGER trigger_update_sitemaps_on_publish
  AFTER INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_sitemaps_on_publish();