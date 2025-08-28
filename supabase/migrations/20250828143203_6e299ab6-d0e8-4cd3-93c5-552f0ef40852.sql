-- Fix the increment_article_views function security issue
-- Drop the existing function and create a more secure version

DROP FUNCTION IF EXISTS public.increment_article_views(text);

-- Create a more secure function that uses SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.increment_article_views(article_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER  -- Use INVOKER instead of DEFINER for better security
SET search_path TO 'public'
AS $function$
BEGIN
  -- This will now rely on RLS policies instead of bypassing them
  UPDATE public.blog_posts 
  SET views_count = COALESCE(views_count, 0) + 1,
      updated_at = now()
  WHERE (id::text = article_id OR slug = article_id)
    AND status = 'published';  -- Only allow updating published posts
END;
$function$;

-- Create a specific RLS policy to allow view count updates for published posts
CREATE POLICY "Anyone can increment view count on published posts"
ON public.blog_posts
FOR UPDATE
USING (status = 'published');  -- Can update published posts

-- Grant execute permission on the function to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.increment_article_views(text) TO anon, authenticated;