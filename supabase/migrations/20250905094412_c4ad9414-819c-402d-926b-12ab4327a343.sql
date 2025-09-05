-- Fix the function with proper search path
CREATE OR REPLACE FUNCTION update_sitemaps_trigger()
RETURNS trigger 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
  -- Trigger sitemap regeneration when blog posts are updated
  PERFORM pg_notify('sitemap_update', 'blog_updated');
  RETURN COALESCE(NEW, OLD);
END;
$$;