import heroImage from '@/assets/hero-fitness-professional.jpg';

// Hero Section - MUV Fitness Landing
const MUVHeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
        aria-hidden="true"
      />
      
      {/* Overlay sfumato blu MUV */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" aria-hidden="true" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Titolo H1 */}
            <h1 className="leading-tight mb-6" style={{ fontFamily: 'Poppins', fontSize: '56px', fontWeight: '700', color: 'white' }}>
              Allenati Diversamente a Legnago
            </h1>
            
            {/* Sottotitolo */}
            <p className="mb-10 text-white/95" style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '400', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 40px' }}>
              Scopri l'unico ambiente dove benessere, tecnologia e motivazione si incontrano per farti sentire protagonista del tuo cambiamento.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a 
                href="/form-contatti"
                className="inline-flex items-center justify-center px-8 py-4 transition-all duration-300 hover:opacity-80"
                style={{ 
                  backgroundColor: '#F97316', 
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '12px'
                }}
              >
                Prenota una visita gratuita
              </a>
              <a 
                href="#valori"
                className="inline-flex items-center justify-center px-8 py-4 transition-all duration-300 hover:bg-white/20"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid white',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '12px'
                }}
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