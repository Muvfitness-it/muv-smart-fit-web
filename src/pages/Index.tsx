
import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResourceOptimization } from '@/hooks/useResourceOptimization';

import CompactHeroSection from '@/components/home/CompactHeroSection';
import StickyMobileCTA from '@/components/home/StickyMobileCTA';
import QuickStatsSection from '@/components/home/QuickStatsSection';
import TrustBar from '@/components/home/TrustBar';

// Performance optimization imports
import FCPOptimizer from '@/components/optimization/FCP-Optimizer';
import UnusedCodeRemover from '@/components/optimization/UnusedCodeRemover';
import CacheOptimizer from '@/components/optimization/CacheOptimizer';

// Defer only non-critical SEO components to improve Speed Index
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';

// Lazy load sections for better performance
const ProgramsSection = lazy(() => import('@/components/home/ProgramsSection'));
const MethodSection = lazy(() => import('@/components/home/MethodSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));

const Index = () => {
  // Initialize critical resource optimization immediately
  useResourceOptimization();

  // Delay all non-critical functionality for faster FCP
  useEffect(() => {
    const timer = setTimeout(() => {
      import('@/hooks/useLeadTracking').then(({ default: useLeadTracking }) => {
        useLeadTracking();
      });
    }, 3000); // Increased delay to prioritize performance
    return () => clearTimeout(timer);
  }, []);

  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema()
  ];

  return (
    <>
      {/* Critical performance optimizers - render first */}
      <FCPOptimizer />
      <UnusedCodeRemover />
      <CacheOptimizer />
      
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
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" 
               style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 256px' }} />
        }>
          <div className="below-fold">
            <ProgramsSection />
          </div>
        </Suspense>
        
        {/* Brief Method Preview */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse"
               style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 256px' }} />
        }>
          <div className="below-fold">
            <MethodSection />
          </div>
        </Suspense>
        
        
        {/* Compact FAQ Section */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse"
               style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 256px' }} />
        }>
          <div className="below-fold">
            <FAQSection />
          </div>
        </Suspense>

        {/* Final CTA - Simple */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-center below-fold">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Pronto per la <span className="text-brand-accent">Trasformazione</span>?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Consulenza gratuita + prova guidata. Nessun impegno, solo risultati concreti.
            </p>
            <Link 
              to="/contatti" 
              className="no-underline min-h-[56px] inline-flex items-center justify-center bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl"
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
