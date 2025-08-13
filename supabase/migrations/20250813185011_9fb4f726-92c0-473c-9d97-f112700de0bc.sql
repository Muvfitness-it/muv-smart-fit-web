-- Fix booking_tokens table security vulnerability
-- Remove the overly permissive public read policy and create secure access controls

-- Drop the dangerous public read policy
DROP POLICY IF EXISTS "Booking tokens are readable for validation" ON public.booking_tokens;

-- Create secure read policies
-- Only service role can read tokens for validation purposes
CREATE POLICY "Service role can read booking tokens"
ON public.booking_tokens
FOR SELECT
TO service_role
USING (true);

-- Allow authenticated users to read only unexpired tokens for validation
-- This is needed for legitimate token validation without exposing all tokens
CREATE POLICY "Authenticated users can validate active tokens"
ON public.booking_tokens
FOR SELECT
TO authenticated
USING (expires_at > now() AND used_at IS NULL);

-- Keep existing policies for insert/update as they are appropriately secured
-- The existing policies already restrict:
-- - INSERT: only service role or with proper check
-- - UPDATE: only service role