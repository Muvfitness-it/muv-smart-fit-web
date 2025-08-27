-- COMPREHENSIVE SECURITY FIXES

-- 1. Fix Security Definer View Issues
-- Drop existing problematic view and recreate properly
DROP VIEW IF EXISTS public.public_approved_comments;

-- Create secure approved comments table instead of view
CREATE TABLE IF NOT EXISTS public.approved_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  original_comment_id uuid REFERENCES public.blog_comments(id) ON DELETE SET NULL
);

-- Enable RLS on approved comments
ALTER TABLE public.approved_comments ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to approved comments
CREATE POLICY "Anyone can view approved comments" 
ON public.approved_comments 
FOR SELECT 
USING (true);

-- Service role can manage approved comments
CREATE POLICY "Service role can manage approved comments" 
ON public.approved_comments 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 2. Secure blog_comments table - Remove public access
DROP POLICY IF EXISTS "Anyone can view approved comments via view" ON public.blog_comments;
DROP POLICY IF EXISTS "Validated users can create comments" ON public.blog_comments;

-- Only admins can see raw comments for moderation
CREATE POLICY "Admins can manage comments for moderation" 
ON public.blog_comments 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Service role can insert for the contact form function
CREATE POLICY "Service role can insert comments" 
ON public.blog_comments 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- 3. Create trigger to sync approved comments
CREATE OR REPLACE FUNCTION public.sync_approved_comments()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- When a comment is approved, add it to approved_comments table
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    INSERT INTO public.approved_comments (post_id, author_name, content, created_at, original_comment_id)
    VALUES (NEW.post_id, NEW.author_name, NEW.content, NEW.created_at, NEW.id)
    ON CONFLICT (original_comment_id) DO UPDATE SET
      content = EXCLUDED.content,
      author_name = EXCLUDED.author_name;
  END IF;
  
  -- When a comment is unapproved, remove it from approved_comments
  IF OLD.status = 'approved' AND NEW.status != 'approved' THEN
    DELETE FROM public.approved_comments WHERE original_comment_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on blog_comments
DROP TRIGGER IF EXISTS sync_approved_comments_trigger ON public.blog_comments;
CREATE TRIGGER sync_approved_comments_trigger
  AFTER UPDATE ON public.blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_approved_comments();

-- 4. Fix function search paths - Update all functions to have proper search_path
CREATE OR REPLACE FUNCTION public.audit_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    event_data,
    ip_address,
    user_agent
  ) VALUES (
    'sensitive_data_access',
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'user_id', auth.uid()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Fix other functions without proper search_path
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

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(COALESCE($1, auth.uid()), 'admin'::app_role)
$$;

-- 5. Remove unsafe HMAC validation function
DROP FUNCTION IF EXISTS public.validate_request_hmac(text, text, text);

-- 6. Create secure rate limiting table
CREATE TABLE IF NOT EXISTS public.secure_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  endpoint text NOT NULL,
  requests_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(identifier, endpoint)
);

-- Enable RLS on rate limits
ALTER TABLE public.secure_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "Service role can manage secure rate limits" 
ON public.secure_rate_limits 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 7. Create function to validate CAPTCHA tokens (placeholder for implementation)
CREATE OR REPLACE FUNCTION public.validate_captcha_token(token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Placeholder for CAPTCHA validation
  -- In production, this should validate against a CAPTCHA service
  -- For now, require non-empty token
  RETURN token IS NOT NULL AND length(trim(token)) > 0;
END;
$$;

-- 8. Enhanced audit logging function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type_param text,
  event_data_param jsonb DEFAULT NULL,
  ip_param text DEFAULT NULL,
  user_agent_param text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
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
    event_data_param,
    COALESCE(ip_param, current_setting('request.headers', true)::json->>'x-forwarded-for'),
    COALESCE(user_agent_param, current_setting('request.headers', true)::json->>'user-agent'),
    now()
  );
END;
$$;