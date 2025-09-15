import { memo, useEffect } from 'react';

// Enhanced Critical Path Optimizer
const FCPOptimizer = memo(() => {
  useEffect(() => {
    // Preload critical resources immediately
    const preloadCritical = () => {
      // Preload hero background image as highest priority
      const heroImg = new Image();
      heroImg.src = '/images/fitness-professional-bg.jpg';
      heroImg.fetchPriority = 'high';
      
      // Preload critical CSS font files
      const fontPreloads = [
        'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew7.woff2',
        'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfedw.woff2'
      ];
      
      fontPreloads.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Optimize LCP element immediately
    const optimizeLCP = () => {
      const lcpElements = document.querySelectorAll('.lcp-hero-container, .lcp-bg-image-webp');
      lcpElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.willChange = 'transform';
        element.style.contain = 'layout style paint';
        element.style.contentVisibility = 'visible';
      });
    };

    // Remove render-blocking
    const deferNonCritical = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"]');
      scripts.forEach(script => {
        script.setAttribute('defer', '');
      });
    };

    preloadCritical();
    optimizeLCP();
    deferNonCritical();
  }, []);

  return (
    <>
      {/* Inline Critical CSS for LCP */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .lcp-hero-container{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
          .lcp-bg-image-webp{position:absolute;inset:0;background-image:url('/images/fitness-professional-bg.jpg');background-size:cover;background-position:center;background-repeat:no-repeat;will-change:transform}
          .lcp-bg-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.7),rgba(0,0,0,0.5))}
          .lcp-hero-content{position:relative;z-index:10;text-align:center;padding:0 1rem;max-width:1200px;margin:0 auto}
          .lcp-gradient{background:linear-gradient(135deg,#ff6b6b,#4ecdc4);-webkit-background-clip:text;background-clip:text;color:transparent}
          @media(min-width:768px){.lcp-hero-content{padding:0 2rem}}
        `
      }} />
      
      {/* Critical Hero Content - Renders immediately */}
      <div className="lcp-hero-container">
        {/* Background Image with WebP Support */}
        <div className="lcp-bg-image-webp" />
        
        {/* Dark Overlay */}
        <div className="lcp-bg-overlay" />
        
        {/* Critical Content */}
        <div className="lcp-hero-content">
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
      </div>
    </>
  );
});

FCPOptimizer.displayName = 'FCPOptimizer';

export default FCPOptimizer;