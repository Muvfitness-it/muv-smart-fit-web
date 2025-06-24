import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section 
      className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-magenta-900/30 to-viola-900/40 min-h-screen" 
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25" 
        style={{
          backgroundImage: "url('/images/fitness-professional-bg.jpg')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-magenta-900/20 to-viola-900/30"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 font-heading">
          <span className="bg-gradient-to-r from-magenta-400 via-viola-400 to-blu-400 bg-clip-text text-transparent drop-shadow-2xl">
            CENTRO FITNESS MUV
          </span>
        </h1>
        
        <div className="mb-8 space-y-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            🏆 <span className="text-magenta-400 font-black">IL PRIMO</span> Centro Fitness 
            <span className="text-viola-400 font-black"> SMART</span> di Legnago
          </p>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-semibold">
            <strong className="text-magenta-400">✅ RISULTATI GARANTITI IN 30 GIORNI</strong> • 
            <strong className="text-viola-400"> 500+ TRASFORMAZIONI DOCUMENTATE</strong> • 
            <strong className="text-blu-400"> 95% TASSO DI SUCCESSO</strong>
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-magenta-600/50 mb-8 animate-pulse-glow">
          <h2 className="text-2xl md:text-3xl font-bold text-magenta-400 mb-3">
            🎯 METODOLOGIA SCIENTIFICA ESCLUSIVA
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold">
            <span className="text-viola-400">💡 TECNOLOGIA EMS</span> + 
            <span className="text-blu-400"> 🧬 PANCAFIT</span> + 
            <span className="text-magenta-400"> 💪 PERSONAL TRAINING 1-to-1</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contatti" className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20">
            🚀 PRENOTA PROVA GRATUITA - TRASFORMATI IN 30 GIORNI
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
