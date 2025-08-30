const NewHeroSection = () => {
  return (
    <section className="lcp-hero-container">
      {/* Background Image with WebP Support */}
      <div className="lcp-bg-image-webp" />
      
      {/* Dark Overlay */}
      <div className="lcp-bg-overlay" />
      
      {/* Content Container */}
      <div className="lcp-hero-content">
        
        {/* Title Section */}
        <div className="lcp-hero-main">
          <div className="lcp-hero-inner">
            <h1 className="lcp-text-responsive font-black mb-8 text-white leading-tight">
              <span className="lcp-hero-text">
                Il tuo <span className="lcp-gradient">Personal Trainer</span>
              </span>
              <span className="lcp-hero-text">
                a Legnago, <span className="text-brand-accent">senza palestre affollate.</span>
              </span>
            </h1>
            
            <div className="mb-10 space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                Risultati <span className="text-brand-accent">visibili in 30 giorni</span> con 
                <span className="block mt-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent font-black text-2xl md:text-3xl lg:text-4xl">
                  ⚡ Fitness Intelligente ⚡
                </span>
              </p>
              <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto">
                EMS • Pancafit • Pilates Reformer • Vacuum • Pressoterapia
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default NewHeroSection;