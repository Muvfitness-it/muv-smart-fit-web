# 🔐 Google Search Console OAuth Setup Guide

Questa guida spiega come configurare e autorizzare l'accesso a **Google Search Console API** per ottenere dati reali di indicizzazione invece di usare euristiche HTTP.

---

## 📋 Prerequisiti

✅ Hai già configurato i secrets in Supabase:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN` (verrà popolato automaticamente dopo OAuth)

✅ Le Edge Functions sono state deployate:
- `gsc-oauth-init` - Inizia il flow OAuth
- `gsc-oauth-callback` - Gestisce il callback e salva il refresh token
- `gsc-token-manager` - Gestisce i token di accesso (cache 55 min)

✅ La migrazione database è stata eseguita:
- Tabella `gsc_oauth_tokens` creata
- Colonne GSC aggiunte a `seo_monitoring_log`

---

## 🚀 Primo Setup: Autorizzazione OAuth

### Step 1: Accedi al Dashboard SEO Monitor

Vai su: `https://www.muvfitness.it/admin/seo-monitor`

Dovresti vedere un pulsante **"🔓 Autorizza Google Search Console"** se non sei ancora autorizzato.

### Step 2: Clicca su "Autorizza Google Search Console"

Questo aprirà una finestra popup che ti porterà su Google OAuth.

### Step 3: Seleziona il tuo account Google

Usa l'account Google che ha accesso a **Google Search Console** per `www.muvfitness.it`.

### Step 4: Autorizza l'accesso

Google ti chiederà di autorizzare l'app ad accedere a:
- ✅ **View Search Console data** (webmasters.readonly)
- ✅ **Submit URLs to Google** (webmasters)

Clicca su **"Consenti"**.

### Step 5: Conferma successo

Se tutto va bene, vedrai:
- ✅ Pagina di successo con "Autorizzazione Completata!"
- ✅ La finestra si chiuderà automaticamente dopo 3 secondi
- ✅ Nel dashboard vedrai il badge verde "GSC Autorizzato"

Il **refresh token** è stato salvato automaticamente nel secret `GOOGLE_REFRESH_TOKEN`!

---

## 🔄 Come Funziona

### Flow OAuth

```
1. Admin clicca "Autorizza GSC"
   ↓
2. gsc-oauth-init genera URL OAuth
   ↓
3. Google mostra schermata consenso
   ↓
4. User autorizza
   ↓
5. Google reindirizza a gsc-oauth-callback
   ↓
6. Callback scambia code per tokens
   ↓
7. Refresh token salvato in DB (gsc_oauth_tokens)
   ↓
8. Success page mostrata
```

### Gestione Token

- **Refresh Token**: Salvato nel DB, **non scade mai** (fino a revoca manuale)
- **Access Token**: Generato on-demand da `gsc-token-manager`, valido **60 minuti**
- **Cache**: Access token viene cachato per **55 minuti** per ridurre chiamate API

### Integrazione SEO Monitor

Quando esegui il **SEO Monitor**:

1. ✅ Controlla se esiste un refresh token
2. ✅ Se sì, ottiene access token da `gsc-token-manager`
3. ✅ Chiama **Google Search Console URL Inspection API** per ogni post
4. ✅ Salva dati GSC: `verdict`, `coverage_state`, `last_crawl_time`, `mobile_usable`
5. ✅ Se GSC fallisce, usa fallback HTTP (come prima)

---

## 📊 Dati GSC Disponibili

Dopo l'autorizzazione, il SEO Monitor mostrerà:

### Badge GSC Verdict
- 🟢 **PASS** - URL indicizzato correttamente
- 🟡 **PARTIAL** - URL indicizzato parzialmente
- 🔴 **FAIL** - URL non indicizzato o problemi

### Coverage State
Esempi:
- `Submitted and indexed` - Perfetto!
- `Discovered - currently not indexed` - Google ha trovato la pagina ma non l'ha ancora indicizzata
- `Crawled - currently not indexed` - Crawlata ma non indicizzata (potenziale problema)

### Last Crawl Time
Data e ora dell'ultimo crawl di Google (direttamente da Search Console)

### Mobile Usability
- ✅ `true` - Pagina mobile-friendly
- ❌ `false` - Problemi mobile usability

---

## 🔧 Troubleshooting

### "No refresh token found" Error

**Causa**: Non hai ancora completato OAuth o il token è stato revocato.

**Soluzione**: Clicca di nuovo su "Autorizza Google Search Console" nel dashboard.

### "Token refresh failed" Error

**Causa**: Il refresh token potrebbe essere scaduto o revocato.

**Soluzione**:
1. Vai su [Google Account Permissions](https://myaccount.google.com/permissions)
2. Revoca l'accesso per "MUV SEO Monitor"
3. Ri-autorizza tramite dashboard

### OAuth popup bloccato

**Causa**: Browser blocca popup.

**Soluzione**: Abilita popup per `www.muvfitness.it` nelle impostazioni del browser.

### GSC API Rate Limit

Google Search Console API limita a:
- **600 richieste/minuto**
- **5 richieste/secondo**

Il SEO Monitor include automaticamente:
- ✅ Delay di **250ms** tra richieste (max 4/sec)
- ✅ Batch processing per grandi quantità di articoli
- ✅ Fallback HTTP se rate limit raggiunto

---

## 🔐 Sicurezza

- ✅ **Refresh token** criptato nel database Supabase
- ✅ **Access token** in memoria (cache 55 min, mai persistito)
- ✅ **RLS policies** su `gsc_oauth_tokens` (solo service_role)
- ✅ **OAuth init** richiede autenticazione admin
- ✅ **Scopes minimi** richiesti (read + submit URL)

---

## 📖 Riferimenti API

- [Google Search Console API](https://developers.google.com/webmaster-tools/v1/api_reference_index)
- [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

## ✅ Checklist Finale

Prima di usare il SEO Monitor con GSC API:

- [ ] Secrets configurati (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
- [ ] Edge functions deployate (check su Supabase Dashboard)
- [ ] Migrazione database eseguita (`gsc_oauth_tokens` esiste)
- [ ] OAuth completato (badge "GSC Autorizzato" visibile)
- [ ] Primo scan eseguito con successo
- [ ] Badge "GSC: PASS/PARTIAL/FAIL" visibili sugli articoli

---

## 🎯 Risultato Finale

Dopo il setup completo:

**PRIMA** (HTTP euristica):
```
❓ "indexed" basato su: HTTP 200 + giorni dalla pubblicazione
❓ Nessun dato reale da Google
```

**DOPO** (GSC API):
```
✅ "PASS" verdict da Google Search Console
✅ Coverage state: "Submitted and indexed"
✅ Last crawl: 2025-01-15 14:30:00
✅ Mobile usable: true
✅ Dati reali e affidabili
```

---

**Fatto! 🎉** Ora hai accesso ai dati ufficiali di Google Search Console per monitorare l'indicizzazione degli articoli in modo preciso e affidabile.
