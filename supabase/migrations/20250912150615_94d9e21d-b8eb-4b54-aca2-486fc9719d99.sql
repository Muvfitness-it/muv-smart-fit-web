-- CRITICAL SECURITY FIXES: Implement proper RLS policies to protect sensitive data

-- 1. FIX: Secure admin_users table - restrict email access to authenticated admins only
DROP POLICY IF EXISTS "Restrict admin_users SELECT to authenticated admins only" ON public.admin_users;
DROP POLICY IF EXISTS "Restrict admin_users INSERT to authenticated admins only" ON public.admin_users;
DROP POLICY IF EXISTS "Restrict admin_users UPDATE to authenticated admins only" ON public.admin_users;
DROP POLICY IF EXISTS "Restrict admin_users DELETE to authenticated admins only" ON public.admin_users;

-- Create new secure policies for admin_users
CREATE POLICY "Admins can manage admin_users table"
ON public.admin_users
FOR ALL
USING (current_user_has_role('admin'::app_role))
WITH CHECK (current_user_has_role('admin'::app_role));

-- 2. FIX: Secure blog_comments table - remove public email access
DROP POLICY IF EXISTS "Admins can manage comments for moderation" ON public.blog_comments;
DROP POLICY IF EXISTS "Service role can insert comments" ON public.blog_comments;

-- Create secure policies that protect email data
CREATE POLICY "Admins can fully manage comments with email access"
ON public.blog_comments
FOR ALL
USING (current_user_has_role('admin'::app_role))
WITH CHECK (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert comments"
ON public.blog_comments
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- 3. FIX: Secure lead_tracking table - restrict to admins only
DROP POLICY IF EXISTS "Admins can manage lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Service role can insert lead tracking" ON public.lead_tracking;

-- Create secure policies for lead_tracking
CREATE POLICY "Admins only can view lead tracking data"
ON public.lead_tracking
FOR ALL
USING (current_user_has_role('admin'::app_role))
WITH CHECK (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert lead tracking"
ON public.lead_tracking
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- 4. FIX: Secure site_visits table - restrict to admins only  
DROP POLICY IF EXISTS "Admins can view site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Service role can insert site visits" ON public.site_visits;

-- Create secure policies for site_visits
CREATE POLICY "Admins only can view site visits data"
ON public.site_visits
FOR ALL
USING (current_user_has_role('admin'::app_role))
WITH CHECK (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert site visits"
ON public.site_visits
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- 5. FIX: Secure security_audit_log table - admins only
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.security_audit_log;
DROP POLICY IF EXISTS "Service role can insert audit logs" ON public.security_audit_log;

-- Create secure policies for security_audit_log
CREATE POLICY "Admins only can access security audit logs"
ON public.security_audit_log
FOR SELECT
USING (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert audit logs"
ON public.security_audit_log
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Create secure function for accessing comment data without emails (for public use)
CREATE OR REPLACE FUNCTION public.get_public_comments(p_post_id uuid)
RETURNS TABLE(
  id uuid,
  post_id uuid,
  author_name text,
  content text,
  created_at timestamp with time zone,
  status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only return approved comments and no email addresses
  RETURN QUERY
  SELECT 
    bc.id,
    bc.post_id,
    bc.author_name,
    bc.content,
    bc.created_at,
    bc.status
  FROM public.blog_comments bc
  WHERE bc.post_id = p_post_id
    AND bc.status = 'approved';
END;
$$;

-- Log the security implementation
INSERT INTO public.security_audit_log (event_type, event_data) 
VALUES (
  'critical_security_policies_implemented', 
  jsonb_build_object(
    'tables_secured', ARRAY['admin_users', 'blog_comments', 'lead_tracking', 'site_visits', 'security_audit_log'],
    'protection_level', 'admin_only_access',
    'email_protection', 'enabled',
    'visitor_tracking_protection', 'enabled',
    'security_impact', 'eliminated_public_access_to_sensitive_data'
  )
);