
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import MuvPlanner from "./pages/MuvPlanner";
import ChiSiamo from "./pages/ChiSiamo";
import Servizi from "./pages/Servizi";
import Team from "./pages/Team";
import Risultati from "./pages/Risultati";
import Contatti from "./pages/Contatti";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Analytics from "./pages/Analytics";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import CreateSamplePosts from "./pages/CreateSamplePosts";
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
              <Route path="/muv-planner" element={<MuvPlanner />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/servizi" element={<Servizi />} />
              <Route path="/team" element={<Team />} />
              <Route path="/risultati" element={<Risultati />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/create-sample-posts" element={<CreateSamplePosts />} />
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
