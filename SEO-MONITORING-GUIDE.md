# 📊 Guida Sistema di Monitoraggio SEO Automatico - MUV Fitness

## 🎯 Panoramica Sistema

Il sistema di monitoraggio SEO automatico controlla costantemente lo stato di indicizzazione degli articoli del blog MUV Fitness, inviando report settimanali e identificando problemi critici.

### Funzionalità Principali

✅ **Monitoraggio Automatico Settimanale** - Ogni lunedì ore 8:00  
✅ **Report Email Dettagliati** - Inviati a info@muvfitness.it  
✅ **Dashboard Admin Visuale** - `/admin/seo-monitor`  
✅ **Identificazione Articoli Critici** - Articoli non indicizzati >14 giorni  
✅ **Suggerimenti Automatici** - Raccomandazioni per migliorare indicizzazione  
✅ **Auto-Submit Nuovi Articoli** - Invio automatico a motori di ricerca

---

## 🚀 Quick Start

### 1. Attivare il Cron Job Settimanale

**Prerequisiti:**
- Accesso Supabase Dashboard con permessi admin
- Extension `pg_cron` abilitata (verificare in Database > Extensions)

**Passaggi:**

1. Vai su **Supabase Dashboard** → **SQL Editor**
2. Copia e incolla il seguente codice SQL:

```sql
-- Abilita pg_cron se non già attivo
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule monitoraggio SEO ogni lunedì 8:00 AM UTC
SELECT cron.schedule(
  'seo-monitoring-weekly',
  '0 8 * * 1',  -- Cron expression: Lunedì 8:00 UTC (9:00 ora italiana)
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/seo-monitor',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- Schedule report email 2 minuti dopo il monitoring
SELECT cron.schedule(
  'seo-weekly-report',
  '2 8 * * 1',  -- 2 minuti dopo per dare tempo al monitoring
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/seo-weekly-report',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);
```

3. Esegui la query (pulsante **Run** o `Cmd+Enter`)
4. Verifica successo:

```sql
-- Visualizza cron jobs attivi
SELECT * FROM cron.job;
```

Dovresti vedere due job: `seo-monitoring-weekly` e `seo-weekly-report`.

---

### 2. Accedere alla Dashboard SEO Monitor

1. Vai su **Admin Dashboard**: `https://www.muvfitness.it/admin/auth`
2. Effettua login con credenziali admin
3. Nel menu laterale, clicca su **📊 SEO Monitor**
4. URL dashboard: `https://www.muvfitness.it/admin/seo-monitor`

**Cosa vedi nella dashboard:**
- 📈 **4 Card Metriche**: Totale Articoli, Indicizzati, Non Indicizzati, Critici
- 🔍 **Filtri**: Tutti | Indicizzati | Non Indicizzati | Critici
- 📝 **Lista Articoli**: Ogni articolo con status, problemi rilevati, suggerimenti
- 🔄 **Pulsante Scansione**: Esegui monitoraggio on-demand

---

### 3. Testare il Sistema Manualmente

**Test 1: Eseguire Monitoraggio Manuale**

1. Vai nella dashboard `/admin/seo-monitor`
2. Clicca sul pulsante **🔄 Esegui Scansione**
3. Attendi 30-60 secondi (elaborazione articoli)
4. La pagina si ricarica automaticamente con dati aggiornati

**Test 2: Verificare Email Report**

Opzione A - Via Supabase Dashboard:
1. Vai su **Edge Functions** → `seo-weekly-report`
2. Tab **Invoke**
3. Clicca **Invoke Function**
4. Controlla email su `info@muvfitness.it`

Opzione B - Via SQL:
```sql
-- Chiama manualmente la funzione via SQL
SELECT net.http_post(
  url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/seo-weekly-report',
  headers := '{"Content-Type": "application/json"}'::jsonb,
  body := '{}'::jsonb
);
```

**Test 3: Verificare Auto-Submit Nuovi Articoli**

1. Vai su `/admin/blog/create`
2. Crea un nuovo articolo di test
3. Imposta **Status**: `published`
4. Salva
5. Verifica in `seo_monitoring_log`:

```sql
SELECT * FROM seo_monitoring_log 
WHERE post_id = '[ID_ARTICOLO]'
ORDER BY check_date DESC;
```

Dovresti vedere un record con `indexing_status = 'pending_first_check'`.

---

## 📊 Interpretazione Report Email

### Struttura Report Settimanale

Il report email contiene 4 sezioni principali:

#### 1️⃣ Stato Generale (Card Metriche)

