import { ArrowRight, Check, UserRound, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import heroCardDonna from "@/assets/hero-card-donna.jpg";
import heroCardUomo from "@/assets/hero-card-uomo.jpg";
import heroCardPosturale from "@/assets/hero-card-posturale.jpg";
import heroCardPilates from "@/assets/hero-card-pilates.jpg";

// Icon component for Spine (not available in lucide-react)
const SpineIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 8v4M12 16v6" />
    <ellipse cx="12" cy="4" rx="3" ry="2" />
    <ellipse cx="12" cy="10" rx="3.5" ry="2" />
    <ellipse cx="12" cy="16" rx="3" ry="2" />
  </svg>
);

const ConversionHero = () => {
  const badges = ["Consulenza conoscitiva gratuita", "Ambiente riservato", "Posti limitati"];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const trackPercorsoSelection = (percorso: 'donna' | 'uomo' | 'posturale' | 'pilates') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'home_percorso_selection', {
        event_category: 'conversion',
        event_label: percorso,
        percorso_selected: percorso
      });
    }
  };

  // Lazy load video when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoLoaded) {
            // Load and play video when visible
            video.src = "/videos/hero-background.mp4";
            video.load();
            video.playbackRate = 0.75;
            video.play().catch(() => {
              // Autoplay might be blocked, that's ok
            });
            setIsVideoLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [isVideoLoaded]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Poster image - shows immediately */}
      <img
        src={heroPoster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: isVideoLoaded ? 0 : 1 }}
        loading="eager"
      />
      
      {/* Video Background with lazy loading */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={heroPoster}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 saturate-[1.2] brightness-[1.1]"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      />
      
      {/* Dark Overlay for text readability - intensified */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-primary/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Centro Fitness Boutique a Legnago
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.8)]">
            Trasforma il tuo corpo con un percorso guidato e personalizzato.
            <span className="block text-primary text-2xl sm:text-3xl md:text-4xl mt-4 [text-shadow:_0_2px_15px_rgba(0,0,0,0.6)]">
              Anche se hai poco tempo o hai già fallito altre palestre.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
            Non siamo una palestra low-cost. Siamo un{" "}
            <strong className="text-white">Centro Fitness Boutique</strong> specializzato in percorsi personalizzati con
            tecnologie avanzate, personal training e consulenza dedicata.
          </p>

          {/* Percorsi Selection Gateway - 4 columns */}
          <p className="text-lg text-white/90 mb-6 [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
            Scegli il percorso più adatto a te:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-8">
            {/* Card Donna */}
            <Link 
              to="/percorsi?genere=donna" 
              onClick={() => trackPercorsoSelection('donna')}
              className="group relative flex flex-col items-center justify-end gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-4 md:p-5 min-h-[160px] md:min-h-[180px] overflow-hidden transition-all duration-500 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:-translate-y-2"
            >
              <img src={heroCardDonna} alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-pink-900/80 group-hover:via-pink-800/30" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-500/30 flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:bg-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                  <UserRound className="w-5 h-5 md:w-6 md:h-6 text-pink-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base transition-transform duration-300 group-hover:scale-105">Percorso Donna</span>
                <span className="text-white/70 text-[10px] md:text-xs text-center transition-all duration-300 group-hover:text-white/90">Tonificazione • Silhouette</span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </div>
            </Link>
            
            {/* Card Uomo */}
            <Link 
              to="/percorsi?genere=uomo" 
              onClick={() => trackPercorsoSelection('uomo')}
              className="group relative flex flex-col items-center justify-end gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-4 md:p-5 min-h-[160px] md:min-h-[180px] overflow-hidden transition-all duration-500 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-2"
            >
              <img src={heroCardUomo} alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-blue-900/80 group-hover:via-blue-800/30" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/30 flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <UserRound className="w-5 h-5 md:w-6 md:h-6 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base transition-transform duration-300 group-hover:scale-105">Percorso Uomo</span>
                <span className="text-white/70 text-[10px] md:text-xs text-center transition-all duration-300 group-hover:text-white/90">Definizione • Forza</span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </div>
            </Link>
            
            {/* Card Posturale */}
            <Link 
              to="/servizi/pancafit" 
              onClick={() => trackPercorsoSelection('posturale')}
              className="group relative flex flex-col items-center justify-end gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-4 md:p-5 min-h-[160px] md:min-h-[180px] overflow-hidden transition-all duration-500 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:-translate-y-2"
            >
              <img src={heroCardPosturale} alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-orange-900/80 group-hover:via-orange-800/30" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500/30 flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:bg-orange-500/50 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.5)]">
                  <SpineIcon className="w-5 h-5 md:w-6 md:h-6 text-orange-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base transition-transform duration-300 group-hover:scale-105">Percorso Posturale</span>
                <span className="text-white/70 text-[10px] md:text-xs text-center transition-all duration-300 group-hover:text-white/90">Pancafit • Mal di schiena</span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </div>
            </Link>
            
            {/* Card Pilates */}
            <Link 
              to="/servizi/pilates-reformer-legnago" 
              onClick={() => trackPercorsoSelection('pilates')}
              className="group relative flex flex-col items-center justify-end gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-4 md:p-5 min-h-[160px] md:min-h-[180px] overflow-hidden transition-all duration-500 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(192,132,252,0.3)] hover:-translate-y-2"
            >
              <img src={heroCardPilates} alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-purple-900/80 group-hover:via-purple-800/30" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/30 flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:bg-purple-500/50 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.5)]">
                  <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base transition-transform duration-300 group-hover:scale-105">Percorso Pilates</span>
                <span className="text-white/70 text-[10px] md:text-xs text-center transition-all duration-300 group-hover:text-white/90">Reformer • Core • Flessibilità</span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </div>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-white/80 [text-shadow:_0_1px_5px_rgba(0,0,0,0.5)]">
                <Check className="w-4 h-4 text-primary" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionHero;
