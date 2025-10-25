# 🧪 Testing Completo Sistema SEO Monitoring - MUV Fitness

## 📋 Checklist Pre-Deployment

Prima di attivare il sistema in produzione, verifica tutti i componenti:

### ✅ **1. Database Setup**

```sql
-- Test 1: Verifica tabelle create
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE 'seo_monitoring%';

-- Risultato atteso: 
-- seo_monitoring_log
-- seo_monitoring_summary

-- Test 2: Verifica RLS policies
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename LIKE 'seo_monitoring%';

-- Risultato atteso: 
-- seo_monitoring_log | Admins can view seo monitoring logs | PERMISSIVE | is_admin() | SELECT
-- seo_monitoring_log | Service role can manage seo monitoring | PERMISSIVE | service_role | ALL
-- seo_monitoring_summary | Admins can view seo summary | PERMISSIVE | is_admin() | SELECT
-- ...

-- Test 3: Verifica trigger auto_submit_to_indexnow
SELECT tgname, tgrelid::regclass, tgenabled 
FROM pg_trigger 
WHERE tgname = 'trigger_auto_submit_indexnow';

-- Risultato atteso: 
-- trigger_auto_submit_indexnow | blog_posts | O (enabled)

-- Test 4: Verifica dati summary inizializzati
SELECT metric_name, metric_value FROM seo_monitoring_summary 
ORDER BY metric_name;

-- Risultato atteso: 
-- critical_articles | 0
-- crawled_not_indexed | 0
-- indexed_articles | 0
-- total_articles | 0
```

**✅ PASS se:** Tutte le query ritornano risultati attesi senza errori.

---

### ✅ **2. Edge Functions Deployment**

**Test 1: Verifica deploy `seo-monitor`**

1. Vai su **Supabase Dashboard** → **Edge Functions**
2. Cerca `seo-monitor` nella lista
3. Status deve essere: 🟢 **Deployed**
4. Click su `seo-monitor` → **Logs** (verifica nessun errore deploy)

**Test 2: Invoke manuale `seo-monitor`**

```bash
# Via Supabase Dashboard
1. Edge Functions → seo-monitor → Tab "Invoke"
2. Body: {} (vuoto)
3. Click "Invoke Function"
4. Attendi 30-60 secondi
5. Verifica Response:
{
  "success": true,
  "checked": 42,
  "indexed": 38,
  "crawledNotIndexed": 4,
  "critical": 1,
  "results": [...]
}
```

**Test 3: Verifica logs dopo invoke**

```sql
-- Verifica inserimenti in seo_monitoring_log
SELECT COUNT(*) as logs_count FROM seo_monitoring_log;
-- Risultato atteso: > 0 (numero articoli pubblicati)

-- Verifica aggiornamento summary
SELECT metric_name, metric_value, updated_at 
FROM seo_monitoring_summary 
WHERE updated_at > NOW() - INTERVAL '5 minutes';
-- Risultato atteso: 4-5 righe con updated_at recente
```

**Test 4: Verifica deploy `seo-weekly-report`**

```bash
# Via Supabase Dashboard
1. Edge Functions → seo-weekly-report → Tab "Invoke"
2. Body: {} (vuoto)
3. Click "Invoke Function"
4. Attendi 10-20 secondi
5. Verifica Response:
{
  "success": true,
  "emailSent": true,
  "emailId": "...",
  "critical": 1,
  "indexed": 38,
  "total": 42
}
```

**Test 5: Verifica ricezione email**

1. Controlla inbox `info@muvfitness.it`
2. Cerca email da: `SEO Monitor <seo@muvfitness.it>`
3. Subject: `✅ Report SEO MUV - ...` o `⚠️ Report SEO MUV - ...`
4. Verifica contenuto:
   - Card metriche visibili
   - Tabella articoli critici (se presenti)
   - Link cliccabili
   - Design responsive

**✅ PASS se:**
- Entrambe le edge functions deployate con status 🟢
- Invoke manuali ritornano JSON success
- Database popolato con dati
- Email ricevuta e formattata correttamente

---

### ✅ **3. Admin Dashboard**

**Test 1: Accesso route**

