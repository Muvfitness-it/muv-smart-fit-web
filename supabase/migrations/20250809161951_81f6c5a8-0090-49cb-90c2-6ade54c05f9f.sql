-- Allow admins to manage blog_post_tags relations
DO $$ BEGIN
  -- Ensure RLS is enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables t
    JOIN pg_namespace n ON n.oid = t.schemaname::regnamespace
    WHERE n.nspname = 'public' AND t.tablename = 'blog_post_tags'
  ) THEN
    RAISE NOTICE 'Table blog_post_tags not found';
  END IF;
END $$;

-- Create policy for admins to manage relations (INSERT/UPDATE/DELETE/SELECT)
DROP POLICY IF EXISTS "Admins can manage post-tag relationships" ON public.blog_post_tags;
CREATE POLICY "Admins can manage post-tag relationships"
ON public.blog_post_tags
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());