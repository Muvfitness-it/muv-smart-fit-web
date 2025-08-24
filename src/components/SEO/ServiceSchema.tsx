import React from 'react';
import { Helmet } from 'react-helmet';

interface ServiceSchemaProps {
  serviceName: string;
  serviceType?: string;
  description?: string;
}

const ServiceSchema: React.FC<ServiceSchemaProps> = ({ 
  serviceName, 
  serviceType = serviceName,
  description 
}) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceType,
    "description": description,
    "provider": {
      "@id": "https://www.muvfitness.it/#org"
    },
    "areaServed": "Legnago e Bassa Veronese",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStoreOnly"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog", 
      "name": `Programmi ${serviceName}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
    </Helmet>
  );
};

export default ServiceSchema;