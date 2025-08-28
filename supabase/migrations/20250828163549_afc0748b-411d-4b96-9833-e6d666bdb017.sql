-- Fix Critical PII Exposure: Remove public access to blog_comments table
-- This prevents exposure of author_email addresses

-- Remove the public SELECT policy that exposes PII
DROP POLICY IF EXISTS "Anyone can view approved comment details" ON public.blog_comments;

-- Ensure only approved_comments table is publicly accessible (without email)
-- The approved_comments table already has proper public access without PII