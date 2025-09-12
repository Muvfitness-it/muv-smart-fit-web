-- FINAL SECURITY FIX: Remove the security definer view and provide secure access pattern
-- Previous attempt had invalid SELECT trigger syntax

-- Drop any remaining view
DROP VIEW IF EXISTS public.profiles_secure;

-- The secure function public.get_secure_profile() already exists and is the correct way to access data
-- Remove the problematic trigger attempt (SELECT triggers don't exist)

-- Instead, enhance the existing security audit by updating the profiles_sensitive table
-- to log access when data is actually retrieved via UPDATE operations

-- Update the existing audit trigger to be more comprehensive
CREATE OR REPLACE FUNCTION public.audit_sensitive_data_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Update access tracking when sensitive data is accessed
  IF TG_OP = 'UPDATE' AND OLD.last_accessed IS DISTINCT FROM NEW.last_accessed THEN
    -- This is an access tracking update, log it
    INSERT INTO public.security_audit_log (
      event_type,
      user_id,
      event_data,
      ip_address,
      user_agent
    ) VALUES (
      'sensitive_profile_data_accessed',
      auth.uid(),
      jsonb_build_object(
        'accessed_user_id', NEW.user_id::text,
        'access_count', NEW.access_count
      ),
      current_setting('request.headers', true)::json->>'x-forwarded-for',
      current_setting('request.headers', true)::json->>'user-agent'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply the corrected trigger
DROP TRIGGER IF EXISTS audit_sensitive_access ON public.profiles_sensitive;
CREATE TRIGGER audit_sensitive_access
  AFTER UPDATE ON public.profiles_sensitive
  FOR EACH ROW 
  EXECUTE FUNCTION public.audit_sensitive_data_access();

-- Add final security documentation
COMMENT ON FUNCTION public.get_secure_profile(uuid) IS 
'SECURITY: This function provides secure access to profile data with built-in access controls. 
Users can only access their own data unless they are administrators. 
Use: SELECT * FROM get_secure_profile() for own profile, or get_secure_profile(user_id) for admin access.';

-- Log completion of security fix
INSERT INTO public.security_audit_log (event_type, event_data) 
VALUES (
  'security_vulnerability_fixed', 
  jsonb_build_object(
    'vulnerability', 'profiles_secure_table_unprotected',
    'severity', 'critical',
    'fix_applied', 'replaced_with_secure_function',
    'status', 'resolved'
  )
);