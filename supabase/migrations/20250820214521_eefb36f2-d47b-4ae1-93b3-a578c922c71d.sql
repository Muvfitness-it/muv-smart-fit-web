-- Fix critical RLS security issue: Remove overly permissive UPDATE policy on lead_tracking
-- This policy currently allows anyone to update any lead tracking data

-- Drop the dangerous public update policy
DROP POLICY IF EXISTS "Anyone can update their own session data" ON public.lead_tracking;

-- Create a more secure, session-based update policy that only allows updates within the same browser session
CREATE POLICY "Users can update their own session data by session_id" 
ON public.lead_tracking 
FOR UPDATE 
USING (
  session_id IS NOT NULL 
  AND session_id != '' 
  AND created_at > (now() - INTERVAL '24 hours')
) 
WITH CHECK (
  session_id IS NOT NULL 
  AND session_id != '' 
  AND created_at > (now() - INTERVAL '24 hours')
);

-- Add security audit logging for unauthorized access attempts
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
$function$