
import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CompactHeroSection from '@/components/home/CompactHeroSection';
import StickyMobileCTA from '@/components/home/StickyMobileCTA';
import QuickStatsSection from '@/components/home/QuickStatsSection';
import TrustBar from '@/components/home/TrustBar';

// Safe performance optimization
import SafeResourceOptimizer from '@/components/optimization/SafeResourceOptimizer';

// SEO components - essential for indexing
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';

// Lazy load sections for better performance
const ProgramsSection = lazy(() => import('@/components/home/ProgramsSection'));
const MethodSection = lazy(() => import('@/components/home/MethodSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));

const Index = () => {
  // Safe optimization initialization
  useEffect(() => {
    // Initialize safe resource optimization
    const timer = setTimeout(() => {
      import('@/hooks/useLeadTracking').then(({ default: useLeadTracking }) => {
        useLeadTracking();
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema()
  ];

  return (
    <>
      {/* Safe resource optimization */}
      <SafeResourceOptimizer />
      
      <div className="min-h-screen bg-gray-900">
        {/* Compact Hero Section */}
        <CompactHeroSection />
        
        {/* Trust Bar */}
        <TrustBar />
        
        {/* SEO Head - Critical for indexing */}
        <UnifiedSEOHead
          title="MUV Fitness Legnago – Centro Fitness con Personal Trainer EMS"
          description="Centro fitness intelligente a Legnago: EMS, Personal Training 1:1, Pancafit, Pilates Reformer, Vacuum e Pressoterapia. Risultati garantiti in 30 giorni. Prenota la consulenza gratuita."
          keywords="palestra legnago, personal trainer legnago, ems legnago, pilates legnago, fitness legnago, dimagrire legnago"
          canonicalUrl="https://www.muvfitness.it/"
          structuredData={structuredData}
        />
        
        {/* Social Proof Stats */}
        <QuickStatsSection />
        
        {/* Programs Section */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700">
            <div className="animate-pulse bg-gray-700 h-full rounded"></div>
          </div>
        }>
          <ProgramsSection />
        </Suspense>
        
        {/* Brief Method Preview */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700">
            <div className="animate-pulse bg-gray-700 h-full rounded"></div>
          </div>
        }>
          <MethodSection />
        </Suspense>
        
        
        {/* Compact FAQ Section */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700">
            <div className="animate-pulse bg-gray-700 h-full rounded"></div>
          </div>
        }>
          <FAQSection />
        </Suspense>

        {/* Final CTA - Mobile optimized */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 md:mb-6">
              Pronto per la <span className="text-brand-accent">Trasformazione</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto">
              Consulenza gratuita + prova guidata. Nessun impegno, solo risultati concreti.
            </p>
            <Link 
              to="/contatti" 
              className="no-underline min-h-[44px] inline-flex items-center justify-center bg-gradient-to-r from-brand-primary to-brand-accent text-white px-6 md:px-10 py-3 md:py-5 rounded-full text-lg md:text-xl font-black transition-transform duration-200 transform active:scale-95 shadow-xl"
              aria-label="Prenota la consulenza gratuita"
            >
              🎯 OTTIENI I TUOI RISULTATI
            </Link>
          </div>
        </section>
        
        {/* Sticky Mobile CTA */}
        <StickyMobileCTA />
      </div>
    </>
  );
};

export default Index;
