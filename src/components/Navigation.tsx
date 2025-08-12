import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/muv-logo-original-transparent.png";
// Use the new logo from public folder
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [logoSrc, setLogoSrc] = useState<string>(logo);
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
    name: "Contatti",
    path: "/contatti"
  }, {
    name: "Admin",
    path: "/admin/auth"
  }];
  return <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 px-0 rounded-none lg:py-[14px] my-px mx-[50px]">
          {/* Logo - made significantly larger */}
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Logo MUV Fitness Legnago"
              width={240}
              height={72}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-contain"
              onError={() => setLogoSrc('/lovable-uploads/29b9c5b1-c958-454c-9d7f-5d1c1b4f38ff.png')}
            />
          </Link>

          {/* Desktop Navigation - Better spacing and alignment */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8 xl:space-x-10">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`text-sm xl:text-base font-medium transition-colors duration-300 hover:text-pink-600 ${location.pathname === item.path ? 'text-pink-600 border-b-2 border-pink-600 pb-1' : 'text-gray-200 hover:text-white'}`}>
                {item.name}
              </Link>)}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-pink-600 transition-colors" aria-label="Toggle menu">
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
                <img
                  src={logoSrc}
                  alt="Logo MUV Fitness Legnago"
                  className="h-10 w-auto object-contain"
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
