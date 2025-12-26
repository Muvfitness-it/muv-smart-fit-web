import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useSiteVisitTracker } from "./hooks/useSiteVisitTracker";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";

import React, { useEffect, lazy, Suspense } from "react";

import FontOptimizer from "@/components/ui/FontOptimizer";
import CriticalCSS from "@/components/CriticalCSS";
import PerformanceOptimizer from "@/features/performance";
import PerformanceMonitor from "@/features/performance/PerformanceMonitor";
import MUVNavigation from "./components/navigation/MUVNavigation";
import MUVFooter from "./components/home/MUVFooter";
import LandingPageOptimizer from "./components/landing/LandingPageOptimizer";
import InternalLinkOptimizer from "./components/seo/InternalLinkOptimizer";
import AIAssistantWidget from "./components/ai/AIAssistantWidget";
import AIAssistantModal from "./components/ai/AIAssistantModal";
import AccessibilityEnhancer from "./components/ui/AccessibilityEnhancer";

// Critical routes loaded immediately (homepage and essential pages)
import NotFound from "./pages/NotFound";

// New Complete Services Page
const ServiziCompleto = lazy(() => import("./pages/ServiziCompleto"));
const Tecnologie = lazy(() => import("./pages/Tecnologie"));

// Lazy load all other routes to reduce initial bundle
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const Team = lazy(() => import("./pages/Team"));
const Risultati = lazy(() => import("./pages/Risultati"));
const Contatti = lazy(() => import("./pages/Contatti"));
const FormContatti = lazy(() => import("./pages/FormContatti"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

// New MUV Pages
import MUVHomepage from "./pages/MUVHomepage";
import Metodo from "./pages/Metodo";
import PercheMUV from "./pages/PercheMUV";

// New Service Pages
const EMSPage = lazy(() => import("./pages/servizi/EMSPage"));
const VacuumPage = lazy(() => import("./pages/servizi/VacuumPage"));
const PilatesReformerPage = lazy(() => import("./pages/servizi/PilatesReformerPage"));
const NutrizionePage = lazy(() => import("./pages/servizi/NutrizionePage"));
const SaunaInfrarossiPage = lazy(() => import("./pages/servizi/SaunaInfrarossiPage"));
const Over60Page = lazy(() => import("./pages/servizi/Over60Page"));

// Landing Pages
const ProvaGratuitaEMS = lazy(() => import("./pages/landing/ProvaGratuitaEMS"));

// Funnel Pages - Multi-step conversion funnel
const FunnelStep1 = lazy(() => import("./pages/funnel/FunnelStep1"));
const FunnelStep2 = lazy(() => import("./pages/funnel/FunnelStep2"));
const FunnelStep3 = lazy(() => import("./pages/funnel/FunnelStep3"));
const FunnelGrazie = lazy(() => import("./pages/funnel/FunnelGrazie"));

// Service pages
const NutrizionePsicocoach = lazy(() => import("./pages/servizi/NutrizionePsicocoach"));

// Legacy service pages - lazy loaded
const Pancafit = lazy(() => import("./pages/servizi/Pancafit"));
const SmallGroup = lazy(() => import("./pages/servizi/SmallGroup"));

// Main pages - lazy loaded
const ComeArrivare = lazy(() => import("./pages/ComeArrivare"));
const ZoneServite = lazy(() => import("./pages/ZoneServite"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminUnified = lazy(() => import("./pages/admin/AdminUnified"));
const Analytics = lazy(() => import("./pages/Analytics"));

// Landing Pages - lazy loaded
const Trasformazione30Giorni = lazy(() => import("./pages/landing/Trasformazione30Giorni"));
const GravidanzaPostParto = lazy(() => import("./pages/landing/GravidanzaPostParto"));
const SeniorFitness = lazy(() => import("./pages/landing/SeniorFitness"));
const RiabilitazioneInfortuni = lazy(() => import("./pages/landing/RiabilitazioneInfortuni"));

// Percorsi Page
const Percorsi = lazy(() => import("./pages/Percorsi"));
import { SessionSecurity } from "./components/security/SessionSecurity";
import { SecureDataHandler } from "@/components/security/SecureDataHandler";
const CookieConsent = lazy(() => import("./components/security/CookieConsent"));
const FloatingCTA = lazy(() => import("./components/ui/FloatingCTA"));
const GEOValidator = lazy(() => import("./components/SEO/GEOValidator"));
const AIAuth = lazy(() => import("./pages/AIAuth"));

// SEO pages - lazy loaded
const FaqGbp = lazy(() => import("./pages/FaqGbp"));
const MediaKitProofPosts = lazy(() => import("./pages/MediaKitProofPosts"));
const Grazie = lazy(() => import("./pages/Grazie"));
const Recensioni = lazy(() => import("./pages/Recensioni"));

// Local Landing Pages - Phase 5
const PersonalTrainerCerea = lazy(() => import("./pages/local/PersonalTrainerCerea"));
const PersonalTrainerMinerbe = lazy(() => import("./pages/local/PersonalTrainerMinerbe"));

// Nordic Clean Landing Page
const NordicLanding = lazy(() => import("./pages/NordicLanding"));


// SEO Components
import RedirectHandler from "./components/SEO/RedirectHandler";

// Security and admin components - named imports
import { AdminRoute } from "@/components/security/AdminRoute";

// Blog pages - lazy loaded
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogCategory = lazy(() => import("./pages/blog/BlogCategory"));
const BlogArticle = lazy(() => import("./pages/blog/BlogArticle"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const SEOMonitorDashboard = lazy(() => import("./pages/admin/SEOMonitorDashboard"));

// Loading component for lazy routes
const RouteLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
  </div>
);

const AppContent = () => {
  useScrollToTop();
  useSiteVisitTracker();
  useGoogleAnalytics(); // Track page views

  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isAIModalOpen, setIsAIModalOpen] = React.useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = React.useState<string | undefined>();

  const handleOpenAIModal = () => setIsAIModalOpen(true);
  const handleCloseAIModal = () => setIsAIModalOpen(false);
  const handleStartConversation = (question: string) => {
    setAiInitialQuestion(question);
    setIsAIModalOpen(true);
  };

  // Show AI Assistant only on main pages (not landing pages or auth pages)
  const showAIAssistant = !location.pathname.includes('/auth') && 
                          !location.pathname.includes('/trasformazione-30-giorni') &&
                          !location.pathname.includes('/gravidanza-post-parto') &&
                          !location.pathname.includes('/senior-fitness') &&
                          !location.pathname.includes('/riabilitazione-infortuni') &&
                          !location.pathname.includes('/nuova-sede');

  return (
    <Suspense fallback={<RouteLoading />}>
      <SessionSecurity>
        <PerformanceMonitor />
        <SecureDataHandler />
        {/* RedirectHandler removed - all redirects now server-side in netlify.toml */}
        <GEOValidator />
        
        {/* Removed problematic optimization components */}
        <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* HOMEPAGE - Landing Page Semplice (NO Menu Completo, NO Footer) */}
          <Route path="/" element={<MUVHomepage />} />

          {/* Funnel Pages - NO Navigation/Footer */}
          <Route path="/funnel" element={
            <Suspense fallback={<RouteLoading />}><FunnelStep1 /></Suspense>
          } />
          <Route path="/funnel/qualifica" element={
            <Suspense fallback={<RouteLoading />}><FunnelStep2 /></Suspense>
          } />
          <Route path="/funnel/prenota" element={
            <Suspense fallback={<RouteLoading />}><FunnelStep3 /></Suspense>
          } />
          <Route path="/funnel/grazie" element={
            <Suspense fallback={<RouteLoading />}><FunnelGrazie /></Suspense>
          } />
          
          {/* Landing Pages - NO Navigation/Footer */}
          <Route path="/trasformazione-30-giorni" element={
            <Suspense fallback={<RouteLoading />}>
              <Trasformazione30Giorni />
            </Suspense>
          } />
          <Route path="/gravidanza-post-parto" element={
            <Suspense fallback={<RouteLoading />}>
              <GravidanzaPostParto />
            </Suspense>
          } />
          <Route path="/senior-fitness" element={
            <Suspense fallback={<RouteLoading />}>
              <SeniorFitness />
            </Suspense>
          } />
          <Route path="/riabilitazione-infortuni" element={
            <Suspense fallback={<RouteLoading />}>
              <RiabilitazioneInfortuni />
            </Suspense>
          } />
          
          {/* Nordic Clean Landing Page - Own Navigation/Footer */}
          <Route path="/nuova-sede" element={
            <Suspense fallback={<RouteLoading />}>
              <NordicLanding />
            </Suspense>
          } />
          
          {/* Auth Pages - NO Navigation/Footer */}
          <Route path="/admin/auth" element={
            <Suspense fallback={<RouteLoading />}>
              <AdminAuth />
            </Suspense>
          } />
          <Route path="/auth" element={
            <Suspense fallback={<RouteLoading />}>
              <AdminAuth />
            </Suspense>
          } />
          <Route path="/ai-auth" element={
            <Suspense fallback={<RouteLoading />}>
              <AIAuth />
            </Suspense>
          } />

          {/* Regular Pages - WITH Navigation/Footer */}
          <Route path="/*" element={
            <>
              <MUVNavigation />
              <a 
                href="#main" 
                className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none"
              >
                Salta al contenuto principale
              </a>
              <main id="main">
                <Suspense fallback={<RouteLoading />}>
                  <Routes>
                    {/* ===== CORE PAGES (Homepage è fuori da questo blocco) ===== */}
                    <Route path="/metodo" element={<Metodo />} />
                    <Route path="/perche-muv" element={<PercheMUV />} />
                    <Route path="/prezzi" element={<Navigate to="/perche-muv" replace />} />
                    <Route path="/percorsi" element={<Percorsi />} />
                    <Route path="/servizi" element={<ServiziCompleto />} />
                    <Route path="/tecnologie" element={<Tecnologie />} />
                    
                    {/* ===== NEW SERVICE PAGES - CANONICAL URLs ===== */}
                    <Route path="/servizi/ems-legnago" element={<EMSPage />} />
                    <Route path="/servizi/pilates-reformer-legnago" element={<PilatesReformerPage />} />
                    <Route path="/servizi/pancafit-legnago" element={<Pancafit />} />
                    <Route path="/servizi/vacuum-pressoterapia-legnago" element={<VacuumPage />} />
                    <Route path="/servizi/sauna-infrarossi-legnago" element={<SaunaInfrarossiPage />} />
                    <Route path="/servizi/over-60-legnago" element={<Over60Page />} />
                    
                    {/* Additional service pages */}
                    <Route path="/servizi/nutrizione" element={<NutrizionePage />} />
                    <Route path="/servizi/small-group" element={<Suspense fallback={<RouteLoading />}><SmallGroup /></Suspense>} />
                    
                    {/* Core pages */}
                    <Route path="/chi-siamo" element={<ChiSiamo />} />
                    <Route path="/risultati" element={<Risultati />} />
                    <Route path="/contatti" element={<Contatti />} />
                    <Route path="/grazie" element={<Suspense fallback={<RouteLoading />}><Grazie /></Suspense>} />
                    <Route path="/form-contatti" element={<FormContatti />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/come-arrivare" element={<ComeArrivare />} />
                    <Route path="/zone-servite" element={<ZoneServite />} />
                    <Route path="/recensioni" element={<Recensioni />} />
                    
                    {/* Local Landing Pages - Phase 5 */}
                    <Route path="/personal-trainer-cerea" element={<PersonalTrainerCerea />} />
                    <Route path="/personal-trainer-minerbe" element={<PersonalTrainerMinerbe />} />
                    
                    {/* Landing Pages */}
                    <Route path="/prova-gratuita-ems" element={<ProvaGratuitaEMS />} />
                    <Route path="/prenota" element={<ProvaGratuitaEMS />} />
                    
                    {/* Legal pages */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    
                    {/* Blog Routes */}
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/c/:slug" element={<BlogCategory />} />
                    {/* Removed client-side redirect - now handled server-side via netlify.toml */}
                    <Route path="/:slug" element={<BlogArticle />} />
                    
                    {/* Admin Routes - Unified Panel */}
                    <Route path="/admin" element={<AdminRoute><AdminUnified /></AdminRoute>} />
                    <Route path="/admin/dashboard" element={<Navigate to="/admin?section=blog" replace />} />
                    <Route path="/admin/contenuti-base" element={<Navigate to="/admin?section=contenuti" replace />} />
                    <Route path="/admin/blog" element={<Navigate to="/admin?section=blog" replace />} />
                    <Route path="/admin/blog/bozze" element={<Navigate to="/admin?section=bozze" replace />} />
                    <Route path="/admin/blog/categorie" element={<Navigate to="/admin?section=categorie" replace />} />
                    <Route path="/admin/blog/create/ai" element={<Navigate to="/admin?section=crea-ai" replace />} />
                    <Route path="/admin/blog/create/manual" element={<Navigate to="/admin?section=crea-manuale" replace />} />
                    <Route path="/admin/blog/new" element={<Navigate to="/admin?section=crea-ai" replace />} />
                    <Route path="/admin/blog/:id" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
                    <Route path="/admin/utenti" element={<Navigate to="/admin?section=utenti" replace />} />
                    <Route path="/admin/small-group-schedule" element={<Navigate to="/admin?section=small-group" replace />} />
                    <Route path="/admin/local-seo" element={<Navigate to="/admin?section=local-seo" replace />} />
                    <Route path="/admin/seo-monitor" element={<Navigate to="/admin?section=seo-monitor" replace />} />
                    <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
                    
                    {/* ===== LEGACY REDIRECTS - Now handled server-side via netlify.toml ===== */}
                    {/* All redirects moved to netlify.toml for better SEO (301 server-side vs client-side) */}
                    
                    {/* Only keep pages that don't need redirects */}
                    <Route path="/come-arrivare" element={<Suspense fallback={<RouteLoading />}><ComeArrivare /></Suspense>} />
                    <Route path="/zone-servite" element={<Suspense fallback={<RouteLoading />}><ZoneServite /></Suspense>} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <MUVFooter />
            </>
          } />
          </Routes>
        </div>
        <Suspense fallback={null}>
          <AccessibilityEnhancer />
          <FloatingCTA />
          <CookieConsent />
          {showAIAssistant && (
            <>
              <AIAssistantWidget 
                onOpenModal={handleOpenAIModal}
                onStartConversation={handleStartConversation}
              />
              <AIAssistantModal 
                isOpen={isAIModalOpen}
                onClose={handleCloseAIModal}
                initialQuestion={aiInitialQuestion}
              />
            </>
          )}
        </Suspense>
      </SessionSecurity>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AppContent />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;