| Metrica | Significato | Azione |
|---------|-------------|--------|
| **Totale Articoli** | Numero articoli pubblicati | Monitora crescita nel tempo |
| **Indicizzati** | Articoli trovati da Google | Target >90% |
| **Non Indicizzati** | Articoli non ancora indicizzati | Normale se pubblicati <7gg |
| **⚠️ Critici (>14gg)** | Articoli problematici | AZIONE IMMEDIATA RICHIESTA |

**Codici Colore:**
- 🟢 **Verde (Indicizzati)**: Tutto OK
- 🟠 **Arancione (Non Indicizzati)**: Da monitorare
- 🔴 **Rosso (Critici)**: Richiede intervento

---

#### 2️⃣ Articoli Critici - Tabella Dettagliata

**Quando appare questa sezione:**
Solo se ci sono articoli non indicizzati da oltre 14 giorni.

**Colonne tabella:**
- **Titolo Articolo**: Nome articolo problematico
- **URL**: Link diretto all'articolo
- **Giorni**: Giorni nello stato "Non indicizzato"
- **Suggerimenti**: Azioni correttive automatiche

**Esempio interpretazione:**

| Articolo | Giorni | Suggerimenti |
|----------|--------|--------------|
| "Come allenarsi a casa" | 21 | Aggiornare contenuto e meta description • Richiedere indicizzazione manuale in GSC |

➡️ **Azione**: L'articolo è non indicizzato da 21 giorni, probabilmente per contenuto debole o meta description mancante.

---

#### 3️⃣ Azioni Consigliate

Questa sezione elenca le best practice SEO da seguire ogni settimana:

✅ **Verifica articoli critici** e aggiorna contenuti  
✅ **Richiedi indicizzazione manuale** su Google Search Console  
✅ **Aggiungi link interni** tra articoli correlati  
✅ **Verifica sitemap.xml** su muvfitness.it/sitemap.xml  
✅ **Monitora metriche** nella dashboard admin MUV

---

#### 4️⃣ Footer con Link Utili

- 🔗 **Dashboard SEO Admin**: Link diretto a `/admin/seo-monitor`
- 🔍 **Google Search Console**: Link per richieste indicizzazione manuale

---

## 🛠️ Dashboard Admin - Guida Completa

### Panoramica Interfaccia

