
-- Fix the update_analytics_summary function to resolve security warnings
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_analytics_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_analytics_summary() TO anon;
