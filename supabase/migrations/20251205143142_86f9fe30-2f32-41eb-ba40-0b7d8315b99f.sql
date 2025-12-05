-- Add share_preferences column to blog_posts for social sharing options
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS share_preferences JSONB DEFAULT '{"facebook": false, "twitter": false, "linkedin": false, "whatsapp": false}'::jsonb;

-- Add comment
COMMENT ON COLUMN public.blog_posts.share_preferences IS 'Social sharing preferences: which platforms to share on when published';