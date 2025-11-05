import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const LOGO_URL = "/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png";

const MUVNavigation = () => {
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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Metodo", path: "/metodo" },
    { 
      name: "Servizi", 
      path: "/servizi",
      dropdown: [
        { name: "EMS Training", path: "/servizi/ems-legnago" },
        { name: "Pilates Reformer", path: "/servizi/pilates-reformer-legnago" },
        { name: "Postura & Mal di Schiena", path: "/servizi/pancafit-legnago" },
        { name: "Vacuum & Pressoterapia", path: "/servizi/vacuum-pressoterapia-legnago" },
        { name: "Sauna Infrarossi", path: "/servizi/sauna-infrarossi-legnago" },
        { name: "Corsi Small Group", path: "/servizi/small-group" },
        { name: "Over 60", path: "/servizi/over-60-legnago" },
      ]
    },
    { name: "Tecnologie", path: "/tecnologie" },
    { name: "Risultati", path: "/risultati" },
    { name: "Perché MUV", path: "/perche-muv" },
    { name: "Team", path: "/team" },
    { name: "Blog", path: "/blog" },
    { name: "Contatti", path: "/contatti" },
    { name: "Prenota Prova Gratuita", path: "/contatti", isButton: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          
          <Link to="/" className="flex items-center">
        <OptimizedImage
          src={LOGO_URL}
          alt="MUV Fitness Legnago - Centro Fitness con EMS Training e Pilates Reformer"
          width={180}
          height={54}
          priority={true}
          objectFit="contain"
          overflowHidden={false}
          className="h-12 w-auto transition-all duration-300"
        />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              item.isButton ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="btn-accent"
                >
                  {item.name}
                </Link>
              ) : item.dropdown ? (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className="nav-link flex items-center gap-1"
                  >
                    {item.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute left-0 top-full z-[10000] w-64 bg-white shadow-xl rounded-lg border border-border opacity-0 scale-95 pointer-events-none transform transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
                    {item.dropdown.map((subItem: { name: string; path: string }) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="nav-link"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

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

        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <div className="relative z-[10000] w-full max-h-screen flex flex-col bg-white">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-primary shadow-md">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <OptimizedImage
                    src={LOGO_URL}
                    alt="Logo MUV Fitness Legnago"
                    width={150}
                    height={45}
                    priority={true}
                    objectFit="contain"
                    overflowHidden={false}
                    className="h-10 w-auto"
                  />
                </Link>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Chiudi menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map(item => (
                    item.isButton ? (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="btn-accent text-center py-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : item.dropdown ? (
                      <div key={item.name} className="border-b border-border/20 pb-4">
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block text-foreground hover:text-primary font-semibold transition-colors py-2 text-lg"
                        >
                          {item.name}
                        </Link>
                        <div className="pl-4 space-y-2 mt-3">
                          {item.dropdown.map((subItem: { name: string; path: string }) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={() => setIsOpen(false)}
                              className="block text-muted-foreground hover:text-primary text-sm transition-colors py-2"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="text-foreground hover:text-primary font-medium transition-colors py-2 text-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MUVNavigation;