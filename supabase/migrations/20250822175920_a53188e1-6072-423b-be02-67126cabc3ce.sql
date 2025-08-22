-- Security Fix 1: Harden site_visits RLS policies
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Allow anonymous site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Public can read site visits" ON public.site_visits;

-- Create secure policies for site_visits
CREATE POLICY "Service role can insert site visits" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view site visits" 
ON public.site_visits 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Security Fix 2: Create planner_usage table with secure RLS (referenced in analytics but missing)
CREATE TABLE IF NOT EXISTS public.planner_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL,
  calories INTEGER,
  plan_type TEXT,
  user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on planner_usage
ALTER TABLE public.planner_usage ENABLE ROW LEVEL SECURITY;

-- Create secure policies for planner_usage
CREATE POLICY "Service role can insert planner usage" 
ON public.planner_usage 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view planner usage" 
ON public.planner_usage 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Security Fix 3: Create secure storage policies for immagini bucket
-- First, create policies for the immagini bucket
CREATE POLICY "Authenticated users can upload to immagini" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'immagini' 
  AND auth.role() = 'authenticated'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own files in immagini" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'immagini' 
  AND (
    -- Public files or files owned by user
    (storage.foldername(name))[1] = 'public' 
    OR auth.uid()::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Users can update their own files in immagini" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'immagini' 
  AND auth.role() = 'authenticated'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own files in immagini" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'immagini' 
  AND auth.role() = 'authenticated'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Security Fix 4: Update analytics_summary RLS to be admin-only for modifications
DROP POLICY IF EXISTS "Service role can update analytics summary" ON public.analytics_summary;

CREATE POLICY "Service role and admins can update analytics summary" 
ON public.analytics_summary 
FOR UPDATE 
USING (
  auth.role() = 'service_role' 
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

-- Security Fix 5: Ensure all SECURITY DEFINER functions have proper search_path
-- Update existing functions to include SET search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT public.has_role(COALESCE($1, auth.uid()), 'admin'::app_role)
$function$;