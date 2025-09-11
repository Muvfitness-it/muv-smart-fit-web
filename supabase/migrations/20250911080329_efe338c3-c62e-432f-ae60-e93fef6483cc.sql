-- Update the profiles_sensitive table structure
ALTER TABLE public.profiles_sensitive 
DROP COLUMN IF EXISTS email_encrypted,
DROP COLUMN IF EXISTS phone_encrypted,
DROP COLUMN IF EXISTS date_of_birth_encrypted;

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

-- Create a secure view that only shows appropriate data
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
  -- Only show masked data for unauthorized users, full data for authorized users
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      COALESCE(
        (SELECT email FROM public.profiles WHERE user_id = p.user_id), 
        ps.email_masked
      )
    ELSE 
      ps.email_masked
  END as email,
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      COALESCE(
        (SELECT phone FROM public.profiles WHERE user_id = p.user_id), 
        ps.phone_masked
      )
    ELSE 
      ps.phone_masked
  END as phone,
  CASE 
    WHEN auth.uid() = p.user_id OR is_admin() THEN 
      COALESCE(
        (SELECT date_of_birth FROM public.profiles WHERE user_id = p.user_id), 
        ps.date_of_birth_masked::date
      )
    ELSE 
      NULL
  END as date_of_birth
FROM public.profiles p
LEFT JOIN public.profiles_sensitive ps ON p.user_id = ps.user_id;

-- Now safely remove sensitive columns from main profiles table (if they still exist)
DO $$ 
BEGIN
  -- Check if columns exist before dropping them
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'email') THEN
    ALTER TABLE public.profiles DROP COLUMN email;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone') THEN
    ALTER TABLE public.profiles DROP COLUMN phone;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'date_of_birth') THEN
    ALTER TABLE public.profiles DROP COLUMN date_of_birth;
  END IF;
END $$;