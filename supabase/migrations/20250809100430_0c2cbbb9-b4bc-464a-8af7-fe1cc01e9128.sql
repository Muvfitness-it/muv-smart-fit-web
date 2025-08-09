-- Backup, ripristino e correzione conservativa dei contenuti del blog
-- 1) Crea tabella di backup se non esiste
CREATE TABLE IF NOT EXISTS public.blog_posts_backup (
  id uuid,
  content_backup text,
  backed_up_at timestamptz DEFAULT now()
);

-- 2) Backup snapshot dello stato attuale (pre-riparazione)
INSERT INTO public.blog_posts_backup (id, content_backup)
SELECT id, content FROM public.blog_posts WHERE content IS NOT NULL;

-- 3) Funzione di riparazione HTML conservativa (non introduce nuovi H2/H3, non altera link/img)
CREATE OR REPLACE FUNCTION public.repair_html_content(input_content text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  s text := COALESCE(input_content, '');
  lines text[];
  out_lines text[] := '{}';
  l text;
BEGIN
  -- Rimuovi caratteri accentati anomali DENTRO ai tag (es. <strongè>) lasciando il tag intatto
  s := regexp_replace(s, '(<[^>]*?)[èéàò]([^>]*?>)', '\1\2', 'gi');

  -- Correggi casi comuni di tag rotti
  s := replace(s, '</li</ul', '</li></ul');
  s := replace(s, '</p<', '</p><');
  s := replace(s, '</h3<', '</h3><');

  -- Inserisci '>' mancante dopo tag brevi quando attaccati al testo (es. <pTesto -> <p>Testo)
  s := regexp_replace(s, '<(p|h1|h2|h3|h4|h5|h6|li)([A-Za-z])', '<\1>\2', 'gi');

  -- Normalizza chiusure con caratteri extra (</strongqualcosa> -> </strong>)
  s := regexp_replace(s, '</([a-z0-9]+)[^>]*>', '</\1>', 'gi');
  -- Normalizza aperture con caratteri extra subito dopo il nome tag (mantiene attributi validi tipici)
  s := regexp_replace(s, '<(strong|em|p|h[1-6]|ul|ol|li)(?=[^a-z0-9>])', '<\1', 'gi');

  -- Converte li in paragrafi puntati per garantire leggibilità anche se la <ul> è corrotta
  s := regexp_replace(s, '<li>\s*(.*?)\s*</li>', '<p>• \1</p>', 'gi');
  -- Rimuove eventuali <ul>/<ol> orfani rimasti
  s := regexp_replace(s, '</?(ul|ol)>', '', 'gi');

  -- Wrappa linee nude in <p>..., mantenendo quelle già in tag noti
  lines := string_to_array(s, E'\n');
  FOREACH l IN ARRAY lines LOOP
    l := btrim(l);
    IF l = '' THEN
      CONTINUE;
    END IF;
    IF l ~ '<\s*(p|h[1-6]|strong|em|a|img|blockquote|code|pre|table|thead|tbody|tr|td|th|br)\b' THEN
      out_lines := array_append(out_lines, l);
    ELSE
      out_lines := array_append(out_lines, '<p>' || l || '</p>');
    END IF;
  END LOOP;

  s := array_to_string(out_lines, E'\n');
  -- Pulizia spazi tra tag
  s := regexp_replace(s, '>\s+<', '><', 'g');

  RETURN s;
END;
$$;

-- 4) Funzione per applicare la riparazione a tutti i post (con backup già fatto sopra)
CREATE OR REPLACE FUNCTION public.restore_and_fix_all_posts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE r record; fixed text; BEGIN
  FOR r IN SELECT id, content FROM public.blog_posts WHERE content IS NOT NULL LOOP
    fixed := public.repair_html_content(r.content);
    UPDATE public.blog_posts SET content = fixed, updated_at = now() WHERE id = r.id;
  END LOOP;
END; $$;

-- 5) Esegui riparazione
SELECT public.restore_and_fix_all_posts();

-- 6) Rapido controllo
SELECT id, title, status, LEFT(content, 400) AS preview
FROM public.blog_posts
WHERE status IN ('published','draft')
ORDER BY updated_at DESC
LIMIT 5;