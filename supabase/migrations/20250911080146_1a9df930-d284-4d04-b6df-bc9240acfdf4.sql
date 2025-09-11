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

-- Step 3: Create audit function for sensitive data access
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