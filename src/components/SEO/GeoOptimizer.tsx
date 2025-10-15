import { Helmet } from 'react-helmet';
import { BUSINESS_DATA } from '@/config/businessData';

interface GeoOptimizerProps {
  /** Titolo della pagina per override (opzionale) */
  pageTitle?: string;
  /** Descrizione per override (opzionale) */
  pageDescription?: string;
  /** URL canonico */
  canonicalUrl: string;
  /** Keywords geo-localizzate aggiuntive */
  additionalKeywords?: string[];
  /** Se includere schema LocalBusiness (default: true) */
  includeLocalBusinessSchema?: boolean;
}

/**
 * GeoOptimizer Component
 * Inietta meta tag geo-localizzati e ottimizzazioni per Local SEO
 * Usare in ogni pagina per massimizzare visibilità nelle ricerche locali
 */
export const GeoOptimizer: React.FC<GeoOptimizerProps> = ({
  pageTitle,
  pageDescription,
  canonicalUrl,
  additionalKeywords = [],
  includeLocalBusinessSchema = false
}) => {
  // Genera keywords combinate
  const allKeywords = [
    ...BUSINESS_DATA.geoKeywords.primary,
    ...BUSINESS_DATA.geoKeywords.secondary,
    ...additionalKeywords
  ].join(', ');

  const localBusinessSchema = includeLocalBusinessSchema ? {
    "@context": "https://schema.org",
    "@type": BUSINESS_DATA.business.type,
    "name": BUSINESS_DATA.name,
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
      "latitude": BUSINESS_DATA.geo.latitude,
      "longitude": BUSINESS_DATA.geo.longitude
    },
    "telephone": BUSINESS_DATA.contact.phone,
    "url": BUSINESS_DATA.web.domain
  } : null;

  return (
    <Helmet>
      {/* Geo Meta Tags */}
      <meta name="geo.region" content={`IT-${BUSINESS_DATA.address.provinceCode}`} />
      <meta name="geo.placename" content={BUSINESS_DATA.address.city} />
      <meta name="geo.position" content={`${BUSINESS_DATA.geo.latitude};${BUSINESS_DATA.geo.longitude}`} />
      <meta name="ICBM" content={`${BUSINESS_DATA.geo.latitude}, ${BUSINESS_DATA.geo.longitude}`} />
      
      {/* Keywords */}
      <meta name="keywords" content={allKeywords} />
      
      {/* Open Graph Local */}
      <meta property="og:type" content="business.business" />
      <meta property="og:locale" content={BUSINESS_DATA.web.locale} />
      <meta property="business:contact_data:street_address" content={BUSINESS_DATA.address.street} />
      <meta property="business:contact_data:locality" content={BUSINESS_DATA.address.city} />
      <meta property="business:contact_data:region" content={BUSINESS_DATA.address.region} />
      <meta property="business:contact_data:postal_code" content={BUSINESS_DATA.address.postalCode} />
      <meta property="business:contact_data:country_name" content={BUSINESS_DATA.address.country} />
      
      {/* Schema LocalBusiness se richiesto */}
      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default GeoOptimizer;
