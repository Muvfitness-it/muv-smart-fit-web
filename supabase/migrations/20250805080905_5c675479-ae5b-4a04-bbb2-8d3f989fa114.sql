-- Fix the search path security issue for the function
CREATE OR REPLACE FUNCTION log_unauthorized_access_attempt()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    event_data,
    ip_address,
    user_agent
  ) VALUES (
    'unauthorized_access_attempt',
    auth.uid(),
    jsonb_build_object(
      'attempted_resource', 'security_audit_log',
      'timestamp', now()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;