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
import HomeUltraConversion from "./pages/HomeUltraConversion";
import ServiziUnified from "./pages/ServiziUnified";
import NotFound from "./pages/NotFound";

// New Complete Services Page
const ServiziCompleto = lazy(() => import("./pages/ServiziCompleto"));
const Tecnologie = lazy(() => import("./pages/Tecnologie"));

// Lazy load all other routes to reduce initial bundle
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const ChiSiamoNew = lazy(() => import("./pages/ChiSiamoNew"));
const Servizi = lazy(() => import("./pages/Servizi"));
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

// Service pages
const NutrizionePsicocoach = lazy(() => import("./pages/servizi/NutrizionePsicocoach"));

// Legacy service pages - lazy loaded
const PersonalTraining = lazy(() => import("./pages/servizi/PersonalTraining"));
const EMS = lazy(() => import("./pages/servizi/EMS"));
const Pancafit = lazy(() => import("./pages/servizi/Pancafit"));
const Pilates = lazy(() => import("./pages/servizi/Pilates"));
const HIIT = lazy(() => import("./pages/servizi/HIIT"));
const SmallGroup = lazy(() => import("./pages/servizi/SmallGroup"));
const Nutrizione = lazy(() => import("./pages/servizi/Nutrizione"));
const Psicologo = lazy(() => import("./pages/servizi/Psicologo"));
const Massoterapia = lazy(() => import("./pages/servizi/Massoterapia"));
const VacuumPressoterapia = lazy(() => import("./pages/servizi/VacuumPressoterapia"));

