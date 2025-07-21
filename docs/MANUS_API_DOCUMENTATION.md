# API Documentation per ChatGPT/AI Assistant

## Autenticazione AI

### POST /ai-auth
Autentica ChatGPT e ottiene un token temporaneo valido 24h.

**Request Body:**
```json
{
  "email": "vincenzo9141@libero.it",
  "password": "your_password",
  "aiKey": "your_ai_access_key"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "vincenzo9141@libero.it"
  },
  "aiToken": "ai_token_here",
  "message": "AI authentication successful"
}
```

**AI Access Key:** `AI_ACCESS_KEY` (definita nei secrets Supabase)

---

## Pubblicazione Blog

### POST /ai-blog-publish
Crea e pubblica un nuovo articolo sul blog.

**Headers:**
```
Authorization: Bearer {ai_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Titolo dell'Articolo",
  "content": "Contenuto completo dell'articolo in markdown o HTML",
  "excerpt": "Breve descrizione dell'articolo (opzionale)",
  "meta_title": "Titolo SEO (opzionale)",
  "meta_description": "Descrizione SEO (opzionale)", 
  "meta_keywords": "parole,chiave,seo (opzionale)",
  "featured_image": "URL immagine in evidenza (opzionale)",
  "status": "published", // "published" o "draft"
  "format": "markdown" // "markdown", "html", o "json"
}
```

**Response Success:**
```json
{
  "success": true,
  "article": {
    "id": "article_id",
    "title": "Titolo dell'Articolo",
    "slug": "titolo-dell-articolo",
    "status": "published",
    "published_at": "2025-07-21T16:45:00Z",
    "url": "https://muvfitness.com/blog/titolo-dell-articolo"
  }
}
```

---

### PUT/PATCH /ai-blog-update/{article_id}
Aggiorna un articolo esistente.

**Headers:**
```
Authorization: Bearer {ai_token}
Content-Type: application/json
```

**Request Body:** (campi opzionali - aggiorna solo quelli forniti)
```json
{
  "title": "Nuovo Titolo (opzionale)",
  "content": "Nuovo contenuto (opzionale)",
  "excerpt": "Nuova descrizione (opzionale)",
  "meta_title": "Nuovo titolo SEO (opzionale)",
  "meta_description": "Nuova descrizione SEO (opzionale)",
  "meta_keywords": "nuove,parole,chiave (opzionale)",
  "featured_image": "Nuovo URL immagine (opzionale)",
  "status": "published" // "published" o "draft"
}
```

**Response:** Stesso formato del create

---

## Formati Supportati

### 1. Markdown (consigliato)
```markdown
# Titolo H1
## Sottotitolo H2

Paragrafo con **grassetto** e *corsivo*.

- Lista puntata
- Elemento 2

[Link](https://example.com)

![Immagine](url-immagine)
```

### 2. HTML
```html
<h1>Titolo H1</h1>
<h2>Sottotitolo H2</h2>
<p>Paragrafo con <strong>grassetto</strong> e <em>corsivo</em>.</p>
<ul>
  <li>Lista puntata</li>
  <li>Elemento 2</li>
</ul>
```

### 3. JSON Strutturato
```json
{
  "type": "article",
  "blocks": [
    {
      "type": "heading",
      "level": 1,
      "content": "Titolo H1"
    },
    {
      "type": "paragraph", 
      "content": "Contenuto del paragrafo"
    }
  ]
}
```

---

## Gestione Immagini

Per ora le immagini devono essere:
1. Già caricate su un servizio esterno (Unsplash, CDN, etc.)
2. Fornite tramite URL pubblici nel campo `featured_image`
3. Incluse nel contenuto tramite markdown/HTML con URL esterni

**Formati immagine consigliati:** JPG, PNG, WebP
**Dimensioni consigliate:** 1200x630px per immagini in evidenza

---

# Manus Agent API Documentation (Legacy)

## Base URL
```
https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/blog-auto-post
```

## Authentication
Tutte le richieste devono includere l'header:
```
x-manus-api-key: YOUR_MANUS_API_KEY
```

## Endpoints

### 1. Creare un Nuovo Articolo
**POST** `/create`

