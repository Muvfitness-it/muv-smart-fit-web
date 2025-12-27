import { ArrowRight, Check, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";

const ConversionHero = () => {
  const badges = ["Consulenza conoscitiva gratuita", "Ambiente riservato", "Posti limitati"];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const trackGenderSelection = (gender: 'donna' | 'uomo' | 'neutral') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'home_gender_selection', {
        event_category: 'conversion',
        event_label: gender,
        gender_selected: gender
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

          {/* Gender Selection Gateway */}
          <p className="text-lg text-white/90 mb-6 [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
            Scegli il percorso più adatto a te:
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            <Link 
              to="/percorsi?genere=donna" 
              onClick={() => trackGenderSelection('donna')}
              className="group flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-primary rounded-xl p-6 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserRound className="w-7 h-7 text-pink-400" />
              </div>
              <span className="text-white font-semibold text-lg">Percorso Donna</span>
              <span className="text-white/70 text-xs text-center">Tonificazione • Silhouette • Benessere</span>
            </Link>
            <Link 
              to="/percorsi?genere=uomo" 
              onClick={() => trackGenderSelection('uomo')}
              className="group flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-primary rounded-xl p-6 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserRound className="w-7 h-7 text-blue-400" />
              </div>
              <span className="text-white font-semibold text-lg">Percorso Uomo</span>
              <span className="text-white/70 text-xs text-center">Definizione • Forza • Performance</span>
            </Link>
          </div>
          
          {/* Link alternativo */}
          <Link 
            to="/percorsi" 
            onClick={() => trackGenderSelection('neutral')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors mb-8"
          >
            Non so ancora quale fa per me
            <ArrowRight className="w-4 h-4" />
          </Link>

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
