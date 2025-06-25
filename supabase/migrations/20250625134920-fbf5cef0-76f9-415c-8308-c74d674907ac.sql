
-- Create table for site visits tracking
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for MUV Planner usage tracking
CREATE TABLE public.planner_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  action_type TEXT NOT NULL, -- 'meal_plan_generated', 'shopping_list_generated', 'coach_question_asked'
  calories INTEGER,
  plan_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for analytics summary (for quick stats retrieval)
CREATE TABLE public.analytics_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial metrics
INSERT INTO public.analytics_summary (metric_name, metric_value) VALUES 
('total_site_visits', 0),
('total_planner_usage', 0),
('unique_visitors_today', 0),
('planner_usage_today', 0);

-- Enable RLS on all tables
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planner_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_summary ENABLE ROW LEVEL SECURITY;

-- Create policies for site_visits (read-only for everyone, insert for service role)
CREATE POLICY "Anyone can view site visit stats" 
  ON public.site_visits 
  FOR SELECT 
  USING (true);

CREATE POLICY "Service can insert site visits" 
  ON public.site_visits 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for planner_usage (read-only for everyone, insert for authenticated users)
CREATE POLICY "Anyone can view planner usage stats" 
  ON public.planner_usage 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert planner usage" 
  ON public.planner_usage 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL OR auth.role() = 'service_role');

-- Create policies for analytics_summary (read for everyone, update for service role)
CREATE POLICY "Anyone can view analytics summary" 
  ON public.analytics_summary 
  FOR SELECT 
  USING (true);

CREATE POLICY "Service can update analytics summary" 
  ON public.analytics_summary 
  FOR UPDATE 
  USING (true);

-- Create function to update analytics summary
CREATE OR REPLACE FUNCTION update_analytics_summary()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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
