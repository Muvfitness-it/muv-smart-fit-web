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
import MuvPlanner from "./pages/MuvPlanner";
import Contatti from "./pages/Contatti";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import PersonalTraining from "./pages/servizi/PersonalTraining";
import EMS from "./pages/servizi/EMS";
import Pancafit from "./pages/servizi/Pancafit";
import Pilates from "./pages/servizi/Pilates";
import HIIT from "./pages/servizi/HIIT";
import SmallGroup from "./pages/servizi/SmallGroup";
import Nutrizione from "./pages/servizi/Nutrizione";
import Psicologo from "./pages/servizi/Psicologo";
import Massoterapia from "./pages/servizi/Massoterapia";
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

import PersonalTrainerLegnago from "./pages/PersonalTrainerLegnago";
import AllenamentoEMSLegnago from "./pages/AllenamentoEMSLegnago";
import PilatesLegnago from "./pages/PilatesLegnago";

import AdminSEOReport from "./pages/AdminSEOReport";
const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  useSiteVisitTracker();
  useResourceOptimization();

  return (
    <SessionSecurity>
      <SecurityHeaders />
      <PerformanceOptimizer />
      <CriticalCSS />
      <div className="min-h-screen bg-gray-900 text-white">
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
            <main id="main" className="pt-[var(--header-height)]">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chi-siamo" element={<ChiSiamo />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/servizi/personal-training" element={<PersonalTraining />} />
                <Route path="/servizi/ems" element={<EMS />} />
                <Route path="/servizi/pancafit" element={<Pancafit />} />
                <Route path="/servizi/pilates" element={<Pilates />} />
                <Route path="/servizi/hiit" element={<HIIT />} />
                <Route path="/servizi/small-group" element={<SmallGroup />} />
                <Route path="/servizi/nutrizione" element={<Nutrizione />} />
                <Route path="/servizi/psicologo" element={<Psicologo />} />
                <Route path="/servizi/massoterapia" element={<Massoterapia />} />

                {/* Nuove pagine servizio SEO-first */}
                <Route path="/personal-trainer-legnago" element={<PersonalTrainerLegnago />} />
                <Route path="/personal-trainer-legnago/" element={<PersonalTrainerLegnago />} />
                <Route path="/allenamento-ems-legnago" element={<AllenamentoEMSLegnago />} />
                <Route path="/allenamento-ems-legnago/" element={<AllenamentoEMSLegnago />} />
                <Route path="/pilates-legnago" element={<PilatesLegnago />} />
                <Route path="/pilates-legnago/" element={<PilatesLegnago />} />

                <Route path="/team" element={<Team />} />
                <Route path="/risultati" element={<Risultati />} />
                <Route path="/muv-planner" element={<MuvPlanner />} />
                <Route path="/blog/*" element={<Navigate to="/" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/utenti" element={<AdminUserManagement />} />
                <Route path="/admin/seo-report" element={<AdminSEOReport />} />
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/analytics" element={<Analytics />} />
                
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