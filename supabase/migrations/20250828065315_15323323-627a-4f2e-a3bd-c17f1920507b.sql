-- Fix security definer view issue by removing SECURITY DEFINER
-- Replace the view with a regular view that filters approved comments safely

-- Drop the existing view
DROP VIEW IF EXISTS public.blog_comments_public;

-- Create a regular view (not security definer) that only shows approved comments without email
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

-- Ensure public access to the view
GRANT SELECT ON public.blog_comments_public TO anon;
GRANT SELECT ON public.blog_comments_public TO authenticated;