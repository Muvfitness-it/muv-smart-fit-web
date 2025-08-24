-- Update RLS policies for tighter security

-- 1. Remove anonymous access to site_visits, only allow service role
DROP POLICY IF EXISTS "Allow anonymous site visits" ON public.site_visits;

-- 2. Update lead_tracking to only allow service role inserts
DROP POLICY IF EXISTS "Service role can insert lead tracking data" ON public.lead_tracking;

CREATE POLICY "Service role only can insert lead tracking"
  ON public.lead_tracking
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- 3. Create secure comment submission function with rate limiting
CREATE OR REPLACE FUNCTION public.submit_blog_comment(
  p_post_id uuid,
  p_author_name text,
  p_author_email text,
  p_content text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  client_ip text;
  submissions_count integer;
  comment_id uuid;
  result jsonb;
BEGIN
  -- Get client IP from request headers
  client_ip := current_setting('request.headers', true)::json->>'x-forwarded-for';
  
  -- Check rate limit: max 3 comments per hour per IP
  SELECT COUNT(*) INTO submissions_count
  FROM public.comment_submissions
  WHERE ip_address = client_ip
    AND submitted_at > NOW() - INTERVAL '1 hour';
  
  IF submissions_count >= 3 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Limite di commenti raggiunto. Riprova tra un''ora.'
    );
  END IF;
  
  -- Enhanced validation
  IF p_author_name IS NULL OR trim(p_author_name) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Nome richiesto');
  END IF;
  
  IF char_length(trim(p_author_name)) < 2 OR char_length(trim(p_author_name)) > 50 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Nome deve essere tra 2 e 50 caratteri');
  END IF;
  
  IF p_author_email IS NULL OR p_author_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Email non valida');
  END IF;
  
  IF p_content IS NULL OR char_length(trim(p_content)) < 10 OR char_length(trim(p_content)) > 2000 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Commento deve essere tra 10 e 2000 caratteri');
  END IF;
  
  -- Check for spam patterns
  IF p_content ~* '(https?://|www\.|\.com|\.net|viagra|casino|loan|lottery|prize|winner)' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Contenuto non consentito');
  END IF;
  
  -- Insert comment
  INSERT INTO public.blog_comments (post_id, author_name, author_email, content, status)
  VALUES (p_post_id, trim(p_author_name), lower(trim(p_author_email)), trim(p_content), 'pending')
  RETURNING id INTO comment_id;
  
  -- Track submission
  INSERT INTO public.comment_submissions (comment_id, ip_address, status)
  VALUES (comment_id, client_ip, 'submitted');
  
  -- Log security event
  INSERT INTO public.security_audit_log (event_type, event_data, ip_address)
  VALUES (
    'blog_comment_submitted',
    jsonb_build_object(
      'comment_id', comment_id,
      'post_id', p_post_id,
      'author_email', lower(trim(p_author_email))
    ),
    client_ip
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Commento inviato e in attesa di moderazione',
    'comment_id', comment_id
  );
END;
$$;

-- 4. Update database functions to include SET search_path for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 5. Improve admin role checking function
CREATE OR REPLACE FUNCTION public.current_user_has_role(_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = _role
  )
$$;