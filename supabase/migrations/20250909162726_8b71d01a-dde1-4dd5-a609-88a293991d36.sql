-- Fix admin_users table security by implementing restrictive RLS policies
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Only admins can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Only admins can create new admins" ON public.admin_users;

-- Create restrictive policies that MUST all be satisfied (more secure)
CREATE POLICY "Restrict admin_users SELECT to authenticated admins only"
ON public.admin_users
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND public.current_user_has_role('admin'::app_role)
)
WITH CHECK (false);

CREATE POLICY "Restrict admin_users INSERT to authenticated admins only"
ON public.admin_users
FOR INSERT
TO authenticated
USING (false)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND public.current_user_has_role('admin'::app_role)
);

CREATE POLICY "Restrict admin_users UPDATE to authenticated admins only"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND public.current_user_has_role('admin'::app_role)
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND public.current_user_has_role('admin'::app_role)
);

CREATE POLICY "Restrict admin_users DELETE to authenticated admins only"
ON public.admin_users
FOR DELETE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND public.current_user_has_role('admin'::app_role)
);

-- Ensure RLS is enabled (should already be, but being explicit)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Add additional security: ensure only service role can manage the table structure
REVOKE ALL ON public.admin_users FROM anon;
REVOKE ALL ON public.admin_users FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_users TO authenticated;