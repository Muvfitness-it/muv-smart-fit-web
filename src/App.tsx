import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useSiteVisitTracker } from "./hooks/useSiteVisitTracker";
import { useResourceOptimization } from "./hooks/useResourceOptimization";
import { useEffect } from "react";
import PerformanceOptimizer from "@/components/ui/PerformanceOptimizer";
import CriticalCSS from "@/components/CriticalCSS";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ChiSiamo from "./pages/ChiSiamo";
import Servizi from "./pages/Servizi";
import Team from "./pages/Team";
import Risultati from "./pages/Risultati";

import Contatti from "./pages/Contatti";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
// New SEO service pages
import EMSLegnago from "./pages/servizi/EMSLegnago";
import PancafitPosturaLegnago from "./pages/servizi/PancafitPosturaLegnago";
import PilatesReformerLegnago from "./pages/servizi/PilatesReformerLegnago";
import CelluliteVacuumLegnago from "./pages/servizi/CelluliteVacuumLegnago";
import PersonalTrainerLegnago from "./pages/servizi/PersonalTrainerLegnago";

// Legacy service pages
import PersonalTraining from "./pages/servizi/PersonalTraining";
import EMS from "./pages/servizi/EMS";
import Pancafit from "./pages/servizi/Pancafit";
import Pilates from "./pages/servizi/Pilates";
import HIIT from "./pages/servizi/HIIT";
import SmallGroup from "./pages/servizi/SmallGroup";
import Nutrizione from "./pages/servizi/Nutrizione";
import Psicologo from "./pages/servizi/Psicologo";
import Massoterapia from "./pages/servizi/Massoterapia";

// New main pages
import Prezzi from "./pages/Prezzi";
import ComeArrivare from "./pages/ComeArrivare";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import Analytics from "./pages/Analytics";
// Landing Pages
import Trasformazione30Giorni from "./pages/landing/Trasformazione30Giorni";
// SEO Components


import { SecurityHeaders } from "./components/security/SecurityHeaders";
import { SessionSecurity } from "./components/security/SessionSecurity";
import AIAuth from "./pages/AIAuth";
import CookieConsent from "./components/security/CookieConsent";
import RedirectHandler from "./components/SEO/RedirectHandler";

import AllenamentoEMSLegnago from "./pages/AllenamentoEMSLegnago";
import PilatesLegnago from "./pages/PilatesLegnago";


import BlogIndex from "./pages/blog/BlogIndex";
import BlogCategory from "./pages/blog/BlogCategory";
import BlogArticle from "./pages/blog/BlogArticle";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminBlogCreateAI from "./pages/admin/AdminBlogCreateAI";
import AdminBlogCreateManual from "./pages/admin/AdminBlogCreateManual";
import SEOAudit from "./pages/SEOAudit";
import QAReport from "./pages/QAReport";
import QAReadOnlyAudit from "./pages/QAReadOnlyAudit";
import Recensioni from "./pages/Recensioni";
import FaqGbp from "./pages/FaqGbp";
import MediaKitProofPosts from "./pages/MediaKitProofPosts";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  useSiteVisitTracker();
  useResourceOptimization();

  return (
    <SessionSecurity>
      <RedirectHandler />
      <SecurityHeaders />
      <PerformanceOptimizer />
      <CriticalCSS />
      <div className="min-h-screen bg-white text-gray-900">
      <Routes>
        {/* Landing Pages - NO Navigation/Footer */}
        <Route path="/trasformazione-30-giorni" element={<Trasformazione30Giorni />} />
        
        {/* Auth Pages - NO Navigation/Footer */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/auth" element={<AdminAuth />} />
            <Route path="/ai-auth" element={<AIAuth />} />


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

                {/* Legacy SEO pages - redirects */}
                <Route path="/personal-trainer-legnago" element={<PersonalTrainerLegnago />} />
                <Route path="/allenamento-ems-legnago" element={<AllenamentoEMSLegnago />} />
                <Route path="/pilates-legnago" element={<PilatesLegnago />} />

                <Route path="/prezzi" element={<Prezzi />} />
                <Route path="/come-arrivare" element={<ComeArrivare />} />
                <Route path="/team" element={<Team />} />
                <Route path="/risultati" element={<Risultati />} />
                
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/c/:slug" element={<BlogCategory />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/blog" element={<AdminBlogList />} />
                <Route path="/admin/blog/categorie" element={<AdminCategories />} />
                <Route path="/admin/blog/create/ai" element={<AdminBlogCreateAI />} />
                <Route path="/admin/blog/create/manual" element={<AdminBlogCreateManual />} />
                <Route path="/admin/blog/new" element={<Navigate to="/admin/blog/create/ai" replace />} />
                <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
                <Route path="/admin/utenti" element={<AdminUserManagement />} />
                
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                 <Route path="/analytics" element={<Analytics />} />
        <Route path="/qa-report" element={<QAReport />} />
        <Route path="/qa-audit" element={<QAReadOnlyAudit />} />
         <Route path="/seo-report" element={<SEOAudit />} />
         <Route path="/recensioni" element={<Recensioni />} />
        <Route path="/faq-gbp" element={<FaqGbp />} />
        <Route path="/media-kit/proof-posts" element={<MediaKitProofPosts />} />
                
                {/* Redirect /muv-planner to /contatti/ */}
                <Route path="/muv-planner" element={<Navigate to="/contatti/" replace />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
        </Routes>
      </div>
      <CookieConsent />
    </SessionSecurity>
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