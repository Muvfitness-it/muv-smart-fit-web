-- Aggiungi colonna per pubblicazione programmata
ALTER TABLE public.blog_posts 
ADD COLUMN scheduled_publish_at TIMESTAMP WITH TIME ZONE;

-- Crea indice per performance delle query di scheduling
CREATE INDEX idx_blog_posts_scheduled_publish_at 
ON public.blog_posts (scheduled_publish_at) 
WHERE status = 'scheduled' AND scheduled_publish_at IS NOT NULL;

-- Aggiorna enum status per includere 'scheduled'
ALTER TABLE public.blog_posts 
DROP CONSTRAINT IF EXISTS blog_posts_status_check;

ALTER TABLE public.blog_posts 
ADD CONSTRAINT blog_posts_status_check 
CHECK (status IN ('draft', 'published', 'scheduled'));

-- Trigger per gestire pubblicazione automatica quando si imposta scheduled_publish_at
CREATE OR REPLACE FUNCTION public.handle_scheduled_publish()
RETURNS TRIGGER AS $$
BEGIN
  -- Se viene impostata una data di pubblicazione futura, cambia status a 'scheduled'
  IF NEW.scheduled_publish_at IS NOT NULL AND NEW.scheduled_publish_at > NOW() THEN
    NEW.status = 'scheduled';
    NEW.published_at = NULL;
  -- Se la data di pubblicazione è nel passato o presente, pubblica immediatamente
  ELSIF NEW.scheduled_publish_at IS NOT NULL AND NEW.scheduled_publish_at <= NOW() THEN
    NEW.status = 'published';
    NEW.published_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';