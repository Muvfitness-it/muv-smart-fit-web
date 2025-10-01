import { Helmet } from 'react-helmet';
import {
  MUVNavigation,
  MUVHeroSection,
  MUVValoriSection,
  MUVServiziSection,
  MUVTestimonialsSection,
  MUVTeamSection,
  MUVCTAFinaleSection,
  MUVFooter
} from '@/features/sections';

const MUVHomepage = () => {
  return (
    <>
      <Helmet>
        <title>MUV Fitness Legnago - Allenati Diversamente</title>
        <meta name="description" content="Scopri l'unico ambiente a Legnago dove benessere, tecnologia e motivazione si incontrano. Personal training esclusivo, tecnologie all'avanguardia, risultati duraturi." />
        <meta name="keywords" content="palestra legnago, personal trainer legnago, ems legnago, fitness legnago, allenamento personalizzato" />
        <link rel="canonical" href="https://www.muvfitness.it/" />
      </Helmet>

      <MUVNavigation />
      <MUVHeroSection />
      <MUVValoriSection />
      <MUVServiziSection />
      <MUVTestimonialsSection />
      <MUVTeamSection />
      <MUVCTAFinaleSection />
      <MUVFooter />
    </>
  );
};

export default MUVHomepage;