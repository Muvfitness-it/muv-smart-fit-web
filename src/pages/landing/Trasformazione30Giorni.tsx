import React from "react";
import { useNavigate } from "react-router-dom";
import LandingTemplate from "./LandingTemplate";
import { FlexibleHero } from "@/features/hero";
import LandingBeforeAfter from "@/components/landing/LandingBeforeAfter";
import LandingForm from "@/components/landing/LandingForm";
import LandingGuarantee from "@/components/landing/LandingGuarantee";
import { STANDARD_CTAS } from "@/config/ctaConstants";

const Trasformazione30Giorni = () => {
  const navigate = useNavigate();

  const scrollToForm = () => {
    const formElement = document.getElementById("landing-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSuccess = () => {
    navigate("/contatti?success=true");
  };

  const testimonials = [
    {
      name: "Marco R.",
      age: 35,
      result: "-12kg",
      testimonial:
        "In 30 giorni ho ritrovato energia e forma. Il metodo MUV è stato la scelta giusta: professionalità e attenzione personalizzata.",
      timeframe: "30 giorni",
    },
    {
      name: "Elena B.",
      age: 28,
      result: "-8kg",
      testimonial:
        "Dopo la gravidanza cercavo un ambiente discreto e professionale. MUV mi ha dato esattamente questo, con risultati concreti.",
      timeframe: "28 giorni",
    },
    {
      name: "Andrea F.",
      age: 42,
      result: "-15kg",
      testimonial: 
        "A 42 anni pensavo fosse difficile tornare in forma. Il percorso personalizzato ha fatto la differenza.",
      timeframe: "35 giorni",
    },
    {
      name: "Giulia M.",
      age: 31,
      result: "-10kg",
      testimonial:
        "Più che un programma di dimagrimento, un percorso di consapevolezza. Ho acquisito abitudini che mantengo ancora oggi.",
      timeframe: "30 giorni",
    },
    {
      name: "Roberto C.",
      age: 39,
      result: "-18kg",
      testimonial: 
        "La tecnologia EMS combinata con il supporto nutrizionale: un approccio che funziona davvero.",
      timeframe: "45 giorni",
    },
    {
      name: "Federica V.",
      age: 26,
      result: "Tono muscolare",
      testimonial:
        "Non cercavo solo di perdere peso, ma di sentirmi più forte. MUV ha capito le mie esigenze.",
      timeframe: "25 giorni",
    },
  ];

  return (
    <LandingTemplate
      title="Percorso Trasformazione 30 Giorni | Centro Fitness MUV Legnago"
      description="Inizia il tuo percorso di trasformazione con il metodo scientifico MUV. Consulenza gratuita, programma personalizzato e risultati misurabili in 30 giorni."
      keywords="dimagrimento personalizzato, percorso fitness Legnago, MUV Fitness, risultati 30 giorni"
      campaignName="trasformazione-30-giorni"
    >
      <FlexibleHero
        variant="landing"
        title="Il tuo percorso di trasformazione inizia qui"
        subtitle="Risultati visibili in 4 settimane con il Metodo MUV: tecnologia, personalizzazione e supporto costante"
        primaryCTA={{
          text: STANDARD_CTAS.primary,
          onClick: scrollToForm,
        }}
        guarantee="Consulenza gratuita senza impegno"
        urgency="Posti limitati per garantire attenzione personalizzata"
      />

      <LandingBeforeAfter testimonials={testimonials} />

      <div id="landing-form">
        <LandingForm
          campaignName="trasformazione-30-giorni"
          formTitle="Inizia il tuo percorso"
          incentive="Valutazione completa + Prima seduta di prova + Piano personalizzato"
          onSuccess={handleFormSuccess}
        />
      </div>

      <LandingGuarantee />
    </LandingTemplate>
  );
};

export default Trasformazione30Giorni;
