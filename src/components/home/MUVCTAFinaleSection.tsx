import { UnifiedContactForm } from '@/components/forms/UnifiedContactForm';

const MUVCTAFinaleSection = () => {

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-6 text-white">
            Vuoi scoprire MUV Fitness dal vivo?
          </h2>
          
          <p className="text-body-lg text-center mb-12 text-white/95">
            Compila il modulo: ti ricontatteremo entro 24 ore per fissare una visita senza impegno.
          </p>
          
          <UnifiedContactForm
            campaign="Homepage CTA"
            source="homepage-cta-section"
            showMessage={false}
            showObjective={false}
            className="bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default MUVCTAFinaleSection;
