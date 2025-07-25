-- Ricreiamo la policy INSERT con un approccio più robusto
DROP POLICY IF EXISTS "Admins and editors can insert posts" ON public.blog_posts;

-- Creiamo una nuova policy che gestisce meglio il caso dell'autenticazione
CREATE POLICY "Admins and editors can insert posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (
  COALESCE(
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'editor'::app_role),
    false
  )
);