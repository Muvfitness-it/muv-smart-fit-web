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
      
      {/* Overlay sfumato blu MUV per profondità */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" aria-hidden="true" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Titolo H1 secondo le specifiche */}
            <h1 className="leading-tight mb-8" style={{ fontFamily: 'Poppins', fontSize: '48px', fontWeight: '700', color: 'white' }}>
              Massimo 4 persone - Risultati garantiti in 30 giorni
            </h1>
            
            {/* CTA secondo le specifiche */}
            <div className="flex justify-center mb-12">
              <a 
                href="/form-contatti"
                className="inline-flex items-center justify-center px-8 py-4 rounded-3xl transition-all duration-300 hover:opacity-80"
                style={{ 
                  backgroundColor: '#F97316', 
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '12px'
                }}
              >
                Prenota la tua prova gratuita ora
              </a>
            </div>
            
            {/* Tre Box secondo le specifiche con spaziatura 40px */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10" style={{ marginTop: '40px' }}>
              {/* Box 1 - Tecnologie all'avanguardia */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg" style={{ padding: '20px' }}>
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="#1E3A8A" viewBox="0 0 24 24">
                    <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px' }}>
                  Tecnologie all'avanguardia
                </h3>
                <p style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', color: '#374151' }}>
                  Allenati con EMS, Vacuum e HUR per risultati visibili e duraturi.
                </p>
              </div>
              
              {/* Box 2 - Personal training esclusivo */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg" style={{ padding: '20px' }}>
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="#1E3A8A" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18 7c-.41 0-.77.17-1.04.42L14.5 10h-5L7.04 7.42A2.01 2.01 0 0 0 6 7c-.96 0-1.8.68-1.96 1.63L1.5 16H4v6h2v-6h2l.48-5.02L10 14v8h2v-8l1.52-3.02L14 16h2v6h4z"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px' }}>
                  Personal training esclusivo
                </h3>
                <p style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', color: '#374151' }}>
                  Sessioni one-on-one con massimo 4 clienti per la massima attenzione.
                </p>
              </div>
              
              {/* Box 3 - Assistenza continua */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg" style={{ padding: '20px' }}>
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="#1E3A8A" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px' }}>
                  Assistenza continua
                </h3>
                <p style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', color: '#374151' }}>
                  Monitoraggio progressi ogni 10 allenamenti, supporto sempre disponibile.
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