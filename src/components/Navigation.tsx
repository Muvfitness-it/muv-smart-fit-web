import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
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
    name: "Team",
    path: "/team"
  }, {
    name: "Risultati",
    path: "/risultati"
  }, {
    name: "Blog",
    path: "/blog"
  }, {
    name: "MUV Planner",
    path: "/muv-planner"
  }, {
    name: "Contatti",
    path: "/contatti"
  }];
  return <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 px-0 rounded-none lg:py-[14px] my-px mx-[50px]">
          {/* Logo - made significantly larger */}
          <Link to="/" className="flex items-center">
            <LazyImage 
              src="/src/assets/muv-logo-transparent.png" 
              alt="MUV logo" 
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-36 lg:w-36 xl:h-40 xl:w-40 object-contain" 
              priority={true}
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

        {/* Mobile Navigation - Improved UX */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-700/50`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 transform ${
                  location.pathname === item.path 
                    ? 'text-white bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg scale-105' 
                    : 'text-gray-200 hover:text-white hover:bg-gray-800/80 hover:scale-102'
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
    </nav>;
};
export default Navigation;
