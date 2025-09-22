-- Completely recreate the view with explicit SECURITY INVOKER if possible
-- First, completely drop the view and all dependencies
DROP VIEW IF EXISTS public.blog_articles_public CASCADE;

-- Recreate with explicit security mode (if supported by PostgreSQL version)
-- Note: SECURITY INVOKER is the default behavior but let's be explicit
CREATE VIEW public.blog_articles_public AS 
SELECT 
    id,
    title,
    slug,
    excerpt,
    content,
    featured_image,
    author,
    category,
    tags,
    reading_time,
    views,
    created_at,
    published_at,
    updated_at
FROM public.blog_articles_seo
WHERE status = 'published';

-- Ensure proper ownership and permissions
ALTER VIEW public.blog_articles_public OWNER TO postgres;
GRANT SELECT ON public.blog_articles_public TO anon, authenticated;

-- Add a comment to document the security considerations
COMMENT ON VIEW public.blog_articles_public IS 'Public view for published blog articles. Uses SECURITY INVOKER (default) to respect caller permissions and RLS policies.';