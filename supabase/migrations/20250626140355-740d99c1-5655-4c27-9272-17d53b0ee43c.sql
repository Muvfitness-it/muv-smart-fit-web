
-- Permettere l'inserimento di post senza autenticazione per i post di esempio
CREATE POLICY "Allow insert sample blog posts" 
  ON public.blog_posts 
  FOR INSERT 
  WITH CHECK (true);

-- Permettere l'inserimento nelle categorie se necessario
CREATE POLICY "Allow insert blog categories" 
  ON public.blog_categories 
  FOR INSERT 
  WITH CHECK (true);
