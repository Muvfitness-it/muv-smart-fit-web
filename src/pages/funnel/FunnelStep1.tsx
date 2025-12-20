import React from 'react';
import FunnelTemplate from '@/components/funnel/FunnelTemplate';
import FunnelHero from '@/components/funnel/FunnelHero';
import FunnelTargetAudience from '@/components/funnel/FunnelTargetAudience';
import FunnelBenefits from '@/components/funnel/FunnelBenefits';
import FunnelJourney from '@/components/funnel/FunnelJourney';
import { Helmet } from 'react-helmet';

const FunnelStep1: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Percorso Fitness Personalizzato | MUV Fitness Legnago</title>
        <meta 
          name="description" 
          content="Scopri se il percorso guidato MUV è adatto a te. Trasforma il tuo corpo con EMS, Vacuum, Pilates e un personal trainer dedicato a Legnago." 
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <FunnelTemplate>
        <FunnelHero />
        <FunnelTargetAudience />
        <FunnelBenefits />
        <FunnelJourney />
      </FunnelTemplate>
    </>
  );
};

export default FunnelStep1;
