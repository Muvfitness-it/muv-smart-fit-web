/**
 * Centralized Schema Export
 * Tutti gli schemi JSON-LD per SEO avanzata
 */

export { getGEOLocalBusinessSchema } from './localBusiness';
// Backward compatibility
export { getGEOLocalBusinessSchema as localBusinessSchema } from './localBusiness';
export { generateBreadcrumbSchema, breadcrumbPresets } from './breadcrumb';

// Service Schema Generator
export const generateServiceSchema = (serviceName: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "HealthAndBeautyBusiness",
      "name": "MUV Fitness Legnago",
      "url": "https://www.muvfitness.it"
    },
    "areaServed": {
      "@type": "City",
      "name": "Legnago",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Verona"
      }
    },
    "url": `https://www.muvfitness.it${url}`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceName,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    }
  };
};

// FAQ Schema Generator
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
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
  };
};

// Review Schema Generator
export const generateReviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@type": "HealthAndBeautyBusiness",
      "name": "MUV Fitness Legnago"
    }
  }));
};

// Article Schema Generator (per blog)
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "image": article.image || "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png",
    "url": `https://www.muvfitness.it${article.url}`,
    "publisher": {
      "@type": "Organization",
      "name": "MUV Fitness Legnago",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png"
      }
    }
  };
};
