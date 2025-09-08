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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const navItems = [{
    name: "Home",
    path: "/"
  }, {
    name: "Chi Siamo",
    path: "/chi-siamo"
  }, {
    name: "Servizi",
    path: "/servizi"
  }, {
    name: "Personal Trainer",
    path: "/servizi/personal-training"
  }, {
    name: "EMS",
    path: "/servizi/ems"
  }, {
    name: "Pilates",
    path: "/pilates-legnago"
  }, {
    name: "Team",
    path: "/team"
  }, {
    name: "Risultati",
    path: "/risultati"
  }, {
    name: "Blog",
    path: "/blog"
  }, {
    name: "Recensioni",
    path: "/recensioni"
  }, {
    name: "Contatti",
    path: "/contatti"
  }, {
    name: "Admin",
    path: "/admin/auth"
  }];
  return <nav className={`site-header fixed top-0 left-0 right-0 w-full z-50 min-h-[var(--header-height)] flex items-center glass-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3 md:py-4 lg:py-3 xl:py-4">
          {/* Logo - optimized for mobile */}
          <Link to="/" className="flex items-center">
            <OptimizedImage
              src={logoSrc}
              alt="Logo MUV Fitness Legnago"
              width={240}
              height={72}
              priority={true}
              sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
              className={`site-logo w-auto object-contain transition-all duration-300 drop-shadow-2xl filter contrast-125 saturate-110 ${isScrolled ? 'h-12 sm:h-14 md:h-16 lg:h-18' : 'h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32'}`}
              onError={() => setLogoSrc('/placeholder.svg')}
            />
          </Link>

          {/* Desktop Navigation - Better spacing and alignment */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 xl:space-x-8">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`text-xs xl:text-sm font-medium transition-colors duration-300 hover:text-brand-primary whitespace-nowrap ${location.pathname === item.path ? 'text-brand-primary border-b-2 border-brand-primary pb-1' : 'text-gray-200 hover:text-white'}`}>
                {item.name}
              </Link>)}
          </div>

          {/* Mobile menu button - enhanced visibility */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-brand-primary transition-colors min-h-[48px] min-w-[48px] bg-black/30 backdrop-blur-md rounded-xl p-3 border-2 border-white/30 shadow-lg" 
              aria-label="Apri menu di navigazione"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Fullscreen overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="relative z-[61] flex h-full flex-col bg-gray-900/98 backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700/50">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                <OptimizedImage
                  src={LOGO_URL}
                  alt="Logo MUV Fitness Legnago"
                  width={180}
                  height={54}
                  priority={true}
                  sizes="180px"
                  className="site-logo h-16 w-auto object-contain drop-shadow-2xl filter contrast-125 saturate-110"
                />
              </Link>
              <button
                aria-label="Chiudi menu"
                onClick={() => setIsOpen(false)}
                className="text-gray-200 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-white bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg scale-[1.02]'
                      : 'text-gray-200 hover:text-white hover:bg-gray-800/80'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;
