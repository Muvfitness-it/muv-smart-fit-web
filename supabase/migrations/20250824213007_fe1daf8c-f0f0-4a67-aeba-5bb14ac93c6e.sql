-- Fix remaining security issues from linter

-- 1. Fix all functions to have proper search_path (Address warning 0011)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  RETURN new;
END;
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

CREATE OR REPLACE FUNCTION public.assign_user_role(_user_id uuid, _role app_role, _assigned_by uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only admins can assign roles
  IF NOT public.current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can assign roles';
  END IF;
  
  INSERT INTO public.user_roles (user_id, role, created_by)
  VALUES (_user_id, _role, _assigned_by)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(COALESCE($1, auth.uid()), 'admin'::app_role)
$$;

CREATE OR REPLACE FUNCTION public.handle_scheduled_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Se viene impostata una data di pubblicazione futura, cambia status a 'scheduled'
  IF NEW.scheduled_publish_at IS NOT NULL AND NEW.scheduled_publish_at > NOW() THEN
    NEW.status = 'scheduled';
    NEW.published_at = NULL;
  -- Se la data di pubblicazione è nel passato o presente, pubblica immediatamente
  ELSIF NEW.scheduled_publish_at IS NOT NULL AND NEW.scheduled_publish_at <= NOW() THEN
    NEW.status = 'published';
    NEW.published_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_blog_published_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.revoke_user_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only admins can revoke roles
  IF NOT public.current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can revoke roles';
  END IF;
  
  DELETE FROM public.user_roles
  WHERE user_id = _user_id AND role = _role;
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_unauthorized_access_attempt()
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
    user_agent
  ) VALUES (
    'unauthorized_access_attempt',
    auth.uid(),
    jsonb_build_object(
      'attempted_resource', 'security_audit_log',
      'timestamp', now()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.log_unauthorized_lead_access()
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
    user_agent
  ) VALUES (
    'unauthorized_lead_access_attempt',
    auth.uid(),
    jsonb_build_object(
      'attempted_resource', 'lead_tracking',
      'timestamp', now(),
      'auth_role', auth.role()
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.clean_blog_content(input_content text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    cleaned_content TEXT;
BEGIN
    -- Inizializza con il contenuto originale
    cleaned_content := input_content;
    
    -- Solo se il contenuto sembra avere simboli markdown
    IF cleaned_content ~ '[#*_\[\]>]' THEN
        -- Rimuovi hashtag per titoli ## ### ecc
        cleaned_content := regexp_replace(cleaned_content, '#{1,6}\s*', '', 'g');
        
        -- Converti **testo** in <strong>testo</strong>
        cleaned_content := regexp_replace(cleaned_content, '\*\*([^*\n]+)\*\*', '<strong>\1</strong>', 'g');
        
        -- Converti __testo__ in <strong>testo</strong>
        cleaned_content := regexp_replace(cleaned_content, '__([^_\n]+)__', '<strong>\1</strong>', 'g');
        
        -- Rimuovi asterischi isolati
        cleaned_content := regexp_replace(cleaned_content, '\*(?!\*)', '', 'g');
        
        -- Rimuovi trattini all'inizio delle righe (bullet points)
        cleaned_content := regexp_replace(cleaned_content, '^[\s]*[-*]\s+', '', 'gm');
        
        -- Rimuovi simboli > per citazioni
        cleaned_content := regexp_replace(cleaned_content, '>\s*', '', 'g');
        
        -- Rimuovi link markdown [text](url) mantieni solo il testo
        cleaned_content := regexp_replace(cleaned_content, '\[([^\]]+)\]\([^)]+\)', '\1', 'g');
        
        -- Normalizza spazi multipli
        cleaned_content := regexp_replace(cleaned_content, '\s+', ' ', 'g');
        
        -- Rimuovi paragrafi vuoti
        cleaned_content := regexp_replace(cleaned_content, '<p>\s*</p>', '', 'g');
    END IF;
    
    RETURN cleaned_content;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_article_views(article_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.blog_posts 
  SET views_count = COALESCE(views_count, 0) + 1,
      updated_at = now()
  WHERE id::text = article_id OR slug = article_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.audit_security_event(event_type_param text, event_data_param jsonb DEFAULT NULL::jsonb, user_id_param uuid DEFAULT NULL::uuid)
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
    COALESCE(user_id_param, auth.uid()),
    event_data_param,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent',
    now()
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.verify_ai_token_access(token_input text)
RETURNS TABLE(valid boolean, user_id uuid, roles text[], is_admin boolean, can_use_ai boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  token_record record;
BEGIN
  -- Check if token exists and is valid
  SELECT t.user_id, t.expires_at, array_agg(ur.role::text) as user_roles
  INTO token_record
  FROM ai_tokens t
  LEFT JOIN user_roles ur ON ur.user_id = t.user_id
  WHERE t.token = token_input 
    AND t.expires_at > now()
  GROUP BY t.user_id, t.expires_at;
  
  -- Return results
  IF token_record.user_id IS NOT NULL THEN
    RETURN QUERY SELECT 
      true as valid,
      token_record.user_id,
      COALESCE(token_record.user_roles, ARRAY[]::text[]) as roles,
      'admin' = ANY(COALESCE(token_record.user_roles, ARRAY[]::text[])) as is_admin,
      ('admin' = ANY(COALESCE(token_record.user_roles, ARRAY[]::text[])) OR 
       'editor' = ANY(COALESCE(token_record.user_roles, ARRAY[]::text[]))) as can_use_ai;
  ELSE
    RETURN QUERY SELECT 
      false as valid,
      null::uuid as user_id,
      ARRAY[]::text[] as roles,
      false as is_admin,
      false as can_use_ai;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_analytics_summary()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Update total site visits
  UPDATE public.analytics_summary 
  SET metric_value = (SELECT COUNT(*) FROM public.site_visits),
      updated_at = now()
  WHERE metric_name = 'total_site_visits';
  
  -- Update total planner usage
  UPDATE public.analytics_summary 
  SET metric_value = (SELECT COUNT(*) FROM public.planner_usage),
      updated_at = now()
  WHERE metric_name = 'total_planner_usage';
  
  -- Update unique visitors today
  UPDATE public.analytics_summary 
  SET metric_value = (
    SELECT COUNT(DISTINCT ip_address) 
    FROM public.site_visits 
    WHERE created_at >= CURRENT_DATE
  ),
  updated_at = now()
  WHERE metric_name = 'unique_visitors_today';
  
  -- Update planner usage today
  UPDATE public.analytics_summary 
  SET metric_value = (
    SELECT COUNT(*) 
    FROM public.planner_usage 
    WHERE created_at >= CURRENT_DATE
  ),
  updated_at = now()
  WHERE metric_name = 'planner_usage_today';
END;
$$;