-- Fix critical RLS policy vulnerabilities (avoiding existing constraints)

-- 1. Secure ai_tokens table - restrict to service role only
DROP POLICY IF EXISTS "AI tokens can be created by service role" ON public.ai_tokens;
DROP POLICY IF EXISTS "AI tokens can be deleted for cleanup" ON public.ai_tokens;
DROP POLICY IF EXISTS "AI tokens can be read for verification" ON public.ai_tokens;
DROP POLICY IF EXISTS "AI tokens can be updated for cleanup" ON public.ai_tokens;

-- Only service role can manage AI tokens
CREATE POLICY "Service role can manage ai_tokens"
ON public.ai_tokens
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 2. Secure analytics_summary table - remove public write access
DROP POLICY IF EXISTS "Service can update analytics summary" ON public.analytics_summary;

CREATE POLICY "Service role can update analytics summary"
ON public.analytics_summary
FOR UPDATE
USING (auth.role() = 'service_role');

-- 3. Secure booking_tokens table
DROP POLICY IF EXISTS "Booking tokens can be updated for usage tracking" ON public.booking_tokens;

CREATE POLICY "Service role can update booking tokens"
ON public.booking_tokens
FOR UPDATE
USING (auth.role() = 'service_role');

-- 4. Secure site_visits table - only service role can insert
DROP POLICY IF EXISTS "Service can insert site visits" ON public.site_visits;

CREATE POLICY "Service role can insert site visits"
ON public.site_visits
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- 5. Secure planner_usage table
DROP POLICY IF EXISTS "Authenticated users can insert planner usage" ON public.planner_usage;

CREATE POLICY "Users and service can insert planner usage"
ON public.planner_usage
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL OR auth.role() = 'service_role');

-- 6. Fix blog_categories overly permissive policies
DROP POLICY IF EXISTS "Allow insert blog categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON public.blog_categories;

-- 7. Fix blog_tags overly permissive policies  
DROP POLICY IF EXISTS "Authenticated users can manage tags" ON public.blog_tags;

-- 8. Add unique constraints to prevent duplicate data (check if exists first)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_roles_user_id_role_unique'
    ) THEN
        ALTER TABLE public.user_roles 
        ADD CONSTRAINT user_roles_user_id_role_unique 
        UNIQUE (user_id, role);
    END IF;
END $$;

-- 9. Secure database functions with search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- 10. Add audit logging for security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.security_audit_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
ON public.security_audit_log
FOR INSERT
WITH CHECK (auth.role() = 'service_role');