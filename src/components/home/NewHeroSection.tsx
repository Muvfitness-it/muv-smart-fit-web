const NewHeroSection = () => {
  return (
    <section className="lcp-hero-container relative overflow-hidden">
      {/* Background Image with WebP Support and gentle zoom */}
      <div className="lcp-bg-image-webp animate-gentle-zoom" />
      
      {/* Dark Overlay with subtle pattern */}
      <div className="lcp-bg-overlay" />
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-full blur-2xl animate-float-gentle" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-l from-brand-accent/15 to-brand-primary/15 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content Container */}
      <div className="lcp-hero-content">
        {/* Title Section */}
        <div className="lcp-hero-main">
          <div className="lcp-hero-inner">
            <h1 className="lcp-text-responsive font-black mb-8 text-white leading-tight animate-fade-in">
              <span className="lcp-hero-text block mb-2">
                Il tuo corpo sta <span className="lcp-gradient bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">aspettando</span>
              </span>
              <span className="lcp-hero-text block">
                che tu prenda sul serio <span className="text-brand-accent">i tuoi risultati.</span>
              </span>
            </h1>
            
            <div className="mb-8 space-y-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="glass-card p-6 rounded-2xl max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
                  Basta con gli allenamenti che <span className="text-brand-accent">non portano a niente.</span>
                </p>
                <div className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent font-black text-2xl md:text-3xl lg:text-4xl mb-4">
                  ⚡ Tecnologie che Funzionano ⚡
                </div>
                <p className="text-lg md:text-xl text-gray-200 font-medium">
                  45 minuti. Risultati veri. Zero tempo perso.
                </p>
              </div>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <a 
                href="/form-contatti" 
                className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-black px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20"
              >
                🎯 VOGLIO VEDERE I RISULTATI
              </a>
              
              <a 
                href="tel:+393291070374" 
                className="glass-card border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105"
              >
                📞 CHIAMA ORA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;