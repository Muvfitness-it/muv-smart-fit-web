import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useSiteVisitTracker } from "./hooks/useSiteVisitTracker";
import { useEffect } from "react";
import PerformanceOptimizer from "@/components/ui/PerformanceOptimizer";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogWriter from "./pages/BlogWriter";
import BlogManager from "./pages/BlogManager";
import BlogEditor from "./pages/BlogEditor";
import AdminAuth from "./pages/AdminAuth";
import Analytics from "./pages/Analytics";
// Landing Pages
import Trasformazione30Giorni from "./pages/landing/Trasformazione30Giorni";
// SEO Components
import DynamicSitemap from "./components/SEO/DynamicSitemap";
import SEOHandler from "./components/home/SEOHandler";
import { SecurityHeaders } from "./components/security/SecurityHeaders";
import AIAuth from "./pages/AIAuth";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  useSiteVisitTracker();

  // Preload blog domain for faster iframe loading
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = 'https://muvfit-blog-builder.lovable.app';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <>
      <SecurityHeaders />
      <SEOHandler />
      <PerformanceOptimizer />
      <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        {/* Landing Pages - NO Navigation/Footer */}
        <Route path="/trasformazione-30-giorni" element={<Trasformazione30Giorni />} />
        
        {/* Auth Pages - NO Navigation/Footer */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/ai-auth" element={<AIAuth />} />
        
        
        {/* Regular Pages - WITH Navigation/Footer */}
        <Route path="/*" element={
          <>
            <Navigation />
            <main className="pt-[var(--header-height)]">
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
                <Route path="/team" element={<Team />} />
                <Route path="/risultati" element={<Risultati />} />
                <Route path="/muv-planner" element={<MuvPlanner />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/scrivi-con-ia" element={<BlogWriter />} />
                <Route path="/blog/gestisci" element={<BlogManager />} />
                <Route path="/blog/nuovo" element={<BlogEditor />} />
                <Route path="/blog/edit/:id" element={<BlogEditor />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/analytics" element={<Analytics />} />
                
                <Route path="/sitemap.xml" element={<DynamicSitemap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
        </Routes>
      </div>
    </>
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