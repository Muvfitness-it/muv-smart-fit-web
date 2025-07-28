
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
    
    crawlerContent.innerHTML = `
      <h1>${title}</h1>
      <p>${description}</p>
      <div>${content}</div>
      ${services.length > 0 ? `
        <h2>Servizi Offerti</h2>
        <ul>
          ${services.map(service => `<li>${service}</li>`).join('')}
        </ul>
      ` : ''}
      <p>Località: ${location}</p>
      <p>Contatti: +39 3291070374 - info@muvfitness.it</p>
    `;
    
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
