
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface CrawlerOptimizerProps {
  title: string;
  description: string;
  content: string;
  services?: string[];
  location?: string;
}

const CrawlerOptimizer: React.FC<CrawlerOptimizerProps> = ({
  title,
  description,
  content,
  services = [],
  location = 'Legnago'
}) => {
  useEffect(() => {
    // Aggiungi contenuto invisibile per i crawler
    const crawlerContent = document.createElement('div');
    crawlerContent.id = 'crawler-content';
    crawlerContent.style.display = 'none';
    crawlerContent.setAttribute('aria-hidden', 'true');
    
    // Safe DOM manipulation instead of innerHTML
    const titleEl = document.createElement('h1');
    titleEl.textContent = title;
    crawlerContent.appendChild(titleEl);
    
    const descEl = document.createElement('p');
    descEl.textContent = description;
    crawlerContent.appendChild(descEl);
    
    const contentEl = document.createElement('div');
    contentEl.textContent = content;
    crawlerContent.appendChild(contentEl);
    
    if (services.length > 0) {
      const servicesTitle = document.createElement('h2');
      servicesTitle.textContent = 'Servizi Offerti';
      crawlerContent.appendChild(servicesTitle);
      
      const servicesList = document.createElement('ul');
      services.forEach(service => {
        const serviceItem = document.createElement('li');
        serviceItem.textContent = service;
        servicesList.appendChild(serviceItem);
      });
      crawlerContent.appendChild(servicesList);
    }
    
    // Add location and contact info
    const locationEl = document.createElement('p');
    locationEl.textContent = `Località: ${location}`;
    crawlerContent.appendChild(locationEl);
    
    const contactEl = document.createElement('p');
    contactEl.textContent = 'Contatti: +39 351 338 0770 - info@muvfitness.it';
    crawlerContent.appendChild(contactEl);
    
    // Rimuovi contenuto precedente se esiste
    const existingContent = document.getElementById('crawler-content');
    if (existingContent) {
      existingContent.remove();
    }
    
    document.body.appendChild(crawlerContent);
    
    return () => {
      const contentToRemove = document.getElementById('crawler-content');
      if (contentToRemove) {
        contentToRemove.remove();
      }
    };
  }, [title, description, content, services, location]);

  return (
    <Helmet>
      {/* Meta tags aggiuntivi per i crawler */}
      <meta name="application-name" content="MUV Fitness" />
      <meta name="msapplication-TileColor" content="#ec4899" />
      <meta name="theme-color" content="#ec4899" />
      
      {/* Dati strutturati per i servizi */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "text": content,
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "MUV Fitness",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": location,
              "addressCountry": "IT"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servizi Fitness",
              "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "position": index + 1,
                "itemOffered": {
                  "@type": "Service",
                  "name": service
                }
              }))
            }
          }
        })}
      </script>
      
      {/* Micro-formati per compatibilità */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      <meta name="format-detection" content="email=yes" />
    </Helmet>
  );
};

export default CrawlerOptimizer;
