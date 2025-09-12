-- CRITICAL SECURITY FIX: Remove insecure profiles_secure view
-- This view bypasses RLS and exposes sensitive user data

-- Drop the insecure view completely
DROP VIEW IF EXISTS public.profiles_secure CASCADE;

-- Log the security fix
INSERT INTO public.security_audit_log (event_type, event_data) 
VALUES (
  'critical_security_fix_applied', 
  jsonb_build_object(
    'issue', 'removed_insecure_profiles_secure_view',
    'solution', 'replaced_with_secure_function_get_secure_profile_data',
    'security_impact', 'eliminated_rls_bypass_vulnerability'
  )
);