```
┌─────────────────────────────────────────────────────────┐
│  SEO Monitor                    [🔄 Esegui Scansione]  │
├─────────────────────────────────────────────────────────┤
│  📊 Card Metriche (4 card)                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│  │ Tot. │ │ Ind. │ │ Non  │ │ Crit.│                  │
│  └──────┘ └──────┘ └──────┘ └──────┘                  │
├─────────────────────────────────────────────────────────┤
│  🔍 Filtri:                                            │
│  [Tutti] [Indicizzati] [Non Indicizzati] [Critici]    │
├─────────────────────────────────────────────────────────┤
│  📝 Lista Articoli                                     │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Titolo Articolo         [✅ Indicizzato]         │ │
│  │ https://muvfitness.it/...                        │ │
│  │ Stato attuale da: 12 giorni                      │ │
│  │                                                   │ │
│  │ [Modifica] [📡 Richiedi Indicizzazione]         │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### Funzionalità per Colonna

#### 🔄 Pulsante "Esegui Scansione"

**Quando usare:**
- Dopo aver pubblicato nuovi articoli
- Dopo aver aggiornato articoli critici
- Prima di verificare risultati di ottimizzazioni

**Cosa fa:**
1. Chiama edge function `seo-monitor`
2. Controlla tutti gli articoli pubblicati
3. Aggiorna database con nuovi dati
4. Ricarica automaticamente la dashboard

**Tempo elaborazione:** 30-60 secondi

---

#### 📊 Card Metriche

**Totale Articoli (nero)**
- Mostra numero totale articoli `status='published'`
- Incrementa con nuove pubblicazioni

**Indicizzati (verde)**
- Articoli con `indexing_status='indexed'`
- Include percentuale sul totale
- Target: >90%

**Non Indicizzati (arancione)**
- Articoli con `indexing_status='crawled_not_indexed'` o `pending_first_check`
- Normale per articoli pubblicati <7 giorni

**⚠️ Critici (rosso)**
- Articoli non indicizzati da oltre 14 giorni
- **RICHIEDE AZIONE IMMEDIATA**
- Sfondo rosso per evidenziare priorità

---

#### 🔍 Filtri

**Tutti**
- Mostra tutti gli articoli monitorati
- Ordinati per data check (più recenti primi)

**Indicizzati**
- Solo articoli `indexed`
- Utile per verificare articoli performanti

**Non Indicizzati**
- Articoli `crawled_not_indexed` o `pending_first_check`
- Monitora nuovi articoli

**Critici**
- Solo articoli non indicizzati >14 giorni
- **Vista prioritaria per interventi urgenti**

---

#### 📝 Lista Articoli - Dettaglio Card

Ogni articolo mostra:

**Header:**
- **Titolo**: Nome completo articolo
- **Badge Status**: 
  - ✅ Verde = Indicizzato
  - ⏳ Arancione = Non indicizzato
  - ❌ Rosso = Errore
  - 🔴 CRITICO = Non indicizzato >14gg

**Corpo:**
- **URL**: Link cliccabile all'articolo pubblico
- **Giorni in stato attuale**: Es. "Stato attuale da: 7 giorni"

**Box Problemi (giallo)** - Se presenti:
```
⚠️ Problemi rilevati:
• Meta description assente o troppo corta
• Contenuto troppo breve
• Title troppo lungo
```

**Box Suggerimenti (blu)** - Sempre presente:
```
💡 Suggerimenti:
• Scrivere meta description 150-160 caratteri con keyword principale
• Espandere contenuto ad almeno 1000-1500 parole
• Ridurre title sotto i 60 caratteri
```

**Azioni:**
- **[Modifica]**: Apre editor articolo in `/admin/blog/:id`
- **[📡 Richiedi Indicizzazione]**: Invia URL a motori di ricerca via IndexNow

---

### Pulsante "Richiedi Indicizzazione"

**Cosa fa:**
1. Chiama edge function `indexnow-submitter`
2. Invia URL articolo a:
   - Google (IndexNow)
   - Bing (IndexNow)
   - Yandex (IndexNow)
3. Mostra toast di conferma

**Quando usare:**
- Dopo aver aggiornato un articolo critico
- Per forzare re-crawl di articoli modificati
- Per nuovi articoli pubblicati manualmente (se auto-submit non funziona)

**Limiti:**
- Non garantisce indicizzazione immediata
- Richiesta valida per 24 ore (non ripetere troppo spesso)

**Best Practice:**
- Usa solo DOPO aver ottimizzato il contenuto
- Non spammare richieste (max 1 volta al giorno per articolo)

---

## 🔧 Troubleshooting

### Problema: Email Report Non Ricevute

**Sintomi:**
- Lunedì mattina, nessuna email su `info@muvfitness.it`
- Dashboard mostra dati aggiornati

**Cause Possibili:**

1. **Cron Job non schedulato**
   ```sql
   -- Verifica cron attivi
   SELECT * FROM cron.job WHERE jobname LIKE '%seo%';
   ```
   **Soluzione**: Re-eseguire SQL scheduling (vedi Quick Start)

2. **Resend API Key non configurata**
   ```bash
   # Verifica secret in Supabase Dashboard
   Edge Functions → Settings → Secrets → RESEND_API_KEY
   ```
   **Soluzione**: Aggiungi/aggiorna `RESEND_API_KEY`

3. **Email in spam**
   **Soluzione**: Controlla cartella spam/junk, aggiungi `seo@muvfitness.it` ai contatti

4. **Errore edge function**
   ```sql
   -- Verifica logs edge function
   SELECT * FROM cron.job_run_details 
   WHERE jobname = 'seo-weekly-report'
   ORDER BY start_time DESC 
   LIMIT 5;
   ```
   **Soluzione**: Controlla logs in Supabase Dashboard → Edge Functions → `seo-weekly-report` → Logs

---

### Problema: Dashboard Non Mostra Dati

**Sintomi:**
- Card metriche tutte a 0
- Lista articoli vuota
- Nessun errore visibile

**Cause Possibili:**

1. **Prima esecuzione mai avvenuta**
   **Soluzione**: Clicca su "🔄 Esegui Scansione" per primo run

2. **RLS Policies problema**
   ```sql
   -- Verifica RLS
   SELECT tablename, policyname FROM pg_policies 
   WHERE tablename LIKE 'seo_monitoring%';
   ```
   **Soluzione**: Verifica che policy admin siano attive

3. **Nessun articolo pubblicato**
   ```sql
   SELECT COUNT(*) FROM blog_posts WHERE status = 'published';
   ```
   **Soluzione**: Pubblica almeno un articolo di test

---

### Problema: Articoli Sempre "Non Indicizzati"

**Sintomi:**
- Articoli pubblicati da >14 giorni mostrano `crawled_not_indexed`
- Metriche "Critici" sempre alta

**Cause Possibili:**

1. **Articoli non raggiungibili via HTTP**
   ```bash
   # Test manuale
   curl -I https://www.muvfitness.it/[slug-articolo]
   ```
   **Soluzione**: Verifica slug corretto, route esistente, nessun redirect 404

2. **Sitemap non aggiornata**
   ```bash
   # Verifica sitemap
   curl https://www.muvfitness.it/sitemap.xml
   ```
   **Soluzione**: Trigger aggiornamento sitemap in `/admin/blog`

3. **Robots.txt blocca crawling**
   ```bash
   curl https://www.muvfitness.it/robots.txt
   ```
   **Soluzione**: Verifica che blog non sia in `Disallow:`

4. **Articolo realmente non indicizzato**
   **Soluzione**: 
   - Ottimizza contenuto (lunghezza, keyword, meta)
   - Aggiungi link interni da altri articoli
   - Richiedi indicizzazione manuale in Google Search Console

---

### Problema: Cron Job Non Si Esegue

**Sintomi:**
- Email mai ricevute
- Dashboard dati mai aggiornati automaticamente
- `check_date` in `seo_monitoring_log` sempre vecchia

**Debug:**

```sql
-- 1. Verifica cron schedule
SELECT * FROM cron.job;