Crea un nuovo articolo del blog con tutti i metadati necessari.

#### Request Body
```json
{
  "title": "Titolo dell'articolo (OBBLIGATORIO)",
  "content": "Contenuto completo dell'articolo in HTML (OBBLIGATORIO)",
  "excerpt": "Riassunto breve (opzionale - generato automaticamente se omesso)",
  "featured_image": "URL dell'immagine in evidenza (opzionale)",
  "author_name": "Nome autore (default: 'MUV Team')",
  "author_email": "Email autore (opzionale)",
  "category_id": "UUID della categoria (opzionale)",
  "status": "draft | published (default: 'draft')",
  "meta_title": "Titolo SEO (opzionale - usa title se omesso)",
  "meta_description": "Descrizione SEO (opzionale - usa excerpt se omesso)",
  "meta_keywords": "Parole chiave SEO (opzionale - generate automaticamente)",
  "tags": ["tag1", "tag2", "tag3"]
}
```

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "id": "uuid-dell-articolo",
    "slug": "slug-generato-automaticamente",
    "title": "Titolo dell'articolo",
    "status": "draft",
    "reading_time": 5,
    "created_at": "2024-01-01T12:00:00Z"
  },
  "message": "Blog post created successfully"
}
```

#### Response Error (400/409/500)
```json
{
  "success": false,
  "error": "Descrizione dell'errore"
}
```

### 2. Ottenere Categorie Disponibili
**GET** `/categories`

Restituisce tutte le categorie disponibili per il blog.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-categoria",
      "name": "Nome Categoria",
      "slug": "slug-categoria",
      "description": "Descrizione categoria",
      "color": "#3B82F6"
    }
  ]
}
```

### 3. Verificare Disponibilità Slug
**GET** `/check-slug?slug=mio-slug`

Verifica se uno slug è già in uso.

#### Response
```json
{
  "success": true,
  "data": {
    "slug": "mio-slug",
    "available": true
  }
}
```

### 4. Statistiche Blog
**GET** `/stats`

Restituisce statistiche generali del blog.

#### Response
```json
{
  "success": true,
  "data": {
    "total_posts": 45,
    "published_posts": 30,
    "draft_posts": 15
  }
}
```

## Codici di Errore

| Codice | Descrizione |
|--------|-------------|
| 400 | Dati richiesta non validi |
| 401 | API key non valida o mancante |
| 404 | Endpoint non trovato |
| 409 | Slug già esistente |
| 500 | Errore interno del server |

## Esempi di Utilizzo

### Esempio cURL - Creare Articolo
```bash
curl -X POST "https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/blog-auto-post/create" \
  -H "Content-Type: application/json" \
  -H "x-manus-api-key: YOUR_API_KEY" \
  -d '{
    "title": "5 Benefici dell'\''Allenamento EMS",
    "content": "<h2>Introduzione</h2><p>L'\''allenamento EMS rappresenta una rivoluzione...</p>",
    "excerpt": "Scopri i principali vantaggi dell'\''elettrostimolazione muscolare",
    "status": "published",
    "tags": ["EMS", "fitness", "allenamento", "tecnologia"]
  }'
```

### Esempio JavaScript
```javascript
const response = await fetch('https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/blog-auto-post/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-manus-api-key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    title: "Guida Completa al Personal Training",
    content: "<h2>Cos'è il Personal Training</h2><p>Il personal training è...</p>",
    status: "draft",
    tags: ["personal-training", "fitness", "guida"]
  })
});

const result = await response.json();
console.log(result);
```

## Note Importanti

1. **Slug Automatico**: Lo slug viene generato automaticamente dal titolo, rimuovendo caratteri speciali e spazi
2. **Reading Time**: Calcolato automaticamente basato su ~200 parole al minuto
3. **SEO**: Meta title, description e keywords vengono generate automaticamente se non fornite
4. **Tags**: I tag vengono creati automaticamente se non esistono già
5. **Excerpt**: Se non fornito, viene estratto automaticamente dai primi 150 caratteri del contenuto
6. **Rate Limiting**: L'API ha limiti di velocità per prevenire abusi

## Supporto
Per problemi o domande sull'API, contattare il team di sviluppo MUV Fitness.