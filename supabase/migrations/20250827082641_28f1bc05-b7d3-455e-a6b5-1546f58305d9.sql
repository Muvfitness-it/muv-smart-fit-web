-- Create HMAC validation table for log-visit endpoint
CREATE TABLE public.log_visit_hmac (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  endpoint TEXT NOT NULL DEFAULT 'log-visit',
  requests_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on HMAC validation table
ALTER TABLE public.log_visit_hmac ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access only
CREATE POLICY "Service role can manage HMAC validation" 
ON public.log_visit_hmac 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Create storage policies to restrict uploads to admins only
CREATE POLICY "Only admins can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'immagini' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

CREATE POLICY "Only admins can update files" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'immagini' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

CREATE POLICY "Only admins can delete files" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'immagini' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

CREATE POLICY "Public can view files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'immagini');