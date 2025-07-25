-- Fix remaining database security warnings

-- 1. Fix remaining functions without search_path
CREATE OR REPLACE FUNCTION public.update_bookings_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_expired_booking_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  DELETE FROM public.booking_tokens 
  WHERE expires_at < now() - INTERVAL '24 hours';
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_blog_published_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.update_analytics_summary()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.increment_article_views(article_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.blog_posts 
  SET views_count = COALESCE(views_count, 0) + 1,
      updated_at = now()
  WHERE id::text = article_id OR slug = article_id;
END;
$function$;