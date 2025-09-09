-- Fix admin_users table security with correct RLS policy syntax
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Only admins can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Only admins can create new admins" ON public.admin_users;

-- Create secure restrictive policies 
CREATE POLICY "Restrict admin_users SELECT to authenticated admins only"
ON public.admin_users
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND public.current_user_has_role('admin'::app_role)
);

CREATE POLICY "Restrict admin_users INSERT to authenticated admins only"
ON public.admin_users
FOR INSERT
TO authenticated
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

-- Ensure RLS is enabled
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;