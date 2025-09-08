
import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CompactHeroSection from '@/components/home/CompactHeroSection';
import StickyMobileCTA from '@/components/home/StickyMobileCTA';
import QuickStatsSection from '@/components/home/QuickStatsSection';
import TrustBar from '@/components/home/TrustBar';

// Defer only non-critical SEO components to improve Speed Index
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';

// Lazy load sections for better performance
const ProgramsSection = lazy(() => import('@/components/home/ProgramsSection'));
const MethodSection = lazy(() => import('@/components/home/MethodSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));

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

  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema()
  ];

  return (
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
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-800" />}>
        <ProgramsSection />
      </Suspense>
      
      {/* Brief Method Preview */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-800" />}>
        <MethodSection />
      </Suspense>
      
      {/* Local Areas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Serviamo Tutta la <span className="text-brand-primary">Bassa Veronese</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/palestra-legnago" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Palestra Legnago</h3>
              <p className="text-gray-200">Centro fitness completo nel cuore di Legnago</p>
            </Link>
            <Link to="/servizi/personal-training" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Personal Training</h3>
              <p className="text-gray-200">Allenamento personalizzato 1-to-1</p>
            </Link>
            <Link to="/bovolone-fitness" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Bovolone Fitness</h3>
              <p className="text-gray-200">A soli 15 minuti da Bovolone</p>
            </Link>
            <Link to="/cerea-fitness" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Cerea Fitness</h3>
              <p className="text-gray-200">Facilmente raggiungibile da Cerea</p>
            </Link>
            <Link to="/san-bonifacio-fitness" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">San Bonifacio Fitness</h3>
              <p className="text-gray-200">Servizi fitness avanzati per San Bonifacio</p>
            </Link>
            <Link to="/dimagrire-legnago" className="block bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-2">Dimagrire Legnago</h3>
              <p className="text-gray-200">Programmi dimagrimento personalizzati</p>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Compact FAQ Section */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-800" />}>
        <FAQSection />
      </Suspense>
      
      {/* Final CTA - Simple */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-center">
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
  );
};

export default Index;