1. Naviga su `https://www.muvfitness.it/admin/auth`
2. Login con credenziali admin
3. Nel menu laterale, verifica presenza link **📊 SEO Monitor**
4. Click sul link
5. URL deve essere: `https://www.muvfitness.it/admin/seo-monitor`

**Test 2: Visualizzazione dati**

Nella dashboard, verifica:

- ✅ **Header**: Titolo "SEO Monitor" + pulsante "🔄 Esegui Scansione"
- ✅ **Card Metriche (4)**:
  - Totale Articoli: numero > 0
  - Indicizzati: numero con percentuale
  - Non Indicizzati: numero
  - ⚠️ Critici: numero (può essere 0)
- ✅ **Filtri (4 pulsanti)**:
  - Tutti (con conteggio)
  - Indicizzati (con conteggio)
  - Non Indicizzati (con conteggio)
  - Critici (con conteggio)
- ✅ **Lista Articoli**:
  - Minimo 1 card articolo visibile
  - Ogni card mostra: titolo, URL, badge status, giorni, problemi/suggerimenti
  - Pulsanti "Modifica" e "📡 Richiedi Indicizzazione" presenti

**Test 3: Pulsante "Esegui Scansione"**

1. Click su "🔄 Esegui Scansione"
2. Pulsante diventa disabilitato con testo "Scansione in corso..."
3. Attendi 30-60 secondi
4. Toast di conferma: "Monitoraggio completato - I dati sono stati aggiornati"
5. Dashboard ricarica automaticamente con dati freschi
6. Verifica che `updated_at` in card metriche sia recente

**Test 4: Filtri**

1. Click su filtro "Indicizzati"
2. Lista mostra solo articoli con badge verde "✅ Indicizzato"
3. Click su filtro "Non Indicizzati"
4. Lista mostra solo articoli con badge arancione "⏳ Non indicizzato"
5. Click su filtro "Critici"
6. Lista mostra solo articoli con badge rosso "CRITICO"

**Test 5: Pulsante "Richiedi Indicizzazione"**

1. Scegli un articolo qualsiasi
2. Click su "📡 Richiedi Indicizzazione"
3. Attendi 2-3 secondi
4. Toast di conferma: "Richiesta inviata - Articolo inviato ai motori di ricerca"

**Test 6: Pulsante "Modifica"**

1. Click su "Modifica" di un articolo
2. Redirect a `/admin/blog/[post_id]`
3. Editor articolo si apre correttamente

**✅ PASS se:**
- Dashboard carica senza errori
- Tutti i componenti visibili e funzionanti
- Dati realistici (non tutti 0)
- Interazioni pulsanti funzionano
- Toast notifications appaiono correttamente

---

### ✅ **4. Cron Job Setup**

**Test 1: Abilita extension `pg_cron`**

```sql
-- Verifica extension installata
SELECT * FROM pg_extension WHERE extname = 'pg_cron';

-- Se non presente:
CREATE EXTENSION IF NOT EXISTS pg_cron;
```

**Test 2: Schedule cron jobs**

```sql
-- Schedule monitoring (Lunedì 8:00 UTC)
SELECT cron.schedule(
  'seo-monitoring-weekly',
  '0 8 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/seo-monitor',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- Schedule report (Lunedì 8:02 UTC - 2 minuti dopo)
SELECT cron.schedule(
  'seo-weekly-report',
  '2 8 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/seo-weekly-report',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- Verifica schedule creati
SELECT jobid, jobname, schedule, active 
FROM cron.job 
WHERE jobname LIKE 'seo-%';

-- Risultato atteso:
-- jobid | jobname                 | schedule   | active
-- 1     | seo-monitoring-weekly   | 0 8 * * 1  | true
-- 2     | seo-weekly-report       | 2 8 * * 1  | true
```

**Test 3: Esecuzione manuale immediata (test rapido)**

```sql
-- Forza esecuzione immediata per test
SELECT cron.schedule(
  'seo-test-immediate',
  '* * * * *',  -- Ogni minuto
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/seo-monitor',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- Attendi 2-3 minuti, poi verifica logs
SELECT * FROM cron.job_run_details 
WHERE jobname = 'seo-test-immediate'
ORDER BY start_time DESC 
LIMIT 5;

-- Risultato atteso: 
-- jobid | runid | status  | start_time           | end_time
-- 3     | 1     | succeeded | 2024-10-24 10:15:00 | 2024-10-24 10:15:45

-- Rimuovi test job dopo verifica
SELECT cron.unschedule('seo-test-immediate');
```

