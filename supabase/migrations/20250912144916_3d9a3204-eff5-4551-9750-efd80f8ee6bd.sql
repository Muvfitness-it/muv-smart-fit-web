-- SIMPLE SECURITY FIX: Create a secure access pattern for sensitive profile data
-- This replaces the insecure profiles_secure view

-- Create a secure function to access profile data with proper authentication checks
CREATE OR REPLACE FUNCTION public.get_secure_profile_data(target_user_id uuid DEFAULT NULL)
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
  current_user_id uuid;
  user_is_admin boolean;
BEGIN
  -- Get current authenticated user
  current_user_id := auth.uid();
  
  -- Check if current user is admin
  user_is_admin := public.is_admin();
  
  -- If no target user specified, use current user
  IF target_user_id IS NULL THEN
    target_user_id := current_user_id;
  END IF;
  
  -- Security: Only allow access to own data or admin access
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
  IF current_user_id != target_user_id AND NOT user_is_admin THEN
    RAISE EXCEPTION 'Access denied: insufficient permissions';
  END IF;
  
  -- Return secure profile data
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
      WHEN (current_user_id = p.user_id OR user_is_admin) THEN COALESCE(ps.email_masked, '[NO EMAIL]')
      ELSE '[RESTRICTED]'
    END::text as email,
    CASE
      WHEN (current_user_id = p.user_id OR user_is_admin) THEN COALESCE(ps.phone_masked, '[NO PHONE]')
      ELSE '[RESTRICTED]'
    END::text as phone,
    CASE
      WHEN (current_user_id = p.user_id OR user_is_admin) THEN ps.date_of_birth_masked
      ELSE NULL
    END::text as date_of_birth
  FROM public.profiles p
  LEFT JOIN public.profiles_sensitive ps ON p.user_id = ps.user_id
  WHERE p.user_id = target_user_id;
  
END;
$$;

-- Grant execute permission only to authenticated users
REVOKE ALL ON FUNCTION public.get_secure_profile_data(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_secure_profile_data(uuid) TO authenticated;

-- Log the security fix
INSERT INTO public.security_audit_log (event_type, event_data) 
VALUES (
  'critical_security_fix_applied', 
  jsonb_build_object(
    'issue', 'unprotected_profiles_secure_view',
    'solution', 'secure_function_with_authentication_checks',
    'access_pattern', 'function_based_with_rls_enforcement'
  )
);

-- Add documentation
COMMENT ON FUNCTION public.get_secure_profile_data(uuid) IS 
'Secure access to profile data. Users can access their own profile, admins can access any profile. 
Usage: SELECT * FROM get_secure_profile_data() -- own profile
       SELECT * FROM get_secure_profile_data(user_id) -- specific user (admin only)';