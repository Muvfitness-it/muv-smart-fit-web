-- Ripristina il backup degli articoli e correggi la funzione di pulizia
UPDATE blog_posts 
SET content = REPLACE(content, '<strong', ' <strong')
WHERE content LIKE '%<strong%' AND content NOT LIKE '% <strong%';

UPDATE blog_posts 
SET content = REPLACE(content, '</strong', '</strong> ')
WHERE content LIKE '%</strong%' AND content NOT LIKE '%</strong> %';

-- Correggi spazi doppi
UPDATE blog_posts 
SET content = REPLACE(content, '  ', ' ')
WHERE content LIKE '%  %';

-- Verifica i risultati
SELECT id, title, LEFT(content, 300) as preview 
FROM blog_posts 
WHERE status = 'draft' 
LIMIT 3;