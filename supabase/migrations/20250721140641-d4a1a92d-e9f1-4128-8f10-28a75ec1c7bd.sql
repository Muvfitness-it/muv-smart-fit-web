-- Update blog_posts policies to allow editors to manage posts
DROP POLICY IF EXISTS "Admins can do everything" ON public.blog_posts;

CREATE POLICY "Admins and editors can insert posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can update posts"
ON public.blog_posts
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can delete posts"
ON public.blog_posts
FOR DELETE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Allow editors to manage blog categories
DROP POLICY IF EXISTS "Admins and editors can manage categories" ON public.blog_categories;

CREATE POLICY "Admins and editors can manage categories"
ON public.blog_categories
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Allow editors to manage blog tags  
DROP POLICY IF EXISTS "Admins and editors can manage tags" ON public.blog_tags;

CREATE POLICY "Admins and editors can manage tags"
ON public.blog_tags
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));