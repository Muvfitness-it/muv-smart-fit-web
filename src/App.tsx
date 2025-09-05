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

// SEO service pages - lazy loaded
const EMSLegnago = lazy(() => import("./pages/servizi/EMSLegnago"));
const PancafitPosturaLegnago = lazy(() => import("./pages/servizi/PancafitPosturaLegnago"));
const PilatesReformerLegnago = lazy(() => import("./pages/servizi/PilatesReformerLegnago"));
const CelluliteVacuumLegnago = lazy(() => import("./pages/servizi/CelluliteVacuumLegnago"));
const PersonalTrainerLegnago = lazy(() => import("./pages/servizi/PersonalTrainerLegnago"));
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

// Main pages - lazy loaded
const ComeArrivare = lazy(() => import("./pages/ComeArrivare"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUserManagement = lazy(() => import("./pages/AdminUserManagement"));
const Analytics = lazy(() => import("./pages/Analytics"));

// Landing Pages - lazy loaded
const Trasformazione30Giorni = lazy(() => import("./pages/landing/Trasformazione30Giorni"));

// Security components loaded on demand
const SecurityHeaders = lazy(() => import("./components/security/SecurityHeaders").then(m => ({ default: m.SecurityHeaders })));
const SessionSecurity = lazy(() => import("./components/security/SessionSecurity").then(m => ({ default: m.SessionSecurity })));
const AIAuth = lazy(() => import("./pages/AIAuth"));
const CookieConsent = lazy(() => import("./components/security/CookieConsent"));
const FloatingCTA = lazy(() => import("./components/ui/FloatingCTA"));

// SEO pages - lazy loaded
const AllenamentoEMSLegnago = lazy(() => import("./pages/AllenamentoEMSLegnago"));
const PilatesLegnago = lazy(() => import("./pages/PilatesLegnago"));
const PalestraLegnago = lazy(() => import("./pages/PalestraLegnago"));
const DimagrireLegnago = lazy(() => import("./pages/DimagrireLegnago"));
const MalDiSchienaLegnago = lazy(() => import("./pages/MalDiSchienaLegnago"));
const MassaggioSportivoLegnago = lazy(() => import("./pages/MassaggioSportivoLegnago"));

// Nearby towns SEO pages - lazy loaded
const CereaFitness = lazy(() => import("./pages/CereaFitness"));
const BovaloneFitness = lazy(() => import("./pages/BovaloneFitness"));
const SanBonifacioFitness = lazy(() => import("./pages/SanBonifacioFitness"));

// Security and admin components - lazy loaded
const SecureDataHandler = lazy(() => import("@/components/security/SecureDataHandler").then(m => ({ default: m.SecureDataHandler })));
const AdminRoute = lazy(() => import("@/components/security/AdminRoute").then(m => ({ default: m.AdminRoute })));

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

// QA and other pages - lazy loaded
const QAReport = lazy(() => import("./pages/qa-report"));
const QACleanHeroMobile = lazy(() => import("./pages/qa-clean-hero-mobile"));
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
  useResourceOptimization();

  const location = useLocation();
  const isHome = location.pathname === '/';

  // Development log to verify single header instance
  React.useEffect(() => {
    const headers = document.querySelectorAll('nav.site-header');
    if (headers.length > 1) {
      console.warn(`Found ${headers.length} navigation headers, should be 1`);
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={<RouteLoading />}>
      <SessionSecurity>
        <SecurityHeaders />
        <SecureDataHandler />
        
        <FontOptimizer />
        <CriticalCSS />
        <LCPOptimizer />
        <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Landing Pages - NO Navigation/Footer */}
          <Route path="/trasformazione-30-giorni" element={
            <Suspense fallback={<RouteLoading />}>
              <Trasformazione30Giorni />
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
              <main id="main" className={isHome ? 'pt-0' : 'pt-[var(--header-height)]'}>
                <Suspense fallback={<RouteLoading />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/chi-siamo" element={<ChiSiamo />} />
                    <Route path="/servizi" element={<Servizi />} />
                    
                    {/* New SEO-optimized service pages */}
                    <Route path="/servizi/ems-legnago" element={<EMSLegnago />} />
                    <Route path="/servizi/pancafit-postura-legnago" element={<PancafitPosturaLegnago />} />
                    <Route path="/servizi/pilates-reformer-legnago" element={<PilatesReformerLegnago />} />
                    <Route path="/servizi/cellulite-vacuum-pressoterapia-legnago" element={<CelluliteVacuumLegnago />} />
                    <Route path="/servizi/personal-trainer-legnago" element={<PersonalTrainerLegnago />} />
                    <Route path="/servizi/nutrizione-psicocoach-legnago" element={<NutrizionePsicocoach />} />
                    
                    {/* Legacy service pages for backward compatibility */}
                    <Route path="/servizi/personal-training" element={<PersonalTraining />} />
                    <Route path="/servizi/ems" element={<EMS />} />
                    <Route path="/servizi/pancafit" element={<Pancafit />} />
                    <Route path="/servizi/pilates" element={<Pilates />} />
                    <Route path="/servizi/hiit" element={<HIIT />} />
                    <Route path="/servizi/small-group" element={<SmallGroup />} />
                    <Route path="/servizi/nutrizione" element={<Nutrizione />} />
                    <Route path="/servizi/psicologo" element={<Psicologo />} />
                    <Route path="/servizi/massoterapia" element={<Massoterapia />} />

                    {/* New SEO pages for Legnago keywords */}
                    <Route path="/palestra-legnago" element={<PalestraLegnago />} />
                    <Route path="/dimagrire-legnago" element={<DimagrireLegnago />} />
                    <Route path="/mal-di-schiena-legnago" element={<MalDiSchienaLegnago />} />
                    <Route path="/massaggio-sportivo-legnago" element={<MassaggioSportivoLegnago />} />
                    
                    {/* Nearby towns SEO pages */}
                    <Route path="/cerea-fitness" element={<CereaFitness />} />
                    <Route path="/bovolone-fitness" element={<BovaloneFitness />} />
                    <Route path="/san-bonifacio-fitness" element={<SanBonifacioFitness />} />

                    {/* Legacy SEO pages - redirects */}
                    <Route path="/personal-trainer-legnago" element={<PersonalTrainerLegnago />} />
                    <Route path="/allenamento-ems-legnago" element={<AllenamentoEMSLegnago />} />
                    <Route path="/pilates-legnago" element={<PilatesLegnago />} />

                    <Route path="/come-arrivare" element={<ComeArrivare />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/risultati" element={<Risultati />} />
                    
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
                    
                    <Route path="/contatti" element={<Contatti />} />
                    <Route path="/form-contatti" element={<FormContatti />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
                    <Route path="/qa-report" element={<QAReport />} />
                    <Route path="/qa-clean-hero-mobile" element={<QACleanHeroMobile />} />
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