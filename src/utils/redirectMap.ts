/**
 * DEPRECATED: Tutti i redirect sono ora gestiti server-side in netlify.toml
 * 
 * Questo file è mantenuto solo per riferimento storico.
 * I redirect 301 server-side sono preferibili per SEO rispetto ai redirect client-side.
 * 
 * @see netlify.toml per la configurazione attuale dei redirect
 */

// Mappa vuota - tutti i redirect ora in netlify.toml
export const redirectMap: Record<string, string> = {};

/**
 * @deprecated Usa netlify.toml per i redirect
 */
export const resolveRedirect = (_pathname: string): string | null => {
  return null;
};

/**
 * @deprecated Usa netlify.toml per i redirect
 */
export const shouldRedirect = (_pathname: string): boolean => {
  return false;
};
