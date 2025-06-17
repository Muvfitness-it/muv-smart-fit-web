
import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/74047076-b154-41c0-8ecb-ee355fc220f1.png" 
                alt="MUV Fitness Logo" 
                className="h-16 w-auto"
              />
            </Link>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-pink-600" />
                <span className="text-gray-300 text-sm">Via del Fitness, 123 - 20100 Milano, MI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-pink-600" />
                <span className="text-gray-300 text-sm">+39 02 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pink-600" />
                <span className="text-gray-300 text-sm">info@muvfitness.it</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Rapidi</h3>
            <div className="space-y-2">
              <Link to="/chi-siamo" className="block text-gray-300 hover:text-pink-600 transition-colors duration-300">
                Chi Siamo
              </Link>
              <Link to="/team" className="block text-gray-300 hover:text-pink-600 transition-colors duration-300">
                Team
              </Link>
              <Link to="/servizi" className="block text-gray-300 hover:text-pink-600 transition-colors duration-300">
                Servizi
              </Link>
              <Link to="/risultati" className="block text-gray-300 hover:text-pink-600 transition-colors duration-300">
                Risultati
              </Link>
              <Link to="/contatti" className="block text-gray-300 hover:text-pink-600 transition-colors duration-300">
                Contatti
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Seguici</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/muvfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/muvfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 MUV Fitness. Tutti i diritti riservati.
            </p>
            <p className="text-gray-400 text-sm">
              P.IVA: 12345678901
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