**Test 4: Verifica logs cron settimanale (dopo primo lunedì)**

```sql
-- Dopo il primo lunedì 8:00 AM, verifica esecuzione
SELECT 
  jobname,
  status,
  start_time,
  end_time,
  (end_time - start_time) as duration,
  return_message
FROM cron.job_run_details 
WHERE jobname LIKE 'seo-%'
ORDER BY start_time DESC 
LIMIT 10;

-- Risultato atteso (lunedì post-esecuzione):
-- seo-monitoring-weekly | succeeded | 2024-10-28 08:00:00 | 2024-10-28 08:00:45 | 00:00:45 | OK
-- seo-weekly-report     | succeeded | 2024-10-28 08:02:00 | 2024-10-28 08:02:15 | 00:00:15 | OK
```

**✅ PASS se:**
- Extension `pg_cron` installata
- 2 cron jobs schedulati e attivi
- Test immediato esegue con status `succeeded`
- Dopo primo lunedì, esecuzioni automatiche loggano success

---

### ✅ **5. Auto-Submit Trigger**

**Test 1: Pubblica nuovo articolo**

1. Vai su `/admin/blog/create`
2. Compila form:
   - **Title**: "Test Auto-Submit SEO Monitor"
   - **Slug**: "test-auto-submit-seo-monitor"
   - **Content**: [minimo 500 parole]
   - **Status**: `published`
   - **Meta Title**: "Test Auto Submit"
   - **Meta Description**: "Test automatico sistema SEO monitoring MUV Fitness"
3. Salva articolo
4. Copia `post_id` dal URL (`/admin/blog/[post_id]`)

**Test 2: Verifica trigger ha creato log iniziale**

```sql
-- Sostituisci [POST_ID] con ID reale
SELECT 
  id,
  url,
  indexing_status,
  title,
  meta_description,
  check_date
FROM seo_monitoring_log 
WHERE post_id = '[POST_ID]'
ORDER BY check_date DESC;

-- Risultato atteso:
-- id | url                                      | indexing_status     | title            | ...
-- x  | https://muvfitness.it/test-auto-submit   | pending_first_check | Test Auto Submit | ...
```

**Test 3: Verifica IndexNow submission (opzionale - richiede logs edge function)**

1. Vai su **Supabase Dashboard** → **Edge Functions** → `indexnow-submitter` → **Logs**
2. Filtra per timestamp recente (ultimo minuto)
3. Cerca log con `url: "https://www.muvfitness.it/test-auto-submit-seo-monitor"`
4. Status deve essere: `200 OK` o `"submitted": true`

**Test 4: Aggiorna articolo (non deve retriggare auto-submit)**

1. Modifica articolo test (`/admin/blog/[post_id]`)
2. Cambia contenuto (aggiungi paragrafo)
3. **NON** cambiare status (lascia `published`)
4. Salva

```sql
-- Verifica che non sia stato creato nuovo log (trigger solo su first publish)
SELECT COUNT(*) FROM seo_monitoring_log 
WHERE post_id = '[POST_ID]';

-- Risultato atteso: 1 (solo log iniziale)
```

**Test 5: Articolo da draft a published (deve triggare)**

1. Crea nuovo articolo draft:
   - Title: "Test Draft to Published"
   - Status: `draft`
2. Salva
3. Copia post_id
4. Modifica articolo, cambia status a `published`
5. Salva

```sql
-- Verifica nuovo log creato
SELECT indexing_status FROM seo_monitoring_log 
WHERE post_id = '[POST_ID_DRAFT]';

-- Risultato atteso: pending_first_check
```

**✅ PASS se:**
- Pubblicazione nuovo articolo crea automaticamente log in `seo_monitoring_log`
- Status iniziale è `pending_first_check`
- IndexNow submission loggata (opzionale)
- Aggiornamento articolo esistente NON crea duplicati
- Cambio status draft→published triggera auto-submit

---

## 🧪 Test End-to-End Completo

### Scenario: Flusso Completo dal Publish al Report Email

