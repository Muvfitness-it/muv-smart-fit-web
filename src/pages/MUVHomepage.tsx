import { Helmet } from "react-helmet";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";
import ConversionHero from "@/components/home/ConversionHero";
import TargetAudienceSection from "@/components/home/TargetAudienceSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import OfferSection from "@/components/home/OfferSection";
import FAQAccordion, { FAQItem } from "@/components/shared/FAQAccordion";
import FinalCTASection from "@/components/home/FinalCTASection";
import StickyMobileCTA from "@/components/home/StickyMobileCTA";

const MUVHomepage = () => {
  const faqs: FAQItem[] = [
    {
      question: "Quanto tempo ci vuole per vedere i primi risultati?",
      answer:
        "Con il protocollo MUV integrato, i primi risultati visibili si manifestano già dalla 4a settimana. Per il dimagrimento, perderai 3-5kg di grasso in 8 settimane.",
    },
    {
      question: "L'EMS è sicuro?",
      answer:
        "L'EMS è una tecnologia certificata e validata scientificamente, utilizzata in ambito medico-riabilitativo da decenni. Durante la valutazione iniziale verifichiamo l'idoneità completa.",
    },
    {
      question: "Devo avere esperienza in palestra?",
      answer:
        "Assolutamente no. I nostri protocolli sono progettati per tutti i livelli: principianti assoluti, persone sedentarie, atleti esperti e over 60.",
    },
    {
      question: "Quanto durano le sessioni?",
      answer:
        "Le sessioni EMS durano 20 minuti, il Pilates Reformer 50 minuti. La frequenza ottimale è 2-3 volte/settimana.",
    },
    {
      question: "Offrite supporto nutrizionale?",
      answer: "Sì, tutti i pacchetti Focus ed Evolution includono piano nutrizionale personalizzato.",
    },
    {
      question: "Posso provare prima di iscrivermi?",
      answer:
        "Certamente. Offriamo una prova gratuita completa di 90 minuti che include valutazione, presentazione del protocollo e sessione trial. Zero impegno.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>MUV Fitness Legnago | Dimagrisci 4-8kg in 8 Settimane con EMS</title>
        <meta
          name="description"
          content="Perdi 4-8kg in 8 settimane con sessioni da 45 minuti. Centro fitness boutique a Legnago con EMS Training, Pilates Reformer. Ambiente riservato, risultati garantiti. Prova gratuita."
        />
        <meta
          name="keywords"
          content="dimagrimento legnago, ems legnago, pilates reformer legnago, personal trainer legnago, palestra privata legnago"
        />
        <link rel="canonical" href="https://www.muvfitness.it/" />

        {/* Open Graph */}
        <meta property="og:title" content="MUV Fitness Legnago | Dimagrisci in 8 Settimane" />
        <meta
          property="og:description"
          content="Perdi 4-8kg in 8 settimane con sessioni da 45 minuti. Ambiente riservato, zero attese."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/" />
        <meta
          property="og:image"
          content="https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MUV Fitness Legnago | Dimagrisci in 8 Settimane" />
        <meta name="twitter:description" content="Sessioni da 20 minuti, risultati in 4-8 settimane" />
      </Helmet>

      <LocalBusinessSchema />

      {/* Flow: Hero → Per chi è → Problema → Soluzione → Prova sociale → Offerta → FAQ → CTA finale */}

      <ConversionHero />

      <TargetAudienceSection />

      <ProblemSection />

      <SolutionSection />

      <SocialProofSection />

      <OfferSection />

      <FAQAccordion faqs={faqs} />

      <FinalCTASection />

      {/* Mobile sticky CTA */}
      <StickyMobileCTA />
    </>
  );
};

export default MUVHomepage;
