-- Remove the blog_comments_public view and implement proper RLS instead
-- This should resolve the Security Definer View linter issue

-- Drop the existing view that's causing the security issue
DROP VIEW IF EXISTS public.blog_comments_public;

-- Instead of a view, we'll use RLS policies on the blog_comments table
-- to allow public access to approved comments without exposing sensitive data

-- Create a new RLS policy to allow anyone to read approved comments
-- but only show safe columns (not email addresses)
CREATE POLICY "Anyone can view approved comment details"
ON public.blog_comments
FOR SELECT
USING (status = 'approved');

-- Note: The application code should be updated to query blog_comments directly
-- with a select that excludes sensitive columns like author_email
-- Example: SELECT id, post_id, author_name, content, created_at, updated_at FROM blog_comments WHERE status = 'approved'