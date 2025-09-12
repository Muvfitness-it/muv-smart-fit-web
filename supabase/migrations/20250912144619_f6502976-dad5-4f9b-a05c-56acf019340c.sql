-- Fix the security definer view issue by ensuring proper RLS on the view
-- The linter flagged this because security definer views can bypass RLS

-- Drop the current view and recreate without security definer issues
DROP VIEW IF EXISTS public.profiles_secure;

-- Instead of a view, provide a secure function that users call directly
-- This eliminates the security definer view issue
-- The function already exists: public.get_secure_profile()

-- For any code that needs to access secure profiles, it should call:
-- SELECT * FROM public.get_secure_profile() -- for own profile
-- SELECT * FROM public.get_secure_profile('user_id_here') -- for specific user (admin only)

-- Add a trigger to log unauthorized access attempts to sensitive data
CREATE OR REPLACE FUNCTION public.log_profile_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access to sensitive profile data
  INSERT INTO public.security_audit_log (
    event_type,
    user_id, 
    event_data,
    ip_address,
    user_agent
  ) VALUES (
    'sensitive_profile_access',
    auth.uid(),
    jsonb_build_object(
      'accessed_user_id', COALESCE(NEW.user_id, OLD.user_id),
      'operation', TG_OP
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply trigger to profiles_sensitive table to log access
DROP TRIGGER IF EXISTS profile_sensitive_access_log ON public.profiles_sensitive;
CREATE TRIGGER profile_sensitive_access_log
  AFTER SELECT ON public.profiles_sensitive
  FOR EACH ROW EXECUTE FUNCTION public.log_profile_access();

-- Create a comment explaining the secure access pattern
COMMENT ON FUNCTION public.get_secure_profile(uuid) IS 
'SECURE FUNCTION: Use this function to access profile data securely. 
Call with no parameters for own profile, or with user_id parameter if admin.
This replaces the profiles_secure view to eliminate security definer risks.';