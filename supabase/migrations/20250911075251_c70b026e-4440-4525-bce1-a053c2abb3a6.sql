-- Create trigger to automatically update sitemaps when blog posts are published or updated
CREATE TRIGGER update_sitemaps_on_blog_publish
  AFTER INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_sitemaps_on_publish();