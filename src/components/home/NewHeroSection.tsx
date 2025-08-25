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
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col flex-1">
        
        {/* Title Section */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-tight">
              Il tuo <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Personal Trainer</span> a Legnago
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 font-semibold">
              Risultati visibili in 30 giorni con Fitness Intelligente
            </p>
            
            {/* WhatsApp CTA */}
            <div className="flex justify-center">
              <a 
                href="https://wa.me/393513380770"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-full text-xl md:text-2xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/30 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
              >
                📱 Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default NewHeroSection;