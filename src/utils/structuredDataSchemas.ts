// Structured data schemas for different page types
// ⚠️ MIGRATO: Usa getLocalBusinessSchemaData() da src/config/businessData.ts

import { getLocalBusinessSchemaData, BUSINESS_DATA } from '@/config/businessData';

// Re-export per retrocompatibilità
export const generateLocalBusinessSchema = getLocalBusinessSchemaData;

export const generateServiceSchema = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "LocalBusiness",
    "name": BUSINESS_DATA.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_DATA.address.street,
      "addressLocality": BUSINESS_DATA.address.city,
      "postalCode": BUSINESS_DATA.address.postalCode,
      "addressRegion": BUSINESS_DATA.address.region,
      "addressCountry": BUSINESS_DATA.address.countryCode
    }
  },
  "areaServed": BUSINESS_DATA.areasServed.map(area => area.name).join(", "),
  "serviceType": "Fitness Training",
  ...(price && { "offers": {
    "@type": "Offer",
    "price": price,
    "priceCurrency": "EUR"
  }})
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateArticleSchema = (title: string, description: string, author: string, publishedDate: string, imageUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Person",
    "name": author
  },
  "publisher": {
    "@type": "Organization",
    "name": "MUV Fitness",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
    }
  },
  "datePublished": publishedDate,
  "dateModified": publishedDate,
  ...(imageUrl && {
    "image": {
      "@type": "ImageObject",
      "url": imageUrl
    }
  })
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Service-specific schemas and FAQs
export const personalTrainingFAQs = [
  {
    question: "Quanto costa una sessione di personal training a Legnago?",
    answer: "I costi variano in base al pacchetto scelto. Offriamo sessioni singole e pacchetti mensili. Contattaci per un preventivo personalizzato e approfitta della prova gratuita."
  },
  {
    question: "Quanto dura una sessione di personal training?",
    answer: "Ogni sessione dura circa 60 minuti, durante i quali il trainer si dedica esclusivamente a te per ottimizzare ogni minuto di allenamento."
  },
  {
    question: "È necessaria esperienza precedente in palestra?",
    answer: "No, il personal training è adatto a tutti i livelli. I nostri trainer adattano gli esercizi alle tue capacità attuali e ti guidano progressivamente verso i tuoi obiettivi."
  }
];

export const emsFAQs = [
  {
    question: "L'allenamento EMS è sicuro?",
    answer: "Sì, l'EMS è completamente sicuro quando praticato con attrezzature certificate e sotto la supervisione di trainer qualificati come quelli di MUV Fitness."
  },
  {
    question: "Quante volte a settimana posso fare EMS?",
    answer: "Si consiglia di fare EMS 2-3 volte a settimana per permettere il recupero muscolare e massimizzare i risultati."
  },
  {
    question: "Posso fare EMS se ho problemi cardiaci?",
    answer: "È importante consultare il proprio medico prima di iniziare qualsiasi programma di allenamento, incluso l'EMS, specialmente in presenza di condizioni mediche."
  }
];

export const pilatesFAQs = [
  {
    question: "Il Pilates aiuta con il mal di schiena?",
    answer: "Sì, il Pilates è particolarmente efficace per rafforzare il core e migliorare la postura, aiutando a ridurre e prevenire il mal di schiena."
  },
  {
    question: "Devo portare attrezzature specifiche per il Pilates?",
    answer: "No, forniamo tutto il necessario. Ti consigliamo di indossare abbigliamento comodo e scarpe da ginnastica."
  },
  {
    question: "Il Pilates è adatto agli uomini?",
    answer: "Assolutamente sì! Il Pilates è stato creato da un uomo, Joseph Pilates, ed è benefico per tutti indipendentemente dal genere."
  }
];