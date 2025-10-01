import { Helmet } from "react-helmet";
import { UnifiedContactForm } from "@/features/forms";
import { useNavigate } from "react-router-dom";

const FormContatti = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect to thank you page or contact page after successful submission
    navigate("/contatti", { state: { success: true } });
  };

  return (
    <>
      <Helmet>
        <title>Candidati per la Trasformazione MUV - Fitness Intelligente Legnago</title>
        <meta name="description" content="Compila il modulo per candidarti alla trasformazione in 30 giorni con MUV Fitness. Personal training personalizzato a Legnago con tecnologie innovative." />
        <meta name="keywords" content="trasformazione 30 giorni, fitness legnago, personal trainer legnago, candidatura muv" />
        <link rel="canonical" href="https://www.muvfitness.it/form-contatti" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                🚀 CANDIDATI PER LA TRASFORMAZIONE
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                <strong className="text-brand-primary">✨ PRIMI 10 CLIENTI</strong> - Consulenza gratuita e piano personalizzato
              </p>
              <div className="glass-card p-6 rounded-2xl border-brand-primary/30">
                <p className="text-lg text-foreground font-semibold">
                  🎁 <strong className="text-brand-accent">Check-up completo GRATUITO</strong> + 
                  <strong className="text-brand-secondary"> Prima seduta di prova</strong> + 
                  <strong className="text-brand-primary"> Piano personalizzato 1-to-1</strong>
                </p>
              </div>
            </div>

            <UnifiedContactForm 
              campaign="Trasformazione MUV 30 Giorni"
              source="form-contatti-page"
              onSuccess={handleSuccess}
              enableAIData={true}
            />

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground font-semibold">
                ⏰ <span className="text-brand-primary font-bold">POSTI LIMITATI</span> - 
                Solo <span className="text-brand-accent font-bold">10 CONSULENZE GRATUITE</span> questo mese
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FormContatti;