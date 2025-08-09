-- Security hardening migration: tighten RLS and policies

-- 1) blog_posts_backup: enable RLS and restrict to admins only
ALTER TABLE public.blog_posts_backup ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage blog_posts_backup" ON public.blog_posts_backup;
DROP POLICY IF EXISTS "Everyone can read blog_posts_backup" ON public.blog_posts_backup;
CREATE POLICY "Admins can manage blog_posts_backup"
ON public.blog_posts_backup
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- 2) site_visits: restrict SELECT to admins only (keep existing INSERT policies)
DROP POLICY IF EXISTS "Anyone can view site visit stats" ON public.site_visits;
DROP POLICY IF EXISTS "Users can view their own visits" ON public.site_visits;
DROP POLICY IF EXISTS "Anyone can view site visits" ON public.site_visits;
CREATE POLICY "Admins can view site visits"
ON public.site_visits
FOR SELECT
USING (is_admin());

-- 3) lead_tracking: lock down with admin-only reads/updates/deletes, keep insert open for current flows
ALTER TABLE public.lead_tracking ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service can manage lead tracking" ON public.lead_tracking;
DROP POLICY IF EXISTS "Allow all on lead tracking" ON public.lead_tracking;
CREATE POLICY "Anyone can insert lead tracking"
ON public.lead_tracking
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can read lead tracking"
ON public.lead_tracking
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can update lead tracking"
ON public.lead_tracking
FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete lead tracking"
ON public.lead_tracking
FOR DELETE
USING (is_admin());

-- 4) blog_posts: refine INSERT policy to use is_admin()
DROP POLICY IF EXISTS "Only admins can create posts" ON public.blog_posts;
CREATE POLICY "Only admins can create posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (is_admin());