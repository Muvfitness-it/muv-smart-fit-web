// Navigazione MUV - Specifiche Rigorose
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const LOGO_URL = "/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png";

const MUVNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Barra top sticky, background trasparente, diventa #ffffff al scroll con ombra sottile
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  // Voci menu specifiche richieste (da sinistra a destra)
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Servizi", path: "/servizi" },
    { name: "Tecnologie", path: "/tecnologie" },
    { name: "Blog", path: "/blog" },
    { name: "Team", path: "/team" },
    { name: "Contatti", path: "/contatti" },
    { name: "Prenotazione", path: "/form-contatti", isButton: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md shadow-slate-300/50' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <OptimizedImage
              src={LOGO_URL}
              alt="Logo MUV Fitness Legnago"
              width={180}
              height={54}
              priority={true}
              className="h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation - Font menu: Poppins Medium 16px, colore testo #1E3A8A */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              item.isButton ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '16px',
                    fontWeight: 500
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '16px',
                    fontWeight: 500
                  }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-primary hover:text-primary/80 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden fixed top-full left-0 right-0 bottom-0 bg-white shadow-lg border-t z-[9999] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map(item => (
                  item.isButton ? (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 rounded-lg font-medium text-center transition-all duration-300"
                      style={{ 
                        fontFamily: 'Poppins', 
                        fontSize: '16px',
                        fontWeight: 500
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-primary hover:text-primary/80 font-medium py-2 transition-colors"
                      style={{ 
                        fontFamily: 'Poppins', 
                        fontSize: '16px',
                        fontWeight: 500
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MUVNavigation;