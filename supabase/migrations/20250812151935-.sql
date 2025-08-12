-- Allow public read access to published blog posts
CREATE POLICY "Public can read published posts"
ON public.blog_posts
FOR SELECT
USING (status = 'published');

-- Optional: index to speed up slug lookups (non-unique to avoid failures if duplicates exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'idx_blog_posts_slug'
  ) THEN
    CREATE INDEX idx_blog_posts_slug ON public.blog_posts (slug);
  END IF;
END $$;