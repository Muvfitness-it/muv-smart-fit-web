-- Sostituiamo temporaneamente con una policy molto permissiva per testare
DROP POLICY IF EXISTS "Admins and editors can insert posts" ON public.blog_posts;

-- Policy temporanea che permette a tutti gli utenti autenticati di inserire
CREATE POLICY "Temporary allow all authenticated users" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);