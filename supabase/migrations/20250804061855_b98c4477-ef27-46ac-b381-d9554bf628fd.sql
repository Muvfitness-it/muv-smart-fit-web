-- Fix NULL published_at dates for published posts
UPDATE blog_posts 
SET published_at = created_at 
WHERE status = 'published' AND published_at IS NULL;