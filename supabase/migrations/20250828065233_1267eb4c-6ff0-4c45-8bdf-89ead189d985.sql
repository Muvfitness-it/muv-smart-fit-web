-- Security Fix: Create public-safe view for blog comments without exposing email addresses
-- This addresses the "Customer Email Addresses Could Be Stolen from Comments" security finding

-- Create a public view that excludes sensitive email data
CREATE OR REPLACE VIEW public.blog_comments_public AS
SELECT 
  id,
  post_id,
  author_name,
  content,
  status,
  created_at,
  updated_at
FROM public.blog_comments
WHERE status = 'approved';

-- Grant SELECT permission on the view to public
GRANT SELECT ON public.blog_comments_public TO anon;
GRANT SELECT ON public.blog_comments_public TO authenticated;

-- Update the sync trigger to work with the approved_comments table
-- This ensures approved comments are still synced properly without exposing emails
CREATE OR REPLACE FUNCTION public.sync_approved_comments()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- When a comment is approved, add it to approved_comments table (without email)
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    INSERT INTO public.approved_comments (post_id, author_name, content, created_at, original_comment_id)
    VALUES (NEW.post_id, NEW.author_name, NEW.content, NEW.created_at, NEW.id)
    ON CONFLICT (original_comment_id) DO UPDATE SET
      content = EXCLUDED.content,
      author_name = EXCLUDED.author_name;
  END IF;
  
  -- When a comment is unapproved, remove it from approved_comments
  IF OLD.status = 'approved' AND NEW.status != 'approved' THEN
    DELETE FROM public.approved_comments WHERE original_comment_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Add trigger to blog_comments table if it doesn't exist
DROP TRIGGER IF EXISTS sync_approved_comments_trigger ON public.blog_comments;
CREATE TRIGGER sync_approved_comments_trigger
  AFTER INSERT OR UPDATE ON public.blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_approved_comments();