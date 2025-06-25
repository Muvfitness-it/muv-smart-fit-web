
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
    { name: "Analytics", path: "/analytics" },
    { name: "Contatti", path: "/contatti" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || location.pathname !== '/' 
        ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo - significantly larger */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" 
              alt="MUV logo" 
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-28 lg:w-28 xl:h-32 xl:w-32 object-contain"
            />
          </Link>

          {/* Desktop Navigation - Better spacing and alignment */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8 xl:space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm xl:text-base font-medium transition-colors duration-300 hover:text-pink-600 ${
                  location.pathname === item.path
                    ? 'text-pink-600 border-b-2 border-pink-600 pb-1'
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
              className="text-white hover:text-pink-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                  className={`block px-3 py-3 text-base font-medium transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-pink-600 bg-gray-800 rounded'
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
