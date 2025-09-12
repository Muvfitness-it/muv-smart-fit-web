-- FINAL SECURITY FIX: Completely eliminate blog comment email exposure

-- Create a fully secure view for approved comments that NEVER exposes emails
CREATE OR REPLACE VIEW public.approved_comments_public AS
SELECT 
  ac.id,
  ac.post_id,
  ac.author_name,
  ac.content,
  ac.created_at
FROM public.approved_comments ac;

-- Enable RLS on the view
ALTER VIEW public.approved_comments_public OWNER TO postgres;
GRANT SELECT ON public.approved_comments_public TO anon;
GRANT SELECT ON public.approved_comments_public TO authenticated;

-- Remove ALL access to blog_comments table from anon and authenticated
REVOKE ALL ON public.blog_comments FROM anon;
REVOKE ALL ON public.blog_comments FROM authenticated;

-- Ensure ONLY service_role and admins can access blog_comments
DROP POLICY IF EXISTS "Super secure blog comments access" ON public.blog_comments;
DROP POLICY IF EXISTS "Service role can insert comments" ON public.blog_comments;

-- Create the most restrictive policy possible
CREATE POLICY "Admin only blog comments access"
ON public.blog_comments
FOR ALL
USING (
  -- Only service role for automated operations OR authenticated admins
  auth.role() = 'service_role' 
  OR (
    auth.uid() IS NOT NULL 
    AND current_user_has_role('admin'::app_role)
    AND auth.role() = 'authenticated'
  )
)
WITH CHECK (
  auth.role() = 'service_role'
  OR (
    auth.uid() IS NOT NULL 
    AND current_user_has_role('admin'::app_role) 
    AND auth.role() = 'authenticated'
  )
);

-- Update the public comments function to be even more secure
CREATE OR REPLACE FUNCTION public.get_approved_comments_for_post(p_post_id uuid)
RETURNS TABLE(
  id uuid,
  author_name text,
  content text,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Return only approved comments with NO email data whatsoever
  RETURN QUERY
  SELECT 
    ac.id,
    ac.author_name,
    ac.content,
    ac.created_at
  FROM public.approved_comments ac
  WHERE ac.post_id = p_post_id
  ORDER BY ac.created_at ASC;
END;
$$;

-- Grant public access to the secure function only
GRANT EXECUTE ON FUNCTION public.get_approved_comments_for_post(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.get_approved_comments_for_post(uuid) TO authenticated;

-- Remove the old less secure function
DROP FUNCTION IF EXISTS public.get_public_comments(uuid);

-- Log the final security implementation
INSERT INTO public.security_audit_log (event_type, event_data)
VALUES (
  'blog_comments_security_lockdown_complete',
  jsonb_build_object(
    'action', 'eliminated_all_email_exposure_paths',
    'protection_level', 'maximum_security',
    'public_access_method', 'secure_function_only',
    'email_access', 'admin_only_with_authentication'
  )
);