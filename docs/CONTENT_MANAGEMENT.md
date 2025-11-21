# Guida alla Gestione Contenuti MUV Fitness

Guida completa per modificare colori, testi e contenuti del sito **senza toccare codice**.

---

## 📋 Indice

1. [Accesso al Pannello Admin](#accesso-al-pannello-admin)
2. [Modifica Colori](#modifica-colori)
3. [Modifica Testi Homepage](#modifica-testi-homepage)
4. [Modifica Landing Pages](#modifica-landing-pages)
5. [Modifica Info Contatto](#modifica-info-contatto)
6. [Struttura Tecnica](#struttura-tecnica-per-sviluppatori)

---

## Accesso al Pannello Admin

### URL Pannello
```
https://www.muvfitness.it/admin/contenuti-base
```

### Come accedere
1. Vai su `/admin-auth`
2. Effettua login con credenziali admin
3. Nel menu principale, clicca su **"Gestione Contenuti"**
4. Oppure vai direttamente su `/admin/contenuti-base`

---

## Modifica Colori

### Tab "Colori" nel Pannello

#### Colori disponibili

| Campo | Descrizione | Esempio Default |
|-------|-------------|-----------------|
| **Testo su sfondo scuro** | Colore testo su hero, CTA, footer | `hsl(0 0% 100%)` (bianco) |
| **Testo form** | Colore testo input form contatti | `hsl(220 15% 15%)` (grigio scuro) |
| **Pulsante Principale** | Colore CTA principali | `hsl(320 85% 45%)` (magenta) |
| **Pulsante Secondario** | Colore CTA secondari | `hsl(280 70% 50%)` (viola) |

#### Come modificare un colore

1. Vai nel tab **"Colori"**
2. Modifica il valore HSL del campo desiderato
3. Clicca **"Salva Colori"**
4. Ricarica la pagina per vedere le modifiche

#### Formato HSL

I colori devono essere in formato **HSL** per compatibilità Tailwind:

```
hsl(HUE SATURATION% LIGHTNESS%)
```

**Esempi:**
- Bianco: `hsl(0 0% 100%)`
- Nero: `hsl(0 0% 0%)`
- Magenta: `hsl(320 85% 45%)`
- Viola: `hsl(280 70% 50%)`
- Blu: `hsl(220 85% 45%)`

**Strumenti utili:**
- [HSL Color Picker](https://hslpicker.com/)
- [Coolors.co](https://coolors.co/)

---

## Modifica Testi Homepage

### Tab "Homepage" nel Pannello

#### Campi modificabili

| Campo | Descrizione | Dove appare |
|-------|-------------|-------------|
| **Titolo Hero** | Titolo principale homepage | Sezione hero in alto |
| **Descrizione Hero** | Sottotitolo descrittivo | Sotto il titolo hero |
| **CTA Primario** | Testo pulsante principale | Hero section |
| **CTA Secondario** | Testo pulsante secondario | Hero section |
| **Titolo CTA Finale** | Titolo form contatti | Fine homepage |
| **Descrizione CTA Finale** | Descrizione form contatti | Sopra form finale |

#### Esempio Modifica

**Prima:**
```
Titolo Hero: "MUV Fitness Legnago | Centro Fitness Intelligente"
```

**Dopo:**
```
Titolo Hero: "Dimagrisci in 8 Settimane con EMS Training a Legnago"
```

**Procedura:**
1. Vai nel tab **"Homepage"**
2. Modifica il campo **"Titolo Hero"**
3. Clicca **"Salva Homepage"**
4. Ricarica la homepage per verificare

---

## Modifica Landing Pages

### Tab "Landing" nel Pannello

#### Campi modificabili

| Campo | Descrizione | Valore Default |
|-------|-------------|----------------|
| **Claim Principale** | Claim principale landing | "Trasforma il tuo corpo in 8 settimane" |
| **Incentivo Default** | Incentivo lead magnet | "Prova GRATUITA senza impegno" |
| **Countdown Ore** | Durata countdown urgenza | `48` ore |

#### Caso d'uso: Modifica Claim

**Scenario:** Vuoi testare un claim più diretto.

**Prima:**
```
Claim: "Trasforma il tuo corpo in 8 settimane"
```

**Dopo:**
```
Claim: "Dimagrisci 3-5kg in 8 settimane con EMS"
```

**Procedura:**
1. Tab **"Landing"**
2. Modifica **"Claim Principale"**
3. Salva
4. Tutte le landing useranno il nuovo claim di default

---

## Modifica Info Contatto

### Tab "Contatti" nel Pannello

#### Campi modificabili

| Campo | Descrizione | Esempio |
|-------|-------------|---------|
| **Telefono** | Numero visibile | `329 107 0374` |
| **Email** | Email contatti | `info@muvfitness.it` |
| **WhatsApp** | Numero WhatsApp (solo cifre) | `3291070374` |

#### Come cambiare numero WhatsApp

**Procedura:**
1. Tab **"Contatti"**
2. Campo **"WhatsApp (solo numeri)"**
3. Inserisci nuovo numero (es: `3401234567`)
4. Salva
5. Il link WhatsApp verrà generato automaticamente

**NOTA:** Il campo WhatsApp accetta **solo cifre**, senza spazi o simboli.

---

## Struttura Tecnica (per sviluppatori)

### Architettura Sistema

```
├── src/config/themeConfig.ts          # Valori DEFAULT
├── src/hooks/useSiteConfig.ts         # Hook React Query
├── src/pages/admin/ContentManagement.tsx  # Pannello Admin
└── Supabase: table site_config        # Storage configurazione
```

### Come funziona

1. **Default Values**: Definiti in `src/config/themeConfig.ts`
2. **Override Database**: Salvati in Supabase `site_config`
3. **Hook `useSiteConfig()`**: Legge da DB, fallback a default
4. **React Query**: Cache automatica 5 minuti
5. **Pannello Admin**: UI per modificare senza codice

### Aggiungere nuovi campi configurabili

#### 1. Aggiorna `themeConfig.ts`

```typescript
export const DEFAULT_HOMEPAGE_CONTENT = {
  heroTitle: '...',
  heroDescription: '...',
  // NUOVO CAMPO
  heroCallout: 'Risultati Garantiti o Soldi Indietro', 
};
```

#### 2. Aggiorna hook `useSiteConfig.ts`

Il tipo `ThemeConfig` si aggiornerà automaticamente.

#### 3. Aggiorna pannello admin

Aggiungi campo nel form:

```tsx
<div className="space-y-2">
  <Label htmlFor="heroCallout">Callout Hero</Label>
  <Input
    id="heroCallout"
    value={homepage.heroCallout}
    onChange={(e) => setHomepage({ ...homepage, heroCallout: e.target.value })}
  />
</div>
```

#### 4. Usa nel componente

```tsx
import { useHomepageContent } from '@/hooks/useSiteConfig';

const MUVHomepage = () => {
  const { content } = useHomepageContent();
  
  return (
    <div>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroCallout}</p> {/* NUOVO */}
    </div>
  );
};
```

### Invalidazione Cache

La cache React Query è di **5 minuti**. Per forzare ricarico:

```tsx
const { refetch } = useSiteConfig();
refetch(); // Forza reload da DB
```

### Query Supabase Manuale

Per debug o ispezione diretta:

```sql
-- Leggi tutta la configurazione
SELECT * FROM site_config;

-- Leggi solo colori
SELECT config_value FROM site_config WHERE config_key = 'theme_colors';

-- Update manuale (esempio)
UPDATE site_config 
SET config_value = '{"textOnDark": "hsl(0 0% 95%)"}'::jsonb
WHERE config_key = 'theme_colors';
```

---

## 🎯 Best Practices

### Colori
- ✅ Usa sempre formato HSL
- ✅ Testa contrasto testo/sfondo (WCAG AA)
- ✅ Mantieni coerenza brand
- ❌ Non usare RGB o HEX

### Testi
- ✅ Mantieni titoli < 100 caratteri
- ✅ Descrizioni concise (max 200 caratteri)
- ✅ CTA action-oriented ("Prenota", "Scopri")
- ❌ Evita testi troppo lunghi

### Testing
- ✅ Testa modifiche su desktop + mobile
- ✅ Verifica leggibilità testo
- ✅ Controlla layout dopo modifiche
- ✅ Testa tutti i form dopo cambio colori

---

## 🆘 Troubleshooting

### "Le modifiche non si vedono"

**Causa:** Cache React Query attiva.

**Soluzione:**
1. Aspetta 5 minuti (cache expire automatico)
2. Oppure: hard refresh browser (Ctrl+Shift+R)
3. Oppure: ricarica senza cache

### "Colore HSL non valido"

**Causa:** Formato errato.

**Soluzione:**
```
❌ hsl(320, 85%, 45%)    # Virgole NON supportate
✅ hsl(320 85% 45%)      # Spazi, NO virgole
```

### "Pannello admin non carica"

**Causa:** Problemi autenticazione o permessi.

**Soluzione:**
1. Verifica login admin
2. Controlla role `admin` in Supabase `user_roles`
3. Controlla console browser per errori

### "Campi vuoti dopo salvataggio"

**Causa:** Errore validazione backend.

**Soluzione:**
1. Controlla console browser
2. Verifica formato dati (HSL per colori, numeri per countdown)
3. Controlla permessi RLS su `site_config`

---

## 📞 Supporto

Per problemi tecnici o domande:
- **Email:** info@muvfitness.it
- **Documentazione tecnica:** `/docs/BUSINESS_DATA_STANDARD.md`
- **Codice sorgente:** `src/config/themeConfig.ts`

---

**Ultimo aggiornamento:** 2025-11-21
