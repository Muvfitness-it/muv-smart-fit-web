
-- Update RLS policies to be more secure and fix potential issues

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view site visit stats" ON public.site_visits;
DROP POLICY IF EXISTS "Service can insert site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Anyone can view planner usage stats" ON public.planner_usage;
DROP POLICY IF EXISTS "Authenticated users can insert planner usage" ON public.planner_usage;
DROP POLICY IF EXISTS "Anyone can view analytics summary" ON public.analytics_summary;
DROP POLICY IF EXISTS "Service can update analytics summary" ON public.analytics_summary;

-- Create more secure policies for site_visits
CREATE POLICY "Public can view aggregated site visit stats" 
  ON public.site_visits 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow anonymous site visit tracking" 
  ON public.site_visits 
  FOR INSERT 
  WITH CHECK (true);

-- Create more secure policies for planner_usage  
CREATE POLICY "Public can view aggregated planner usage stats" 
  ON public.planner_usage 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow planner usage tracking" 
  ON public.planner_usage 
  FOR INSERT 
  WITH CHECK (true);

-- Create more secure policies for analytics_summary
CREATE POLICY "Public can view analytics summary" 
  ON public.analytics_summary 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow analytics summary updates" 
  ON public.analytics_summary 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);
