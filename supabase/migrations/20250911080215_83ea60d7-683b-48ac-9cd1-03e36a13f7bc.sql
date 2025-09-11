-- Step 5: Migrate existing sensitive data to the secure table
INSERT INTO public.profiles_sensitive (user_id, email_encrypted, phone_encrypted, date_of_birth_encrypted, email_hash, phone_hash)
SELECT 
  user_id,
  public.encrypt_sensitive_field(email),
  public.encrypt_sensitive_field(phone),
  public.encrypt_sensitive_field(date_of_birth::text),
  encode(digest(COALESCE(email, ''), 'sha256'), 'hex'),
  encode(digest(COALESCE(phone, ''), 'sha256'), 'hex')
FROM public.profiles 
WHERE user_id IS NOT NULL
ON CONFLICT (user_id) DO UPDATE SET
  email_encrypted = EXCLUDED.email_encrypted,
  phone_encrypted = EXCLUDED.phone_encrypted,
  date_of_birth_encrypted = EXCLUDED.date_of_birth_encrypted,
  email_hash = EXCLUDED.email_hash,
  phone_hash = EXCLUDED.phone_hash,
  updated_at = now();

-- Now safely remove sensitive columns from main profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS phone;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS date_of_birth;