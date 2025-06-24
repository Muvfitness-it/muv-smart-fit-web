
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chi Siamo", path: "/chi-siamo" },
    { name: "Servizi", path: "/servizi" },
    { name: "Team", path: "/team" },
    { name: "Risultati", path: "/risultati" },
    { name: "MUV Planner", path: "/muv-planner" },
    { name: "Contatti", path: "/contatti" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || location.pathname !== '/' 
        ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" 
              alt="MUV logo" 
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
              <span className="bg-gradient-to-r from-muv-magenta via-muv-violet to-muv-blue bg-clip-text text-transparent">
                MUV
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm xl:text-base font-medium transition-colors duration-300 hover:text-muv-magenta ${
                  location.pathname === item.path
                    ? 'text-muv-magenta border-b-2 border-muv-magenta pb-1'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-muv-magenta transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-muv-magenta bg-gray-800 rounded'
                      : 'text-gray-200 hover:text-white hover:bg-gray-800 rounded'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
