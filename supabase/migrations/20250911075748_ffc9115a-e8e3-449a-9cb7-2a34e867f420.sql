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
  email_hash text GENERATED ALWAYS AS (encode(digest(COALESCE(convert_from(email_encrypted, 'UTF8'), ''), 'sha256'), 'hex')) STORED,
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
USING (is_admin() AND 
  -- Log admin access automatically
  public.log_security_event_pii_safe(
    'admin_sensitive_data_access',
    jsonb_build_object('accessed_user_id', user_id::text),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  ) IS NOT NULL
);

-- Step 2: Create secure functions for encrypting/decrypting sensitive data
CREATE OR REPLACE FUNCTION public.encrypt_sensitive_field(input_text text, encryption_key text DEFAULT 'muv_fitness_2025_key')
RETURNS bytea
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF input_text IS NULL OR trim(input_text) = '' THEN
    RETURN NULL;
  END IF;
  RETURN pgp_sym_encrypt(input_text, encryption_key);
END;
$$;

CREATE OR REPLACE FUNCTION public.decrypt_sensitive_field(encrypted_data bytea, encryption_key text DEFAULT 'muv_fitness_2025_key')
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF encrypted_data IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN pgp_sym_decrypt(encrypted_data, encryption_key);
EXCEPTION
  WHEN OTHERS THEN
    RETURN '[DECRYPTION_ERROR]';
END;
$$;

-- Step 3: Create audit trigger for sensitive data access
CREATE OR REPLACE FUNCTION public.audit_sensitive_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update access tracking
  UPDATE public.profiles_sensitive 
  SET last_accessed = now(),
      access_count = access_count + 1
  WHERE user_id = NEW.user_id;
  
  -- Log the access
  PERFORM public.log_security_event_pii_safe(
    'sensitive_profile_data_accessed',
    jsonb_build_object(
      'accessed_user_id', NEW.user_id::text,
      'accessing_user_id', auth.uid()::text,
      'access_type', TG_OP
    ),
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER audit_sensitive_data_access_trigger
  AFTER SELECT ON public.profiles_sensitive
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_sensitive_data_access();

-- Step 4: Create a secure view for accessing profile data
CREATE OR REPLACE VIEW public.profiles_secure AS
SELECT 
  p.id,
  p.user_id,
  p.first_name,
  p.last_name,
  p.avatar_url,
  p.height,
  p.weight,
  p.gender,
  p.activity_level,
  p.fitness_goal,
  p.created_at,
  p.updated_at,
  -- Only decrypt sensitive data for authorized users
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      public.decrypt_sensitive_field(ps.email_encrypted)
    ELSE 
      '[RESTRICTED]'
  END as email,
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      public.decrypt_sensitive_field(ps.phone_encrypted)
    ELSE 
      '[RESTRICTED]'
  END as phone,
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      public.decrypt_sensitive_field(ps.date_of_birth_encrypted)::date
    ELSE 
      NULL
  END as date_of_birth
FROM public.profiles p
LEFT JOIN public.profiles_sensitive ps ON p.user_id = ps.user_id;

-- Step 5: Remove sensitive fields from the main profiles table
-- First backup existing data by migrating to the new secure table
INSERT INTO public.profiles_sensitive (user_id, email_encrypted, phone_encrypted, date_of_birth_encrypted, phone_hash)
SELECT 
  user_id,
  public.encrypt_sensitive_field(email),
  public.encrypt_sensitive_field(phone),
  public.encrypt_sensitive_field(date_of_birth::text),
  encode(digest(COALESCE(phone, ''), 'sha256'), 'hex')
FROM public.profiles 
WHERE user_id IS NOT NULL
ON CONFLICT (user_id) DO UPDATE SET
  email_encrypted = EXCLUDED.email_encrypted,
  phone_encrypted = EXCLUDED.phone_encrypted,
  date_of_birth_encrypted = EXCLUDED.date_of_birth_encrypted,
  phone_hash = EXCLUDED.phone_hash,
  updated_at = now();

-- Now safely remove sensitive columns from main profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS phone;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS date_of_birth;