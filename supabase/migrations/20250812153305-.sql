-- Storage policies for 'immagini' bucket
DO $$
BEGIN
  -- Public read for images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read immagini'
  ) THEN
    CREATE POLICY "Public can read immagini"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'immagini');
  END IF;

  -- Admins can insert images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can insert immagini'
  ) THEN
    CREATE POLICY "Admins can insert immagini"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'immagini' AND public.is_admin());
  END IF;

  -- Admins can update images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update immagini'
  ) THEN
    CREATE POLICY "Admins can update immagini"
    ON storage.objects
    FOR UPDATE
    USING (bucket_id = 'immagini' AND public.is_admin())
    WITH CHECK (bucket_id = 'immagini' AND public.is_admin());
  END IF;

  -- Admins can delete images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete immagini'
  ) THEN
    CREATE POLICY "Admins can delete immagini"
    ON storage.objects
    FOR DELETE
    USING (bucket_id = 'immagini' AND public.is_admin());
  END IF;
END $$;