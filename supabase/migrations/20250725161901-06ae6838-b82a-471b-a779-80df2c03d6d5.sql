-- Drop existing policies for blog_posts table
DROP POLICY IF EXISTS "Admins and editors can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins and editors can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins and editors can delete posts" ON public.blog_posts;

-- Recreate the policies with better error handling
CREATE POLICY "Admins and editors can insert posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'editor'::app_role)
  )
);

CREATE POLICY "Admins and editors can update posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'editor'::app_role)
  )
);

CREATE POLICY "Admins and editors can delete posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'editor'::app_role)
  )
);