-- SQL Script to Assign Authors to Existing Blog Posts
-- Run this in Supabase SQL Editor after creating the authors table

-- Get author IDs (adjust based on your authors)
-- Francesco Muv: Dimagrimento, EMS, Fitness generale
-- Thomas Gabrieli: Nutrizione, Pilates, Over 60
-- MUV Fitness Team: Articoli generici

-- Assign Francesco Muv to EMS and weight loss articles
UPDATE blog_posts
SET author_id = (SELECT id FROM authors WHERE name = 'Francesco Muv' LIMIT 1)
WHERE status = 'published' 
AND (
  slug LIKE '%dimagrire%' 
  OR slug LIKE '%ems%' 
  OR slug LIKE '%allenamento%'
  OR slug LIKE '%fitness%'
  OR slug LIKE '%trasformazione%'
  OR title ILIKE '%dimagrire%'
  OR title ILIKE '%ems%'
  OR title ILIKE '%allenamento%'
)
AND author_id IS NULL;

-- Assign Thomas Gabrieli to nutrition and wellness articles
UPDATE blog_posts
SET author_id = (SELECT id FROM authors WHERE name = 'Thomas Gabrieli' LIMIT 1)
WHERE status = 'published'
AND (
  slug LIKE '%nutrizione%'
  OR slug LIKE '%pilates%'
  OR slug LIKE '%over%'
  OR slug LIKE '%menopausa%'
  OR slug LIKE '%benessere%'
  OR title ILIKE '%nutrizione%'
  OR title ILIKE '%pilates%'
  OR title ILIKE '%over%'
  OR title ILIKE '%menopausa%'
)
AND author_id IS NULL;

-- Assign MUV Fitness Team to remaining articles
UPDATE blog_posts
SET author_id = (SELECT id FROM authors WHERE name = 'MUV Fitness Team' LIMIT 1)
WHERE status = 'published'
AND author_id IS NULL;

-- Verify assignment
SELECT 
  bp.slug,
  bp.title,
  a.name as author_name,
  a.role as author_role
FROM blog_posts bp
LEFT JOIN authors a ON bp.author_id = a.id
WHERE bp.status = 'published'
ORDER BY bp.published_at DESC;
