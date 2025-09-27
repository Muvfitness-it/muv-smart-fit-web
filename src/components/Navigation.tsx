import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
const LOGO_URL = "/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [logoSrc, setLogoSrc] = useState<string>(LOGO_URL);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll and add menu-open class when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Keep main content padding in sync with actual header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('nav.site-header') as HTMLElement | null;
      if (header) {
        const height = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('orientationchange', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('orientationchange', updateHeaderHeight);
    };
  }, [isScrolled, location.pathname]);
  // MENU NAVIGATION - STRUTTURA RICHIESTA
  const navItems = [{
    name: "Home",
    path: "/"
  }, {
    name: "Servizi",
    path: "/servizi",
    dropdown: true,
    children: [
      { name: "Personal Training", path: "/servizi/personal-training" },
      { name: "EMS", path: "/servizi/ems" },
      { name: "Pilates Reformer", path: "/servizi/pilates" },
      { name: "Pancafit", path: "/servizi/pancafit" },
      { name: "Vacuum + Pressoterapia", path: "/servizi/vacuum-pressoterapia" },
      { name: "Nutrizione", path: "/servizi/nutrizione" }
    ]
  }, {
    name: "Tecnologie",
    path: "/tecnologie"
  }, {
    name: "Blog",
    path: "/blog"
  }, {
    name: "Team",
    path: "/team"
  }, {
    name: "Contatti",
    path: "/contatti"
  }, {
    name: "Prenotazione",
    path: "/contatti",
    isButton: true
  }];
  return <nav className={`site-header fixed top-0 left-0 right-0 w-full z-50 min-h-[var(--header-height)] flex items-center bg-primary backdrop-blur-sm shadow-lg ${isOpen ? 'bg-primary' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3">
          {/* Logo - optimized for mobile */}
          <Link to="/" className="flex items-center">
            <OptimizedImage
              src={logoSrc}
              alt="Logo MUV Fitness Legnago"
              width={300}
              height={90}
              priority={true}
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
              className={`site-logo w-auto transition-all duration-300 ${isScrolled ? 'h-8 sm:h-10 md:h-12 lg:h-14' : 'h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18'}`}
              objectFit="contain"
              overflowHidden={false}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.5)) contrast(1.3) saturate(1.2)',
                WebkitFilter: 'drop-shadow(0 0 8px rgba(0,0,0,0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.5)) contrast(1.3) saturate(1.2)'
              }}
              onError={() => setLogoSrc('/placeholder.svg')}
            />
          </Link>

          {/* Desktop Navigation - Better spacing and alignment */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 xl:space-x-8">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`text-primary-foreground hover:text-primary-foreground/80 font-medium transition-colors text-sm xl:text-base whitespace-nowrap ${location.pathname === item.path ? 'text-primary-foreground font-semibold border-b-2 border-primary-foreground/80' : ''}`}>
                {item.name}
              </Link>)}
              
            {/* WhatsApp CTA Desktop */}
            <a 
              href="https://wa.me/393291070374"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ml-4"
              aria-label="Contattaci su WhatsApp"
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Mobile menu button - enhanced visibility */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors min-h-[48px] min-w-[48px] bg-black/30 rounded-xl p-3 border-2 border-primary-foreground/30 shadow-lg" 
              aria-label="Apri menu di navigazione"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full screen overlay with proper z-index */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[9999]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />

            {/* Menu Panel - Slide from top */}
            <div className="relative z-[10000] w-full h-full flex flex-col bg-white">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between px-6 py-4 bg-primary shadow-md">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <OptimizedImage
                    src={LOGO_URL}
                    alt="Logo MUV Fitness Legnago"
                    width={180}
                    height={54}
                    priority={true}
                    sizes="180px"
                    className="site-logo h-12 w-auto"
                    objectFit="contain"
                    overflowHidden={false}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.5)) contrast(1.3) saturate(1.2)',
                      WebkitFilter: 'drop-shadow(0 0 8px rgba(0,0,0,0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.5)) contrast(1.3) saturate(1.2)'
                    }}
                  />
                </Link>
                <button
                  aria-label="Chiudi menu"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-lg bg-black/20"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto bg-white px-6 py-8">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center px-6 py-4 text-xl font-semibold rounded-xl 
                        transition-all duration-300 transform hover:scale-105 border-2
                        ${location.pathname === item.path
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-primary hover:text-primary-foreground hover:border-primary'
                        }
                      `}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        minHeight: '60px'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-center w-full">{item.name}</span>
                    </Link>
                  ))}
                  
                  {/* WhatsApp CTA Mobile - Enhanced */}
                  <a 
                    href="https://wa.me/393291070374"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-4 mt-8 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-green-500"
                    onClick={() => setIsOpen(false)}
                    aria-label="Contattaci su WhatsApp"
                    style={{ minHeight: '60px' }}
                  >
                    <span className="mr-2 text-2xl">💬</span>
                    Scrivici su WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>;
};
export default Navigation;
