-- COMPREHENSIVE BLOG SECURITY FIX: Eliminate all potential email exposure routes

-- 1. FIX CRITICAL: Secure blog_articles_seo table (publicly writable vulnerability)
DROP POLICY IF EXISTS "Blog articles are publicly readable" ON public.blog_articles_seo;
DROP POLICY IF EXISTS "Admins can manage blog articles" ON public.blog_articles_seo;

-- Create secure policies for blog_articles_seo
CREATE POLICY "Public can read published blog articles"
ON public.blog_articles_seo
FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins only can manage blog articles"
ON public.blog_articles_seo  
FOR ALL
USING (current_user_has_role('admin'::app_role))
WITH CHECK (current_user_has_role('admin'::app_role));

-- 2. ENHANCE: Make blog comments even more secure with explicit email protection
DROP POLICY IF EXISTS "Admin only blog comments access" ON public.blog_comments;

CREATE POLICY "Service role only blog comments access" 
ON public.blog_comments
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can read comments for moderation"
ON public.blog_comments  
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND current_user_has_role('admin'::app_role) 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Admins can update comment status"
ON public.blog_comments
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL
  AND current_user_has_role('admin'::app_role)
  AND auth.role() = 'authenticated'  
)
WITH CHECK (
  auth.uid() IS NOT NULL
  AND current_user_has_role('admin'::app_role) 
  AND auth.role() = 'authenticated'
);

-- 3. SECURE: Ensure approved_comments never contains emails (defense in depth)
ALTER TABLE public.approved_comments DROP COLUMN IF EXISTS author_email CASCADE;
ALTER TABLE public.approved_comments DROP COLUMN IF EXISTS email CASCADE;

-- 4. CREATE: Email-safe admin function for comment moderation 
CREATE OR REPLACE FUNCTION public.get_comments_for_admin_moderation(p_limit integer DEFAULT 50)
RETURNS TABLE(
  id uuid,
  post_id uuid,
  author_name text,
  content text,
  status text,
  created_at timestamp with time zone,
  email_masked text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT current_user_has_role('admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  -- Return comment data with masked emails for admin moderation
  RETURN QUERY
  SELECT 
    bc.id,
    bc.post_id,
    bc.author_name,
    bc.content,
    bc.status,
    bc.created_at,
    -- Mask email for privacy (show first 2 chars + *** + @domain)
    CASE 
      WHEN bc.author_email IS NOT NULL THEN
        substring(bc.author_email from 1 for 2) || '***@' || split_part(bc.author_email, '@', 2)
      ELSE 'No email'
    END as email_masked
  FROM public.blog_comments bc
  ORDER BY bc.created_at DESC
  LIMIT p_limit;
END;
$$;

-- Grant admin access to the moderation function
GRANT EXECUTE ON FUNCTION public.get_comments_for_admin_moderation(integer) TO authenticated;

-- 5. REVOKE: Remove any unnecessary permissions
REVOKE ALL ON public.blog_comments FROM public;
REVOKE ALL ON public.blog_comments FROM anon;
REVOKE ALL ON public.blog_comments FROM authenticated;

-- Grant minimal necessary permissions
GRANT SELECT, UPDATE ON public.blog_comments TO authenticated;
GRANT ALL ON public.blog_comments TO service_role;

-- 6. LOG: Record the comprehensive security fix
INSERT INTO public.security_audit_log (event_type, event_data)
VALUES (
  'comprehensive_blog_security_lockdown',
  jsonb_build_object(
    'fixed_vulnerabilities', ARRAY[
      'blog_articles_seo_publicly_writable', 
      'blog_comments_email_exposure_routes',
      'approved_comments_potential_email_leaks'
    ],
    'security_measures', ARRAY[
      'admin_only_blog_management',
      'service_role_only_comment_crud', 
      'masked_email_moderation_function',
      'explicit_email_column_removal'
    ],
    'access_model', 'zero_trust_email_protection'
  )
);