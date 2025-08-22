-- Security Fix: Address linter warnings by updating function search paths
-- Fix functions with mutable search_path
CREATE OR REPLACE FUNCTION public.current_user_has_role(_role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT public.has_role(auth.uid(), _role)
$function$;

CREATE OR REPLACE FUNCTION public.log_unauthorized_lead_access()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    event_data,
    ip_address,
    user_agent
  ) VALUES (
    'unauthorized_lead_access_attempt',
    auth.uid(),
    jsonb_build_object(
      'attempted_resource', 'lead_tracking',
      'timestamp', now(),
      'auth_role', auth.role()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_unauthorized_access_attempt()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.assign_user_role(_user_id uuid, _role app_role, _assigned_by uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only admins can assign roles
  IF NOT public.current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can assign roles';
  END IF;
  
  INSERT INTO public.user_roles (user_id, role, created_by)
  VALUES (_user_id, _role, _assigned_by)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.revoke_user_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only admins can revoke roles
  IF NOT public.current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can revoke roles';
  END IF;
  
  DELETE FROM public.user_roles
  WHERE user_id = _user_id AND role = _role;
  
  RETURN TRUE;
END;
$function$;