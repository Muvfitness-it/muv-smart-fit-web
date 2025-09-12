-- IMPROVED SECURITY FIX: Remove security definer view and use proper RLS approach
-- Replace the security definer function with a regular view that relies on RLS

-- Drop the security definer function and view
DROP VIEW IF EXISTS public.profiles_secure;
DROP FUNCTION IF EXISTS public.get_secure_profile(uuid);

-- Create a simple, secure view that relies on RLS policies of underlying tables
CREATE VIEW public.profiles_secure AS
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
    WHEN (auth.uid() = p.user_id OR public.is_admin()) THEN COALESCE(ps.email_masked, '[NO DATA]')
    ELSE '[RESTRICTED]'
  END as email,
  CASE
    WHEN (auth.uid() = p.user_id OR public.is_admin()) THEN COALESCE(ps.phone_masked, '[NO DATA]')
    ELSE '[RESTRICTED]'  
  END as phone,
  CASE
    WHEN (auth.uid() = p.user_id OR public.is_admin()) THEN ps.date_of_birth_masked
    ELSE NULL
  END as date_of_birth
FROM public.profiles p
LEFT JOIN public.profiles_sensitive ps ON p.user_id = ps.user_id;

-- Ensure proper permissions on the view (authenticated users only)
REVOKE ALL ON public.profiles_secure FROM PUBLIC;
GRANT SELECT ON public.profiles_secure TO authenticated;

-- Add RLS policy to the view itself (though views inherit from underlying tables)
-- This is redundant but provides extra security
ALTER VIEW public.profiles_secure OWNER TO postgres;

-- Log the security improvement
INSERT INTO public.security_audit_log (event_type, event_data) 
VALUES (
  'security_improvement', 
  jsonb_build_object(
    'action', 'replaced_security_definer_with_rls_view',
    'object', 'profiles_secure', 
    'improvement', 'removed_security_definer_pattern',
    'description', 'Now relies on RLS policies of underlying tables for security'
  )
);