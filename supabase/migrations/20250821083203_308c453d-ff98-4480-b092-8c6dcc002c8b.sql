-- Fix security warnings from the linter

-- Fix Function Search Path Mutable warnings by setting search_path to 'public'
-- This prevents potential privilege escalation attacks

-- Update functions that need fixed search paths
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Update the blog updated_at function as well
CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Create a more secure function for handling new users with fixed search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

-- Update the scheduled publish handler with proper search path
CREATE OR REPLACE FUNCTION public.handle_scheduled_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

-- Update the blog published_at setter with proper search path
CREATE OR REPLACE FUNCTION public.set_blog_published_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$function$;

-- Create a comprehensive security audit function
CREATE OR REPLACE FUNCTION public.audit_security_event(
  event_type_param text,
  event_data_param jsonb DEFAULT NULL,
  user_id_param uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER  
SET search_path TO 'public'
AS $function$
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
$function$;