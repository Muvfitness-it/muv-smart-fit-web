
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
      
      {/* Mobile CTA Section - Solo Mobile */}
      <section className="mobile-cta-section md:hidden">
        <div className="mobile-cta-buttons">
          <a 
            href="https://wa.me/393513380770"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cta-btn mobile-cta-whatsapp"
            aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
          >
            📱 Scrivici su WhatsApp
          </a>
          <a 
            href="/contatti" 
            className="mobile-cta-btn mobile-cta-consulenza"
            aria-label="Prenota Consulenza Gratuita presso MUV Fitness Legnago"  
          >
            🎯 Consulenza Gratuita
          </a>
        </div>
      </section>
      
      <FeaturesSection />
      <MethodSection />
      <ProofSection />
      
      {/* Local Areas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Serviamo Tutta la <span className="text-brand-primary">Bassa Veronese</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/fitness-palestra-legnago" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Palestra Legnago</h3>
              <p className="text-gray-300">Centro fitness completo nel cuore di Legnago</p>
            </a>
            <a href="/personal-trainer-legnago" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Personal Trainer Legnago</h3>
              <p className="text-gray-300">Allenamento personalizzato 1-to-1</p>
            </a>
            <a href="/bovolone-fitness" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Bovolone Fitness</h3>
              <p className="text-gray-300">A soli 15 minuti da Bovolone</p>
            </a>
            <a href="/cerea-fitness" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Cerea Fitness</h3>
              <p className="text-gray-300">Facilmente raggiungibile da Cerea</p>
            </a>
            <a href="/san-bonifacio-fitness" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">San Bonifacio Fitness</h3>
              <p className="text-gray-300">Servizi fitness avanzati per San Bonifacio</p>
            </a>
            <a href="/dimagrire-legnago" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Dimagrire Legnago</h3>
              <p className="text-gray-300">Programmi dimagrimento personalizzati</p>
            </a>
          </div>
        </div>
      </section>
      
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Index;
