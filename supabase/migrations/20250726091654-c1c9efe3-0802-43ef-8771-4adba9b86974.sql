-- Fix RLS policy for user_roles to allow first admin creation
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create new policy that allows first admin creation
CREATE POLICY "Allow first admin creation and admin management" 
ON public.user_roles 
FOR ALL 
USING (
  -- Allow if user is admin OR if no admins exist yet
  has_role(auth.uid(), 'admin'::app_role) OR 
  NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role)
)
WITH CHECK (
  -- Same check for inserts
  has_role(auth.uid(), 'admin'::app_role) OR 
  NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role)
);