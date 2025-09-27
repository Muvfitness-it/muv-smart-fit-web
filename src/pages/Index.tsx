
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AIAssistantSection from '../components/home/AIAssistantSection';

import NewHeroSection from '@/components/home/NewHeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GallerySection from '@/components/home/GallerySection';
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
        {/* New Hero Section with Value Proposition */}
        <NewHeroSection />
        
        {/* SEO Head - Critical for indexing */}
        <UnifiedSEOHead
          title="MUV Fitness Legnago – Centro Fitness Tecnologico con Risultati Garantiti"
          description="Fitness tecnologico a Legnago: EMS in 20 minuti, Personal Training 1:1, risultati garantiti in 30 giorni. Massimo 4 persone per sessione. Prenota la tua prova gratuita!"
          keywords="palestra legnago, personal trainer legnago, ems legnago, pilates legnago, fitness legnago, dimagrire legnago, centro fitness tecnologico"
          canonicalUrl="https://www.muvfitness.it/"
          structuredData={structuredData}
        />
        
        {/* Trust Bar */}
        <TrustBar />
        
        {/* Testimonials Section - Real Stories */}
        <TestimonialsSection />
        
        {/* Gallery Section - HD Center Images */}
        <GallerySection />
        
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
        
        {/* AI Assistant Section */}
        <AIAssistantSection />

        {/* Compact FAQ Section */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-700">
            <div className="animate-pulse bg-gray-700 h-full rounded"></div>
          </div>
        }>
          <FAQSection />
        </Suspense>

        {/* Final CTA Section - Upgraded */}
        <section className="py-16 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border-t border-primary/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Urgency Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-400/50 rounded-full text-red-300 text-sm font-semibold animate-pulse">
                  🔥 Solo 3 posti disponibili questa settimana!
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Fitness Tecnologico, <span className="text-primary">Risultati Garantiti</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                <strong>Prenota ora la tua consulenza gratuita</strong> e scopri come raggiungere i tuoi obiettivi 
                in soli 30 giorni con il nostro metodo scientifico.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link 
                  to="/contatti" 
                  className="group relative bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 min-h-[44px] flex items-center justify-center"
                >
                  <span className="relative z-10">🎯 PRENOTA CONSULENZA GRATUITA</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <div className="flex gap-3">
                  <a 
                    href="https://wa.me/393291070374"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    💬 WhatsApp
                  </a>
                  
                  <a 
                    href="tel:+393291070374"
                    className="flex items-center text-white/80 hover:text-white transition-colors text-lg"
                  >
                    📞 329 107 0374
                  </a>
                </div>
              </div>

              {/* Guarantee Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center px-6 py-3 bg-green-600/20 border border-green-400/50 rounded-full text-green-400 text-sm font-semibold">
                  ✅ 30 giorni o rimborso garantito
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sticky Mobile CTA */}
        <StickyMobileCTA />
      </div>
    </>
  );
};

export default Index;
