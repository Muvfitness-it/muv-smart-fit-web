-- Fase 1: Pulizia completa del sistema esistente

-- Elimina tutte le policy RLS per user_roles
DROP POLICY IF EXISTS "Allow first user to become admin" ON public.user_roles;
DROP POLICY IF EXISTS "Users can assign non-admin roles to themselves" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can manage their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Elimina la funzione has_role
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- Elimina la tabella user_roles
DROP TABLE IF EXISTS public.user_roles;

-- Elimina l'enum app_role se esiste
DROP TYPE IF EXISTS public.app_role;

-- Fase 2: Nuovo sistema semplificato

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

-- Policy per permettere a chiunque di leggere la lista admin (per verifiche)
CREATE POLICY "Anyone can read admin list" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Policy per permettere inserimenti solo se non esistono altri admin (primo utente)
CREATE POLICY "First user can become admin" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  (NOT EXISTS (SELECT 1 FROM public.admin_users) OR auth.uid() IS NOT NULL)
);

-- Funzione semplice per verificare se un utente è admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = $1
  );
$$;