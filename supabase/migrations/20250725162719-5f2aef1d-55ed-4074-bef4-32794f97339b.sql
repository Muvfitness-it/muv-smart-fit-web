-- Disabilitiamo temporaneamente RLS per testare
-- ATTENZIONE: Questo è solo per debugging, riabiliteremo subito RLS
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;