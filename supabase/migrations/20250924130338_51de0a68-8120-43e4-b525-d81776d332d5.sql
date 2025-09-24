-- Fix email sequences RLS policy - currently allows public access with 'true' condition
-- This is a security vulnerability that needs to be addressed

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Admins can manage email sequences" ON public.email_sequences;

-- Create proper restrictive policies for email sequences
-- Only authenticated admins can view email sequences
CREATE POLICY "Only authenticated admins can view email sequences" 
ON public.email_sequences 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
);

-- Only authenticated admins can insert email sequences
CREATE POLICY "Only authenticated admins can insert email sequences" 
ON public.email_sequences 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
);

-- Only authenticated admins can update email sequences
CREATE POLICY "Only authenticated admins can update email sequences" 
ON public.email_sequences 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
);

-- Only authenticated admins can delete email sequences
CREATE POLICY "Only authenticated admins can delete email sequences" 
ON public.email_sequences 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
);

-- Block all anonymous access to email sequences
CREATE POLICY "Block all anonymous access to email sequences" 
ON public.email_sequences 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- Log this security fix
INSERT INTO public.security_audit_log (
  event_type,
  event_data
) VALUES (
  'security_fix_applied',
  jsonb_build_object(
    'action', 'fixed_email_sequences_rls_policies',
    'table', 'email_sequences',
    'description', 'Replaced overly permissive RLS policy (true condition) with proper admin-only access controls',
    'security_level', 'high_priority'
  )
);