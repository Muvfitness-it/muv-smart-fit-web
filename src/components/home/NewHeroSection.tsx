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
                Il tuo <span className="lcp-gradient bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Personal Trainer</span>
              </span>
              <span className="lcp-hero-text block">
                a Legnago, <span className="text-brand-accent">senza palestre affollate.</span>
              </span>
            </h1>
            
            <div className="mb-8 space-y-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="glass-card p-6 rounded-2xl max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
                  Risultati <span className="text-brand-accent">visibili in 30 giorni</span> con 
                </p>
                <div className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent font-black text-2xl md:text-3xl lg:text-4xl mb-4">
                  ⚡ Fitness Intelligente ⚡
                </div>
                <p className="text-lg md:text-xl text-gray-200 font-medium">
                  EMS • Pancafit • Pilates Reformer • Vacuum • Pressoterapia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;