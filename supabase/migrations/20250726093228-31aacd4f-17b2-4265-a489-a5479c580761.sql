-- Fix infinite recursion in user_roles policy
DROP POLICY IF EXISTS "Allow first admin creation and admin management" ON public.user_roles;

-- Create a simpler policy that doesn't cause recursion
-- Allow users to insert their own admin role only if no admin exists
CREATE POLICY "Allow first user to become admin" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  (
    role != 'admin'::app_role OR 
    NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role)
  )
);

-- Allow authenticated users to insert non-admin roles for themselves
CREATE POLICY "Users can assign non-admin roles to themselves" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND role != 'admin'::app_role
);

-- Create a separate policy for updates and deletes that only works with direct user_id check
CREATE POLICY "Users can manage their own roles" 
ON public.user_roles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own roles" 
ON public.user_roles 
FOR DELETE 
USING (auth.uid() = user_id);