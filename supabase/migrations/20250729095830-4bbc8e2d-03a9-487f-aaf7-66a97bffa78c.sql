-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if current user has role
CREATE OR REPLACE FUNCTION public.current_user_has_role(_role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(auth.uid(), _role)
$$;

-- Update is_admin function to use new role system
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(COALESCE($1, auth.uid()), 'admin'::app_role)
$$;

-- RLS policies for user_roles table
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.current_user_has_role('admin'::app_role));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.current_user_has_role('admin'::app_role))
WITH CHECK (public.current_user_has_role('admin'::app_role));

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Secure admin_users table - only admins can view the admin list
DROP POLICY IF EXISTS "Anyone can read admin list" ON public.admin_users;
CREATE POLICY "Only admins can view admin list"
ON public.admin_users
FOR SELECT
TO authenticated
USING (public.current_user_has_role('admin'::app_role));

-- Restrict admin registration - only existing admins can create new admins
DROP POLICY IF EXISTS "Authenticated users can register as admin" ON public.admin_users;
CREATE POLICY "Only admins can create new admins"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (public.current_user_has_role('admin'::app_role));

-- Migrate existing admin_users to user_roles
INSERT INTO public.user_roles (user_id, role, created_at)
SELECT user_id, 'admin'::app_role, created_at
FROM public.admin_users
ON CONFLICT (user_id, role) DO NOTHING;

-- Create function to handle new user role assignment
CREATE OR REPLACE FUNCTION public.assign_user_role(_user_id UUID, _role app_role, _assigned_by UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only admins can assign roles
  IF NOT public.current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can assign roles';
  END IF;
  
  INSERT INTO public.user_roles (user_id, role, created_by)
  VALUES (_user_id, _role, _assigned_by)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN TRUE;
END;
$$;

-- Create function to revoke user role
CREATE OR REPLACE FUNCTION public.revoke_user_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only admins can revoke roles
  IF NOT public.current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Only administrators can revoke roles';
  END IF;
  
  DELETE FROM public.user_roles
  WHERE user_id = _user_id AND role = _role;
  
  RETURN TRUE;
END;
$$;