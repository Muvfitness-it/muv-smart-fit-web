
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// AI Assistant components
import AIAssistantWidget from '@/components/ai/AIAssistantWidget';
import AIAssistantModal from '@/components/ai/AIAssistantModal';

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
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [initialAIQuestion, setInitialAIQuestion] = useState<string>('');

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

  const handleStartConversation = (question: string) => {
    setInitialAIQuestion(question);
    setIsAIModalOpen(true);
  };

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
        
        
        {/* AI Assistant Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
                🤖 <span className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] bg-clip-text text-transparent">Assistente Virtuale MUV</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Hai domande sul fitness, mal di schiena, dimagrimento o postura? 
                Il nostro <strong className="text-[hsl(var(--chart-1))]">assistente AI specializzato</strong> ti guida verso la soluzione perfetta!
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-3">💬 Risposte Immediate</h3>
                  <p className="text-gray-300 text-sm">
                    Chatta con l'AI specializzata sui nostri servizi: EMS, Personal Training, Pilates, Vacuum terapia
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-3">🎯 Soluzioni Personalizzate</h3>
                  <p className="text-gray-300 text-sm">
                    Descrivi il tuo problema e ricevi consigli mirati su quale percorso è più adatto a te
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => handleStartConversation("Ciao! Sono interessato ai vostri servizi, potresti aiutarmi a capire quale è più adatto per me?")}
                  className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-xl min-h-[44px]"
                >
                  💬 Inizia a Chattare
                </button>
                <button
                  onClick={() => handleStartConversation("Ho mal di schiena e vorrei sapere come posso migliorare")}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30 min-h-[44px]"
                >
                  🩺 "Ho mal di schiena"
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mt-6">
                ⚡ Risposta in meno di 5 secondi • 🧠 Specializzato sui servizi MUV • 🎯 Gratuito al 100%
              </p>
            </div>
          </div>
        </section>

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

      {/* AI Assistant Widget - always visible */}
      <AIAssistantWidget
        onOpenModal={() => setIsAIModalOpen(true)}
        onStartConversation={handleStartConversation}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        initialQuestion={initialAIQuestion}
      />
    </>
  );
};

export default Index;
