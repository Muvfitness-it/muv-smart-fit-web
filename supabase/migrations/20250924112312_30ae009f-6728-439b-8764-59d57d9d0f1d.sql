-- Drop existing policies to recreate them with stronger security
DROP POLICY IF EXISTS "Admins can manage all leads" ON public.leads;
DROP POLICY IF EXISTS "Admins only can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can insert leads" ON public.leads;

-- Create more restrictive policies for the leads table
-- Only authenticated admins can read leads data
CREATE POLICY "Only authenticated admins can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
);

-- Only authenticated admins can update leads
CREATE POLICY "Only authenticated admins can update leads" 
ON public.leads 
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

-- Only authenticated admins can delete leads
CREATE POLICY "Only authenticated admins can delete leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role)
);

-- Only service role can insert leads (for contact forms)
CREATE POLICY "Only service role can insert leads" 
ON public.leads 
FOR INSERT 
TO service_role
WITH CHECK (auth.role() = 'service_role');

-- Ensure no anonymous access whatsoever
CREATE POLICY "Block all anonymous access to leads" 
ON public.leads 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- Log this security enhancement
INSERT INTO public.security_audit_log (
  event_type,
  event_data,
  user_id
) VALUES (
  'security_enhancement',
  jsonb_build_object(
    'action', 'strengthened_leads_rls_policies',
    'table', 'leads',
    'description', 'Enhanced RLS policies to explicitly block anonymous access and require authenticated admin role'
  ),
  auth.uid()
);