// Homepage MUV - Landing Page Completa
import { Helmet } from 'react-helmet';
import MUVNavigation from '@/components/navigation/MUVNavigation';
import MUVBreadcrumb from '@/components/ui/MUVBreadcrumb';
import MUVHeroSection from '@/components/home/MUVHeroSection';
import MUVValoriSection from '@/components/home/MUVValoriSection';
import MUVTestimonialsSection from '@/components/home/MUVTestimonialsSection';
import MUVTeamSection from '@/components/home/MUVTeamSection';
import MUVCTAFinaleSection from '@/components/home/MUVCTAFinaleSection';
import MUVFooter from '@/components/home/MUVFooter';

const MUVHomepage = () => {
  return (
    <>
      <Helmet>
        <title>MUV Fitness Legnago - Allenati Diversamente</title>
        <meta name="description" content="Scopri l'unico ambiente a Legnago dove benessere, tecnologia e motivazione si incontrano. Personal training esclusivo, tecnologie all'avanguardia, risultati duraturi." />
        <meta name="keywords" content="palestra legnago, personal trainer legnago, ems legnago, fitness legnago, allenamento personalizzato" />
        <link rel="canonical" href="https://www.muvfitness.it/" />
      </Helmet>

      {/* Navigazione Sticky */}
      <MUVNavigation />
      
      {/* Breadcrumb */}
      <div className="pt-[68px]">
        <MUVBreadcrumb items={[{ name: 'Home' }]} />
      </div>
      
      {/* Hero Section */}
      <MUVHeroSection />
      
      {/* Sezione Valori & Mission */}
      <MUVValoriSection />
      
      {/* Sezione Storie & Testimonianze */}
      <MUVTestimonialsSection />
      
      {/* Sezione Team */}
      <MUVTeamSection />
      
      {/* Sezione CTA Finale */}
      <MUVCTAFinaleSection />
      
      {/* Footer */}
      <MUVFooter />
    </>
  );
};

export default MUVHomepage;