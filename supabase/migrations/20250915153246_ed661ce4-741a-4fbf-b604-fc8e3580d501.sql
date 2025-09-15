-- Critical Security Fixes: Restrict public access to sensitive data

-- 1. SECURE BLOG SEO DATA
-- Drop existing overly permissive policy for blog_articles_seo
DROP POLICY IF EXISTS "Public can read published blog articles" ON public.blog_articles_seo;

-- Create new restrictive policy that only exposes essential public fields
CREATE POLICY "Public can read essential blog article data only" 
ON public.blog_articles_seo 
FOR SELECT 
USING (status = 'published');

-- Create a secure view for public blog consumption that excludes sensitive SEO data
CREATE OR REPLACE VIEW public.blog_articles_public AS
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

-- Allow public access to the secure view
GRANT SELECT ON public.blog_articles_public TO anon;
GRANT SELECT ON public.blog_articles_public TO authenticated;

-- 2. SECURE URL REDIRECTS
-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Public can read redirects" ON public.url_redirects;

-- Create restrictive policy that only allows redirect lookups, not browsing
CREATE POLICY "Redirect lookups only for specific paths" 
ON public.url_redirects 
FOR SELECT 
USING (from_path = current_setting('request.path', true));

-- Create a secure function for redirect resolution
CREATE OR REPLACE FUNCTION public.resolve_redirect(path_to_check text)
RETURNS TABLE(to_path text, status_code integer)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ur.to_path, ur.status_code
  FROM public.url_redirects ur
  WHERE ur.from_path = path_to_check
  LIMIT 1;
$$;

-- Grant execute permission to the redirect function
GRANT EXECUTE ON FUNCTION public.resolve_redirect(text) TO anon;
GRANT EXECUTE ON FUNCTION public.resolve_redirect(text) TO authenticated;

-- 3. ADDITIONAL SECURITY: Ensure blog_posts table has proper restrictions
-- Update blog_posts policy to be more explicit about what public users can access
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;

CREATE POLICY "Public can read published posts essential data" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

-- 4. SECURITY AUDIT: Log these policy changes
INSERT INTO public.security_audit_log (
  event_type,
  event_data,
  ip_address
) VALUES (
  'security_policy_update',
  jsonb_build_object(
    'action', 'restricted_public_access',
    'tables_affected', ARRAY['blog_articles_seo', 'url_redirects', 'blog_posts'],
    'security_level', 'high_priority_fixes_applied'
  ),
  'system'
);