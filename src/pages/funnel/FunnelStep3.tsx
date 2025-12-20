import React from 'react';
import { useNavigate } from 'react-router-dom';
import FunnelTemplate from '@/components/funnel/FunnelTemplate';
import FunnelProgress from '@/components/funnel/FunnelProgress';
import FunnelBookingForm from '@/components/funnel/FunnelBookingForm';
import { Helmet } from 'react-helmet';
import { Sparkles } from 'lucide-react';

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
            <FunnelProgress currentStep={3} totalSteps={3} />
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Ottimo! Il percorso MUV sembra perfetto per te</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prenota la tua consulenza
              <span className="block text-primary">gratuita in studio</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Lascia i tuoi dati e ti contatteremo entro 24 ore per fissare un appuntamento.
            </p>
          </div>

          <FunnelBookingForm onSuccess={handleSuccess} />
        </div>
      </FunnelTemplate>
    </>
  );
};

export default FunnelStep3;
