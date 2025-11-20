# 📋 STANDARD DATI AZIENDALI - MUV FITNESS

## 🎯 Obiettivo
Questo documento definisce lo **standard unico** per tutti i dati aziendali (indirizzo, P.IVA, contatti) nel progetto MUV Fitness, garantendo coerenza tra frontend, backend, schema markup e email.

---

## ✅ REGOLA D'ORO

**SEMPRE** usare `BUSINESS_DATA` da `src/config/businessData.ts` come **unica fonte di verità**.

❌ **MAI** hardcodare indirizzi, telefoni, P.IVA o altri dati aziendali nei file.

---

## 📍 DATI UFFICIALI

### Ragione Sociale
```
MUV Fitness S.r.l.
```

### Sede Legale
```
Piazzetta Don Walter Soave, 2
37045 Legnago (VR)
Italia
```

### P.IVA
```
05281920289
```

### Contatti
- **Telefono/WhatsApp**: +39 329 107 0374
- **Email**: info@muvfitness.it
- **Sito Web**: https://www.muvfitness.it

### Social Media
- **Facebook**: https://www.facebook.com/MuvLegnago/
- **Instagram**: https://www.instagram.com/MuvLegnago/

---

## 🏗️ ARCHITETTURA CENTRALIZZATA

### 1️⃣ File Fonte di Verità
**File**: `src/config/businessData.ts`

Contiene tutti i dati in formato strutturato:
```typescript
export const BUSINESS_DATA = {
  name: "MUV Fitness",
  legalName: "MUV Fitness S.r.l.",
  address: {
    street: "Piazzetta Don Walter Soave, 2",
    city: "Legnago",
    region: "Verona",
    postalCode: "37045",
    countryCode: "IT"
  },
  contact: {
    phone: "+393291070374",
    email: "info@muvfitness.it",
    whatsapp: "+393291070374"
  },
  vatNumber: "05281920289",
  // ... altri dati
};
```

### 2️⃣ Come Usare i Dati

#### **Frontend React/TypeScript**
```typescript
import { BUSINESS_DATA } from '@/config/businessData';

// ✅ CORRETTO
<p>{BUSINESS_DATA.address.street}</p>
<p>{BUSINESS_DATA.address.postalCode} {BUSINESS_DATA.address.city}</p>
<p>P.IVA: {BUSINESS_DATA.vatNumber}</p>

// ❌ SBAGLIATO
<p>Via Roma 123</p>
<p>37045 Legnago</p>
```

#### **Schema Markup JSON-LD**
```typescript
import { BUSINESS_DATA } from '@/config/businessData';

const schema = {
  "@type": "LocalBusiness",
  "name": BUSINESS_DATA.name,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": BUSINESS_DATA.address.street,
    "addressLocality": BUSINESS_DATA.address.city,
    "postalCode": BUSINESS_DATA.address.postalCode,
    "addressCountry": BUSINESS_DATA.address.countryCode
  },
  "telephone": BUSINESS_DATA.contact.phone
};
```

#### **Edge Functions (Supabase/Deno)**
❗ **Importante**: Le Edge Functions **NON possono importare** direttamente da `businessData.ts`.

**Soluzione**: Hardcodare i dati **SOLO** nelle Edge Functions, mantenendoli sincronizzati con `BUSINESS_DATA`:

```typescript
// ✅ TEMPLATE EMAIL - Dati hardcodati ma sincronizzati
const BUSINESS_INFO = {
  name: "MUV Fitness",
  address: "Piazzetta Don Walter Soave, 2 - 37045 Legnago (VR)",
  phone: "+39 329 107 0374",
  email: "info@muvfitness.it",
  vatNumber: "05281920289"
};

const emailHTML = `
  <p><strong>MUV Fitness Legnago</strong></p>
  <p>${BUSINESS_INFO.address}</p>
  <p>P.IVA: ${BUSINESS_INFO.vatNumber}</p>
  <p>Tel: ${BUSINESS_INFO.phone}</p>
`;
```

---

## 📂 FILE DA AGGIORNARE QUANDO CAMBIA UN DATO

### Frontend (usano `BUSINESS_DATA`)
✅ **Aggiornamento automatico** quando si modifica `businessData.ts`:
- `src/components/home/MUVFooter.tsx`
- `src/components/contact/ContactInfo.tsx`
- `src/components/forms/UnifiedContactForm.tsx`
- `src/pages/ChiSiamo.tsx`
- `src/pages/landing/ProvaGratuitaEMS.tsx`
- `src/pages/servizi/*.tsx`
- `src/components/SEO/GlobalSEO.tsx`
- `src/components/SEO/StructuredData.tsx`
- `src/utils/structuredDataSchemas.ts`
- `src/utils/schemas/localBusiness.ts`

