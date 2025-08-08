-- Add trigger to automatically update sitemaps when articles are published/updated
CREATE OR REPLACE FUNCTION update_sitemaps_on_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
    
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/news-sitemap',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{}'::jsonb
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for blog posts
CREATE OR REPLACE TRIGGER blog_posts_sitemap_update_trigger
  AFTER INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_sitemaps_on_publish();