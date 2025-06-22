
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chi Siamo", path: "/chi-siamo" },
    { name: "Team", path: "/team" },
    { name: "Servizi", path: "/servizi" },
    { name: "Risultati", path: "/risultati" },
    { name: "MUV Planner", path: "/muv-planner" },
    { name: "Contatti", path: "/contatti" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo - Significantly larger */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" 
              alt="MUV Fitness Logo" 
              className="h-12 sm:h-14 lg:h-16 xl:h-18 w-auto"
              onError={(e) => {
                console.log("Logo failed to load:", e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log("Logo loaded successfully")}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:text-pink-600 transition-colors duration-300 text-base xl:text-lg font-medium ${
                  isActive(item.path) ? "text-pink-600 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://www.muvfitness.it/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-600 transition-colors duration-300 text-base xl:text-lg font-medium"
            >
              Blog
            </a>
          </div>

          {/* Mobile menu button - Larger */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-pink-600 w-12 h-12 sm:w-14 sm:h-14"
            >
              {isOpen ? <X className="h-7 w-7 sm:h-8 sm:w-8" /> : <Menu className="h-7 w-7 sm:h-8 sm:w-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 pt-2">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-white hover:text-pink-600 transition-colors duration-300 py-3 px-4 text-lg font-medium ${
                    isActive(item.path) ? "text-pink-600 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://www.muvfitness.it/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-600 transition-colors duration-300 py-3 px-4 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
