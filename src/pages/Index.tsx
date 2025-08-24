
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import MethodSection from '@/components/home/MethodSection';
import ProofSection from '@/components/home/ProofSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import { Helmet } from 'react-helmet';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import useLeadTracking from '@/hooks/useLeadTracking';

const Index = () => {
  // Initialize lead tracking
  useLeadTracking();

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>MUV Fitness Legnago – Fitness Intelligente con Personal Trainer</title>
        <meta name="description" content="EMS, Pancafit, Pilates Reformer, Vacuum e Pressoterapia. Percorsi su misura per dimagrimento, postura e cellulite. Prenota la consulenza gratuita." />
        <meta name="keywords" content="personal trainer legnago, ems legnago, pancafit legnago, pilates reformer legnago, fitness intelligente" />
        <link rel="canonical" href="https://www.muvfitness.it/" />
        <link rel="alternate" hrefLang="it" href="https://www.muvfitness.it/" />
      </Helmet>
      <LocalBusinessSchema />
      
      <HeroSection />
      <FeaturesSection />
      <MethodSection />
      <ProofSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Index;
