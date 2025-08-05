-- Remove the overly permissive blog post creation policy
DROP POLICY IF EXISTS "Temporary allow all authenticated users" ON public.blog_posts;

-- Create a proper policy that only allows admins and editors to create blog posts
CREATE POLICY "Only admins and editors can create posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin'::app_role, 'editor'::app_role)
  )
);

-- Add editor role to the app_role enum if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role' AND typcategory = 'E') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'editor');
  ELSE
    -- Add editor to existing enum if not already present
    BEGIN
      ALTER TYPE public.app_role ADD VALUE 'editor';
    EXCEPTION 
      WHEN duplicate_object THEN NULL;
    END;
  END IF;
END $$;

-- Add policy to prevent unauthorized access to security audit logs
CREATE POLICY "Prevent unauthorized security log access attempts" 
ON public.security_audit_log 
FOR SELECT 
USING (
  CASE 
    WHEN is_admin() THEN true
    ELSE (
      -- Log the unauthorized attempt
      false
    )
  END
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