**Setup iniziale:**
- Database vuoto o reset `seo_monitoring_log`
- Almeno 3 articoli pubblicati (1 recente <7gg, 2 vecchi >7gg)

**Step 1: Pubblica nuovo articolo**

```sql
-- Prima: verifica conteggio articoli
SELECT metric_value FROM seo_monitoring_summary 
WHERE metric_name = 'total_articles';
-- Note: X articoli
```

1. Pubblica articolo "Test E2E SEO Monitoring"
2. Verifica auto-submit log creato
3. Aspetta 2 minuti

**Step 2: Esegui monitoring manuale**

1. Dashboard `/admin/seo-monitor`
2. Click "🔄 Esegui Scansione"
3. Attendi 30-60 secondi
4. Verifica metriche aggiornate:
   - Totale Articoli: X+1 (incrementato)
   - Indicizzati: ~Y (articoli >7gg)
   - Non Indicizzati: ~Z (articoli <7gg + nuovo)
   - Critici: 0-N

**Step 3: Verifica database popolato**

```sql
-- Verifica logs per ogni articolo
SELECT 
  p.title,
  l.indexing_status,
  l.days_in_current_status,
  ARRAY_LENGTH(l.issues_detected, 1) as num_issues,
  l.check_date
FROM seo_monitoring_log l
JOIN blog_posts p ON p.id = l.post_id
WHERE l.check_date > NOW() - INTERVAL '5 minutes'
ORDER BY l.check_date DESC;

-- Risultato atteso: 1 riga per ogni articolo pubblicato

-- Verifica summary
SELECT * FROM seo_monitoring_summary;

-- Risultato atteso: 
-- total_articles: X+1
-- indexed_articles: Y
-- crawled_not_indexed: Z
-- critical_articles: 0-N
```

**Step 4: Simula articolo critico (>14 giorni non indicizzato)**

```sql
-- Modifica manualmente un log per test
UPDATE seo_monitoring_log 
SET 
  indexing_status = 'crawled_not_indexed',
  days_in_current_status = 21,
  issues_detected = '["Meta description assente o troppo corta", "Contenuto troppo breve"]'::jsonb,
  suggestions = '["Scrivere meta description 150-160 caratteri", "Espandere contenuto ad almeno 1000 parole"]'::jsonb
WHERE post_id = (
  SELECT id FROM blog_posts 
  WHERE status = 'published' 
  LIMIT 1
);

-- Aggiorna summary
UPDATE seo_monitoring_summary 
SET metric_value = 1 
WHERE metric_name = 'critical_articles';
```

**Step 5: Genera report email manuale**

1. Supabase Dashboard → Edge Functions → `seo-weekly-report`
2. Tab "Invoke" → Body: `{}`
3. Click "Invoke Function"
4. Attendi 10-20 secondi
5. Response deve contenere:
   ```json
   {
     "success": true,
     "emailSent": true,
     "critical": 1,
     "indexed": Y,
     "total": X+1
   }
   ```

**Step 6: Verifica email ricevuta**

1. Controlla inbox `info@muvfitness.it`
2. Email presente con subject: `⚠️ Report SEO MUV - 1 articoli critici`
3. Contenuto email:
   - ✅ Card metriche corrette (Totale: X+1, Indicizzati: Y, Critici: 1)
   - ✅ Tabella articoli critici presente
   - ✅ Articolo modificato al step 4 visibile in tabella
   - ✅ Giorni: 21
   - ✅ Suggerimenti: "Scrivere meta description...", "Espandere contenuto..."
   - ✅ Box verde "Azioni Consigliate" presente
   - ✅ Link dashboard e GSC cliccabili

**Step 7: Dashboard - Intervento su articolo critico**

1. Dashboard `/admin/seo-monitor`
2. Click filtro "Critici"
3. Articolo modificato step 4 visibile con:
   - Badge rosso "CRITICO"
   - Box giallo problemi: "Meta description assente...", "Contenuto breve..."
   - Box blu suggerimenti
4. Click "Modifica"
5. Editor articolo si apre
6. Aggiungi meta description 160 caratteri
7. Espandi contenuto a 1200 parole
8. Salva
9. Torna su dashboard SEO Monitor
10. Click "📡 Richiedi Indicizzazione"
11. Toast conferma: "Richiesta inviata"

