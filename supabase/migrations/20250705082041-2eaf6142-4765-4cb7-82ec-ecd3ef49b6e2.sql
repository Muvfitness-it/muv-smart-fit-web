-- Fix storage policies for image uploads
-- Delete existing restrictive policies
DROP POLICY IF EXISTS "Avatar access" ON storage.objects;
DROP POLICY IF EXISTS "Avatar upload" ON storage.objects;
DROP POLICY IF EXISTS "Give access to own folder" ON storage.objects;

-- Create permissive policies for the immagini bucket
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'immagini');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'immagini' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update their images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'immagini' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete their images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'immagini' 
    AND auth.role() = 'authenticated'
  );

-- Make sure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('immagini', 'immagini', true)
ON CONFLICT (id) DO UPDATE SET 
  public = true;