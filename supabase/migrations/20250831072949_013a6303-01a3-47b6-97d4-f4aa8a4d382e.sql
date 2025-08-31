-- Security improvements for database and authentication

-- 1. Enhanced rate limiting with better constraints
CREATE TABLE IF NOT EXISTS public.enhanced_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  requests_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(identifier, endpoint)
);

ALTER TABLE public.enhanced_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage enhanced rate limits"
ON public.enhanced_rate_limits
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 2. Data retention and anonymization table
CREATE TABLE IF NOT EXISTS public.data_retention_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL UNIQUE,
  retention_days INTEGER NOT NULL,
  anonymize_after_days INTEGER,
  last_cleanup TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.data_retention_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage data retention policies"
ON public.data_retention_policies
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Insert default retention policies
INSERT INTO public.data_retention_policies (table_name, retention_days, anonymize_after_days) VALUES
('security_audit_log', 90, 30),
('site_visits', 365, 90),
('comment_submissions', 180, 60),
('lead_tracking', 730, 180)
ON CONFLICT (table_name) DO NOTHING;

-- 3. Enhanced security audit with anonymization
CREATE OR REPLACE FUNCTION public.anonymize_old_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  policy_record RECORD;
  anonymize_date TIMESTAMP WITH TIME ZONE;
  delete_date TIMESTAMP WITH TIME ZONE;
BEGIN
  FOR policy_record IN 
    SELECT table_name, retention_days, anonymize_after_days 
    FROM public.data_retention_policies 
  LOOP
    -- Calculate dates
    anonymize_date := now() - (policy_record.anonymize_after_days || ' days')::INTERVAL;
    delete_date := now() - (policy_record.retention_days || ' days')::INTERVAL;
    
    -- Anonymize data based on table
    IF policy_record.table_name = 'security_audit_log' THEN
      UPDATE public.security_audit_log 
      SET ip_address = 'xxx.xxx.xxx.xxx',
          user_agent = 'anonymized',
          event_data = jsonb_build_object('anonymized', true)
      WHERE created_at < anonymize_date AND ip_address != 'xxx.xxx.xxx.xxx';
      
      DELETE FROM public.security_audit_log WHERE created_at < delete_date;
      
    ELSIF policy_record.table_name = 'site_visits' THEN
      UPDATE public.site_visits 
      SET ip_address = 'xxx.xxx.xxx.xxx',
          user_agent = 'anonymized'
      WHERE created_at < anonymize_date AND ip_address != 'xxx.xxx.xxx.xxx';
      
      DELETE FROM public.site_visits WHERE created_at < delete_date;
      
    ELSIF policy_record.table_name = 'lead_tracking' THEN
      UPDATE public.lead_tracking 
      SET ip_address = 'xxx.xxx.xxx.xxx',
          user_agent = 'anonymized',
          session_id = 'anonymized'
      WHERE created_at < anonymize_date AND ip_address != 'xxx.xxx.xxx.xxx';
      
      DELETE FROM public.lead_tracking WHERE created_at < delete_date;
    END IF;
    
    -- Update last cleanup timestamp
    UPDATE public.data_retention_policies 
    SET last_cleanup = now() 
    WHERE table_name = policy_record.table_name;
  END LOOP;
END;
$$;

-- 4. Restrict storage policies to be more secure
-- Remove overly permissive policies first, then add restrictive ones
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_0" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_1" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder 1oj01fe_2" ON storage.objects;

-- More restrictive storage policies for immagini bucket
CREATE POLICY "Users can view images in immagini bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'immagini');

CREATE POLICY "Admins can upload to immagini bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'immagini' AND is_admin());

CREATE POLICY "Admins can update in immagini bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'immagini' AND is_admin());

CREATE POLICY "Admins can delete from immagini bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'immagini' AND is_admin());

-- 5. Create function for secure contact form with enhanced rate limiting
CREATE OR REPLACE FUNCTION public.secure_contact_submission(
  p_name TEXT,
  p_email TEXT,
  p_message TEXT,
  p_phone TEXT DEFAULT NULL,
  p_subject TEXT DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  client_ip TEXT;
  submissions_count INTEGER;
  result_id UUID;
BEGIN
  -- Get client IP
  client_ip := current_setting('request.headers', true)::json->>'x-forwarded-for';
  
  -- Enhanced rate limiting: max 3 submissions per hour per IP
  SELECT COUNT(*) INTO submissions_count
  FROM public.enhanced_rate_limits
  WHERE identifier = client_ip
    AND endpoint = 'contact_form'
    AND window_start > NOW() - INTERVAL '1 hour';
  
  IF submissions_count >= 3 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Rate limit exceeded. Please try again later.'
    );
  END IF;
  
  -- Validate inputs
  IF p_name IS NULL OR trim(p_name) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Name is required');
  END IF;
  
  IF p_email IS NULL OR p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Valid email is required');
  END IF;
  
  IF p_message IS NULL OR char_length(trim(p_message)) < 10 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Message must be at least 10 characters');
  END IF;
  
  -- Check for spam patterns
  IF p_message ~* '(https?://|www\.|\.com|\.net|viagra|casino|lottery)' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Message contains prohibited content');
  END IF;
  
  -- Record rate limit
  INSERT INTO public.enhanced_rate_limits (identifier, endpoint)
  VALUES (client_ip, 'contact_form')
  ON CONFLICT (identifier, endpoint) 
  DO UPDATE SET 
    requests_count = enhanced_rate_limits.requests_count + 1,
    window_start = CASE 
      WHEN enhanced_rate_limits.window_start < NOW() - INTERVAL '1 hour' 
      THEN NOW() 
      ELSE enhanced_rate_limits.window_start 
    END;
  
  -- Log security event with anonymized data
  PERFORM public.log_security_event_pii_safe(
    'contact_form_submission',
    jsonb_build_object(
      'has_phone', p_phone IS NOT NULL,
      'message_length', char_length(p_message),
      'has_subject', p_subject IS NOT NULL
    ),
    client_ip,
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Message sent successfully'
  );
END;
$$;