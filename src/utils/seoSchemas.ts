// Comprehensive structured data schemas for MUV Fitness
// ⚠️ MIGRATO: Usa getLocalBusinessSchemaData() da src/config/businessData.ts

import { getLocalBusinessSchemaData, BUSINESS_DATA } from '@/config/businessData';

// Re-export della funzione centralizzata
export const getLocalBusinessSchema = getLocalBusinessSchemaData;

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BUSINESS_DATA.web.domain}/#organization`,
  "name": BUSINESS_DATA.name,
  "url": BUSINESS_DATA.web.domain,
  "logo": BUSINESS_DATA.branding.logo,
  "description": BUSINESS_DATA.description,
  "foundingDate": BUSINESS_DATA.business.foundingYear,
  "numberOfEmployees": BUSINESS_DATA.business.employeeRange,
  "slogan": BUSINESS_DATA.slogan,
  "knowsAbout": BUSINESS_DATA.services.map(s => s.category)
});

export const getServiceSchema = (serviceName: string, serviceDescription: string, serviceUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": serviceDescription,
  "url": serviceUrl,
  "provider": {
    "@type": "LocalBusiness",
    "name": BUSINESS_DATA.name,
    "url": BUSINESS_DATA.web.domain,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_DATA.address.street,
      "addressLocality": BUSINESS_DATA.address.city,
      "addressRegion": BUSINESS_DATA.address.region,
      "postalCode": BUSINESS_DATA.address.postalCode,
      "addressCountry": BUSINESS_DATA.address.countryCode
    }
  },
  "areaServed": BUSINESS_DATA.areasServed.filter(a => a.isPrimary).map(area => ({
    "@type": area.type,
    "name": area.name
  })),
  "serviceType": "Fitness Service",
  "category": "Health and Fitness"
});

export const getFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
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

export const getBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.muvfitness.it/#website",
  "name": "MUV Fitness",
  "url": "https://www.muvfitness.it",
  "description": "Centro fitness intelligente a Legnago",
  "publisher": {
    "@id": "https://www.muvfitness.it/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.muvfitness.it/blog?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "it-IT"
});