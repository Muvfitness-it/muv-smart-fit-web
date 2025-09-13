-- SECURITY FIX: Completely lock down blog_comments table to prevent email harvesting
-- This ensures email addresses are never exposed, even to authenticated users

-- Drop all existing policies on blog_comments table
DROP POLICY IF EXISTS "Admins can read comments for moderation" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can update comment status" ON public.blog_comments;
DROP POLICY IF EXISTS "Service role only blog comments access" ON public.blog_comments;

-- Create the most restrictive policy: ONLY service role and secure functions can access
CREATE POLICY "Ultra secure blog comments access - service role only"
ON public.blog_comments
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Revoke all direct permissions from anon and authenticated roles
REVOKE ALL ON public.blog_comments FROM anon;
REVOKE ALL ON public.blog_comments FROM authenticated;

-- Only grant necessary permissions to service_role for edge functions
GRANT SELECT, INSERT, UPDATE ON public.blog_comments TO service_role;

-- Create a secure admin moderation function that doesn't expose emails
CREATE OR REPLACE FUNCTION public.get_comments_for_admin_moderation(p_limit integer DEFAULT 50)
RETURNS TABLE(
  id uuid,
  post_id uuid,
  author_name text,
  content text,
  status text,
  created_at timestamp with time zone,
  email_masked text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  -- Return comment data with masked emails for admin moderation
  RETURN QUERY
  SELECT 
    bc.id,
    bc.post_id,
    bc.author_name,
    bc.content,
    bc.status,
    bc.created_at,
    -- Mask email for privacy (show first 2 chars + *** + @domain)
    CASE 
      WHEN bc.author_email IS NOT NULL THEN
        substring(bc.author_email from 1 for 2) || '***@' || split_part(bc.author_email, '@', 2)
      ELSE 'No email'
    END as email_masked
  FROM public.blog_comments bc
  ORDER BY bc.created_at DESC
  LIMIT p_limit;
END;
$$;

-- Grant admin access to the secure moderation function
GRANT EXECUTE ON FUNCTION public.get_comments_for_admin_moderation(integer) TO authenticated;

-- Log the security enhancement
INSERT INTO public.security_audit_log (
  event_type,
  event_data,
  user_id,
  created_at
) VALUES (
  'blog_comments_security_enhanced',
  jsonb_build_object(
    'action', 'locked_down_blog_comments_table',
    'reason', 'prevent_email_harvesting',
    'measures', ARRAY[
      'removed_all_direct_access_policies',
      'created_service_role_only_policy', 
      'created_secure_admin_moderation_function',
      'masked_email_addresses_in_admin_view'
    ]
  ),
  auth.uid(),
  now()
);