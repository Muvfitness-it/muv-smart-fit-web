/**
 * Internal Linking Utility for SEO Optimization
 * Automatically adds contextual internal links to blog content
 */

export interface LinkMapping {
  keyword: string;
  url: string;
  anchor?: string;
  maxOccurrences?: number;
}

// Comprehensive link mapping for MUV Fitness content (50+ keywords)
export const INTERNAL_LINK_MAP: LinkMapping[] = [
  // Services - Core
  { keyword: 'EMS', url: '/servizi/ems', anchor: 'allenamento EMS', maxOccurrences: 2 },
  { keyword: 'elettrostimolazione', url: '/servizi/ems', maxOccurrences: 1 },
  { keyword: 'EMS training', url: '/servizi/ems', maxOccurrences: 1 },
  { keyword: 'Vacuum', url: '/servizi/vacuum', maxOccurrences: 2 },
  { keyword: 'vacuum terapia', url: '/servizi/vacuum', maxOccurrences: 1 },
  { keyword: 'vacuum therapy', url: '/servizi/vacuum', maxOccurrences: 1 },
  { keyword: 'Pilates Reformer', url: '/servizi/pilates-reformer', maxOccurrences: 2 },
  { keyword: 'pilates', url: '/servizi/pilates-reformer', maxOccurrences: 1 },
  { keyword: 'reformer', url: '/servizi/pilates-reformer', maxOccurrences: 1 },
  { keyword: 'Pancafit', url: '/servizi/pancafit', maxOccurrences: 1 },
  { keyword: 'metodo Raggi', url: '/servizi/pancafit', maxOccurrences: 1 },
  { keyword: 'nutrizione', url: '/servizi/nutrizione', maxOccurrences: 2 },
  { keyword: 'piano alimentare', url: '/servizi/nutrizione', maxOccurrences: 1 },
  { keyword: 'nutrizionista', url: '/servizi/nutrizione', maxOccurrences: 1 },
  { keyword: 'dieta personalizzata', url: '/servizi/nutrizione', maxOccurrences: 1 },
  { keyword: 'over 60', url: '/servizi/over-60', maxOccurrences: 1 },
  { keyword: 'senior fitness', url: '/servizi/over-60', maxOccurrences: 1 },
  { keyword: 'fitness anziani', url: '/servizi/over-60', maxOccurrences: 1 },
  { keyword: 'small group', url: '/servizi/small-group', maxOccurrences: 1 },
  { keyword: 'allenamento gruppo', url: '/servizi/small-group', maxOccurrences: 1 },
  { keyword: 'sauna infrarossi', url: '/servizi/sauna-infrarossi', maxOccurrences: 1 },
  
  // Goals & Objectives
  { keyword: 'dimagrire', url: '/servizi/ems', anchor: 'dimagrire con EMS', maxOccurrences: 1 },
  { keyword: 'perdere peso', url: '/servizi/ems', maxOccurrences: 1 },
  { keyword: 'tonificare', url: '/servizi/ems', anchor: 'tonificazione muscolare', maxOccurrences: 1 },
  { keyword: 'aumentare massa', url: '/servizi/ems', maxOccurrences: 1 },
  { keyword: 'definizione muscolare', url: '/servizi/ems', maxOccurrences: 1 },
  { keyword: 'ricomposizione corporea', url: '/servizi/ems', maxOccurrences: 1 },
  { keyword: 'cellulite', url: '/servizi/vacuum', anchor: 'trattamento cellulite', maxOccurrences: 1 },
  
  // Pathologies & Conditions
  { keyword: 'mal di schiena', url: '/servizi/pancafit', anchor: 'sollievo mal di schiena', maxOccurrences: 1 },
  { keyword: 'lombalgia', url: '/servizi/pancafit', maxOccurrences: 1 },
  { keyword: 'cervicale', url: '/servizi/pancafit', maxOccurrences: 1 },
  { keyword: 'postura', url: '/servizi/pancafit', anchor: 'miglioramento posturale', maxOccurrences: 1 },
  { keyword: 'scoliosi', url: '/servizi/pancafit', maxOccurrences: 1 },
  { keyword: 'ernia', url: '/servizi/pancafit', maxOccurrences: 1 },
  
  // Landing pages
  { keyword: 'trasformazione 30 giorni', url: '/trasformazione-30-giorni', maxOccurrences: 1 },
  { keyword: 'prova gratuita', url: '/prova-gratuita-ems', maxOccurrences: 1 },
  { keyword: 'prima seduta gratis', url: '/prova-gratuita-ems', maxOccurrences: 1 },
  
  // Main pages
  { keyword: 'risultati', url: '/risultati', maxOccurrences: 1 },
  { keyword: 'testimonianze', url: '/risultati', maxOccurrences: 1 },
  { keyword: 'prima e dopo', url: '/risultati', maxOccurrences: 1 },
  { keyword: 'metodo MUV', url: '/metodo', maxOccurrences: 2 },
  { keyword: 'metodo', url: '/metodo', maxOccurrences: 1 },
  { keyword: 'chi siamo', url: '/chi-siamo', maxOccurrences: 1 },
  { keyword: 'team MUV', url: '/team', maxOccurrences: 1 },
  { keyword: 'personal trainer', url: '/team', maxOccurrences: 1 },
  { keyword: 'contatti', url: '/contatti', maxOccurrences: 1 },
  { keyword: 'prenota', url: '/contatti', anchor: 'prenota una consulenza', maxOccurrences: 1 },
  
  // Local SEO - Cities
  { keyword: 'personal trainer Legnago', url: '/', maxOccurrences: 1 },
  { keyword: 'palestra Legnago', url: '/', maxOccurrences: 1 },
  { keyword: 'fitness Legnago', url: '/', maxOccurrences: 1 },
  { keyword: 'personal trainer Cerea', url: '/personal-trainer-cerea', maxOccurrences: 1 },
  { keyword: 'personal trainer Minerbe', url: '/personal-trainer-minerbe', maxOccurrences: 1 },
  { keyword: 'Basso Veronese', url: '/', maxOccurrences: 1 },
  
  // Blog & Educational
  { keyword: 'blog fitness', url: '/blog', maxOccurrences: 1 },
  { keyword: 'articoli', url: '/blog', maxOccurrences: 1 },
  { keyword: 'tecnologie', url: '/tecnologie', maxOccurrences: 1 },
  { keyword: 'attrezzature', url: '/tecnologie', maxOccurrences: 1 },
];

