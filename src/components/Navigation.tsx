
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
    { name: 'Team', path: '/team' },
    { name: 'Servizi', path: '/servizi' },
    { name: 'MUV Planner', path: '/muv-planner' },
    { name: 'Risultati', path: '/risultati' },
    { name: 'Contatti', path: '/contatti' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b-2 border-magenta-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                alt="Centro fitness MUV - Personal Training e Fitness Innovativo a Legnago" 
                src="https://www.muvfitness.it/wp-content/uploads/2022/10/muv_logo-1024x443.png" 
                className="max-h-16 w-auto object-scale-down transition-transform duration-300 hover:scale-105 filter brightness-110" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-magenta-600 to-viola-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-magenta-600/20 hover:to-viola-500/20 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white transition-colors duration-300"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2 border border-magenta-600/30">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-magenta-600 to-viola-500 text-white'
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-magenta-600/20 hover:to-viola-500/20 hover:text-white'
                  }`}
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
