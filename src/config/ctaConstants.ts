// Standard CTA constants for consistent messaging across the site
// All CTAs should use these constants for brand alignment

import { BUSINESS_DATA } from './businessData';

export const STANDARD_CTAS = {
  // Primary CTAs
  primary: "Prenota la tua consulenza gratuita",
  primaryShort: "Prenota consulenza",
  bookTour: "Prenota un tour",
  
  // Secondary CTAs
  secondary: "Scopri il Metodo MUV",
  discoverMore: "Scopri di più",
  seeResults: "Vedi i risultati",
  
  // Contact CTAs
  whatsapp: "Scrivici su WhatsApp",
  call: "Chiamaci",
  email: "Scrivici",
  
  // Service-specific CTAs
  freeTrialEMS: "Prova gratuita EMS",
  freeTrialPilates: "Lezione prova Pilates",
  posturalEvaluation: "Valutazione posturale gratuita",
  
  // Form CTAs
  submitForm: "Invia richiesta",
  requestInfo: "Richiedi informazioni"
} as const;

// Standard contact links using BUSINESS_DATA
export const CONTACT_LINKS = {
  whatsapp: BUSINESS_DATA.contact.whatsappLink,
  whatsappWithMessage: (message: string) => 
    `https://wa.me/${BUSINESS_DATA.contact.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`,
  phone: `tel:${BUSINESS_DATA.contact.phoneInternational}`,
  email: `mailto:${BUSINESS_DATA.contact.email}`,
  maps: BUSINESS_DATA.geo.googleMapsUrl
} as const;

// Standard messages for WhatsApp
export const WHATSAPP_MESSAGES = {
  generic: "Ciao! Vorrei informazioni sui vostri servizi.",
  ems: "Ciao! Vorrei informazioni sull'EMS Training.",
  pilates: "Ciao! Vorrei informazioni sul Pilates Reformer.",
  vacuum: "Ciao! Vorrei informazioni sulla Vacuum Pressoterapia.",
  consultation: "Ciao! Vorrei prenotare una consulenza gratuita."
} as const;
