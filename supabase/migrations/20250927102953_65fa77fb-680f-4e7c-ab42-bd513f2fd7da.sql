-- Create blog analytics table for detailed tracking
CREATE TABLE public.blog_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  session_id TEXT,
  page_path TEXT NOT NULL,
  referrer TEXT,
  search_query TEXT,
  search_prompt TEXT,
  user_agent TEXT,
  ip_address TEXT,
  entry_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  exit_time TIMESTAMP WITH TIME ZONE,
  time_on_page INTEGER DEFAULT 0, -- seconds
  scroll_depth INTEGER DEFAULT 0, -- percentage
  interactions JSONB DEFAULT '[]'::jsonb, -- click events, etc.
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog search analytics table
CREATE TABLE public.blog_search_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query TEXT NOT NULL,
  search_prompt TEXT,
  results_count INTEGER DEFAULT 0,
  clicked_result_id UUID REFERENCES public.blog_posts(id),
  clicked_position INTEGER,
  visitor_id TEXT NOT NULL,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  search_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog performance summary table
CREATE TABLE public.blog_performance_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value BIGINT NOT NULL DEFAULT 0,
  metric_data JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial blog metrics with correct types
INSERT INTO public.blog_performance_summary (metric_name, metric_value, metric_data) VALUES
('total_blog_views', 0, '{}'::jsonb),
('total_blog_sessions', 0, '{}'::jsonb),
('avg_time_on_page', 0, '{}'::jsonb),
('total_searches', 0, '{}'::jsonb),
('bounce_rate', 0, '{}'::jsonb),
('monthly_views', 0, '{}'::jsonb),
('weekly_views', 0, '{}'::jsonb),
('daily_views', 0, '{}'::jsonb),
('most_viewed_posts', 0, '[]'::jsonb),
('top_search_queries', 0, '[]'::jsonb);

-- Enable RLS
ALTER TABLE public.blog_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_performance_summary ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_analytics
CREATE POLICY "Admins can view blog analytics" 
ON public.blog_analytics 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can insert blog analytics" 
ON public.blog_analytics 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update blog analytics" 
ON public.blog_analytics 
FOR UPDATE 
USING (auth.role() = 'service_role');

-- RLS Policies for blog_search_analytics
CREATE POLICY "Admins can view blog search analytics" 
ON public.blog_search_analytics 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can insert blog search analytics" 
ON public.blog_search_analytics 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- RLS Policies for blog_performance_summary
CREATE POLICY "Admins can view blog performance summary" 
ON public.blog_performance_summary 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Service role can update blog performance summary" 
ON public.blog_performance_summary 
FOR UPDATE 
USING (auth.role() = 'service_role');

-- Create function to update blog performance metrics
CREATE OR REPLACE FUNCTION public.update_blog_performance_summary()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Update total blog views
  UPDATE public.blog_performance_summary 
  SET metric_value = (SELECT COUNT(*) FROM public.blog_analytics),
      updated_at = now()
  WHERE metric_name = 'total_blog_views';
  
  -- Update total blog sessions
  UPDATE public.blog_performance_summary 
  SET metric_value = (SELECT COUNT(DISTINCT session_id) FROM public.blog_analytics WHERE session_id IS NOT NULL),
      updated_at = now()
  WHERE metric_name = 'total_blog_sessions';
  
  -- Update average time on page
  UPDATE public.blog_performance_summary 
  SET metric_value = (
    SELECT COALESCE(AVG(time_on_page), 0)::bigint 
    FROM public.blog_analytics 
    WHERE time_on_page > 0
  ),
  updated_at = now()
  WHERE metric_name = 'avg_time_on_page';
  
  -- Update total searches
  UPDATE public.blog_performance_summary 
  SET metric_value = (SELECT COUNT(*) FROM public.blog_search_analytics),
      updated_at = now()
  WHERE metric_name = 'total_searches';
  
  -- Update daily views
  UPDATE public.blog_performance_summary 
  SET metric_value = (
    SELECT COUNT(*) 
    FROM public.blog_analytics 
    WHERE created_at >= CURRENT_DATE
  ),
  updated_at = now()
  WHERE metric_name = 'daily_views';
  
  -- Update weekly views
  UPDATE public.blog_performance_summary 
  SET metric_value = (
    SELECT COUNT(*) 
    FROM public.blog_analytics 
    WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  ),
  updated_at = now()
  WHERE metric_name = 'weekly_views';
  
  -- Update monthly views
  UPDATE public.blog_performance_summary 
  SET metric_value = (
    SELECT COUNT(*) 
    FROM public.blog_analytics 
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  ),
  updated_at = now()
  WHERE metric_name = 'monthly_views';
  
  -- Update most viewed posts (top 10)
  UPDATE public.blog_performance_summary 
  SET metric_data = (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'post_id', post_id,
        'title', title,
        'views', view_count
      )
    ), '[]'::jsonb)
    FROM (
      SELECT 
        ba.post_id,
        bp.title,
        COUNT(*) as view_count
      FROM public.blog_analytics ba
      JOIN public.blog_posts bp ON bp.id = ba.post_id
      WHERE ba.post_id IS NOT NULL
      GROUP BY ba.post_id, bp.title
      ORDER BY view_count DESC
      LIMIT 10
    ) top_posts
  ),
  updated_at = now()
  WHERE metric_name = 'most_viewed_posts';
  
  -- Update top search queries (top 20)
  UPDATE public.blog_performance_summary 
  SET metric_data = (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'query', search_query,
        'count', query_count
      )
    ), '[]'::jsonb)
    FROM (
      SELECT 
        search_query,
        COUNT(*) as query_count
      FROM public.blog_search_analytics
      WHERE search_query IS NOT NULL
      GROUP BY search_query
      ORDER BY query_count DESC
      LIMIT 20
    ) top_queries
  ),
  updated_at = now()
  WHERE metric_name = 'top_search_queries';
  
  -- Calculate bounce rate (sessions with only one page view)
  UPDATE public.blog_performance_summary 
  SET metric_value = (
    SELECT CASE 
      WHEN total_sessions > 0 THEN 
        (bounce_sessions * 100 / total_sessions)::bigint
      ELSE 0 
    END
    FROM (
      SELECT 
        COUNT(DISTINCT session_id) as total_sessions,
        COUNT(DISTINCT CASE 
          WHEN page_views = 1 THEN session_id 
        END) as bounce_sessions
      FROM (
        SELECT 
          session_id,
          COUNT(*) as page_views
        FROM public.blog_analytics
        WHERE session_id IS NOT NULL
        GROUP BY session_id
      ) session_stats
    ) bounce_calc
  ),
  updated_at = now()
  WHERE metric_name = 'bounce_rate';
END;
$function$;