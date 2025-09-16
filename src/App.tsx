import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useSiteVisitTracker } from "./hooks/useSiteVisitTracker";
import { useResourceOptimization } from "./hooks/useResourceOptimization";
import React, { useEffect, lazy, Suspense } from "react";

import FontOptimizer from "@/components/ui/FontOptimizer";
import CriticalCSS from "@/components/CriticalCSS";
import LCPOptimizer from "@/components/optimization/LCPOptimizer";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LandingPageOptimizer from "./components/landing/LandingPageOptimizer";
import InternalLinkOptimizer from "./components/seo/InternalLinkOptimizer";
import AIAssistantWidget from "./components/ai/AIAssistantWidget";
import AIAssistantModal from "./components/ai/AIAssistantModal";

// Critical routes loaded immediately (homepage and essential pages)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other routes to reduce initial bundle
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));
const Servizi = lazy(() => import("./pages/Servizi"));
const Team = lazy(() => import("./pages/Team"));
const Risultati = lazy(() => import("./pages/Risultati"));
const Contatti = lazy(() => import("./pages/Contatti"));
const FormContatti = lazy(() => import("./pages/FormContatti"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

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
import { SecurityHeaders } from "./components/security/SecurityHeaders";
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

// Other pages - lazy loaded
const Recensioni = lazy(() => import("./pages/Recensioni"));
const FaqGbp = lazy(() => import("./pages/FaqGbp"));
const MediaKitProofPosts = lazy(() => import("./pages/MediaKitProofPosts"));

// Loading component for lazy routes
const RouteLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  useSiteVisitTracker();
  // Removed useResourceOptimization() - was causing rendering issues

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
        <SecurityHeaders />
        <SecureDataHandler />
        
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
              <Navigation />
              {/* Skip to content link for accessibility */}
              <a 
                href="#main" 
                className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none"
              >
                Salta al contenuto principale
              </a>
              <main id="main" className="pt-[var(--header-height)]">
                <Suspense fallback={<RouteLoading />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/chi-siamo" element={<ChiSiamo />} />
                    <Route path="/servizi" element={<Servizi />} />
                    
                    {/* Service pages with SEO redirects */}
                    <Route path="/servizi/ems-legnago" element={<Navigate to="/servizi/ems" replace />} />
                    <Route path="/servizi/pancafit-postura-legnago" element={<Navigate to="/servizi/pancafit" replace />} />
                    <Route path="/servizi/pilates-reformer-legnago" element={<Navigate to="/servizi/pilates" replace />} />
                    <Route path="/servizi/cellulite-vacuum-pressoterapia-legnago" element={<Navigate to="/servizi/massoterapia" replace />} />
                    <Route path="/servizi/personal-trainer-legnago" element={<Navigate to="/servizi/personal-training" replace />} />
                    <Route path="/servizi/nutrizione-psicocoach-legnago" element={<NutrizionePsicocoach />} />
                    
                    {/* Main service pages */}
                    <Route path="/servizi/personal-training" element={<PersonalTraining />} />
                    <Route path="/servizi/ems" element={<EMS />} />
                    <Route path="/servizi/pancafit" element={<Pancafit />} />
                    <Route path="/servizi/pilates" element={<Pilates />} />
                    <Route path="/servizi/hiit" element={<HIIT />} />
                    <Route path="/servizi/small-group" element={<SmallGroup />} />
                    <Route path="/servizi/nutrizione" element={<Nutrizione />} />
                    <Route path="/servizi/psicologo" element={<Psicologo />} />
                    <Route path="/servizi/massoterapia" element={<Massoterapia />} />
                    <Route path="/servizi/vacuum-pressoterapia" element={<VacuumPressoterapia />} />

                    {/* New SEO pages for Legnago keywords */}
                    <Route path="/dimagrire-legnago" element={<DimagrireLegnago />} />
                    <Route path="/mal-di-schiena-legnago" element={<MalDiSchienaLegnago />} />
                    <Route path="/massaggio-sportivo-legnago" element={<MassaggioSportivoLegnago />} />

                    {/* Legacy SEO pages - redirects */}
                    <Route path="/personal-trainer-legnago" element={<Navigate to="/servizi/personal-training" replace />} />
                    <Route path="/allenamento-ems-legnago" element={<AllenamentoEMSLegnago />} />
                    <Route path="/pilates-legnago" element={<PilatesLegnago />} />

                    <Route path="/come-arrivare" element={<ComeArrivare />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/risultati" element={<Risultati />} />
                    <Route path="/contatti" element={<Contatti />} />
                    
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/c/:slug" element={<BlogCategory />} />
                    <Route path="/blog/:slug" element={<Navigate to={`/${window.location.pathname.split('/blog/')[1]}`} replace />} />
                    
                    {/* Articles without /blog/ prefix */}
                    <Route path="/:slug" element={<BlogArticle />} />
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/blog" element={<AdminRoute><AdminBlogList /></AdminRoute>} />
                    <Route path="/admin/blog/bozze" element={<AdminRoute><AdminBlogDrafts /></AdminRoute>} />
                    <Route path="/admin/blog/categorie" element={<AdminRoute><AdminCategories /></AdminRoute>} />
                    <Route path="/admin/blog/create/ai" element={<AdminRoute><AdminBlogCreateAI /></AdminRoute>} />
                    <Route path="/admin/blog/create/manual" element={<AdminRoute><AdminBlogCreateManual /></AdminRoute>} />
                    <Route path="/admin/blog/new" element={<Navigate to="/admin/blog/create/ai" replace />} />
                    <Route path="/admin/blog/:id" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
                    <Route path="/admin/utenti" element={<AdminRoute><AdminUserManagement /></AdminRoute>} />
                    
                     {/* Landing Pages - specialized for conversions */}
                    <Route path="/gravidanza-post-parto" element={<Navigate to="/gravidanza-post-parto" />} />
                    <Route path="/senior-fitness" element={<Navigate to="/senior-fitness" />} />
                    <Route path="/riabilitazione-infortuni" element={<Navigate to="/riabilitazione-infortuni" />} />
                    <Route path="/form-contatti" element={<FormContatti />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
                    <Route path="/recensioni" element={<Recensioni />} />
                    <Route path="/faq-gbp" element={<FaqGbp />} />
                    <Route path="/media-kit/proof-posts" element={<MediaKitProofPosts />} />
                    
                    {/* Redirect /muv-planner to /contatti/ */}
                    <Route path="/muv-planner" element={<Navigate to="/contatti/" replace />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </>
          } />
          </Routes>
        </div>
        <Suspense fallback={null}>
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
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;