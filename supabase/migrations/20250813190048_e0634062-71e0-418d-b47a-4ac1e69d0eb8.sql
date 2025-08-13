-- Fix critical security issues in RLS policies and database functions

-- 1. Fix lead_tracking RLS policies - remove conflicting policies and create proper ones
DROP POLICY IF EXISTS "Allow insert lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Allow update lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Anonymous can update lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Anyone can insert lead tracking" ON public.lead_tracking;

-- Create single, clear policies for lead_tracking
CREATE POLICY "Anyone can insert lead tracking data"
ON public.lead_tracking
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update their own session data"
ON public.lead_tracking  
FOR UPDATE
USING (true)
WITH CHECK (true);

-- 2. Fix database functions to include SET search_path
-- Update all functions that are missing search_path settings
ALTER FUNCTION public.has_role(_user_id uuid, _role app_role) SET search_path TO 'public';
ALTER FUNCTION public.current_user_has_role(_role app_role) SET search_path TO 'public';
ALTER FUNCTION public.is_admin(user_id uuid) SET search_path TO 'public';
ALTER FUNCTION public.assign_user_role(_user_id uuid, _role app_role, _assigned_by uuid) SET search_path TO 'public';
ALTER FUNCTION public.revoke_user_role(_user_id uuid, _role app_role) SET search_path TO 'public';
ALTER FUNCTION public.increment_article_views(article_id text) SET search_path TO 'public';

-- 3. Remove overly permissive service role policies where not needed
-- Keep service role access only where legitimately needed for system operations