
import React from 'react';
import { useParams } from 'react-router-dom';
import Trasformazione30Giorni from '@/pages/landing/Trasformazione30Giorni';
import NotFound from '@/pages/NotFound';

const LandingRouter: React.FC = () => {
  const { campaign } = useParams();

  const renderLandingPage = () => {
    switch (campaign) {
      case 'trasformazione-30-giorni':
        return <Trasformazione30Giorni />;
      case 'ems-rivoluzionario':
        // Future landing page
        return <div>EMS Landing - Coming Soon</div>;
      case 'prova-gratuita':
        // Future landing page
        return <div>Prova Gratuita Landing - Coming Soon</div>;
      case 'estate-perfetta':
        // Future landing page
        return <div>Estate Perfetta Landing - Coming Soon</div>;
      default:
        return <NotFound />;
    }
  };

  return renderLandingPage();
};

export default LandingRouter;
