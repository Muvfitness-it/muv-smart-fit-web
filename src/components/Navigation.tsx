import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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
    path: "/personal-trainer-legnago"
  }, {
    name: "EMS",
    path: "/allenamento-ems-legnago"
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
  return <nav className={`fixed w-full z-50 transition-all duration-300 header ${isScrolled || location.pathname !== '/' ? 'is-scrolled' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 px-0 rounded-none lg:py-[14px] my-px mx-[50px]">
          {/* Logo - sempre leggibile SVG */}
          <Link to="/" className="brand" aria-label="MUV Fitness Legnago">
            <picture>
              <source srcSet="/assets/brand/muv-logo-light.svg" media="(prefers-color-scheme: dark)" />
              <img 
                className="site-logo" 
                src="/assets/brand/muv-logo-dark.svg" 
                width="220" 
                height="52" 
                alt="MUV Fitness Legnago"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </Link>

          {/* Desktop Navigation - Better spacing and alignment */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8 xl:space-x-10">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm xl:text-base font-medium transition-colors duration-300 hover:text-brand-primary ${location.pathname === item.path ? 'text-brand-primary border-b-2 border-brand-primary pb-1' : 'text-gray-800 hover:text-brand-primary'}`}>
                {item.name}
              </Link>)}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-brand-primary transition-colors min-h-[44px] min-w-[44px]" aria-label="Apri menu di navigazione">
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
          <div className="relative z-[61] flex h-full flex-col bg-white backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                <picture>
                  <source srcSet="/assets/brand/muv-logo-light.svg" media="(prefers-color-scheme: dark)" />
                  <img 
                    src="/assets/brand/muv-logo-dark.svg" 
                    alt="MUV Fitness Logo" 
                    className="h-10 w-auto object-contain"
                  />
                </picture>
              </Link>
              <button
                aria-label="Chiudi menu"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900"
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
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
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
