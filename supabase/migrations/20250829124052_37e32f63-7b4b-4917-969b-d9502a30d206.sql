-- Fix critical blog_posts UPDATE policy to restrict columns
DROP POLICY "Anyone can increment view count on published posts" ON public.blog_posts;

-- Create separate policies for different update operations
CREATE POLICY "Public can increment view count on published posts" 
ON public.blog_posts 
FOR UPDATE 
USING (status = 'published') 
WITH CHECK (
  status = 'published' AND 
  -- Only allow updating views_count, nothing else
  (OLD.title = title AND 
   OLD.content = content AND 
   OLD.slug = slug AND 
   OLD.status = status AND 
   OLD.author_name = author_name AND 
   OLD.author_email = author_email AND 
   OLD.category_id = category_id AND 
   OLD.excerpt = excerpt AND 
   OLD.meta_title = meta_title AND 
   OLD.meta_description = meta_description AND 
   OLD.meta_keywords = meta_keywords AND 
   OLD.featured_image = featured_image AND 
   OLD.featured_image_url = featured_image_url AND 
   OLD.reading_time = reading_time AND 
   OLD.published_at = published_at AND 
   OLD.scheduled_publish_at = scheduled_publish_at AND 
   OLD.likes_count = likes_count AND 
   OLD.created_at = created_at)
);

-- Update the audit function to remove PII data
CREATE OR REPLACE FUNCTION public.log_security_event_safe(event_type_param text, event_data_param jsonb DEFAULT NULL::jsonb, ip_param text DEFAULT NULL::text, user_agent_param text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  sanitized_data jsonb;
  sanitized_ip text;
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

  IF sanitized_data ? 'name' THEN
    sanitized_data := sanitized_data || jsonb_build_object('name_hash', md5(sanitized_data->>'name'));
    sanitized_data := sanitized_data - 'name';
  END IF;

  IF sanitized_data ? 'telefono' THEN
    sanitized_data := sanitized_data - 'telefono';
  END IF;
  
  -- Truncate IP to remove last octet for privacy (192.168.1.xxx)
  sanitized_ip := CASE 
    WHEN ip_param IS NOT NULL THEN 
      regexp_replace(ip_param, '\.\d+$', '.xxx')
    ELSE 
      regexp_replace(COALESCE(current_setting('request.headers', true)::json->>'x-forwarded-for', '0.0.0.0'), '\.\d+$', '.xxx')
  END;
  
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
$function$;