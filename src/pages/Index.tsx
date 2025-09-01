
import { lazy, Suspense, useEffect } from 'react';
import FCPOptimizer from '@/components/optimization/FCP-Optimizer';
import { MessageCircle } from 'lucide-react';

// Defer all non-critical imports to improve FCP
const NewHeroSection = lazy(() => import('@/components/home/NewHeroSection'));
const SEOOptimizer = lazy(() => import('@/components/SEO/SEOOptimizer'));
const LocalBusinessSchema = lazy(() => import('@/components/SEO/LocalBusinessSchema'));

// Lazy load non-critical sections for better FCP
const FeaturesSection = lazy(() => import('@/components/home/FeaturesSection'));
const MethodSection = lazy(() => import('@/components/home/MethodSection'));
const ProofSection = lazy(() => import('@/components/home/ProofSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));

const Index = () => {
  // Delay all non-critical functionality for faster FCP
  useEffect(() => {
    const timer = setTimeout(() => {
      import('@/hooks/useLeadTracking').then(({ default: useLeadTracking }) => {
        useLeadTracking();
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "MUV Fitness Legnago",
        "url": "https://www.muvfitness.it",
        "logo": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
        "description": "Centro fitness a Legnago con EMS, Personal Training, Pancafit, Pilates Reformer. Tecnologie avanzate per risultati garantiti.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Venti Settembre, 7",
          "addressLocality": "Legnago",
          "addressRegion": "Veneto",
          "postalCode": "37045",
          "addressCountry": "IT"
        },
        "telephone": "+393291070374",
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
      {/* Critical above-the-fold content renders immediately */}
      <FCPOptimizer />
      
      {/* Defer non-critical SEO components */}
      <Suspense fallback={null}>
        <SEOOptimizer
          title="MUV Fitness Legnago – Centro Fitness con Personal Trainer"
          description="Centro fitness intelligente a Legnago: EMS, Personal Training 1:1, Pancafit, Pilates Reformer, Vacuum e Pressoterapia. Risultati garantiti in 30 giorni. Prenota la consulenza gratuita."
          canonicalUrl="https://www.muvfitness.it/"
          structuredData={structuredData}
        />
        <LocalBusinessSchema />
      </Suspense>
      
      {/* Mobile CTA Section - Enhanced */}
      <section className="mobile-cta-section md:hidden py-8 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-md">
          <div className="flex flex-col gap-4">
            <a 
              href="https://wa.me/393291070374"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[56px]"
              aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
            >
              <MessageCircle className="w-8 h-8" />
              <span className="text-lg">Scrivici su WhatsApp</span>
            </a>
            <a 
              href="/contatti" 
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[56px]"
              aria-label="Prenota Consulenza Gratuita presso MUV Fitness Legnago"  
            >
              <span className="text-3xl">🎯</span>
              <span className="text-lg">Consulenza Gratuita</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Lazy loaded sections with loading fallback */}
      <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
        <FeaturesSection />
        <MethodSection />
        <ProofSection />
      </Suspense>
      
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
      
      <Suspense fallback={<div className="min-h-64 bg-gray-800" />}>
        <FAQSection />
        <CTASection />
      </Suspense>
    </div>
  );
};

export default Index;
