-- Security Fix 3: Enhanced audit logging with PII reduction  
CREATE OR REPLACE FUNCTION public.log_security_event_safe(
  event_type_param text, 
  event_data_param jsonb DEFAULT NULL::jsonb, 
  ip_param text DEFAULT NULL::text, 
  user_agent_param text DEFAULT NULL::text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  sanitized_data jsonb;
BEGIN
  -- Sanitize PII from event data
  sanitized_data := event_data_param;
  
  -- Remove or hash sensitive fields
  IF sanitized_data ? 'email' THEN
    sanitized_data := sanitized_data || jsonb_build_object('email_hash', md5(sanitized_data->>'email'));
    sanitized_data := sanitized_data - 'email';
  END IF;
  
  IF sanitized_data ? 'author_email' THEN
    sanitized_data := sanitized_data || jsonb_build_object('author_email_hash', md5(sanitized_data->>'author_email'));
    sanitized_data := sanitized_data - 'author_email';
  END IF;
  
  -- Truncate IP to remove last octet for privacy
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    event_data,
    ip_address,
    user_agent,
    created_at
  ) VALUES (
    event_type_param,
    auth.uid(),
    sanitized_data,
    CASE 
      WHEN ip_param IS NOT NULL THEN 
        regexp_replace(ip_param, '\.\d+$', '.xxx')
      ELSE 
        regexp_replace(COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', '0.0.0.0'), '\.\d+$', '.xxx')
    END,
    COALESCE(user_agent_param, current_setting('request.headers', true)::json->>'user-agent'),
    now()
  );
END;
$function$