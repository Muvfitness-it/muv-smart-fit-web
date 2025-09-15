-- Fix Security Definer View Issue
-- Drop the existing SECURITY DEFINER view and recreate it as a regular view

-- Drop the problematic SECURITY DEFINER view
DROP VIEW IF EXISTS public.blog_articles_public;

-- Create a regular view (without SECURITY DEFINER) that relies on RLS policies
-- This view will respect the existing RLS policies on blog_articles_seo table
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

-- Grant appropriate permissions to the view
-- Public users can read published articles via the underlying RLS policies
GRANT SELECT ON public.blog_articles_public TO anon;
GRANT SELECT ON public.blog_articles_public TO authenticated;

-- Log this security fix
INSERT INTO public.security_audit_log (
    event_type,
    event_data,
    ip_address,
    user_agent
) VALUES (
    'security_definer_view_fixed',
    jsonb_build_object(
        'action', 'removed_security_definer_from_view',
        'view_name', 'blog_articles_public',
        'security_improvement', 'now_respects_rls_policies'
    ),
    '127.0.0.1',
    'database_migration'
);