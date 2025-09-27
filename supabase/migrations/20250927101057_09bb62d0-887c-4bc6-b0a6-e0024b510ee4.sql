-- Create backup table for blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts_backup (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_post_id UUID NOT NULL,
  original_title TEXT,
  original_content TEXT,
  original_excerpt TEXT,
  backup_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts_backup ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only
CREATE POLICY "Only admins can access blog backups" 
ON public.blog_posts_backup 
FOR ALL 
USING (false);