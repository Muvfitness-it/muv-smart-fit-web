import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';

const NordicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Il Metodo', href: '#metodo' },
    { name: 'Servizi', href: '#servizi' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={BUSINESS_DATA.branding.logo}
              alt="MUV Fitness Logo"
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[hsl(var(--nordic-text))] hover:text-[hsl(var(--muv-violet-nordic))] font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href={BUSINESS_DATA.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-[#C13697] to-[#0055A4] hover:opacity-90 transition-opacity duration-200 shadow-lg"
            >
              Prenota Tour
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[hsl(var(--nordic-text))]"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-[hsl(var(--nordic-text))] font-medium hover:bg-[hsl(var(--nordic-sand))] rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href={BUSINESS_DATA.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#C13697] to-[#0055A4] mt-4"
            >
              Prenota Tour
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NordicNavbar;
