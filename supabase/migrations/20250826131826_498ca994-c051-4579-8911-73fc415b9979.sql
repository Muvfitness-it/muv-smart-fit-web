-- Fix critical RLS security vulnerabilities

-- 1. Fix lead_tracking table - restrict public access to sensitive data
DROP POLICY IF EXISTS "Service role only can insert lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Admins can read lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Admins can update lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Admins can delete lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Admins and service role can update lead tracking" ON public.lead_tracking;

-- Create secure lead tracking policies
CREATE POLICY "Service role can insert lead tracking" 
ON public.lead_tracking 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can manage lead tracking" 
ON public.lead_tracking 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- 2. Fix site_visits table - remove public access
DROP POLICY IF EXISTS "Admins can view site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Service role can insert site visits" ON public.site_visits;

-- Create secure site visits policies
CREATE POLICY "Service role can insert site visits" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view site visits" 
ON public.site_visits 
FOR SELECT 
USING (is_admin());

-- 3. Secure analytics_summary table
DROP POLICY IF EXISTS "Anyone can view analytics summary" ON public.analytics_summary;
DROP POLICY IF EXISTS "Service role can update analytics summary" ON public.analytics_summary;

-- Create secure analytics policies
CREATE POLICY "Admins can view analytics summary" 
ON public.analytics_summary 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can update analytics summary" 
ON public.analytics_summary 
FOR UPDATE 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 4. Tighten planner_usage policies
DROP POLICY IF EXISTS "Admins can view planner usage" ON public.planner_usage;
DROP POLICY IF EXISTS "Service role can insert planner usage" ON public.planner_usage;

-- Create secure planner usage policies
CREATE POLICY "Admins can view planner usage" 
ON public.planner_usage 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can insert planner usage" 
ON public.planner_usage 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- 5. Add audit logging for security events
CREATE OR REPLACE FUNCTION public.audit_data_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    event_data,
    ip_address,
    user_agent
  ) VALUES (
    'sensitive_data_access',
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'user_id', auth.uid()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;