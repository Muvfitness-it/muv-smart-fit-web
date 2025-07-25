-- Riabilitiamo RLS per sicurezza
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Rimuoviamo tutte le policy esistenti
DROP POLICY IF EXISTS "Admins and editors can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins and editors can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins and editors can delete posts" ON public.blog_posts;

-- Creiamo policy più semplici che verificano direttamente nella tabella user_roles
CREATE POLICY "Admins and editors can insert posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Admins and editors can update posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Admins and editors can delete posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);