import { Helmet } from "react-helmet";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";
import SimpleHomeNavbar from "@/components/home/SimpleHomeNavbar";
import SimpleHomeFooter from "@/components/home/SimpleHomeFooter";
import ConversionHero from "@/components/home/ConversionHero";
import FinalCTASection from "@/components/home/FinalCTASection";
import StickyMobileCTA from "@/components/home/StickyMobileCTA";
import SocialProofBar from "@/components/home/SocialProofBar";
import ExitIntentPopup from "@/components/home/ExitIntentPopup";
import HomepageFAQ from "@/components/home/HomepageFAQ";
import useScrollDepthTracking from "@/hooks/useScrollDepthTracking";

const MUVHomepage = () => {
  // Attiva scroll depth tracking
  useScrollDepthTracking();

  return (
    <>
      <Helmet>
        <title>MUV Fitness Legnago | Centro Fitness Boutique con Personal Trainer</title>
        <meta
          name="description"
          content="Trasforma il tuo corpo con un percorso guidato e personalizzato. Centro Fitness Boutique a Legnago con EMS, Vacuum, Pilates e personal trainer dedicato. Prenota la consulenza gratuita."
        />
        <meta
          name="keywords"
          content="personal trainer legnago, centro fitness legnago, ems legnago, pilates reformer legnago, palestra privata legnago"
        />
        <link rel="canonical" href="https://www.muvfitness.it/" />

        {/* Open Graph */}
        <meta property="og:title" content="MUV Fitness Legnago | Centro Fitness Boutique" />
        <meta
          property="og:description"
          content="Trasforma il tuo corpo con un percorso guidato e personalizzato. Ambiente riservato, personal trainer dedicato."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/" />
        <meta
          property="og:image"
          content="https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MUV Fitness Legnago | Centro Fitness Boutique" />
        <meta name="twitter:description" content="Percorsi personalizzati con EMS, Vacuum, Pilates. Ambiente riservato." />
      </Helmet>

      <LocalBusinessSchema />

      {/* NAVBAR SEMPLICE: Solo Logo + CTA */}
      <SimpleHomeNavbar />

      {/* HOMEPAGE: Hero + Social Proof + FAQ + Contatto */}
      <ConversionHero />
      <SocialProofBar />
      <HomepageFAQ />
      <FinalCTASection />

      {/* FOOTER SEMPLICE: Indirizzo, Telefono, Privacy, Link pagine */}
      <SimpleHomeFooter />

      {/* Mobile sticky CTA */}
      <StickyMobileCTA />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </>
  );
};

export default MUVHomepage;