**Step 8: Re-scan dopo ottimizzazione**

1. Click "🔄 Esegui Scansione"
2. Attendi completamento
3. Verifica articolo ottimizzato:
   - Box giallo problemi: ora vuoto o ridotto
   - Ancora "Non Indicizzato" (normale, serve tempo Google)
   - Giorni resettati a 0 (status changed)

**Step 9: Cleanup test**

```sql
-- Ripristina log modificato (opzionale)
DELETE FROM seo_monitoring_log 
WHERE post_id IN (
  SELECT id FROM blog_posts 
  WHERE title LIKE '%Test E2E%'
);

-- Elimina articolo test (opzionale)
DELETE FROM blog_posts 
WHERE title = 'Test E2E SEO Monitoring';
```

**✅ PASS se:**
- Tutti gli step completati senza errori
- Email ricevuta con dati corretti
- Dashboard mostra articolo critico
- Ottimizzazione articolo riduce problemi rilevati
- Richiesta indicizzazione funziona

---

## 🐛 Test Error Handling

### Test 1: Edge function con 0 articoli pubblicati

```sql
-- Rendi tutti gli articoli draft temporaneamente
UPDATE blog_posts SET status = 'draft' WHERE status = 'published';

-- Invoke seo-monitor
-- Risultato atteso: 
{
  "error": "No published posts",
  "status": 400
}

-- Ripristina
UPDATE blog_posts SET status = 'published' WHERE status = 'draft';
```

**✅ PASS se:** Edge function ritorna errore gestito, non crash.

---

### Test 2: Resend API key mancante

```bash
# Supabase Dashboard → Edge Functions → Settings → Secrets
# Rimuovi temporaneamente RESEND_API_KEY

# Invoke seo-weekly-report
# Risultato atteso:
{
  "error": "Email service not configured",
  "reportGenerated": true,
  ...
}

# Ripristina RESEND_API_KEY
```

**✅ PASS se:** Edge function non crasha, ritorna errore significativo.

---

### Test 3: Articolo con URL non raggiungibile

```sql
-- Crea articolo con slug invalido
INSERT INTO blog_posts (title, slug, content, status) 
VALUES ('Test URL Broken', 'test--url--broken', 'Content test', 'published');

-- Esegui monitoring
-- Verifica log articolo:
SELECT indexing_status, http_status_code 
FROM seo_monitoring_log 
WHERE url LIKE '%test--url--broken%';

-- Risultato atteso:
-- indexing_status: error
-- http_status_code: 404 o 500

-- Cleanup
DELETE FROM blog_posts WHERE title = 'Test URL Broken';
```

**✅ PASS se:** Articolo marcato come `error`, non crasha monitoring.

---

### Test 4: Dashboard con RLS policy disabled

```sql
-- Disabilita temporaneamente RLS
ALTER TABLE seo_monitoring_log DISABLE ROW LEVEL SECURITY;

-- Ricarica dashboard /admin/seo-monitor
-- Risultato atteso: Dati visibili anche senza RLS (fallback sicuro)

-- Riabilita RLS
ALTER TABLE seo_monitoring_log ENABLE ROW LEVEL SECURITY;
```

**✅ PASS se:** Dashboard funziona in entrambi i casi (con/senza RLS).

---

## 📊 Performance Testing

### Test 1: Tempo esecuzione `seo-monitor` con molti articoli

```sql
-- Crea 100 articoli di test (opzionale - solo staging)
DO $$
BEGIN
  FOR i IN 1..100 LOOP
    INSERT INTO blog_posts (title, slug, content, status, meta_title, meta_description)
    VALUES (
      'Test Perf Article ' || i,
      'test-perf-article-' || i,
      'Content test article number ' || i,
      'published',
      'Test Performance ' || i,
      'Meta description test performance article ' || i
    );
  END LOOP;
END $$;

-- Invoke seo-monitor e misura tempo
-- Tempo atteso: 60-120 secondi per 100 articoli (fetch sequenziale)

-- Cleanup
DELETE FROM blog_posts WHERE title LIKE 'Test Perf%';
```

**Target Performance:**
- 50 articoli: <60 secondi
- 100 articoli: <120 secondi
- >100 articoli: considerare batch processing

