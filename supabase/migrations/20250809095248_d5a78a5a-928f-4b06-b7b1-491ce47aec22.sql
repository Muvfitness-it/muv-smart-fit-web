-- Funzione per formattare correttamente gli articoli con HTML strutturato
CREATE OR REPLACE FUNCTION format_article_content(input_content TEXT)
RETURNS TEXT AS $$
DECLARE
    formatted_content TEXT;
    lines TEXT[];
    i INTEGER;
    current_line TEXT;
    result_lines TEXT[] := '{}';
BEGIN
    -- Inizializza con il contenuto pulito
    formatted_content := input_content;
    
    -- Se il contenuto è già ben formattato con molti tag HTML, non modificarlo
    IF (SELECT array_length(string_to_array(formatted_content, '<'), 1)) > 10 THEN
        RETURN formatted_content;
    END IF;
    
    -- Dividi in righe per processare
    lines := string_to_array(formatted_content, E'\n');
    
    FOR i IN 1..array_length(lines, 1) LOOP
        current_line := trim(lines[i]);
        
        -- Salta righe vuote
        IF current_line = '' THEN
            CONTINUE;
        END IF;
        
        -- Titoli principali (righe che finiscono con ":" e sono più lunghe di 20 caratteri)
        IF current_line ~ ':$' AND length(current_line) > 20 AND current_line !~ '^[*-]' THEN
            current_line := '<h2>' || replace(current_line, ':', '') || '</h2>';
            
        -- Sottotitoli (righe che contengono ":" al centro)
        ELSIF current_line ~ ':' AND current_line !~ '^[*-]' AND length(current_line) > 15 THEN
            current_line := '<h3>' || current_line || '</h3>';
            
        -- Punti elenco (righe che iniziano con * o -)
        ELSIF current_line ~ '^[*-]' THEN
            current_line := '<li>' || regexp_replace(current_line, '^[*-]\s*', '') || '</li>';
            
        -- Paragrafi normali
        ELSE
            -- Rendi grassetto i termini tecnici importanti
            current_line := regexp_replace(current_line, '\b(MUV Fitness|EMS|HIIT|Pilates|Personal Trainer|Small Group|Reformer|Matwork|Core Stability)\b', '<strong>\1</strong>', 'gi');
            
            -- Rendi grassetto parole chiave del fitness
            current_line := regexp_replace(current_line, '\b(allenamento|fitness|benessere|postura|forza|resistenza|flessibilità|tonificazione|dimagrimento|ricomposizione corporea)\b', '<strong>\1</strong>', 'gi');
            
            -- Aggiungi tag paragrafo
            current_line := '<p>' || current_line || '</p>';
        END IF;
        
        result_lines := array_append(result_lines, current_line);
    END LOOP;
    
    -- Ricomponi il contenuto
    formatted_content := array_to_string(result_lines, E'\n');
    
    -- Raggruppa i list items in liste
    formatted_content := regexp_replace(formatted_content, '(<li>.*?</li>)', '<ul>\1</ul>', 'g');
    formatted_content := regexp_replace(formatted_content, '</ul>\s*<ul>', E'\n', 'g');
    
    -- Pulisci spazi extra
    formatted_content := regexp_replace(formatted_content, '\s+', ' ', 'g');
    formatted_content := regexp_replace(formatted_content, '>\s+<', '><', 'g');
    
    RETURN formatted_content;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

-- Applica la formattazione a tutti gli articoli
UPDATE blog_posts 
SET content = format_article_content(content),
    updated_at = now()
WHERE status IN ('published', 'draft') 
  AND content IS NOT NULL;

-- Verifica i risultati
SELECT 
    id,
    title,
    status,
    LEFT(content, 300) as formatted_preview
FROM blog_posts 
WHERE status IN ('published', 'draft')
ORDER BY updated_at DESC
LIMIT 5;