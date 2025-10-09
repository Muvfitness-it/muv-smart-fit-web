import { MinimalHero } from '@/features/hero';

const MUVHeroSection = () => {
  return (
    <MinimalHero
      title="Allenati Diversamente a Legnago"
      description="Scopri l'unico ambiente dove benessere, tecnologia e motivazione si incontrano per farti sentire protagonista del tuo cambiamento."
      gradient="dual"
      primaryCTA={{
        text: "Prenota una visita gratuita",
        href: "/form-contatti"
      }}
      secondaryCTA={{
        text: "Scopri la nostra filosofia",
        href: "#valori"
      }}
    />
  );
};

export default MUVHeroSection;