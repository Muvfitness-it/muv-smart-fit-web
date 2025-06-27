
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ChiSiamo from "./pages/ChiSiamo";
import Servizi from "./pages/Servizi";
import Team from "./pages/Team";
import Contatti from "./pages/Contatti";
import MuvPlanner from "./pages/MuvPlanner";
import PersonalTraining from "./pages/servizi/PersonalTraining";
import SmallGroup from "./pages/servizi/SmallGroup";
import EMS from "./pages/servizi/EMS";
import Pancafit from "./pages/servizi/Pancafit";
import Pilates from "./pages/servizi/Pilates";
import Nutrizione from "./pages/servizi/Nutrizione";
import Risultati from "./pages/Risultati";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import Analytics from "./pages/Analytics";
import BlogAdmin from "./pages/BlogAdmin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/servizi" element={<Servizi />} />
              <Route path="/servizi/personal-training" element={<PersonalTraining />} />
              <Route path="/servizi/small-group" element={<SmallGroup />} />
              <Route path="/servizi/ems" element={<EMS />} />
              <Route path="/servizi/pancafit" element={<Pancafit />} />
              <Route path="/servizi/pilates" element={<Pilates />} />
              <Route path="/servizi/nutrizione" element={<Nutrizione />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/muv-planner" element={<MuvPlanner />} />
              <Route path="/risultati" element={<Risultati />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/blog-admin" element={<BlogAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
