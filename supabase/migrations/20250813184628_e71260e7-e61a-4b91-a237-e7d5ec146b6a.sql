-- Fix bookings table security issues

-- First, let's ensure the user_id column is properly handled for security
-- Add a constraint to prevent completely anonymous bookings from being publicly readable

-- Drop existing potentially vulnerable policies
DROP POLICY IF EXISTS "Owner or admin can read bookings (reinforced)" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

-- Create more secure and explicit policies
CREATE POLICY "Authenticated users can view their own bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (is_admin());

-- Allow service role to read bookings for admin functions
CREATE POLICY "Service role can view all bookings"
ON public.bookings
FOR SELECT
TO service_role
USING (true);

-- Update the booking creation policy to be more explicit
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Ensure admins can still manage all bookings
-- (The existing "Admins can manage bookings" policy should handle this, but let's be explicit)
CREATE POLICY "Admins can update all bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins can delete all bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (is_admin());

-- Users can only update their own bookings
CREATE POLICY "Users can update their own bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);