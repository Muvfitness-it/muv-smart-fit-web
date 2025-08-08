
import { useAdminAuth } from '@/hooks/useAdminAuth';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import SEOHandler from '@/components/home/SEOHandler';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';

import { Button } from '@/components/ui/button';
import { LogIn, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLeadTracking from '@/hooks/useLeadTracking';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAdminAuth();

  const { toast } = useToast();

  // Initialize lead tracking
  useLeadTracking();

  // One-time automatic trigger to extend drafts and generate images
  useEffect(() => {
    const key = 'muv_seed_now_v3';
    if (localStorage.getItem(key)) return;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('seed-blog-drafts', {
          body: { applyToExisting: true },
        });
        if (error) throw error;
        const created = data?.created || 0;
        const upgraded = data?.upgraded || 0;
        const images = data?.imagesGenerated || 0;
        toast({ title: 'Bozze aggiornate', description: `${created} nuove, ${upgraded} estese, ${images} immagini generate` });
      } catch (e: any) {
        toast({ title: 'Errore aggiornamento bozze', description: e.message || 'Errore sconosciuto', variant: 'destructive' });
      } finally {
        localStorage.setItem(key, '1');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <SEOHandler />
      <LocalBusinessSchema />
      

      {/* Existing content */}
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;
