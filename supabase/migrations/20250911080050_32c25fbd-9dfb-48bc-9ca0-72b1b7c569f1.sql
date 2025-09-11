-- Step 1: Create a secure sensitive data table with proper encryption and auditing
-- Enable necessary extensions for encryption and auditing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a separate table for highly sensitive personal data
CREATE TABLE public.profiles_sensitive (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  
  -- Encrypted sensitive fields using pgcrypto
  email_encrypted bytea,
  phone_encrypted bytea,
  date_of_birth_encrypted bytea,
  
  -- Hash fields for search/verification without exposing data
  email_hash text,
  phone_hash text,
  
  -- Metadata
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_accessed timestamp with time zone,
  access_count integer DEFAULT 0
);

-- Enable RLS on sensitive table
ALTER TABLE public.profiles_sensitive ENABLE ROW LEVEL SECURITY;

-- Create restrictive RLS policies for sensitive data
CREATE POLICY "Users can view their own sensitive data" 
ON public.profiles_sensitive 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own sensitive data" 
ON public.profiles_sensitive 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sensitive data" 
ON public.profiles_sensitive 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view sensitive data for admin purposes" 
ON public.profiles_sensitive 
FOR SELECT 
USING (is_admin());