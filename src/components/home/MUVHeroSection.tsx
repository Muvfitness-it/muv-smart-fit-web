// Hero Section - Specifiche Rigorose MUV Fitness
const MUVHeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Background - Immagine EMS sessione reale */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/fitness-professional-bg.jpg')`,
        }}
        aria-hidden="true"
      />
      
      {/* Overlay nero opaco 40% - Specifica richiesta */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Testo Hero - Sans-serif Poppins Bold 48px, colore #1E3A8A */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[48px] font-bold text-primary leading-tight mb-8">
              Massimo 4 persone - Risultati garantiti in 30 giorni
            </h1>
            
            {/* CTA Primaria Arancione #F97316 - Specifiche richieste */}
            <div className="mb-12">
              <a 
                href="/form-contatti"
                className="inline-block bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-4 text-lg font-poppins font-medium transition-all duration-300"
                style={{ 
                  fontSize: '18px',
                  borderRadius: '12px'
                }}
              >
                Prenota la tua prova gratuita ora
              </a>
            </div>
            
            {/* Tre Box Allineati Orizzontali - Uguale Dimensione con Icone SVG Blu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {/* Box 1 */}
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-primary mb-2" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
                  Risultati Garantiti
                </h3>
                <p className="text-gray-700 font-normal" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
                  Raggiungi i tuoi obiettivi in 30 giorni o ti rimborsiamo
                </p>
              </div>
              
              {/* Box 2 */}
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-primary mb-2" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
                  Tecnologia Avanzata
                </h3>
                <p className="text-gray-700 font-normal" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
                  EMS e metodologie scientificamente provate
                </p>
              </div>
              
              {/* Box 3 */}
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18 7c-.41 0-.77.17-1.04.42L14.5 10h-5L7.04 7.42A2.01 2.01 0 0 0 6 7c-.96 0-1.8.68-1.96 1.63L1.5 16H4v6h2v-6h2l.48-5.02L10 14v8h2v-8l1.52-3.02L14 16h2v6h4z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-primary mb-2" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
                  Personal Training
                </h3>
                <p className="text-gray-700 font-normal" style={{ fontFamily: 'Poppins', fontSize: '18px' }}>
                  Allenamento personalizzato con trainer qualificati
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVHeroSection;