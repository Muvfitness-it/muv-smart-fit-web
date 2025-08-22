// Utility for determining blog post accent color based on slug
export const getPostAccentHue = (slug: string): number => {
  const lowerSlug = slug.toLowerCase();

  // Dimagrimento/EMS - Magenta brand
  if (lowerSlug.includes('dimagrire') || 
      lowerSlug.includes('ems') || 
      lowerSlug.includes('checklist-pre-post-allenamento') || 
      lowerSlug.includes('2-volte-a-settimana')) {
    return 312;
  }

  // Postura/Pancafit/Reformer - Viola
  if (lowerSlug.includes('mal-di-schiena') || 
      lowerSlug.includes('pancafit') || 
      lowerSlug.includes('pilates-reformer') || 
      lowerSlug.includes('ergonomia')) {
    return 265;
  }

  // Cellulite/Pressoterapia/Drenaggio - Blu
  if (lowerSlug.includes('cellulite') || 
      lowerSlug.includes('ritenzione') || 
      lowerSlug.includes('pressoterapia')) {
    return 215;
  }

  // Guide generali/Nutrizione/Misure - Blu tenue
  if (lowerSlug.includes('nutrizione') || 
      lowerSlug.includes('misure') || 
      lowerSlug.includes('quanto-si-dimagrisce')) {
    return 205;
  }

  // Default: magenta brand
  return 312;
};

// Clean content by removing inline colors and replacing with semantic markup
export const cleanBlogContent = (content: string): string => {
  let cleaned = content;

  // Elimina colori inline e sostituisci con <strong>
  cleaned = cleaned.replace(
    /(<span[^>]*style="[^"]*color:[^"]*"[^>]*>)(.*?)(<\/span>)/gi,
    '<strong>$2</strong>'
  );

  // Rimuovi classi colore (text-*) lasciando la classe restante
  cleaned = cleaned.replace(
    /class="([^"]*?)text-[^"\s]+([^"]*?)"/g,
    'class="$1$2"'
  );

  // Sostituisci <b>→<strong>, <i>→<em>
  cleaned = cleaned.replace(/<b\b[^>]*>/gi, '<strong>');
  cleaned = cleaned.replace(/<\/b>/gi, '</strong>');
  cleaned = cleaned.replace(/<i\b[^>]*>/gi, '<em>');
  cleaned = cleaned.replace(/<\/i>/gi, '</em>');

  // Doppie spaziature → singola
  cleaned = cleaned.replace(/\s{2,}/g, ' ');

  return cleaned;
};

// Generate hero section for blog posts
export const generatePostHero = (title: string, publishedAt?: string, readingTime?: number): string => {
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('it-IT') : new Date().toLocaleDateString('it-IT');
  const minutes = readingTime || 5;

  return `
    <header class="post-hero">
      <span class="post-hero-label">Guida • Metodo MUV</span>
      <h1>${title}</h1>
      <p class="meta">Team MUV • Aggiornato il ${date} • Lettura ${minutes} minuti</p>
    </header>
  `;
};

// Process content for dynamic emphasis blocks
export const processContentBlocks = (content: string): string => {
  let processed = content;

  // Convert highlighted text to .key blocks
  processed = processed.replace(
    /<p[^>]*class="[^"]*highlight[^"]*"[^>]*>(.*?)<\/p>/gi,
    '<p class="key">$1</p>'
  );

  // Wrap table of contents
  processed = processed.replace(
    /(<h[2-6][^>]*>.*?indice.*?<\/h[2-6]>)/gi,
    '<nav class="toc">$1</nav>'
  );

  return processed;
};