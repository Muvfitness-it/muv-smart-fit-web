-- Fix the hash function to use proper PostgreSQL functions
CREATE OR REPLACE FUNCTION public.hash_sensitive_field(input_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF input_text IS NULL OR trim(input_text) = '' THEN
    RETURN NULL;
  END IF;
  -- Use MD5 hashing which is available in PostgreSQL by default
  RETURN md5(input_text);
END;
$$;

-- Update the profiles_sensitive table structure
ALTER TABLE public.profiles_sensitive 
ADD COLUMN IF NOT EXISTS email_masked text,
ADD COLUMN IF NOT EXISTS phone_masked text,
ADD COLUMN IF NOT EXISTS date_of_birth_masked text;

-- Migrate existing sensitive data to the secure table with masking
INSERT INTO public.profiles_sensitive (user_id, email_masked, phone_masked, date_of_birth_masked, email_hash, phone_hash)
SELECT 
  user_id,
  public.mask_sensitive_field(email),
  public.mask_sensitive_field(phone),
  public.mask_sensitive_field(date_of_birth::text),
  public.hash_sensitive_field(email),
  public.hash_sensitive_field(phone)
FROM public.profiles 
WHERE user_id IS NOT NULL
ON CONFLICT (user_id) DO UPDATE SET
  email_masked = EXCLUDED.email_masked,
  phone_masked = EXCLUDED.phone_masked,
  date_of_birth_masked = EXCLUDED.date_of_birth_masked,
  email_hash = EXCLUDED.email_hash,
  phone_hash = EXCLUDED.phone_hash,
  updated_at = now();

-- Create a secure view that shows masked data for unauthorized access
CREATE VIEW public.profiles_secure AS
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
  -- Show masked data for unauthorized users
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      ps.email_masked
    ELSE 
      '[RESTRICTED]'
  END as email,
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      ps.phone_masked
    ELSE 
      '[RESTRICTED]'
  END as phone,
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      ps.date_of_birth_masked
    ELSE 
      NULL
  END as date_of_birth
FROM public.profiles p
LEFT JOIN public.profiles_sensitive ps ON p.user_id = ps.user_id;