
-- Add triggers for the blog functions we created earlier
CREATE TRIGGER blog_posts_updated_at_trigger
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_updated_at();

CREATE TRIGGER blog_posts_published_at_trigger
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_blog_published_at();

-- Add some indexes to improve performance for blog queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON public.blog_tags(slug);

-- Insert default analytics metrics for blog if not exists
INSERT INTO public.analytics_summary (metric_name, metric_value)
VALUES 
  ('total_blog_posts', 0),
  ('published_blog_posts', 0),
  ('total_blog_views', 0)
ON CONFLICT (metric_name) DO NOTHING;
