import React from 'react';
import { Helmet } from 'react-helmet';
import { BUSINESS_DATA } from '@/config/businessData';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'HealthAndBeautyBusiness' | 'SportsActivityLocation' | 'Article' | 'WebPage' | 'FAQPage';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseContext = "https://schema.org";
    
    switch (type) {
      case 'LocalBusiness':
      case 'HealthAndBeautyBusiness':
      case 'SportsActivityLocation':
        return {
          "@context": baseContext,
          "@type": type,
          "@id": `${BUSINESS_DATA.web.domain}/#organization`,
          "name": BUSINESS_DATA.name,
          "alternateName": BUSINESS_DATA.alternateName,
          "description": BUSINESS_DATA.description,
          "url": BUSINESS_DATA.web.domain,
          "telephone": BUSINESS_DATA.contact.phone,
          "email": BUSINESS_DATA.contact.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": BUSINESS_DATA.address.street,
            "addressLocality": BUSINESS_DATA.address.city,
            "addressRegion": BUSINESS_DATA.address.region,
            "postalCode": BUSINESS_DATA.address.postalCode,
            "addressCountry": BUSINESS_DATA.address.countryCode
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "45.1914",
            "longitude": "11.3065"
          },
          "openingHours": [
            "Mo-Fr 08:00-21:00",
            "Sa 08:00-12:00"
          ],
          "priceRange": "€€",
          "image": [
            "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
          ],
          "sameAs": [
            "https://www.facebook.com/MuvLegnago/",
            "https://www.instagram.com/MuvLegnago/"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servizi Fitness MUV",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Personal Training",
                  "description": "Allenamenti personalizzati one-to-one con trainer certificati"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "EMS Training",
                  "description": "Tecnologia di elettrostimolazione muscolare per risultati rapidi"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pilates",
                  "description": "Corsi di Pilates per postura e flessibilità"
                }
              }
            ]
          },
          
          ...data
        };

      case 'Article':
        return {
          "@context": baseContext,
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image || "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
          "author": {
            "@type": "Person",
            "name": data.author || "MUV Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "MUV Fitness",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
            }
          },
          "datePublished": data.publishedDate,
          "dateModified": data.modifiedDate || data.publishedDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          },
          ...data
        };

      case 'FAQPage':
        return {
          "@context": baseContext,
          "@type": "FAQPage",
          "mainEntity": data.faqs?.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || []
        };

      case 'WebPage':
        return {
          "@context": baseContext,
          "@type": "WebPage",
          "name": data.title,
          "description": data.description,
          "url": data.url,
          "inLanguage": "it-IT",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://www.muvfitness.it/#website"
          },
          "about": {
            "@type": "LocalBusiness",
            "@id": "https://www.muvfitness.it/#organization"
          },
          "breadcrumb": data.breadcrumbs ? {
            "@type": "BreadcrumbList",
            "itemListElement": data.breadcrumbs.map((crumb: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `https://www.muvfitness.it${crumb.url}`
            }))
          } : undefined,
          ...data
        };

      default:
        return {
          "@context": baseContext,
          "@type": type,
          ...data
        };
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData(), null, 2)}
      </script>
    </Helmet>
  );
};

export default StructuredData;