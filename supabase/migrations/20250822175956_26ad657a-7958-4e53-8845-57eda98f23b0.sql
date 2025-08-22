-- Security Fix 1: Check existing policies and create missing ones
-- Only create planner_usage table and policies as it's missing
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
DROP POLICY IF EXISTS "Service role can insert planner usage" ON public.planner_usage;
DROP POLICY IF EXISTS "Admins can view planner usage" ON public.planner_usage;

CREATE POLICY "Service role can insert planner usage" 
ON public.planner_usage 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view planner usage" 
ON public.planner_usage 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Security Fix 2: Create secure storage policies for immagini bucket
DROP POLICY IF EXISTS "Authenticated users can upload to immagini" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own files in immagini" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own files in immagini" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files in immagini" ON storage.objects;

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