# Sistema Monitoraggio Automatico Google Search Console

## 📊 Panoramica
Sistema automatico che traccia giornalmente le metriche GSC (impression, click, CTR, posizione) e invia alert email in caso di peggioramenti significativi.

## 🏗️ Architettura

### Componenti Principali
1. **gsc-metrics-tracker** - Edge Function per tracking metriche
2. **gsc-metrics-alert** - Edge Function per rilevamento anomalie e alert
3. **GSCMetricsDashboard** - Dashboard React per visualizzazione
4. **Cron Jobs** - Esecuzione automatica giornaliera

### Database
- `gsc_metrics_history` - Storico metriche giornaliere
- `gsc_alert_history` - Log degli alert inviati

---

## 📈 Metriche Tracciate

### Site-Wide (tutto il sito)
- **Impression**: Numero totale di visualizzazioni nei risultati di ricerca
- **Click**: Numero totale di click dai risultati di ricerca
- **CTR** (Click-Through Rate): Percentuale di click rispetto alle impression
- **Posizione Media**: Posizione media del sito nei risultati di ricerca

### Per Pagina (Top 20)
- Stesse metriche per le 20 pagine con più impression

---

## 🚨 Alert Automatici

### Soglie di Alert

| Metrica | Warning (🟡) | Critical (🔴) |
|---------|--------------|---------------|
| Impression | Calo > 30% | Calo > 50% |
| Click | Calo > 30% | Calo > 50% |
| CTR | Calo > 20% | Calo > 40% |
| Pagine Indicizzate | Calo > 10% | Calo > 25% |

### Confronto Temporale
Gli alert confrontano i dati di **ieri** con i dati di **7 giorni fa**, permettendo di identificare:
- Trend negativi settimanali
- Anomalie improvvise
- Perdite di visibilità

### Email Alert
Quando viene rilevato un problema:
1. Alert salvato in `gsc_alert_history`
2. Email inviata a `info@muvfitness.it`
3. Dettagli completi con valori attuali e storici
4. Link diretto alla dashboard SEO

---

## ⏰ Scheduling Automatico

### Cron Jobs Configurati

```sql
-- Tracking metriche: ogni giorno alle 2:00 AM
gsc-metrics-daily-tracker → 0 2 * * *

-- Verifica alert: ogni giorno alle 3:00 AM  
gsc-metrics-daily-alert → 0 3 * * *
```

### Perché questo timing?
- **2:00 AM**: Orario a basso traffico per interrogare GSC API
- **3:00 AM**: Dopo il tracking, verifica se ci sono alert da inviare
- **Sequenza**: Prima raccolta dati, poi analisi anomalie

---

## 🔧 Configurazione

### Prerequisiti
1. **GSC OAuth Configurato**: Il sistema richiede access token GSC valido
   - Usa `/admin/seo-monitor` → "Autorizza GSC" per configurare
2. **RESEND_API_KEY**: Per invio email alert
   - Configura in Supabase Dashboard → Settings → Secrets

### Verifica Configurazione

```sql
-- Verifica autorizzazione GSC
SELECT * FROM gsc_oauth_tokens 
WHERE expires_at > NOW() 
ORDER BY created_at DESC 
LIMIT 1;

-- Verifica cron jobs attivi
SELECT jobname, schedule, active, command 
FROM cron.job 
WHERE jobname LIKE '%gsc%';

-- Verifica ultimi dati tracciati
SELECT * FROM gsc_metrics_history 
WHERE metric_type = 'site' 
ORDER BY check_date DESC 
LIMIT 7;
```

---

## 📊 Utilizzo Dashboard

### Accesso
Naviga a: `/admin/seo-monitor` → Tab "Metriche GSC"

### Funzionalità
- **Grafici Trend**: Visualizza ultimi 30 giorni di impression, click, CTR, posizione
- **Summary Cards**: Metriche correnti con confronto vs 7 giorni fa
- **Alert Banner**: Mostra ultimi 5 alert rilevati
- **Aggiorna Manualmente**: Pulsante per eseguire tracking immediato

### Interpretazione Dati

#### Indicatori Positivi ✅
- Impression in crescita settimana su settimana
- CTR stabile o in aumento
- Posizione media in miglioramento (numero più basso)
- Nessun alert negli ultimi 7 giorni

#### Indicatori Negativi ⚠️
- Calo impression > 20% in una settimana
- CTR in diminuzione costante
- Posizione media che peggiora (numero più alto)
- Alert critici ripetuti

---

## 🛠️ Manutenzione

### Query Diagnostiche Utili

