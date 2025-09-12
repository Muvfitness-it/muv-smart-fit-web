-- FIX: Remove security definer view and use secure function approach only

-- Drop the problematic security definer view
DROP VIEW IF EXISTS public.approved_comments_public CASCADE;

-- The secure function approach is sufficient and more secure
-- No additional changes needed since we already have:
-- public.get_approved_comments_for_post(uuid) function

-- Log the security definer view removal
INSERT INTO public.security_audit_log (event_type, event_data)
VALUES (
  'security_definer_view_removed',
  jsonb_build_object(
    'action', 'removed_approved_comments_public_view',
    'reason', 'security_definer_views_flagged_by_linter',
    'alternative', 'using_secure_function_get_approved_comments_for_post'
  )
);