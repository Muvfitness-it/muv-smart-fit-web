
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import MethodSection from '@/components/home/MethodSection';
import ProofSection from '@/components/home/ProofSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import SEOOptimizer from '@/components/SEO/SEOOptimizer';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import useLeadTracking from '@/hooks/useLeadTracking';

const Index = () => {
  // Initialize lead tracking
  useLeadTracking();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "MUV Fitness Legnago",
        "url": "https://www.muvfitness.it",
        "logo": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
        "description": "Centro fitness smart a Legnago con EMS, Personal Training, Pancafit, Pilates Reformer. Tecnologie avanzate per risultati garantiti.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Roma 123",
          "addressLocality": "Legnago",
          "addressRegion": "Veneto",
          "postalCode": "37045",
          "addressCountry": "IT"
        },
        "telephone": "+393513380770",
        "email": "info@muvfitness.it",
        "sameAs": [
          "https://www.facebook.com/muvfitness",
          "https://www.instagram.com/muvfitness"
        ]
      },
      {
        "@type": "WebSite",
        "name": "MUV Fitness Legnago",
        "url": "https://www.muvfitness.it",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.muvfitness.it/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOOptimizer
        title="MUV Fitness Legnago – Centro Fitness Smart con Personal Trainer"
        description="Centro fitness intelligente a Legnago: EMS, Personal Training 1:1, Pancafit, Pilates Reformer, Vacuum e Pressoterapia. Risultati garantiti in 30 giorni. Prenota la consulenza gratuita."
        canonicalUrl="https://www.muvfitness.it/"
        structuredData={structuredData}
      />
      <LocalBusinessSchema />
      
      <HeroSection />
      <FeaturesSection />
      <MethodSection />
      <ProofSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Index;
