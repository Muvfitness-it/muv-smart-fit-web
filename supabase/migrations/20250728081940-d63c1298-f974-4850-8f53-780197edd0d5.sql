-- Fix RLS policy for site_visits table
-- Allow anonymous users to insert site visit data

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow anonymous site visits" ON public.site_visits;

-- Create a new policy that allows INSERT for everyone
CREATE POLICY "Allow anonymous site visits" 
ON public.site_visits 
FOR INSERT 
WITH CHECK (true);

-- Also allow SELECT for authenticated users to read their own data
DROP POLICY IF EXISTS "Users can view their own visits" ON public.site_visits;
CREATE POLICY "Users can view their own visits" 
ON public.site_visits 
FOR SELECT 
USING (true);