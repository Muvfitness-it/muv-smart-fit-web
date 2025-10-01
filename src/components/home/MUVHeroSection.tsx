import heroImage from '@/assets/hero-fitness-professional.jpg';
import { Link } from 'react-router-dom';

const MUVHeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" aria-hidden="true" />
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto text-center">
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Allenati Diversamente a Legnago
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed">
              Scopri l'unico ambiente dove benessere, tecnologia e motivazione si incontrano per farti sentire protagonista del tuo cambiamento.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                to="/form-contatti"
                className="btn-accent text-lg px-8 py-4"
              >
                Prenota una visita gratuita
              </Link>
              <a 
                href="#valori"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                Scopri la nostra filosofia
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVHeroSection;