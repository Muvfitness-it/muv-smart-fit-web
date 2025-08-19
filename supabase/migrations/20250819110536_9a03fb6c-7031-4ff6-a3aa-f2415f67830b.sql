-- Add featured_image_url column to blog_posts table if it doesn't exist
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS featured_image_url text;