
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
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" 
              alt="MUV Fitness Logo" 
              className="h-12 w-auto"
              onError={(e) => {
                console.log("Logo failed to load:", e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log("Logo loaded successfully")}
            />
            {/* Fallback text logo if image fails */}
            <span className="text-white text-xl font-bold ml-2">MUV FITNESS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:text-pink-600 transition-colors duration-300 ${
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
              className="text-white hover:text-pink-600 transition-colors duration-300"
            >
              Blog
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-pink-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-white hover:text-pink-600 transition-colors duration-300 py-2 ${
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
                className="text-white hover:text-pink-600 transition-colors duration-300 py-2"
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
