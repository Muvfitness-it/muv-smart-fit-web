/**
 * THEME CONFIGURATION
 *
 * Configurazione centralizzata per colori, testi e contenuti del sito MUV Fitness.
 * Tutti i valori qui definiti possono essere sovrascritti tramite il pannello admin
 * in /admin/contenuti-base dove vengono salvati su Supabase nella tabella site_config.
 *
 * IMPORTANTE: Questo file contiene i VALORI DI DEFAULT.
 * Per modificare i contenuti live del sito, usa il pannello admin.
 */

// ============= COLORI TEMA =============
// Tutti i colori sono in formato HSL per compatibilità con Tailwind CSS
export const DEFAULT_THEME_COLORS = {
  // Colori testo
  textOnDark: "hsl(0 0% 100%)", // Bianco per sfondi scuri
  textOnLight: "hsl(220 15% 15%)", // Grigio scuro per sfondi chiari

  // Colori pulsanti (HSL da index.css)
  buttonPrimary: "hsl(320 85% 45%)", // Magenta - CTA principale
  buttonSecondary: "hsl(280 70% 50%)", // Viola - CTA secondario
  buttonAccent: "hsl(220 85% 45%)", // Blu - Accenti

  // Colori form
  formBackground: "hsl(0 0% 100%)", // Sfondo form bianco
  formText: "hsl(220 15% 15%)", // Testo form grigio scuro
  formBorder: "hsl(220 15% 90%)", // Bordi form grigio chiaro
  formPlaceholder: "hsl(220 15% 60%)", // Placeholder grigio medio

  // Gradienti (per hero e CTA)
  gradientPrimary: "linear-gradient(135deg, hsl(320 85% 45%), hsl(280 70% 50%))",
  gradientSecondary: "linear-gradient(135deg, hsl(280 70% 50%), hsl(220 85% 45%))",
};

// ============= CONTENUTI HOMEPAGE =============
export const DEFAULT_HOMEPAGE_CONTENT = {
  // Hero Section
  heroTitle: "MUV Fitness Legnago | Centro Fitness Intelligente con EMS, Pilates Reformer e Tecnologie Avanzate",
  heroDescription:
    "Il centro fitness più innovativo di Legnago. Tecnologie avanzate per dimagrire velocemente e correggere la postura: EMS Training, Pilates Reformer, Vacuum Therapy. Allenamenti personalizzati basati su scienza e risultati. Prova gratuita senza impegno.",
  heroPrimaryCTA: "Prenota la tua Prova Gratuita",
  heroSecondaryCTA: "Scopri il Metodo MUV",

  // CTA Finale
  finalCTATitle: "Prenota la Tua Prova Gratuita",
  finalCTADescription:
    "90 minuti di valutazione completa, presentazione del protocollo personalizzato e sessione trial. Zero impegno, massima trasparenza.",
};

// ============= CONTENUTI LANDING PAGES =============
export const DEFAULT_LANDING_CONTENT = {
  defaultClaim: "Trasforma il tuo corpo in 8 settimane",
  defaultIncentive: "Prova GRATUITA senza impegno",
  countdownDefault: 48, // Ore countdown di default

  // Varianti claims per A/B testing
  claimVariants: [
    "Trasforma il tuo corpo in 8 settimane",
    "Dimagrisci 3-5kg in 8 settimane con EMS",
    "Risultati visibili dalla 4a settimana",
    "Allenamenti da 45 minuti, risultati da 90",
  ],
};

// ============= INFO CONTATTO =============
export const DEFAULT_CONTACT_INFO = {
  phone: "329 107 0374",
  email: "info@muvfitness.it",
  whatsappNumber: "3291070374",
  whatsappLink: "https://wa.me/3291070374",

  // Visibilità elementi contatto
  showPhone: true,
  showEmail: true,
  showWhatsApp: true,
};

// ============= TIPO CONFIGURAZIONE =============
export type ThemeConfig = {
  colors: typeof DEFAULT_THEME_COLORS;
  homepage: typeof DEFAULT_HOMEPAGE_CONTENT;
  landing: typeof DEFAULT_LANDING_CONTENT;
  contact: typeof DEFAULT_CONTACT_INFO;
};

// ============= EXPORT CONFIGURAZIONE COMPLETA =============
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  colors: DEFAULT_THEME_COLORS,
  homepage: DEFAULT_HOMEPAGE_CONTENT,
  landing: DEFAULT_LANDING_CONTENT,
  contact: DEFAULT_CONTACT_INFO,
};
