-- Remove sensitive columns from main profiles table safely
DO $$ 
BEGIN
  -- Check if columns exist before dropping them
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'email') THEN
    ALTER TABLE public.profiles DROP COLUMN email;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'phone') THEN
    ALTER TABLE public.profiles DROP COLUMN phone;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'date_of_birth') THEN
    ALTER TABLE public.profiles DROP COLUMN date_of_birth;
  END IF;
END $$;

-- Create an audit trigger for the sensitive data table
CREATE TRIGGER audit_sensitive_data_access_trigger
  AFTER SELECT ON public.profiles_sensitive
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_sensitive_data_access();