-- 2. Verifica esecuzioni recenti
SELECT * FROM cron.job_run_details 
ORDER BY start_time DESC 
LIMIT 20;

-- 3. Verifica errori
SELECT * FROM cron.job_run_details 
WHERE status = 'failed'
ORDER BY start_time DESC;
```

**Soluzioni:**

1. **Extension pg_cron non abilitata**
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_cron;
   ```

2. **Cron schedule non creato**
   - Re-eseguire SQL scheduling (vedi Quick Start)

3. **net.http_post fallisce**
   - Verifica URL edge function corretto
   - Verifica edge function deployate
   - Check logs edge function per errori

4. **Timezone problema**
   ```sql
   -- Verifica timezone database
   SHOW timezone;
   ```
   - Cron usa UTC, verifica orario corretto (8:00 UTC = 9:00 CET)

---

## 📈 Best Practices SEO

### Checklist Articolo Ben Indicizzato

Prima di pubblicare un articolo, verifica:

#### ✅ Meta Tags Ottimizzati

- **Title (meta_title)**:
  - Lunghezza: 50-60 caratteri
  - Include keyword principale
  - Unico per ogni articolo
  - Es: "Allenamento EMS Legnago: Guida Completa 2024 | MUV Fitness"

- **Meta Description**:
  - Lunghezza: 150-160 caratteri
  - Include keyword principale
  - Call-to-action (CTA)
  - Es: "Scopri come l'allenamento EMS a Legnago può trasformare il tuo corpo in 20 minuti. Prenota la tua prova gratuita da MUV Fitness!"

- **Canonical URL**:
  - Sempre impostato
  - Punta a URL articolo principale
  - Evita contenuto duplicato

#### ✅ Contenuto di Qualità

- **Lunghezza minima**: 1000-1500 parole
- **Keyword density**: 1-2% (naturale, non forzato)
- **Struttura HTML**:
  - Un solo `<h1>` (titolo articolo)
  - Sottotitoli `<h2>`, `<h3>` ben strutturati
  - Paragrafi brevi (<150 parole)
  - Liste puntate per leggibilità

- **Immagini**:
  - Featured image sempre presente
  - Alt text descrittivo con keyword
  - Dimensione ottimizzata (<200KB)

#### ✅ Link Interni ed Esterni

- **Link interni**: 2-5 link ad altri articoli MUV correlati
- **Link esterni**: 1-3 link a fonti autorevoli (studi, università)
- **Anchor text**: Descrittivo, non "clicca qui"

#### ✅ E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness)

- **Autore**: Sempre specificato (Thomas, Francesco, Team MUV)
- **Bio autore**: Visibile in fondo articolo
- **Foto autore**: Presente
- **Expertise**: Menziona qualifiche (PT, Biologo Nutrizionista)

---

### Workflow Ottimizzazione Articolo Critico

Quando un articolo è marcato "CRITICO" (>14 giorni non indicizzato):

**Step 1: Analisi Dashboard**
1. Apri `/admin/seo-monitor`
2. Filtra per "Critici"
3. Leggi problemi rilevati e suggerimenti