/**
 * Adds internal links to content while preserving HTML structure
 * @param content - HTML content as string
 * @param currentSlug - Current article slug to avoid self-linking
 * @returns Content with internal links added
 */
export const addInternalLinks = (content: string, currentSlug: string): string => {
  if (!content) return content;

  let linkedContent = content;
  const linkOccurrences: Record<string, number> = {};

  // Sort by keyword length (longest first) to avoid partial matches
  const sortedMappings = [...INTERNAL_LINK_MAP].sort((a, b) => b.keyword.length - a.keyword.length);

  sortedMappings.forEach(({ keyword, url, anchor, maxOccurrences = 1 }) => {
    // Don't link to current page
    if (url === `/${currentSlug}` || url.includes(currentSlug)) {
      return;
    }

    // Track occurrences
    if (!linkOccurrences[keyword]) {
      linkOccurrences[keyword] = 0;
    }

    // Create regex to find keyword outside of existing HTML tags
    // Negative lookbehind/lookahead to avoid matching inside tags or existing links
    const regex = new RegExp(
      `(?<!<[^>]*)\\b(${keyword})\\b(?![^<]*>)(?![^<]*<\/a>)`,
      'gi'
    );

    linkedContent = linkedContent.replace(regex, (match) => {
      if (linkOccurrences[keyword] >= maxOccurrences) {
        return match;
      }
      
      linkOccurrences[keyword]++;
      const linkText = anchor || match;
      return `<a href="${url}" class="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors" rel="noopener">${linkText}</a>`;
    });
  });

  return linkedContent;
};

/**
 * Extracts keywords from content for semantic analysis
 * @param content - HTML content
 * @returns Array of detected keywords
 */
export const extractKeywords = (content: string): string[] => {
  const keywords: string[] = [];
  const textContent = content.replace(/<[^>]*>/g, ' ').toLowerCase();

  INTERNAL_LINK_MAP.forEach(({ keyword }) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    if (regex.test(textContent)) {
      keywords.push(keyword);
    }
  });

  return [...new Set(keywords)];
};

/**
 * Suggests related articles based on shared keywords
 * @param currentKeywords - Keywords from current article
 * @param allArticles - All available articles with their keywords
 * @returns Array of related article slugs
 */
export const suggestRelatedArticles = (
  currentKeywords: string[],
  allArticles: Array<{ slug: string; keywords: string[] }>
): string[] => {
  const scores = allArticles.map((article) => {
    const commonKeywords = article.keywords.filter((k) =>
      currentKeywords.includes(k)
    );
    return {
      slug: article.slug,
      score: commonKeywords.length,
    };
  });

  return scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.slug);
};
