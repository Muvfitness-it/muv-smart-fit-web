-- Fix PII in security audit logs with proper function calls
-- Enable pgcrypto extension for hashing functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Update the blog comment submission function to sanitize PII
CREATE OR REPLACE FUNCTION public.submit_blog_comment(p_post_id uuid, p_author_name text, p_author_email text, p_content text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
  
  -- Log security event with sanitized data (NO PII)
  INSERT INTO public.security_audit_log (event_type, event_data, ip_address)
  VALUES (
    'blog_comment_submitted',
    jsonb_build_object(
      'comment_id', comment_id,
      'post_id', p_post_id,
      'author_email_hash', encode(digest(lower(trim(p_author_email)), 'sha256'), 'hex')
    ),
    regexp_replace(client_ip, '\.\d+$', '.xxx')
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Commento inviato e in attesa di moderazione',
    'comment_id', comment_id
  );
END;
$function$;

-- Update the comment audit trigger to sanitize PII
CREATE OR REPLACE FUNCTION public.audit_comment_creation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    event_data,
    ip_address,
    user_agent
  ) VALUES (
    'blog_comment_created',
    jsonb_build_object(
      'comment_id', NEW.id,
      'post_id', NEW.post_id,
      'author_email_hash', encode(digest(NEW.author_email, 'sha256'), 'hex'),
      'content_length', length(NEW.content)
    ),
    regexp_replace(COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', '0.0.0.0'), '\.\d+$', '.xxx'),
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN NEW;
END;
$function$;

-- Clean existing PII from security audit logs
UPDATE public.security_audit_log 
SET event_data = event_data - 'author_email' - 'email'
WHERE event_data ? 'author_email' OR event_data ? 'email';

-- Anonymize IP addresses (remove last octet)
UPDATE public.security_audit_log 
SET ip_address = regexp_replace(ip_address, '\.\d+$', '.xxx')
WHERE ip_address ~ '\.\d+$' AND ip_address != 'unknown';