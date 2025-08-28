-- Fix the increment_article_views function to use a more secure approach
-- Instead of SECURITY DEFINER, we'll use RLS policies to allow updates

-- First, drop the existing function
DROP FUNCTION IF EXISTS public.increment_article_views(text);

-- Create a more secure function that relies on RLS instead of SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.increment_article_views(article_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER  -- Use INVOKER instead of DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- This will now rely on RLS policies instead of bypassing them
  UPDATE public.blog_posts 
  SET views_count = COALESCE(views_count, 0) + 1,
      updated_at = now()
  WHERE id::text = article_id OR slug = article_id
    AND status = 'published';  -- Only allow updating published posts
END;
$function$;

-- Create a specific RLS policy to allow view count updates for published posts
CREATE POLICY "Anyone can increment view count on published posts"
ON public.blog_posts
FOR UPDATE
USING (status = 'published')
WITH CHECK (
  status = 'published' 
  AND views_count = OLD.views_count + 1  -- Only allow incrementing by 1
  AND updated_at > OLD.updated_at        -- Ensure updated_at is newer
);