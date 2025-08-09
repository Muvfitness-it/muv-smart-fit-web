-- Funzione avanzata per correggere e formattare gli articoli
CREATE OR REPLACE FUNCTION fix_and_format_articles()
RETURNS VOID AS $$
DECLARE
    post_record RECORD;
    cleaned_content TEXT;
    lines TEXT[];
    formatted_lines TEXT[] := '{}';
    current_line TEXT;
    i INTEGER;
    in_list BOOLEAN := FALSE;
BEGIN
    -- Processa ogni articolo individualmente
    FOR post_record IN 
        SELECT id, content, title 
        FROM blog_posts 
        WHERE status IN ('published', 'draft') 
        AND content IS NOT NULL 
    LOOP
        cleaned_content := post_record.content;
        
        -- STEP 1: Correggi tag HTML corrotti
        -- Correggi <strong> tags malformati come <strong>EMS</strongè un>
        cleaned_content := regexp_replace(cleaned_content, '<strong>([^<]*)</strong[^>]*>', '<strong>\1</strong>', 'g');
        
        -- Correggi altri tag malformati
        cleaned_content := regexp_replace(cleaned_content, '<([^>]*)[èéàò]([^>]*)>', '<\1\2>', 'g');
        
        -- Rimuovi caratteri strani nei tag
        cleaned_content := regexp_replace(cleaned_content, '<strong([^>]*)è([^>]*)>', '<strong>', 'g');
        
        -- STEP 2: Normalizza il contenuto se ha troppi tag corrotti
        IF cleaned_content ~ '<strong[^>]*è|</strong[^>]*è' THEN
            -- Rimuovi tutti i tag strong corrotti e ricrea
            cleaned_content := regexp_replace(cleaned_content, '</?strong[^>]*>', '', 'g');
        END IF;
        
        -- STEP 3: Dividi in righe e processa
        lines := string_to_array(cleaned_content, E'\n');
        formatted_lines := '{}';
        in_list := FALSE;
        
        FOR i IN 1..array_length(lines, 1) LOOP
            current_line := trim(lines[i]);
            
            -- Salta righe vuote
            IF current_line = '' OR current_line = ' ' THEN
                -- Chiudi liste se aperte
                IF in_list THEN
                    formatted_lines := array_append(formatted_lines, '</ul>');
                    in_list := FALSE;
                END IF;
                CONTINUE;
            END IF;
            
            -- Rimuovi tag HTML esistenti dalla riga per riprocessarla
            current_line := regexp_replace(current_line, '<[^>]*>', '', 'g');
            current_line := trim(current_line);
            
            -- TITLES: Righe che finiscono con ":" o contengono ":" e sono lunghe
            IF current_line ~ ':$' AND length(current_line) > 15 AND current_line !~ '^[-*•]' THEN
                -- Chiudi liste se aperte
                IF in_list THEN
                    formatted_lines := array_append(formatted_lines, '</ul>');
                    in_list := FALSE;
                END IF;
                current_line := '<h2>' || replace(current_line, ':', '') || '</h2>';
                
            -- SUBTITLES: Righe con ":" al centro
            ELSIF current_line ~ '[^:]+:[^:]+' AND length(current_line) > 10 AND current_line !~ '^[-*•]' THEN
                -- Chiudi liste se aperte
                IF in_list THEN
                    formatted_lines := array_append(formatted_lines, '</ul>');
                    in_list := FALSE;
                END IF;
                current_line := '<h3>' || current_line || '</h3>';
                
            -- LIST ITEMS: Righe che iniziano con -, *, • o numeri
            ELSIF current_line ~ '^[-*•]\s+' OR current_line ~ '^\d+\.\s+' THEN
                -- Apri lista se non già aperta
                IF NOT in_list THEN
                    formatted_lines := array_append(formatted_lines, '<ul>');
                    in_list := TRUE;
                END IF;
                -- Rimuovi il marker e crea list item
                current_line := regexp_replace(current_line, '^[-*•]\s*', '');
                current_line := regexp_replace(current_line, '^\d+\.\s*', '');
                current_line := '<li>' || current_line || '</li>';
                
            -- PARAGRAPHS: Tutto il resto
            ELSE
                -- Chiudi liste se aperte
                IF in_list THEN
                    formatted_lines := array_append(formatted_lines, '</ul>');
                    in_list := FALSE;
                END IF;
                
                -- Applica grassetto a parole chiave importanti
                current_line := regexp_replace(current_line, '\b(MUV Fitness|EMS|HIIT|Pilates|Personal Trainer|Small Group|Reformer|Matwork|Core Stability)\b', '<strong>\1</strong>', 'gi');
                current_line := regexp_replace(current_line, '\b(allenamento|fitness|benessere|postura|forza|resistenza|flessibilità|tonificazione|dimagrimento|ricomposizione corporea)\b', '<strong>\1</strong>', 'gi');
                
                -- Crea paragrafo
                current_line := '<p>' || current_line || '</p>';
            END IF;
            
            formatted_lines := array_append(formatted_lines, current_line);
        END LOOP;
        
        -- Chiudi eventuale lista rimasta aperta
        IF in_list THEN
            formatted_lines := array_append(formatted_lines, '</ul>');
        END IF;
        
        -- STEP 4: Ricomponi il contenuto
        cleaned_content := array_to_string(formatted_lines, E'\n');
        
        -- STEP 5: Pulizia finale
        -- Rimuovi spazi extra tra tag
        cleaned_content := regexp_replace(cleaned_content, '>\s+<', '><', 'g');
        -- Aggiungi spazi dopo i tag di chiusura per leggibilità
        cleaned_content := regexp_replace(cleaned_content, '</h2>', '</h2>' || E'\n', 'g');
        cleaned_content := regexp_replace(cleaned_content, '</h3>', '</h3>' || E'\n', 'g');
        cleaned_content := regexp_replace(cleaned_content, '</ul>', '</ul>' || E'\n', 'g');
        cleaned_content := regexp_replace(cleaned_content, '</p>', '</p>' || E'\n', 'g');
        
        -- Aggiorna l'articolo
        UPDATE blog_posts 
        SET content = cleaned_content,
            updated_at = now()
        WHERE id = post_record.id;
        
        RAISE NOTICE 'Formattato articolo: %', post_record.title;
    END LOOP;
    
    RAISE NOTICE 'Formattazione completata per tutti gli articoli';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

-- Esegui la funzione per correggere tutti gli articoli
SELECT fix_and_format_articles();

-- Verifica i risultati
SELECT 
    id,
    title,
    status,
    LEFT(content, 500) as content_preview
FROM blog_posts 
WHERE status IN ('published', 'draft')
ORDER BY updated_at DESC
LIMIT 3;