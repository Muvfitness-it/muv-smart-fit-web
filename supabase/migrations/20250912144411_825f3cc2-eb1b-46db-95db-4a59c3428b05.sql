-- CRITICAL SECURITY FIX: Enable RLS and add policies for profiles_secure table
-- This table contains sensitive PII (emails, phone numbers, dates of birth) that was unprotected

-- First, enable Row Level Security on the profiles_secure table
ALTER TABLE public.profiles_secure ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can only view their own sensitive profile data
CREATE POLICY "Users can view their own secure profile data" 
ON public.profiles_secure 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Users can update their own sensitive profile data
CREATE POLICY "Users can update their own secure profile data" 
ON public.profiles_secure 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can insert their own sensitive profile data
CREATE POLICY "Users can insert their own secure profile data" 
ON public.profiles_secure 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Admins can view all secure profile data for legitimate admin purposes
CREATE POLICY "Admins can view all secure profile data" 
ON public.profiles_secure 
FOR SELECT 
USING (public.is_admin());

-- Policy 5: Admins can manage secure profile data for admin purposes
CREATE POLICY "Admins can manage secure profile data" 
ON public.profiles_secure 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Policy 6: Service role can manage the data programmatically
CREATE POLICY "Service role can manage secure profile data" 
ON public.profiles_secure 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Log this critical security fix
INSERT INTO public.security_audit_log (event_type, event_data, user_id) 
VALUES (
  'critical_security_fix', 
  jsonb_build_object(
    'table', 'profiles_secure',
    'issue', 'missing_rls_policies',
    'fix', 'enabled_rls_and_added_policies',
    'severity', 'critical'
  ),
  auth.uid()
);