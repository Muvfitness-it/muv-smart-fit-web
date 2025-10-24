-- Create authors table for E-E-A-T optimization
CREATE TABLE IF NOT EXISTS public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  role TEXT,
  avatar_url TEXT,
  expertise TEXT,
  linkedin_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Authors are viewable by everyone" 
ON public.authors 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to manage authors
CREATE POLICY "Authenticated users can manage authors" 
ON public.authors 
FOR ALL
USING (auth.role() = 'authenticated');

-- Add author_id column to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES public.authors(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON public.blog_posts(author_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_authors_updated_at
BEFORE UPDATE ON public.authors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default MUV Team authors
INSERT INTO public.authors (name, bio, role, expertise, avatar_url) VALUES
(
  'Francesco Muv',
  'Personal Trainer certificato ISSA con oltre 10 anni di esperienza nell''allenamento EMS e nella riabilitazione posturale. Specializzato in programmi di dimagrimento sostenibile e trasformazione corporea.',
  'Personal Trainer & Fondatore MUV Fitness',
  'EMS, Dimagrimento, Riabilitazione Posturale',
  'https://www.muvfitness.it/lovable-uploads/francesco-muv.jpg'
),
(
  'Thomas Gabrieli',
  'Dottore in Scienze Motorie e specialista in nutrizione sportiva. Esperto in piani alimentari personalizzati e integrazione con tecnologie fitness avanzate come Vacuum e Pilates Reformer.',
  'Nutrizionista Sportivo & Coach',
  'Nutrizione, Pilates, Wellness Over 60',
  'https://www.muvfitness.it/lovable-uploads/thomas-gabrieli.jpg'
),
(
  'MUV Fitness Team',
  'Il team di esperti del Centro Fitness MUV di Legnago, composto da personal trainer certificati, nutrizionisti e specialisti del benessere. Uniamo tecnologia, scienza e passione per aiutarti a raggiungere i tuoi obiettivi.',
  'Team di Esperti MUV Fitness',
  'Fitness, Nutrizione, Benessere, Tecnologie EMS/Vacuum',
  'https://www.muvfitness.it/lovable-uploads/muv-logo-transparent.png'
)
ON CONFLICT DO NOTHING;