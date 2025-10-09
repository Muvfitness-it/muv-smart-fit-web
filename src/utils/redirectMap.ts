/**
 * Mappa dei redirect 301 per mantenere la SEO durante la ristrutturazione
 * Da URL legacy → Nuove URL canoniche
 */

export const redirectMap: Record<string, string> = {
  // Homepage variants
  '/home': '/',
  '/index': '/',
  '/homepage': '/',
  
  // Servizi - Normalizzazione slug
  '/allenamento-ems-legnago': '/servizi/ems-legnago/',
  '/pilates-legnago': '/servizi/pilates-reformer-legnago/',
  '/mal-di-schiena-legnago': '/servizi/postura-mal-di-schiena-legnago/',
  '/massaggio-sportivo-legnago': '/servizi/postura-mal-di-schiena-legnago/',
  '/dimagrire-legnago': '/servizi/ems-legnago/',
  '/personal-trainer-legnago': '/servizi/ems-legnago/',
  
  // Servizi generici → Hub
  '/servizio': '/servizi/',
  '/servizio/': '/servizi/',
  '/allenamento': '/servizi/',
  
  // Chi Siamo variants
  '/chi-siamo': '/team/',
  '/chi-siamo-new': '/team/',
  '/about': '/team/',
  '/about-us': '/team/',
  
  // Contatti variants
  '/contatto': '/contatti/',
  '/form-contatti': '/contatti/',
  '/prenota': '/contatti/',
  '/booking': '/contatti/',
  
  // Landing pages obsolete → Servizi specifici
  '/landing/prova-gratuita-ems': '/servizi/ems-legnago/',
  '/landing/gravidanza-post-parto': '/servizi/postura-mal-di-schiena-legnago/',
  '/landing/senior-fitness': '/servizi/over-60-legnago/',
  '/landing/riabilitazione-infortuni': '/servizi/postura-mal-di-schiena-legnago/',
  '/landing/trasformazione-30-giorni': '/servizi/ems-legnago/',
  
  // Old service pages
  '/ems': '/servizi/ems-legnago/',
  '/ems-page': '/servizi/ems-legnago/',
  '/pilates': '/servizi/pilates-reformer-legnago/',
  '/pancafit': '/servizi/postura-mal-di-schiena-legnago/',
  '/vacuum-pressoterapia': '/servizi/cellulite-vacuum-pressoterapia-legnago/',
  '/massoterapia': '/servizi/postura-mal-di-schiena-legnago/',
  '/nutrizione': '/servizi/postura-mal-di-schiena-legnago/',
  '/nutrizione-psicocoach': '/servizi/postura-mal-di-schiena-legnago/',
  '/psicologo': '/servizi/postura-mal-di-schiena-legnago/',
  '/personal-training': '/servizi/ems-legnago/',
  '/small-group': '/servizi/ems-legnago/',
  '/hiit': '/servizi/ems-legnago/',
  
  // Altre pagine
  '/risultati': '/risultati/',
  '/recensioni': '/risultati/',
  '/testimonianze': '/risultati/',
  '/faq': '/contatti/',
  '/faq-gbp': '/contatti/',
  '/come-arrivare': '/contatti/',
  '/privacy': '/privacy/',
  '/cookie-policy': '/cookie-policy/',
  
  // Admin & Analytics (mantenere invariati)
  // Nessun redirect per /admin, /analytics, etc.
};

/**
 * Funzione helper per risolvere i redirect
 * @param pathname - Path corrente
 * @returns Nuovo path o null se nessun redirect
 */
export const resolveRedirect = (pathname: string): string | null => {
  // Normalizza il path (rimuovi trailing slash per il confronto)
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  return redirectMap[normalizedPath] || null;
};

/**
 * Funzione per verificare se un path richiede redirect
 */
export const shouldRedirect = (pathname: string): boolean => {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
    
  return normalizedPath in redirectMap;
};
