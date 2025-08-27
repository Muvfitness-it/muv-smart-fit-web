-- Security Fix 1: Remove hardcoded Authorization header from database function
CREATE OR REPLACE FUNCTION public.update_sitemaps_on_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only trigger sitemap update when a post is published or updated
  IF (NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published')) 
     OR (NEW.status = 'published' AND OLD.status = 'published' AND NEW.updated_at != OLD.updated_at) THEN
    
    -- Call the sitemap update function without hardcoded auth (edge function handles its own auth)
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/update-sitemaps',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{"action": "update_all_sitemaps", "trigger": "blog_post_published"}'::jsonb
    );
    
    PERFORM net.http_post(
      url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/news-sitemap',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := '{}'::jsonb
    );
  END IF;
  
  RETURN NEW;
END;
$function$

-- Security Fix 2: Create view for blog_comments without exposing emails
CREATE VIEW public.blog_comments_safe AS 
SELECT 
  id,
  post_id,
  author_name,
  content,
  status,
  created_at,
  updated_at,
  -- Don't expose email addresses
  CASE WHEN is_admin() THEN author_email ELSE NULL END as author_email
FROM public.blog_comments;

-- Security Fix 3: Update RLS policies for safer email handling
DROP POLICY IF EXISTS "Admins can manage comments for moderation" ON public.blog_comments;
DROP POLICY IF EXISTS "Service role can insert comments" ON public.blog_comments;

-- More restrictive policies for blog_comments
CREATE POLICY "Admins can manage comments with emails" 
ON public.blog_comments 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Service role can insert comments securely" 
ON public.blog_comments 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- No public read access to blog_comments table (use approved_comments instead)

-- Security Fix 4: Enhanced audit logging with PII reduction
CREATE OR REPLACE FUNCTION public.log_security_event_safe(
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
BEGIN
  -- Sanitize PII from event data
  sanitized_data := event_data_param;
  
  -- Remove or hash sensitive fields
  IF sanitized_data ? 'email' THEN
    sanitized_data := sanitized_data || jsonb_build_object('email_hash', md5(sanitized_data->>'email'));
    sanitized_data := sanitized_data - 'email';
  END IF;
  
  IF sanitized_data ? 'author_email' THEN
    sanitized_data := sanitized_data || jsonb_build_object('author_email_hash', md5(sanitized_data->>'author_email'));
    sanitized_data := sanitized_data - 'author_email';
  END IF;
  
  -- Truncate IP to remove last octet for privacy
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
    CASE 
      WHEN ip_param IS NOT NULL THEN 
        regexp_replace(ip_param, '\.\d+$', '.xxx')
      ELSE 
        regexp_replace(COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', '0.0.0.0'), '\.\d+$', '.xxx')
    END,
    COALESCE(user_agent_param, current_setting('request.headers', true)::json->>'user-agent'),
    now()
  );
END;
$function$