// Main pages - lazy loaded
const ComeArrivare = lazy(() => import("./pages/ComeArrivare"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUserManagement = lazy(() => import("./pages/AdminUserManagement"));
const Analytics = lazy(() => import("./pages/Analytics"));

// Landing Pages - lazy loaded
const Trasformazione30Giorni = lazy(() => import("./pages/landing/Trasformazione30Giorni"));
const GravidanzaPostParto = lazy(() => import("./pages/landing/GravidanzaPostParto"));
const SeniorFitness = lazy(() => import("./pages/landing/SeniorFitness"));
const RiabilitazioneInfortuni = lazy(() => import("./pages/landing/RiabilitazioneInfortuni"));

// Security components - named imports  
import { SessionSecurity } from "./components/security/SessionSecurity";
import { SecureDataHandler } from "@/components/security/SecureDataHandler";
const CookieConsent = lazy(() => import("./components/security/CookieConsent"));
const FloatingCTA = lazy(() => import("./components/ui/FloatingCTA"));
const AIAuth = lazy(() => import("./pages/AIAuth"));

// SEO pages - lazy loaded
const AllenamentoEMSLegnago = lazy(() => import("./pages/AllenamentoEMSLegnago"));
const PilatesLegnago = lazy(() => import("./pages/PilatesLegnago"));

const DimagrireLegnago = lazy(() => import("./pages/DimagrireLegnago"));
const MalDiSchienaLegnago = lazy(() => import("./pages/MalDiSchienaLegnago"));
const MassaggioSportivoLegnago = lazy(() => import("./pages/MassaggioSportivoLegnago"));


// SEO Components
import RedirectHandler from "./components/SEO/RedirectHandler";

// Security and admin components - named imports
import { AdminRoute } from "@/components/security/AdminRoute";

// Blog pages - lazy loaded
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogCategory = lazy(() => import("./pages/blog/BlogCategory"));
const BlogArticle = lazy(() => import("./pages/blog/BlogArticle"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogDrafts = lazy(() => import("./pages/admin/AdminBlogDrafts"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminBlogCreateAI = lazy(() => import("./pages/admin/AdminBlogCreateAI"));
const AdminBlogCreateManual = lazy(() => import("./pages/admin/AdminBlogCreateManual"));
const AdminSmallGroupSchedule = lazy(() => import("./pages/admin/AdminSmallGroupSchedule"));

// Other pages - lazy loaded
const Recensioni = lazy(() => import("./pages/Recensioni"));
const FaqGbp = lazy(() => import("./pages/FaqGbp"));
const MediaKitProofPosts = lazy(() => import("./pages/MediaKitProofPosts"));
const Grazie = lazy(() => import("./pages/Grazie"));

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
                          !location.pathname.includes('/riabilitazione-infortuni');

  return (
    <Suspense fallback={<RouteLoading />}>
      <SessionSecurity>
        <PerformanceMonitor />
        <SecureDataHandler />
        <RedirectHandler />
        
        {/* Removed problematic optimization components */}
        <div className="min-h-screen bg-background text-foreground">
        <Routes>
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
                    {/* ===== NEW MUV STRUCTURE - HOMEPAGE & CORE PAGES ===== */}
                    <Route path="/" element={<MUVHomepage />} />
                    <Route path="/metodo" element={<Metodo />} />
          <Route path="/perche-muv" element={<PercheMUV />} />
          <Route path="/prezzi" element={<Navigate to="/perche-muv" replace />} />
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
                    <Route path="/chi-siamo" element={<ChiSiamoNew />} />
                    <Route path="/chi-siamo-legacy" element={<ChiSiamo />} />
                    <Route path="/risultati" element={<Risultati />} />
                    <Route path="/contatti" element={<Contatti />} />
                    <Route path="/grazie" element={<Suspense fallback={<RouteLoading />}><Grazie /></Suspense>} />
                    <Route path="/form-contatti" element={<FormContatti />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/come-arrivare" element={<ComeArrivare />} />
                    <Route path="/recensioni" element={<Recensioni />} />
                    
                    {/* Landing Pages */}
                    <Route path="/prova-gratuita-ems" element={<ProvaGratuitaEMS />} />
                    <Route path="/prenota" element={<ProvaGratuitaEMS />} />
                    
                    {/* Legal pages */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    
                    {/* Blog Routes */}
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/c/:slug" element={<BlogCategory />} />
                    <Route path="/blog/:slug" element={<Navigate to={`/${window.location.pathname.split('/blog/')[1]}`} replace />} />
                    <Route path="/:slug" element={<BlogArticle />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/blog" element={<AdminRoute><AdminBlogList /></AdminRoute>} />
                    <Route path="/admin/blog/bozze" element={<AdminRoute><AdminBlogDrafts /></AdminRoute>} />
                    <Route path="/admin/blog/categorie" element={<AdminRoute><AdminCategories /></AdminRoute>} />
                    <Route path="/admin/blog/create/ai" element={<AdminRoute><AdminBlogCreateAI /></AdminRoute>} />
                    <Route path="/admin/blog/create/manual" element={<AdminRoute><AdminBlogCreateManual /></AdminRoute>} />
                    <Route path="/admin/blog/new" element={<Navigate to="/admin/blog/create/ai" replace />} />
                    <Route path="/admin/blog/:id" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
                    <Route path="/admin/utenti" element={<AdminRoute><AdminUserManagement /></AdminRoute>} />
                    <Route path="/admin/small-group-schedule" element={<AdminRoute><Suspense fallback={<RouteLoading />}><AdminSmallGroupSchedule /></Suspense></AdminRoute>} />
                    <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
                    
                    {/* ===== LEGACY REDIRECTS - Clean up circular redirects ===== */}
                    {/* Old service pages redirect to new canonical URLs */}
                    <Route path="/servizi/personal-training" element={<Navigate to="/servizi/ems-legnago" replace />} />
                    <Route path="/servizi/ems" element={<Navigate to="/servizi/ems-legnago" replace />} />
                    <Route path="/servizi/pancafit" element={<Navigate to="/servizi/pancafit-legnago" replace />} />
                    <Route path="/servizi/pilates" element={<Navigate to="/servizi/pilates-reformer-legnago" replace />} />
                    <Route path="/servizi/hiit" element={<Navigate to="/servizi/ems-legnago" replace />} />
                    <Route path="/servizi/psicologo" element={<Navigate to="/servizi" replace />} />
                    <Route path="/servizi/massoterapia" element={<Navigate to="/servizi/vacuum-pressoterapia-legnago" replace />} />
                    <Route path="/servizi/vacuum-pressoterapia" element={<Navigate to="/servizi/vacuum-pressoterapia-legnago" replace />} />
                    <Route path="/servizi/nutrizione-psicocoach-legnago" element={<Navigate to="/servizi" replace />} />
                    <Route path="/servizi/personal-trainer-legnago" element={<Navigate to="/servizi/ems-legnago" replace />} />
                    <Route path="/servizi/pancafit-postura-legnago" element={<Navigate to="/servizi/pancafit-legnago" replace />} />
                    
                    {/* SEO city pages → specific services or home */}
                    <Route path="/personal-trainer-legnago" element={<Navigate to="/servizi/ems-legnago" replace />} />
                    <Route path="/allenamento-ems-legnago" element={<Navigate to="/servizi/ems-legnago" replace />} />
                    <Route path="/pilates-legnago" element={<Navigate to="/#servizi" replace />} />
                    <Route path="/dimagrire-legnago" element={<Navigate to="/#servizi" replace />} />
                    <Route path="/mal-di-schiena-legnago" element={<Navigate to="/#servizi" replace />} />
                    <Route path="/massaggio-sportivo-legnago" element={<Navigate to="/#servizi" replace />} />
                    
                    {/* Old standalone pages → Core pages */}
                    <Route path="/come-arrivare" element={<Navigate to="/contatti" replace />} />
                    <Route path="/form-contatti" element={<Navigate to="/contatti" replace />} />
                    <Route path="/recensioni" element={<Navigate to="/risultati" replace />} />
                    <Route path="/faq-gbp" element={<Navigate to="/#faq" replace />} />
                    <Route path="/media-kit/proof-posts" element={<Navigate to="/risultati" replace />} />
                    <Route path="/muv-planner" element={<Navigate to="/contatti" replace />} />
                    
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