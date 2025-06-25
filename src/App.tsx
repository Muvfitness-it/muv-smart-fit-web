import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useSiteVisitTracker } from "./hooks/useSiteVisitTracker";
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

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  useSiteVisitTracker();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <main className="pt-[var(--header-height)]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/team" element={<Team />} />
          <Route path="/risultati" element={<Risultati />} />
          <Route path="/muv-planner" element={<MuvPlanner />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
