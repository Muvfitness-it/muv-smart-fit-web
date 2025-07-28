-- Aggiungi policy per permettere agli admin di vedere tutte le bozze
CREATE POLICY "Admins can read all posts including drafts" 
ON public.blog_posts 
FOR SELECT 
USING (is_admin());