-- Fix RLS on cron_logs table (existing issue)
ALTER TABLE public.cron_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view cron logs" 
ON public.cron_logs 
FOR SELECT 
USING (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can manage cron logs" 
ON public.cron_logs 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');