```sql
-- Visualizzare metriche ultimi 7 giorni
SELECT 
  check_date::date,
  impressions,
  clicks,
  ctr,
  position
FROM gsc_metrics_history 
WHERE metric_type = 'site' 
AND check_date >= NOW() - INTERVAL '7 days'
ORDER BY check_date DESC;

-- Visualizzare tutti gli alert del mese corrente
SELECT 
  alert_date::date,
  severity,
  metric_name,
  change_percentage,
  alert_message,
  email_sent
FROM gsc_alert_history 
WHERE alert_date >= DATE_TRUNC('month', NOW())
ORDER BY alert_date DESC;

-- Verificare top 5 pagine con più impression ieri
SELECT 
  url,
  impressions,
  clicks,
  ctr
FROM gsc_metrics_history 
WHERE metric_type = 'page' 
AND check_date::date = CURRENT_DATE - INTERVAL '1 day'
ORDER BY impressions DESC 
LIMIT 5;
```

### Disabilitare Temporaneamente Alert

```sql
-- Disabilitare alert email (mantiene tracking)
UPDATE cron.job 
SET active = false 
WHERE jobname = 'gsc-metrics-daily-alert';

-- Riattivare alert
UPDATE cron.job 
SET active = true 
WHERE jobname = 'gsc-metrics-daily-alert';
```

### Reset Sistema

```sql
-- ATTENZIONE: Elimina TUTTI i dati storici
TRUNCATE gsc_metrics_history;
TRUNCATE gsc_alert_history;
```

---

## 🔍 Troubleshooting

### Problema: Nessun dato nel dashboard

**Possibili cause**:
1. Sistema appena installato (primo tracking domani alle 2:00 AM)
2. Token GSC scaduto
3. Cron job non attivo

**Soluzioni**:
```sql
-- Verifica token GSC valido
SELECT * FROM gsc_oauth_tokens WHERE expires_at > NOW();
-- Se vuoto → Riautorizza GSC da dashboard

-- Verifica cron attivo
SELECT * FROM cron.job WHERE jobname = 'gsc-metrics-daily-tracker';
-- Se active = false → UPDATE cron.job SET active = true WHERE...

-- Esegui tracking manuale da dashboard
-- Oppure invoca edge function manualmente
```

### Problema: Alert non arrivano via email

**Possibili cause**:
1. RESEND_API_KEY non configurato
2. Email destinatario errata
3. Nessuna anomalia rilevata (tutto ok!)

**Soluzioni**:
```sql
-- Verifica se ci sono alert salvati ma non inviati
SELECT * FROM gsc_alert_history 
WHERE email_sent = false 
ORDER BY alert_date DESC;

-- Verifica secret Resend configurato
-- Vai a: Supabase Dashboard → Settings → Edge Functions → Secrets
-- Controlla che RESEND_API_KEY sia presente
```

### Problema: Metriche incoerenti con GSC Dashboard

**Spiegazione**:
- Il sistema traccia dati di **ieri** (D-1)
- GSC Dashboard mostra dati di **oggi** (D-0, dati parziali)
- Confronta sempre date specifiche per validare

**Verifica**:
```sql
-- Verifica data esatta dei dati
SELECT check_date, impressions, clicks 
FROM gsc_metrics_history 
WHERE metric_type = 'site' 
ORDER BY check_date DESC 
LIMIT 3;
-- Confronta con GSC Dashboard per stessa data
```

---

## 📈 Metriche di Successo

### Baseline (Pre-Implementazione)
- Monitoraggio manuale settimanale
- Scoperta problemi dopo 7+ giorni
- Nessuna visibilità su trend giornalieri

### Target Post-Implementazione
- ✅ Monitoring automatico giornaliero
- ✅ Alert entro 24h da anomalie
- ✅ Dashboard con 30 giorni di storico
- ✅ Tempo reazione < 1 giorno (vs 7 giorni)

### KPI da Monitorare
- **Uptime tracking**: Dovrebbe eseguire ogni giorno senza fail
- **Alert accuracy**: % alert rilevanti vs falsi positivi
- **Tempo risposta**: Media ore tra alert e risoluzione problema

---

## 🚀 Evoluzioni Future

### Short-term (1-2 mesi)
- [ ] Alert per singole pagine (non solo site-wide)
- [ ] Integrazione Slack per notifiche real-time
- [ ] Export report mensile automatico PDF

### Medium-term (3-6 mesi)
- [ ] ML per previsione trend e anomalie
- [ ] Tracking keyword-specific (non solo URL)
- [ ] Correlazione con Google Analytics 4

### Long-term (6+ mesi)
- [ ] A/B testing automatico su meta tag
- [ ] Competitive analysis (confronto con competitor)
- [ ] AI-powered recommendations per SEO

---

## 📞 Supporto

### Contatti Tecnici
- **Dashboard Admin**: `/admin/seo-monitor`
- **Log Edge Functions**: Supabase Dashboard → Edge Functions → Logs
- **Database Query**: Supabase Dashboard → SQL Editor

### Documentazione Correlata
- [GSC OAuth Setup](GSC-OAUTH-SETUP.md)
- [SEO Monitoring Guide](../SEO-MONITORING-GUIDE.md)
- [Supabase Cron Jobs](https://supabase.com/docs/guides/database/extensions/pg_cron)

---

**Ultimo aggiornamento**: 2025-11-09  
**Versione**: 1.0.0  
**Autore**: MUV Fitness Dev Team
