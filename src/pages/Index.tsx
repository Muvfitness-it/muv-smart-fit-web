
import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AIAssistantSection from '../components/home/AIAssistantSection';
import NewHeroSection from '@/components/home/NewHeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GallerySection from '@/components/home/GallerySection';
import StickyMobileCTA from '@/components/home/StickyMobileCTA';
import QuickStatsSection from '@/components/home/QuickStatsSection';
import TrustBar from '@/components/home/TrustBar';
import CTASection from '@/components/ui/CTASection';
import PerformanceOptimizer from '@/components/seo/PerformanceOptimizer';
import AccessibilityControls from '@/components/ui/AccessibilityControls';
import QualityChecker from '@/components/verification/QualityChecker';

// Performance optimization components
import SafeResourceOptimizer from '@/components/optimization/SafeResourceOptimizer';
import ResourcePreloader from '@/components/optimization/ResourcePreloader';
import LCPOptimizer from '@/components/optimization/LCPOptimizer';
import PerformanceMonitor from '@/components/optimization/PerformanceMonitor';

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
      {/* Performance optimization suite */}
      <SafeResourceOptimizer />
      <ResourcePreloader 
        criticalImages={['/images/fitness-professional-bg.jpg']}
        prefetchPages={['/servizi', '/contatti', '/chi-siamo']}
      />
      <LCPOptimizer />
      <PerformanceMonitor />
      
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
        <CTASection
          title="Fitness Tecnologico, Risultati Garantiti"
          subtitle="Prenota ora la tua consulenza gratuita e scopri come raggiungere i tuoi obiettivi in soli 30 giorni con il nostro metodo scientifico"
          urgencyText="Solo 3 posti disponibili questa settimana!"
          variant="urgent"
        />
        
        {/* Sticky Mobile CTA */}
        <StickyMobileCTA />
        
        {/* Performance Optimizer - Monitors and optimizes Core Web Vitals */}
        <PerformanceOptimizer />
        
        {/* Accessibility Controls */}
        <AccessibilityControls />
        
        {/* Quality Checker - Development only */}
        <QualityChecker />
      </div>
    </>
  );
};

export default Index;
