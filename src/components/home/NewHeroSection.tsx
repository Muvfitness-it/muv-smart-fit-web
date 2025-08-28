const NewHeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/fitness-professional-bg.jpg')"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col flex-1">
        
        {/* Title Section */}
        <div className="flex-1 flex items-center justify-center px-4 py-20 pt-[calc(var(--header-height)+1rem)] md:pt-[calc(var(--header-height)+2rem)]">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 text-white leading-tight">
              <span className="block leading-tight drop-shadow-2xl">
                Il tuo <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Personal Trainer</span>
              </span>
              <span className="block leading-tight drop-shadow-2xl">
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