-- Step 1: Temporarily disable public read access to blog posts by removing permissive policy
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;

-- Step 2: Create 301 redirects for all existing blog slugs to homepage
-- Avoid duplicates by checking existing from_path
INSERT INTO public.url_redirects (from_path, to_path, status_code, source_type)
SELECT '/blog/' || bp.slug AS from_path,
       '/' AS to_path,
       301 AS status_code,
       'blog-decommission' AS source_type
FROM public.blog_posts bp
WHERE bp.slug IS NOT NULL AND bp.slug <> ''
  AND NOT EXISTS (
    SELECT 1 FROM public.url_redirects r WHERE r.from_path = '/blog/' || bp.slug
  );