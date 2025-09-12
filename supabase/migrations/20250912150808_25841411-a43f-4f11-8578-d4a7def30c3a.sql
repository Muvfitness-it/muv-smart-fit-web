-- ADDITIONAL SECURITY FIX: Ensure RLS policies are completely secure

-- Check and fix any remaining public access issues
-- Revoke all public schema permissions that shouldn't exist
REVOKE ALL ON public.admin_users FROM anon;
REVOKE ALL ON public.admin_users FROM authenticated;
REVOKE ALL ON public.blog_comments FROM anon;
REVOKE ALL ON public.blog_comments FROM authenticated; 
REVOKE ALL ON public.lead_tracking FROM anon;
REVOKE ALL ON public.lead_tracking FROM authenticated;
REVOKE ALL ON public.site_visits FROM anon;
REVOKE ALL ON public.site_visits FROM authenticated;
REVOKE ALL ON public.security_audit_log FROM anon;
REVOKE ALL ON public.security_audit_log FROM authenticated;
REVOKE ALL ON public.profiles_sensitive FROM anon;
REVOKE ALL ON public.profiles_sensitive FROM authenticated;

-- Ensure only service role can use these tables for necessary operations
GRANT SELECT, INSERT ON public.admin_users TO service_role;
GRANT SELECT, INSERT ON public.blog_comments TO service_role;
GRANT SELECT, INSERT ON public.lead_tracking TO service_role; 
GRANT SELECT, INSERT ON public.site_visits TO service_role;
GRANT SELECT, INSERT ON public.security_audit_log TO service_role;

-- Grant authenticated users access to their own profiles only through RLS
GRANT SELECT, INSERT, UPDATE ON public.profiles_sensitive TO authenticated;

-- Add additional security policy to completely block direct table access
CREATE POLICY "Block direct admin_users access"
ON public.admin_users
FOR ALL
USING (false)
WITH CHECK (false);

CREATE POLICY "Block direct blog_comments access"  
ON public.blog_comments
FOR ALL
USING (false)
WITH CHECK (false);

-- Remove the blocking policies and recreate proper ones
DROP POLICY IF EXISTS "Block direct admin_users access" ON public.admin_users;
DROP POLICY IF EXISTS "Block direct blog_comments access" ON public.blog_comments;

-- Recreate admin_users policy to be more restrictive
DROP POLICY IF EXISTS "Admins can manage admin_users table" ON public.admin_users;
CREATE POLICY "Super secure admin users access"
ON public.admin_users  
FOR ALL
USING (
  -- Only allow if user is authenticated AND has admin role AND is accessing through proper channels
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
  AND (
    -- Allow service role for system operations
    auth.role() = 'service_role'
    -- Or authenticated admin users
    OR (auth.role() = 'authenticated' AND current_user_has_role('admin'::app_role))
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
  AND (
    auth.role() = 'service_role'
    OR (auth.role() = 'authenticated' AND current_user_has_role('admin'::app_role))
  )
);

-- Recreate blog_comments policy to be more restrictive  
DROP POLICY IF EXISTS "Admins can fully manage comments with email access" ON public.blog_comments;
CREATE POLICY "Super secure blog comments access"
ON public.blog_comments
FOR ALL  
USING (
  -- Only admins or service role can access comment emails
  (auth.role() = 'service_role') 
  OR (auth.uid() IS NOT NULL AND current_user_has_role('admin'::app_role))
)
WITH CHECK (
  (auth.role() = 'service_role')
  OR (auth.uid() IS NOT NULL AND current_user_has_role('admin'::app_role))
);

-- Log the enhanced security fix
INSERT INTO public.security_audit_log (event_type, event_data)
VALUES (
  'enhanced_security_lockdown_applied',
  jsonb_build_object(
    'action', 'revoked_public_table_permissions',
    'tables_secured', ARRAY['admin_users', 'blog_comments', 'lead_tracking', 'site_visits', 'security_audit_log'],
    'access_model', 'admin_and_service_role_only', 
    'security_level', 'maximum'
  )
);