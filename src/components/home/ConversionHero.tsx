import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { trackHomeClickToFunnel } from "@/hooks/useGoogleAnalytics";
import { useEffect, useRef, useState } from "react";

const ConversionHero = () => {
  const badges = ["Consulenza conoscitiva gratuita", "Ambiente riservato", "Posti limitati"];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contatto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFunnelClick = () => {
    trackHomeClickToFunnel('hero_cta_primary');
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
      {/* Video Background with lazy loading */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      />
      
      {/* Fallback background while video loads */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-opacity duration-700"
        style={{ opacity: isVideoLoaded ? 0 : 1 }}
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild onClick={handleFunnelClick}>
              <Link to="/funnel">
                Prenota la consulenza
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm" onClick={scrollToContact}>
              Richiedi informazioni
            </Button>
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
