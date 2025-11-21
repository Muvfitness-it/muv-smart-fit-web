import React from "react";
import { useNavigate } from "react-router-dom";
import LandingTemplate from "./LandingTemplate";
import { FlexibleHero } from "@/features/hero";
import LandingBeforeAfter from "@/components/landing/LandingBeforeAfter";
import LandingCountdown from "@/components/landing/LandingCountdown";
import LandingForm from "@/components/landing/LandingForm";
import LandingGuarantee from "@/components/landing/LandingGuarantee";

const Trasformazione30Giorni = () => {
  const navigate = useNavigate();

  // Set countdown to 3 days from now
  const countdownEnd = new Date();
  countdownEnd.setDate(countdownEnd.getDate() + 3);

  const scrollToForm = () => {
    const formElement = document.getElementById("landing-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSuccess = () => {
    // Redirect to thank you page or show success message
    navigate("/contatti?success=true");
  };

  const testimonials = [
    {
      name: "Marco Rossi",
      age: 35,
      result: "-12kg",
      testimonial:
        "Non credevo fosse possibile. In 30 giorni ho perso 12kg e mi sento rinato. Il metodo MUV funziona davvero!",
      timeframe: "30 giorni",
    },
    {
      name: "Elena Bianchi",
      age: 28,
      result: "-8kg + Taglia 42",
      testimonial:
        "Finalmente ho ritrovato la mia forma dopo la gravidanza. Staff professionale e risultati garantiti!",
      timeframe: "28 giorni",
    },
    {
      name: "Andrea Ferri",
      age: 42,
      result: "-15kg",
      testimonial: "A 42 anni pensavo fosse troppo tardi. Mi sbagliavo! Ora ho più energia di quando ne avevo 25.",
      timeframe: "35 giorni",
    },
    {
      name: "Giulia Marchetti",
      age: 31,
      result: "-10kg",
      testimonial:
        "Il programma ha cambiato la mia vita. Non solo ho perso peso, ma ho acquisito fiducia in me stessa.",
      timeframe: "30 giorni",
    },
    {
      name: "Roberto Costa",
      age: 39,
      result: "-18kg",
      testimonial: "Incredibile! Tutti mi chiedono il mio segreto. La risposta è semplice: MUV Smart Fit.",
      timeframe: "45 giorni",
    },
    {
      name: "Federica Villa",
      age: 26,
      result: "-7kg + Tono",
      testimonial:
        "Non solo ho perso peso, ma ho guadagnato massa muscolare. Il mio corpo non è mai stato così tonico!",
      timeframe: "25 giorni",
    },
  ];

  return (
    <LandingTemplate
      title="Trasformazione Garantita in 30 Giorni | Centro fitness MUV Legnago"
      description="Perdi fino a 15kg in 30 giorni con il metodo scientifico MUV. Garanzia soddisfatti o rimborsati. Prenota la tua consulenza gratuita."
      keywords="dimagrire velocemente, perdere peso 30 giorni, MUV Legnago, fitness risultati garantiti"
      campaignName="trasformazione-30-giorni"
    >
      <FlexibleHero
        variant="landing"
        title="TRASFORMA IL TUO CORPO IN 30 GIORNI"
        subtitle="🔥 PERDI FINO A 15KG CON IL METODO SCIENTIFICO MUV • ✅ RISULTATI GARANTITI O RIMBORSO TOTALE"
        primaryCTA={{
          text: "PRENOTA CONSULENZA GRATUITA",
          onClick: scrollToForm,
        }}
        guarantee="✅ Garanzia Soddisfatti o Rimborsati al 100%"
        urgency="ULTIMI 3 POSTI DISPONIBILI A QUESTO PREZZO!"
      />

      <LandingCountdown endDate={countdownEnd} title="⏰ OFFERTA LIMITATA IN SCADENZA" />

      <LandingBeforeAfter testimonials={testimonials} />

      <div id="landing-form">
        <LandingForm
          campaignName="trasformazione-30-giorni"
          formTitle="🎁 PRENOTA LA TUA TRASFORMAZIONE GRATUITA"
          incentive="Check-up completo + Prima seduta + Piano personalizzato (Valore €150) - OGGI GRATIS"
          onSuccess={handleFormSuccess}
        />
      </div>

      <LandingGuarantee />
    </LandingTemplate>
  );
};

export default Trasformazione30Giorni;