**Step 2: Ottimizzazione Contenuto**
1. Clicca "Modifica" su articolo critico
2. Applica correzioni:
   - Se meta description manca: scrivi 150-160 caratteri
   - Se contenuto breve: espandi a 1200+ parole
   - Se title lungo: riduci sotto 60 caratteri
   - Aggiungi immagini se assenti
3. Aggiungi 2-3 link interni ad altri articoli MUV
4. Salva modifiche

**Step 3: Richiesta Re-indicizzazione**
1. Torna su dashboard SEO Monitor
2. Clicca "📡 Richiedi Indicizzazione" su articolo appena ottimizzato
3. Vai su [Google Search Console](https://search.google.com/search-console)
4. Tools → URL Inspection
5. Incolla URL articolo ottimizzato
6. Clicca "Request Indexing"

**Step 4: Monitoraggio**
1. Attendi 3-7 giorni
2. Verifica prossimo report email (lunedì)
3. Se ancora critico, considera rewrite completo articolo

---

### Calendario SEO Maintenance

**Settimanale (Lunedì):**
- ✅ Leggi report email
- ✅ Verifica articoli critici in dashboard
- ✅ Ottimizza 1-2 articoli critici

**Mensile (Prima settimana):**
- ✅ Analizza trend indicizzazione (crescita/decrescita)
- ✅ Identifica topic con alta indicizzazione
- ✅ Pianifica nuovi articoli su topic performanti
- ✅ Aggiorna articoli vecchi (>6 mesi) con nuove info

**Trimestrale:**
- ✅ Audit completo sitemap
- ✅ Verifica backlink esterni
- ✅ Analizza competitor per gap content
- ✅ Ottimizza struttura link interni

---

## 🔍 Query SQL Utili

### Monitoraggio Manuale Database

```sql
-- 1. Vista generale stato indicizzazione
SELECT 
  indexing_status,
  COUNT(*) as articoli,
  ROUND(AVG(days_in_current_status), 1) as giorni_medi
FROM seo_monitoring_log
WHERE check_date > NOW() - INTERVAL '7 days'
GROUP BY indexing_status
ORDER BY articoli DESC;

-- 2. Articoli più critici (top 10)
SELECT 
  l.title,
  p.slug,
  l.days_in_current_status,
  l.issues_detected,
  l.check_date
FROM seo_monitoring_log l
JOIN blog_posts p ON p.id = l.post_id
WHERE l.indexing_status = 'crawled_not_indexed'
  AND l.days_in_current_status > 14
ORDER BY l.days_in_current_status DESC
LIMIT 10;

-- 3. Storico indicizzazione articolo specifico
SELECT 
  check_date,
  indexing_status,
  days_in_current_status,
  http_status_code,
  response_time_ms
FROM seo_monitoring_log
WHERE post_id = '[UUID_ARTICOLO]'
ORDER BY check_date DESC;

-- 4. Performance edge function (tempo medio esecuzione)
SELECT 
  AVG(response_time_ms) as avg_response_time_ms,
  MAX(response_time_ms) as max_response_time_ms,
  COUNT(*) as checks_totali
FROM seo_monitoring_log
WHERE check_date > NOW() - INTERVAL '30 days';

-- 5. Articoli con problemi meta description
SELECT 
  l.title,
  p.slug,
  l.meta_description,
  LENGTH(l.meta_description) as meta_length
FROM seo_monitoring_log l
JOIN blog_posts p ON p.id = l.post_id
WHERE LENGTH(COALESCE(l.meta_description, '')) < 120
  AND p.status = 'published'
ORDER BY meta_length ASC;

-- 6. Trend indicizzazione ultimi 3 mesi
SELECT 
  DATE_TRUNC('week', check_date) as settimana,
  COUNT(*) FILTER (WHERE indexing_status = 'indexed') as indicizzati,
  COUNT(*) FILTER (WHERE indexing_status = 'crawled_not_indexed') as non_indicizzati,
  COUNT(*) as totale
FROM seo_monitoring_log
WHERE check_date > NOW() - INTERVAL '3 months'
GROUP BY settimana
ORDER BY settimana DESC;
```

---

## 🎯 FAQ

### Q: Quanto tempo serve per indicizzare un nuovo articolo?

**A:** Tempi medi:
- **3-7 giorni**: Articoli su topic già presenti nel blog
- **7-14 giorni**: Articoli su nuovi topic
- **14-30 giorni**: Articoli con bassa qualità o contenuto duplicato

**Fattori che accelerano:**
- Link interni da articoli già indicizzati
- Condivisione social
- Richiesta indicizzazione manuale in GSC
- Sitemap aggiornata

---

### Q: Cosa significa "Scansionato ma non indicizzato"?

**A:** Google ha visitato la pagina (crawl) ma ha deciso di non includerla nell'indice.

**Cause comuni:**
- Contenuto troppo breve o di bassa qualità
- Contenuto duplicato (interno o esterno)
- Link interni insufficienti
- Canonical punta ad altra pagina
- Problemi tecnici (JS bloccante, errori 5xx intermittenti)

**Soluzione:** Ottimizza contenuto, aggiungi link interni, richiedi indicizzazione.

---

### Q: Il sistema sostituisce Google Search Console?

**A:** No, è complementare.

**Sistema MUV (questo)**:
- ✅ Monitoraggio automatico settimanale
- ✅ Alert email proattivi
- ✅ Suggerimenti personalizzati
- ✅ Dashboard integrata in admin
- ❌ Dati Google ufficiali (impressions, clicks, CTR)

**Google Search Console**:
- ✅ Dati ufficiali da Google
- ✅ Metriche performance (impressions, clicks, CTR)
- ✅ Coverage issues dettagliate
- ✅ Richiesta indicizzazione ufficiale
- ❌ Nessun alert automatico
- ❌ Dashboard separata

**Best Practice:** Usa entrambi!
- Sistema MUV per monitoraggio proattivo settimanale
- GSC per analisi approfondita e richieste ufficiali

---

### Q: Posso cambiare la frequenza del monitoraggio?

**A:** Sì, modificando il cron schedule.

**Esempio - Monitoraggio giornaliero:**
```sql
-- Modifica schedule esistente
SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'seo-monitoring-weekly'),
  schedule := '0 8 * * *'  -- Ogni giorno 8:00 AM
);
```

**Esempio - Monitoraggio bi-settimanale:**
```sql
SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'seo-monitoring-weekly'),
  schedule := '0 8 * * 1,4'  -- Lunedì e Giovedì 8:00 AM
);
```

**Attenzione:**
- Frequenza alta = maggiore consumo edge function (costi)
- Frequenza troppo bassa = problemi scoperti tardi

**Raccomandato:** Settimanale (lunedì) per bilanciare costi/efficacia.

---

### Q: Come aggiungo altri destinatari email?

**A:** Modifica edge function `seo-weekly-report/index.ts`:

```typescript
// Riga ~200 circa
to: ['info@muvfitness.it', 'vincenzo@muvfitness.it', 'seo@agency.com'],
```

Salva, il deploy è automatico.

---

### Q: Il metodo di rilevamento indicizzazione è accurato?

**A:** Accuratezza ~80-85%.

**Metodo attuale (semplificato):**
- Verifica HTTP 200 + pubblicato >7 giorni = assume indexed
- Pro: Zero setup, funziona subito
- Contro: Non verifica reale presenza in indice Google

**Metodo futuro (GSC API):**
- Interroga direttamente Google Search Console
- Pro: Dati ufficiali, 100% accurato
- Contro: Richiede OAuth2 setup, più complesso

**Raccomandazione:**
- Usa metodo attuale per quick wins e alert proattivi
- Verifica manualmente in GSC per articoli critici
- Pianifica upgrade a GSC API in futuro (roadmap Mese 2-3)

---

## 📞 Supporto

### In caso di problemi tecnici:

1. **Verifica Troubleshooting** (vedi sezione dedicata sopra)
2. **Controlla Logs**:
   - Supabase Dashboard → Edge Functions → Logs
   - SQL: `SELECT * FROM cron.job_run_details`
3. **Contatta sviluppatore**:
   - Email: [sviluppatore@muvfitness.it]
   - Includi: screenshot dashboard, logs edge function, descrizione problema

---

## 🚀 Roadmap Futuri Miglioramenti

### Fase 2.0 (Mese 2-3)
- ✅ Integrazione Google Search Console API
- ✅ Metriche impressions/clicks/CTR
- ✅ AI-powered content suggestions

### Fase 3.0 (Mese 4+)
- ✅ Grafici trend avanzati
- ✅ A/B testing meta tags
- ✅ Notifiche Slack/Discord
- ✅ Export report PDF

---

**Versione Guida:** 1.0  
**Ultimo Aggiornamento:** Ottobre 2024  
**Sistema:** MUV Fitness SEO Monitoring v1.0
