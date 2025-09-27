// Homepage MUV - Implementazione Completa Specifiche Rigorose
import { Helmet } from 'react-helmet';
import MUVNavigation from '@/components/navigation/MUVNavigation';
import MUVHeroSection from '@/components/home/MUVHeroSection';
import MUVBreadcrumb from '@/components/ui/MUVBreadcrumb';

const MUVHomepage = () => {
  return (
    <>
      <Helmet>
        <title>MUV Fitness Legnago - Palestra Tecnologica con Risultati Garantiti</title>
        <meta name="description" content="Fitness tecnologico a Legnago: EMS, Personal Training, risultati garantiti in 30 giorni. Massimo 4 persone per sessione. Prenota la tua prova gratuita!" />
        <meta name="keywords" content="palestra legnago, personal trainer legnago, ems legnago, fitness legnago, dimagrire legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/" />
      </Helmet>

      {/* Navigazione Sticky */}
      <MUVNavigation />
      
      {/* Spazio per header sticky */}
      <div style={{ paddingTop: '80px' }}>
        
        {/* Breadcrumb */}
        <MUVBreadcrumb 
          items={[
            { name: "Home" }
          ]}
        />
        
        {/* Hero Section Full Width */}
        <MUVHeroSection />
        
        {/* Spazio bianco minimo inter-elementi 40px - Specifica richiesta */}
        <div style={{ height: '40px' }} />
        
        {/* Altre sezioni potrebbero essere aggiunte qui */}
        
      </div>
    </>
  );
};

export default MUVHomepage;