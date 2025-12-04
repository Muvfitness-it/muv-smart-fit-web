import { Helmet } from 'react-helmet';
import NordicNavbar from '@/components/nordic/NordicNavbar';
import NordicHeroSection from '@/components/nordic/NordicHeroSection';
import NordicValueProps from '@/components/nordic/NordicValueProps';
import NordicServicesGrid from '@/components/nordic/NordicServicesGrid';
import NordicClubSection from '@/components/nordic/NordicClubSection';
import NordicFooter from '@/components/nordic/NordicFooter';
import { BUSINESS_DATA } from '@/config/businessData';

const NordicLanding = () => {
  const pageTitle = 'MUV Fitness Intelligente | Nuova Sede Legnago - Centro Fitness Premium';
  const pageDescription = 'Scopri la nuova sede MUV Fitness a Legnago. Design Nordic, tecnologia avanzata EMS e Pilates Reformer, ambiente esclusivo in Piazzetta don Walter Soave. Prenota il tuo tour gratuito.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="nuova sede MUV, fitness Legnago, palestra design, club fitness, EMS Legnago, Pilates Reformer, centro fitness premium" />
        <link rel="canonical" href={`${BUSINESS_DATA.web.domain}/nuova-sede`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${BUSINESS_DATA.web.domain}/nuova-sede`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={BUSINESS_DATA.branding.ogImage} />
        <meta property="og:locale" content="it_IT" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={BUSINESS_DATA.branding.ogImage} />
      </Helmet>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthClub",
          "name": BUSINESS_DATA.name,
          "description": pageDescription,
          "url": `${BUSINESS_DATA.web.domain}/nuova-sede`,
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
            "latitude": BUSINESS_DATA.geo.latitude,
            "longitude": BUSINESS_DATA.geo.longitude
          },
          "openingHours": BUSINESS_DATA.openingHours.schemaFormat,
          "priceRange": BUSINESS_DATA.business.priceRange,
          "image": BUSINESS_DATA.branding.logo,
          "sameAs": [
            BUSINESS_DATA.social.facebook,
            BUSINESS_DATA.social.instagram
          ].filter(Boolean)
        })}
      </script>

      <div className="min-h-screen bg-[hsl(var(--nordic-white))]">
        <NordicNavbar />
        <main>
          <NordicHeroSection />
          <NordicValueProps />
          <NordicServicesGrid />
          <NordicClubSection />
        </main>
        <NordicFooter />
      </div>
    </>
  );
};

export default NordicLanding;
