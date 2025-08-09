-- Funzione per pulire il contenuto HTML dei post dal markdown
CREATE OR REPLACE FUNCTION clean_blog_content(input_content TEXT)
RETURNS TEXT AS $$
DECLARE
    cleaned_content TEXT;
BEGIN
    -- Inizializza con il contenuto originale
    cleaned_content := input_content;
    
    -- Solo se il contenuto sembra avere simboli markdown
    IF cleaned_content ~ '[#*_\[\]>]' THEN
        -- Rimuovi hashtag per titoli ## ### ecc
        cleaned_content := regexp_replace(cleaned_content, '#{1,6}\s*', '', 'g');
        
        -- Converti **testo** in <strong>testo</strong>
        cleaned_content := regexp_replace(cleaned_content, '\*\*([^*\n]+)\*\*', '<strong>\1</strong>', 'g');
        
        -- Converti __testo__ in <strong>testo</strong>
        cleaned_content := regexp_replace(cleaned_content, '__([^_\n]+)__', '<strong>\1</strong>', 'g');
        
        -- Rimuovi asterischi isolati
        cleaned_content := regexp_replace(cleaned_content, '\*(?!\*)', '', 'g');
        
        -- Rimuovi trattini all'inizio delle righe (bullet points)
        cleaned_content := regexp_replace(cleaned_content, '^[\s]*[-*]\s+', '', 'gm');
        
        -- Rimuovi simboli > per citazioni
        cleaned_content := regexp_replace(cleaned_content, '>\s*', '', 'g');
        
        -- Rimuovi link markdown [text](url) mantieni solo il testo
        cleaned_content := regexp_replace(cleaned_content, '\[([^\]]+)\]\([^)]+\)', '\1', 'g');
        
        -- Normalizza spazi multipli
        cleaned_content := regexp_replace(cleaned_content, '\s+', ' ', 'g');
        
        -- Rimuovi paragrafi vuoti
        cleaned_content := regexp_replace(cleaned_content, '<p>\s*</p>', '', 'g');
    END IF;
    
    RETURN cleaned_content;
END;
$$ LANGUAGE plpgsql;

-- Aggiorna tutti i post (pubblicati e bozze) con contenuto pulito
UPDATE blog_posts 
SET content = clean_blog_content(content),
    updated_at = now()
WHERE content ~ '[#*_\[\]>]' AND content IS NOT NULL;

-- Mostra i risultati
SELECT 
    id, 
    title, 
    status,
    CASE 
        WHEN content ~ '[#*_\[\]>]' THEN 'AVEVA SIMBOLI'
        ELSE 'PULITO'
    END as stato_prima,
    'PULITO' as stato_dopo
FROM blog_posts 
WHERE status IN ('published', 'draft')
ORDER BY status, title;