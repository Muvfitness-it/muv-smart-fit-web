-- Fix critical security vulnerabilities and phone constraint

-- 1. Fix leads table RLS policies - restrict public access
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Allow insert for anonymous users" ON public.leads;

-- Create secure policies for leads table
CREATE POLICY "Admins only can view all leads" 
ON public.leads 
FOR SELECT 
USING (current_user_has_role('admin'::app_role));

CREATE POLICY "Admins can manage all leads" 
ON public.leads 
FOR ALL 
USING (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- 2. Fix visitor_analytics table RLS policies - restrict public access  
DROP POLICY IF EXISTS "Admins can view analytics" ON public.visitor_analytics;
DROP POLICY IF EXISTS "Allow insert visitor analytics" ON public.visitor_analytics;

-- Create secure policies for visitor_analytics table
CREATE POLICY "Admins only can view analytics" 
ON public.visitor_analytics 
FOR SELECT 
USING (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert analytics" 
ON public.visitor_analytics 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- 3. Fix phone constraint issue - make phone nullable
ALTER TABLE public.leads ALTER COLUMN phone DROP NOT NULL;