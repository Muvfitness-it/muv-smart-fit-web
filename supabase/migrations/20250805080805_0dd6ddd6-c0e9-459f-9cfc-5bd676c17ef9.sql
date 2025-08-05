-- First, let's check if we can add the editor role to the enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';

-- Remove the overly permissive blog post creation policy
DROP POLICY IF EXISTS "Temporary allow all authenticated users" ON public.blog_posts;

-- Create a proper policy that only allows admins to create blog posts (since editor doesn't exist yet)
CREATE POLICY "Only admins can create posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::app_role
  )
);

-- Create function to log unauthorized access attempts
CREATE OR REPLACE FUNCTION log_unauthorized_access_attempt()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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