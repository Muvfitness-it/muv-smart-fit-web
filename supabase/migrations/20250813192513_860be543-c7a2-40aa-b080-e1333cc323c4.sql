-- Remove tables related to meal planner and booking system that are no longer used

-- Drop meal planner related tables
DROP TABLE IF EXISTS public.food_diary CASCADE;
DROP TABLE IF EXISTS public.body_measurements CASCADE;
DROP TABLE IF EXISTS public.meal_plans CASCADE;
DROP TABLE IF EXISTS public.planner_usage CASCADE;

-- Drop booking related tables
DROP TABLE IF EXISTS public.booking_tokens CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;

-- Clean up any orphaned functions related to these features
DROP FUNCTION IF EXISTS public.update_bookings_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_expired_booking_tokens() CASCADE;

-- Update analytics summary to remove metrics that are no longer relevant
DELETE FROM public.analytics_summary 
WHERE metric_name IN ('total_planner_usage', 'planner_usage_today');

-- Add a comment to track cleanup
COMMENT ON TABLE public.blog_posts IS 'Main content table - cleaned up unused planner and booking tables on 2025-01-13';