import heroImage from '@/assets/hero-fitness-professional.jpg';
import { FlexibleHero } from '@/features/hero';

const MUVHeroSection = () => {
  return (
    <FlexibleHero
      variant="fullscreen"
      title="Allenati Diversamente a Legnago"
      description="Scopri l'unico ambiente dove benessere, tecnologia e motivazione si incontrano per farti sentire protagonista del tuo cambiamento."
      backgroundImage={heroImage}
      overlay="gradient"
      primaryCTA={{
        text: "Prenota una visita gratuita",
        href: "/form-contatti"
      }}
      secondaryCTA={{
        text: "Scopri la nostra filosofia",
        href: "#valori"
      }}
      animated={true}
    />
  );
};

export default MUVHeroSection;