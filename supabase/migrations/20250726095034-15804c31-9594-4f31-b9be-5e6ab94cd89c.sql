-- Eliminazione completa di tutte le policy che dipendono da user_roles

-- Policy su bookings
DROP POLICY IF EXISTS "Admins can manage all bookings" ON public.bookings;

-- Policy su blog_posts
DROP POLICY IF EXISTS "Admins and editors can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins and editors can delete posts" ON public.blog_posts;

-- Policy su blog_categories
DROP POLICY IF EXISTS "Admins and editors can manage categories" ON public.blog_categories;

-- Policy su blog_tags  
DROP POLICY IF EXISTS "Admins and editors can manage tags" ON public.blog_tags;

-- Policy su security_audit_log
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.security_audit_log;

-- Ora elimina la funzione has_role
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- Elimina tutte le policy RLS per user_roles
DROP POLICY IF EXISTS "Allow first user to become admin" ON public.user_roles;
DROP POLICY IF EXISTS "Users can assign non-admin roles to themselves" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can manage their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Elimina la tabella user_roles
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Elimina l'enum app_role
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Crea la nuova tabella admin_users
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  is_first_admin boolean NOT NULL DEFAULT false,
  UNIQUE(user_id)
);

-- Abilita RLS sulla nuova tabella
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy per permettere a chiunque di leggere la lista admin
CREATE POLICY "Anyone can read admin list" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Policy per permettere inserimenti autenticati
CREATE POLICY "Authenticated users can register as admin" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Funzione per verificare se un utente è admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = COALESCE($1, auth.uid())
  );
$$;

-- Nuove policy semplificate usando is_admin()
CREATE POLICY "Admins can manage bookings" 
ON public.bookings 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can update posts" 
ON public.blog_posts 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete posts" 
ON public.blog_posts 
FOR DELETE 
USING (public.is_admin());

CREATE POLICY "Admins can manage categories" 
ON public.blog_categories 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can manage tags" 
ON public.blog_tags 
FOR ALL 
USING (public.is_admin());

CREATE POLICY "Admins can view audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (public.is_admin());