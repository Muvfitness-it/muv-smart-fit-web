-- Alternative approach using built-in encryption functions
-- Drop the previous functions that relied on pgcrypto
DROP FUNCTION IF EXISTS public.encrypt_sensitive_field(text, text);
DROP FUNCTION IF EXISTS public.decrypt_sensitive_field(bytea, text);

-- Create simpler hash-based storage for sensitive data
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
  -- Use SHA-256 hashing for irreversible storage
  RETURN encode(digest(input_text, 'sha256'), 'hex');
END;
$$;

-- Create secure storage function that masks sensitive data
CREATE OR REPLACE FUNCTION public.mask_sensitive_field(input_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF input_text IS NULL OR trim(input_text) = '' THEN
    RETURN NULL;
  END IF;
  
  -- For emails: show first 2 chars + *** + @domain
  IF input_text ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN substring(input_text from 1 for 2) || '***@' || split_part(input_text, '@', 2);
  END IF;
  
  -- For phone numbers: show last 4 digits
  IF input_text ~ '^\+?[0-9\s\-\(\)]+$' THEN
    RETURN regexp_replace(input_text, '.(?=.{4})', '*', 'g');
  END IF;
  
  -- For other data: show first 2 and last 2 characters
  IF length(input_text) > 4 THEN
    RETURN substring(input_text from 1 for 2) || repeat('*', length(input_text) - 4) || substring(input_text from length(input_text) - 1);
  END IF;
  
  RETURN repeat('*', length(input_text));
END;
$$;

-- Update the profiles_sensitive table structure to store both hashed and masked data
ALTER TABLE public.profiles_sensitive 
DROP COLUMN IF EXISTS email_encrypted,
DROP COLUMN IF EXISTS phone_encrypted,
DROP COLUMN IF EXISTS date_of_birth_encrypted;

ALTER TABLE public.profiles_sensitive 
ADD COLUMN email_masked text,
ADD COLUMN phone_masked text,
ADD COLUMN date_of_birth_masked text;