-- Ensure RLS is enabled (safe if already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow administrators to read all profiles while keeping owner-only access for others
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'profiles' 
      AND policyname = 'Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    USING (is_admin());
  END IF;
END $$;