-- SECURITY FIX: Replace profiles_secure view with a secure function
-- The view had built-in security but could potentially be bypassed

-- First, drop the existing view
DROP VIEW IF EXISTS public.profiles_secure;

-- Create a secure function that replaces the view functionality
CREATE OR REPLACE FUNCTION public.get_secure_profile(target_user_id uuid DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  first_name text,
  last_name text,
  avatar_url text,
  height numeric,
  weight numeric,
  gender text,
  activity_level text,
  fitness_goal text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  email text,
  phone text,
  date_of_birth text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requesting_user_id uuid;
  is_admin_user boolean;
BEGIN
  -- Get the requesting user
  requesting_user_id := auth.uid();
  
  -- Check if user is admin
  is_admin_user := public.is_admin();
  
  -- If no target specified, return requesting user's own profile
  IF target_user_id IS NULL THEN
    target_user_id := requesting_user_id;
  END IF;
  
  -- Security check: users can only access their own data unless they're admin
  IF requesting_user_id != target_user_id AND NOT is_admin_user THEN
    RAISE EXCEPTION 'Access denied: insufficient permissions';
  END IF;
  
  -- Return the secure profile data
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.first_name,
    p.last_name,
    p.avatar_url,
    p.height,
    p.weight,
    p.gender,
    p.activity_level,
    p.fitness_goal,
    p.created_at,
    p.updated_at,
    CASE
      WHEN (requesting_user_id = p.user_id OR is_admin_user) THEN COALESCE(ps.email_masked, '[NO DATA]')
      ELSE '[RESTRICTED]'
    END as email,
    CASE
      WHEN (requesting_user_id = p.user_id OR is_admin_user) THEN COALESCE(ps.phone_masked, '[NO DATA]')
      ELSE '[RESTRICTED]'
    END as phone,
    CASE
      WHEN (requesting_user_id = p.user_id OR is_admin_user) THEN ps.date_of_birth_masked
      ELSE NULL
    END as date_of_birth
  FROM public.profiles p
  LEFT JOIN public.profiles_sensitive ps ON p.user_id = ps.user_id
  WHERE p.user_id = target_user_id;
END;
$$;

-- Grant execute permission to authenticated users only
REVOKE ALL ON FUNCTION public.get_secure_profile(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_secure_profile(uuid) TO authenticated;

-- Create a simple wrapper view for backwards compatibility (if needed)
CREATE VIEW public.profiles_secure AS
SELECT * FROM public.get_secure_profile();

-- Ensure the view has proper access controls
REVOKE ALL ON public.profiles_secure FROM PUBLIC;
GRANT SELECT ON public.profiles_secure TO authenticated;

-- Log this security enhancement
INSERT INTO public.security_audit_log (event_type, event_data) 
VALUES (
  'security_enhancement', 
  jsonb_build_object(
    'action', 'replaced_view_with_secure_function',
    'object', 'profiles_secure',
    'security_level', 'enhanced',
    'description', 'Replaced potentially bypassable view with security definer function'
  )
);