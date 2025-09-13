-- FINAL SECURITY FIX: Further restrict blog_comments to prevent any email harvesting
-- Even service role access should be limited to specific secure functions only

-- Add additional constraint to ensure service role can only access via specific functions
-- Update the existing policy to be even more restrictive
DROP POLICY IF EXISTS "Ultra secure blog comments access - service role only" ON public.blog_comments;

-- Create the most restrictive policy possible - no direct table access at all
CREATE POLICY "No direct access to blog_comments - functions only"
ON public.blog_comments
FOR ALL
USING (false)  -- This denies all direct access
WITH CHECK (false);  -- This denies all direct inserts/updates

-- The table can only be accessed via security definer functions which bypass RLS
-- This is the most secure approach as it prevents any direct queries

-- Update the comment submission function to handle all necessary operations
CREATE OR REPLACE FUNCTION public.admin_update_comment_status(p_comment_id uuid, p_status text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  -- Validate status
  IF p_status NOT IN ('pending', 'approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid status. Must be pending, approved, or rejected';
  END IF;
  
  -- Update the comment status
  UPDATE public.blog_comments 
  SET status = p_status, updated_at = now()
  WHERE id = p_comment_id;
  
  -- If approved, sync to approved_comments table
  IF p_status = 'approved' THEN
    -- The sync trigger will handle this automatically
    NULL;
  END IF;
  
  RETURN true;
END;
$$;

-- Grant admin access to the update function
GRANT EXECUTE ON FUNCTION public.admin_update_comment_status(uuid, text) TO authenticated;

-- Log the final security lockdown
INSERT INTO public.security_audit_log (
  event_type,
  event_data,
  user_id,
  created_at
) VALUES (
  'blog_comments_maximum_security_applied',
  jsonb_build_object(
    'action', 'denied_all_direct_table_access',
    'reason', 'prevent_any_email_harvesting_possibility',
    'security_level', 'maximum',
    'access_method', 'security_definer_functions_only'
  ),
  auth.uid(),
  now()
);