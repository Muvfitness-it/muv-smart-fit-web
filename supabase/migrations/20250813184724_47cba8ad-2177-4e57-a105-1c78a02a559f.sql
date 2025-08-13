-- Fix bookings table security issues by replacing conflicting policies

-- First, drop the existing duplicate/conflicting policies
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can manage bookings" ON public.bookings;
DROP POLICY IF EXISTS "Owner or admin can read bookings (reinforced)" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create comprehensive and secure policies

-- 1. SELECT policies - restrict who can view bookings
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

CREATE POLICY "Service role can view all bookings"
ON public.bookings
FOR SELECT
TO service_role
USING (true);

-- 2. INSERT policy - allow booking creation
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 3. UPDATE policies - control who can modify bookings
CREATE POLICY "Users can update their own bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update all bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- 4. DELETE policy - only admins can delete
CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (is_admin());