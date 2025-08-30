-- Security Fix 1: Remove overly permissive analytics policies
DROP POLICY IF EXISTS "Anyone can insert site visits" ON site_visits;
DROP POLICY IF EXISTS "Anyone can update analytics summary" ON analytics_summary;
DROP POLICY IF EXISTS "Anyone can insert planner usage" ON planner_usage;

-- Security Fix 2: Consolidate and fix storage policies
-- Remove duplicate/conflicting policies
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;

-- Create secure, non-conflicting storage policies
CREATE POLICY "Public read access for immagini bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'immagini');

CREATE POLICY "Authenticated users can upload to immagini bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'immagini' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own files in immagini bucket" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'immagini' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own files in immagini bucket" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'immagini' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Security Fix 3: Create PII-safe logging function
CREATE OR REPLACE FUNCTION public.log_security_event_pii_safe(
  event_type_param text, 
  event_data_param jsonb DEFAULT NULL::jsonb, 
  ip_param text DEFAULT NULL::text, 
  user_agent_param text DEFAULT NULL::text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  sanitized_data jsonb;
  sanitized_ip text;
BEGIN
  -- Sanitize event data by removing/hashing PII
  sanitized_data := event_data_param;
  
  -- Hash emails instead of storing in plain text
  IF sanitized_data ? 'email' THEN
    sanitized_data := sanitized_data || jsonb_build_object('email_hash', encode(digest(sanitized_data->>'email', 'sha256'), 'hex'));
    sanitized_data := sanitized_data - 'email';
  END IF;
  
  IF sanitized_data ? 'author_email' THEN
    sanitized_data := sanitized_data || jsonb_build_object('author_email_hash', encode(digest(sanitized_data->>'author_email', 'sha256'), 'hex'));
    sanitized_data := sanitized_data - 'author_email';
  END IF;
  
  -- Anonymize IP address (remove last octet)
  sanitized_ip := CASE 
    WHEN ip_param IS NOT NULL THEN 
      regexp_replace(ip_param, '\.\d+$', '.xxx')
    ELSE 
      regexp_replace(COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', '0.0.0.0'), '\.\d+$', '.xxx')
  END;
  
  -- Insert sanitized data
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    event_data,
    ip_address,
    user_agent,
    created_at
  ) VALUES (
    event_type_param,
    auth.uid(),
    sanitized_data,
    sanitized_ip,
    COALESCE(user_agent_param, current_setting('request.headers', true)::json->>'user-agent'),
    now()
  );
END;
$function$