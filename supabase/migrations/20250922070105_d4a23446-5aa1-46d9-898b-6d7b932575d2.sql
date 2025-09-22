-- Drop the existing view that bypasses RLS
DROP VIEW IF EXISTS public.blog_articles_public;

-- Recreate the view without SECURITY DEFINER to respect caller's permissions and RLS
-- This will now properly enforce RLS policies based on the querying user
CREATE VIEW public.blog_articles_public 
SECURITY INVOKER
AS 
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

-- Grant appropriate permissions to the view
GRANT SELECT ON public.blog_articles_public TO anon, authenticated;