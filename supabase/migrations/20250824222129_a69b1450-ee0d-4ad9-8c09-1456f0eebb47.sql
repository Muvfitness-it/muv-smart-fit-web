-- Crea i redirect 301 da /blog/{slug} a /{slug} per tutti gli articoli pubblicati
INSERT INTO public.url_redirects (from_path, to_path, status_code, source_type)
SELECT 
    '/blog/' || slug as from_path,
    '/' || slug as to_path,
    301 as status_code,
    'blog_migration' as source_type
FROM public.blog_posts 
WHERE status = 'published' 
AND slug IS NOT NULL
ON CONFLICT (from_path) DO UPDATE SET
    to_path = EXCLUDED.to_path,
    status_code = EXCLUDED.status_code,
    source_type = EXCLUDED.source_type;