### Backend (richiedono aggiornamento manuale)
⚠️ **Da aggiornare manualmente**:
- `supabase/functions/send-contact-email/index.ts`
- `supabase/functions/send-booking-email/index.ts`
- `supabase/functions/booking-reminders/index.ts`

---

## 🔍 CHECKLIST PRE-DEPLOY

Prima di ogni deploy, verifica:

### 1. Frontend
```bash
# Cerca hardcoded "Via Roma" (errore storico)
grep -r "Via Roma" src/

# Cerca hardcoded "Viale dei Tigli" (altro errore)
grep -r "Viale dei Tigli" src/

# Cerca hardcoded "Via Frattini" (indirizzo vecchio)
grep -r "Via Frattini" src/ supabase/

# Verifica P.IVA corretta
grep -r "05281920289" src/
```

### 2. Schema Markup
Verifica che gli schema JSON-LD usino `BUSINESS_DATA`:
```bash
grep -r "@type.*PostalAddress" src/ | grep -v "BUSINESS_DATA"
```

### 3. Edge Functions
Verifica che le email contengano l'indirizzo corretto:
```bash
grep -r "Legnago" supabase/functions/ | grep -v "Piazzetta Don Walter Soave"
```

---

## ⚠️ ERRORI COMUNI DA EVITARE

### ❌ NON FARE MAI
```typescript
// ❌ Hardcoded nel componente
<p>Via Roma 123, Legnago</p>
<p>P.IVA: 12345678901</p>

// ❌ Dati parziali
<p>Legnago</p> // Manca indirizzo completo

// ❌ Formati non standard
<p>Tel: 329 107 0374</p> // Manca prefisso internazionale
```

### ✅ FARE SEMPRE
```typescript
// ✅ Usa BUSINESS_DATA
<p>{BUSINESS_DATA.address.street}, {BUSINESS_DATA.address.postalCode} {BUSINESS_DATA.address.city}</p>
<p>P.IVA: {BUSINESS_DATA.vatNumber}</p>

// ✅ Formato completo
<p>Tel: {BUSINESS_DATA.contact.phone}</p> // +39 329 107 0374
```

---

## 🛠️ COME AGGIORNARE UN DATO

### Scenario: Cambio indirizzo

1. **Aggiorna `businessData.ts`**
   ```typescript
   // src/config/businessData.ts
   export const BUSINESS_DATA = {
     address: {
       street: "Nuovo Indirizzo, 123", // ← Modifica qui
       city: "Legnago",
       // ...
     }
   };
   ```

2. **Frontend**: ✅ Automatico (tutti i componenti si aggiornano)

3. **Edge Functions**: ⚠️ Manuale
   - Apri `supabase/functions/send-contact-email/index.ts`
   - Cerca tutte le occorrenze di `"Piazzetta Don Walter Soave, 2"`
   - Sostituisci con `"Nuovo Indirizzo, 123"`
   - Ripeti per `send-booking-email` e `booking-reminders`

4. **Test**
   ```bash
   # Verifica che non ci siano più riferimenti al vecchio indirizzo
   grep -r "Piazzetta Don Walter Soave" src/ supabase/
   ```

---

## 📊 STATO ATTUALE (Dicembre 2024)

✅ **Completati** (usano `BUSINESS_DATA`):
- Tutti i componenti frontend
- Schema markup LocalBusiness
- Footer e form contatti
- Pagine servizi e landing

✅ **Aggiornati manualmente**:
- Edge Functions email
- Template booking reminders

❌ **Da evitare**:
- Nuovi file con dati hardcodati
- Import diretti in Edge Functions (tecnicamente impossibile)

---

## 📚 RIFERIMENTI

- **File principale**: `src/config/businessData.ts`
- **Schema helper**: `src/utils/schemas/localBusiness.ts`
- **Schema utilities**: `src/utils/structuredDataSchemas.ts`
- **Documentazione Google**: [Schema.org LocalBusiness](https://schema.org/LocalBusiness)

---

## 🚀 BEST PRACTICES

1. **Sempre** importare `BUSINESS_DATA` quando serve un dato aziendale
2. **Mai** hardcodare dati che possono cambiare
3. **Verificare** con `grep` prima di ogni deploy
4. **Documentare** ogni cambiamento in questo file
5. **Testare** gli schema markup con [Google Rich Results Test](https://search.google.com/test/rich-results)

---

**Ultimo aggiornamento**: 20 Novembre 2024  
**Versione**: 1.0  
**Responsabile**: Team Dev MUV Fitness
