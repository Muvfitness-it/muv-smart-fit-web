import React from 'react';
import { useNavigate } from 'react-router-dom';
import FunnelTemplate from '@/components/funnel/FunnelTemplate';
import FunnelBookingForm from '@/components/funnel/FunnelBookingForm';
import { Helmet } from 'react-helmet';

const FunnelStep3: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/funnel/grazie');
  };

  return (
    <>
      <Helmet>
        <title>Prenota la Consulenza | MUV Fitness Legnago</title>
        <meta 
          name="description" 
          content="Prenota la tua consulenza conoscitiva gratuita presso MUV Fitness Legnago. Nessun impegno." 
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <FunnelTemplate>
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center mb-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ottimo. Il percorso MUV sembra adatto a te.
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Ora puoi prenotare una consulenza conoscitiva gratuita in studio 
              per capire se e come possiamo aiutarti davvero.
            </p>
          </div>

          <FunnelBookingForm onSuccess={handleSuccess} />
        </div>
      </FunnelTemplate>
    </>
  );
};

export default FunnelStep3;
