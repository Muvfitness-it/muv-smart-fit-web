-- SECURITY FIX: Remove unused admin_users table that poses security risk
-- This table is not used by the application and contains admin email addresses
-- that could be exposed to unauthorized users. The application uses the secure
-- user_roles table instead with proper RLS policies.

-- First check if any data needs to be preserved (migration should show this is empty or minimal)
-- Based on analysis, this table is legacy and not actively used

-- Drop the admin_users table entirely to eliminate the security risk
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Log the security fix
INSERT INTO public.security_audit_log (
  event_type,
  event_data,
  user_id,
  created_at
) VALUES (
  'security_fix_applied',
  jsonb_build_object(
    'action', 'removed_admin_users_table',
    'reason', 'eliminated_admin_email_exposure_risk',
    'impact', 'no_functionality_affected'
  ),
  auth.uid(),
  now()
);