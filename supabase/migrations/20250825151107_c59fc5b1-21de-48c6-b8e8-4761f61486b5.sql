-- Create table to track 301 redirects for SEO cleanup
CREATE TABLE IF NOT EXISTS public.url_redirects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  status_code INTEGER DEFAULT 301,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.url_redirects ENABLE ROW LEVEL SECURITY;

-- Create policy for admins only
CREATE POLICY "Only admins can manage redirects" ON public.url_redirects
  FOR ALL USING (public.current_user_has_role('admin'::app_role));

-- Insert some common redirects to avoid duplicate content
INSERT INTO public.url_redirects (from_path, to_path, status_code) VALUES
  ('/personal-trainer-legnago', '/servizi/personal-trainer-legnago', 301),
  ('/ems-legnago', '/servizi/ems-legnago', 301),
  ('/pilates-legnago', '/servizi/pilates-legnago', 301),
  ('/blog/', '/blog', 301)
ON CONFLICT (from_path) DO NOTHING;

-- Create index for fast lookups (fixed query)
CREATE INDEX IF NOT EXISTS idx_url_redirects_from_path ON public.url_redirects(from_path);