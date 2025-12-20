import React from 'react';
import { useNavigate } from 'react-router-dom';
import FunnelTemplate from '@/components/funnel/FunnelTemplate';
import FunnelProgress from '@/components/funnel/FunnelProgress';
import FunnelQualificationForm from '@/components/funnel/FunnelQualificationForm';
import { Helmet } from 'react-helmet';

const FunnelStep2: React.FC = () => {
  const navigate = useNavigate();

  const handleComplete = (answers: Record<string, string>) => {
    // Save answers to localStorage for later use
    localStorage.setItem('funnel_answers', JSON.stringify(answers));
    
    // Navigate to booking step
    navigate('/funnel/prenota');
  };

  return (
    <>
      <Helmet>
        <title>Questionario Personalizzato | MUV Fitness Legnago</title>
        <meta 
          name="description" 
          content="Rispondi a 5 semplici domande per capire se il percorso MUV è adatto a te. Consulenza personalizzata." 
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <FunnelTemplate>
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center mb-10 px-4">
            <FunnelProgress currentStep={2} totalSteps={3} />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Scopri se MUV è adatto a te
            </h1>
            <p className="text-muted-foreground">
              Rispondi a poche domande per aiutarci a capire i tuoi obiettivi
            </p>
          </div>

          <FunnelQualificationForm onComplete={handleComplete} />
        </div>
      </FunnelTemplate>
    </>
  );
};

export default FunnelStep2;
