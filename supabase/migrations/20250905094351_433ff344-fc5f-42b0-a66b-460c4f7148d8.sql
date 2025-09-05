-- Create function to update sitemaps automatically
CREATE OR REPLACE FUNCTION update_sitemaps_trigger()
RETURNS trigger AS $$
BEGIN
  -- Trigger sitemap regeneration when blog posts are updated
  PERFORM pg_notify('sitemap_update', 'blog_updated');
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog posts
DROP TRIGGER IF EXISTS blog_sitemap_update ON blog_posts;
CREATE TRIGGER blog_sitemap_update
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_sitemaps_trigger();