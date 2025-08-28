-- Fix Security Definer View issue
-- Drop and recreate the blog_comments_public view without SECURITY DEFINER

DROP VIEW IF EXISTS public.blog_comments_public;

-- Recreate the view as a regular view (not SECURITY DEFINER)
CREATE VIEW public.blog_comments_public AS
SELECT 
    id,
    post_id,
    author_name,
    content,
    created_at,
    updated_at
FROM public.blog_comments
WHERE status = 'approved';

-- Grant appropriate permissions
GRANT SELECT ON public.blog_comments_public TO anon, authenticated;