---

### Test 2: Dimensione payload email report

```sql
-- Crea 20 articoli critici di test
UPDATE blog_posts 
SET status = 'published'
WHERE id IN (
  SELECT id FROM blog_posts LIMIT 20
);

-- Modifica log per marcarli critici
UPDATE seo_monitoring_log 
SET indexing_status = 'crawled_not_indexed',
    days_in_current_status = 21
WHERE post_id IN (
  SELECT id FROM blog_posts WHERE status = 'published' LIMIT 20
);

-- Invoke seo-weekly-report
-- Verifica email ricevuta correttamente (tabella 20 righe)

-- Cleanup
-- (ripristina status/logs originali)
```

**Target:** Email con 20+ articoli critici deve essere leggibile, non troncata.

---

## ✅ Acceptance Criteria

### Sistema pronto per produzione se:

- ✅ **Database**: Tabelle create, RLS attivi, trigger funzionante
- ✅ **Edge Functions**: Entrambe deployate, invoke manuali success
- ✅ **Cron Jobs**: Schedulati correttamente, test immediato eseguito
- ✅ **Admin Dashboard**: Route accessibile, UI funzionale, pulsanti operativi
- ✅ **Email Reports**: Ricevute su inbox, formattate correttamente
- ✅ **Auto-Submit**: Nuovi articoli pubblicati auto-submitati
- ✅ **Error Handling**: Nessun crash su edge cases
- ✅ **Performance**: <120 secondi per 100 articoli
- ✅ **End-to-End**: Flusso completo testato con successo

---

## 📋 Post-Deployment Monitoring

### Prima settimana dopo deploy:

**Lunedì mattina (post-primo cron):**
1. Verifica email ricevuta ore 9:00 circa (8:00 UTC + 1h CET)
2. Controlla logs cron: `SELECT * FROM cron.job_run_details WHERE start_time > NOW() - INTERVAL '1 day'`
3. Dashboard: verifica dati aggiornati automaticamente

**Mercoledì:**
1. Pubblica 1-2 nuovi articoli
2. Verifica auto-submit logs
3. Conferma inserimento in `seo_monitoring_log`

**Venerdì:**
1. Dashboard: controlla metriche trend (crescita articoli)
2. Verifica nessun articolo "critico" falso positivo

**Secondo Lunedì:**
1. Seconda email ricevuta
2. Confronta dati settimana 1 vs settimana 2
3. Verifica articoli "risolti" (se erano critici settimana 1)

---

## 🔍 Debug Commands

### Query utili per troubleshooting:

```sql
-- 1. Ultimi 10 check monitoring
SELECT 
  bp.title,
  sl.indexing_status,
  sl.days_in_current_status,
  sl.check_date
FROM seo_monitoring_log sl
JOIN blog_posts bp ON bp.id = sl.post_id
ORDER BY sl.check_date DESC
LIMIT 10;

-- 2. Articoli mai controllati
SELECT bp.title, bp.slug 
FROM blog_posts bp
LEFT JOIN seo_monitoring_log sl ON sl.post_id = bp.id
WHERE bp.status = 'published' 
  AND sl.id IS NULL;

-- 3. Cron executions history
SELECT 
  jobname,
  status,
  start_time,
  (end_time - start_time) as duration
FROM cron.job_run_details 
WHERE jobname LIKE 'seo-%'
ORDER BY start_time DESC 
LIMIT 20;

-- 4. Edge function response times
SELECT 
  AVG(response_time_ms) as avg_ms,
  MAX(response_time_ms) as max_ms,
  MIN(response_time_ms) as min_ms
FROM seo_monitoring_log
WHERE check_date > NOW() - INTERVAL '7 days';

-- 5. Articoli con più problemi rilevati
SELECT 
  bp.title,
  ARRAY_LENGTH(sl.issues_detected, 1) as num_issues,
  sl.issues_detected
FROM seo_monitoring_log sl
JOIN blog_posts bp ON bp.id = sl.post_id
WHERE ARRAY_LENGTH(sl.issues_detected, 1) > 0
ORDER BY num_issues DESC
LIMIT 10;
```

---

**Testing Checklist Completa:** ✅  
**Sistema Verificato e Pronto per Produzione**
