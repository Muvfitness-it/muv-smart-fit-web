
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Risultati', href: '/risultati' },
    { name: 'Contatti', href: '/contatti' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/13084a47-9519-4cd3-9d9e-6c4e3f48e43a.png" 
              alt="MUV Fitness Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-pink-400 bg-gray-800'
                    : 'text-gray-300 hover:text-pink-400 hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/muv-planner"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              MUV Planner
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-pink-400 bg-gray-700'
                    : 'text-gray-300 hover:text-pink-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/muv-planner"
              className="block w-full text-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 mt-4"
              onClick={() => setIsOpen(false)}
            >
              MUV Planner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
