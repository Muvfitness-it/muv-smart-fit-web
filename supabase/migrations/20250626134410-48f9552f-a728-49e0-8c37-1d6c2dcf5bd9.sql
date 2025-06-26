
-- Create categories table for blog posts
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table for blog posts
CREATE TABLE public.blog_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID REFERENCES public.blog_categories(id),
  author_name TEXT NOT NULL DEFAULT 'MUV Team',
  author_email TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  reading_time INTEGER DEFAULT 5,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post-tags junction table
CREATE TABLE public.blog_post_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- Create comments table for blog posts
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view published blog categories" 
  ON public.blog_categories FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view blog tags" 
  ON public.blog_tags FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Anyone can view post-tag relationships" 
  ON public.blog_post_tags FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view approved comments" 
  ON public.blog_comments FOR SELECT 
  USING (status = 'approved');

-- Allow anyone to insert comments (will be moderated)
CREATE POLICY "Anyone can create comments" 
  ON public.blog_comments FOR INSERT 
  WITH CHECK (true);

-- Insert some default categories
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
  ('Fitness', 'fitness', 'Articoli su allenamento e fitness', '#EF4444'),
  ('Nutrizione', 'nutrizione', 'Consigli e guide nutrizionali', '#10B981'),
  ('Benessere', 'benessere', 'Salute e benessere generale', '#3B82F6'),
  ('Ricette', 'ricette', 'Ricette salutari e gustose', '#F59E0B');

-- Insert some default tags
INSERT INTO public.blog_tags (name, slug) VALUES
  ('EMS', 'ems'),
  ('Pancafit', 'pancafit'),
  ('Pilates', 'pilates'),
  ('Dimagrimento', 'dimagrimento'),
  ('Personal Training', 'personal-training'),
  ('Mal di Schiena', 'mal-di-schiena'),
  ('Alimentazione', 'alimentazione'),
  ('Proteine', 'proteine'),
  ('Carboidrati', 'carboidrati'),
  ('Lifestyle', 'lifestyle');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON public.blog_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_updated_at();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_updated_at();

CREATE TRIGGER update_blog_comments_updated_at
  BEFORE UPDATE ON public.blog_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_updated_at();

-- Create function to automatically set published_at when status changes to published
CREATE OR REPLACE FUNCTION public.set_blog_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for published_at
CREATE TRIGGER set_blog_published_at_trigger
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_blog_published_at();
