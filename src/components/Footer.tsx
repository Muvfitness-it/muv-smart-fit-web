
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrizione */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold">MUV Fitness</span>
            </div>
            <p className="text-gray-400 text-sm">
              Il tuo centro fitness all'avanguardia nel cuore di Brescia. 
              Tecnologie innovative, professionalità e risultati garantiti.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/muvfitness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/muvfitness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Rapidi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chi-siamo" className="text-gray-400 hover:text-white transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-white transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/risultati" className="text-gray-400 hover:text-white transition-colors">
                  Risultati
                </Link>
              </li>
              <li>
                <Link to="/muv-planner" className="text-pink-400 hover:text-pink-300 transition-colors">
                  MUV Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">I Nostri Servizi</h3>
            <ul className="space-y-2 text-gray-400">
              <li>EMS Training</li>
              <li>Pancafit</li>
              <li>Personal Training</li>
              <li>Pilates</li>
              <li>Functional Training</li>
              <li>Consulenza Nutrizionale</li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Via Volturno, 28<br />
                  25123 Brescia (BS)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <a 
                  href="tel:+393345678901" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +39 334 567 8901
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <a 
                  href="mailto:info@muvfitness.it" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  info@muvfitness.it
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>Lun-Ven: 7:00-22:00</div>
                  <div>Sab-Dom: 9:00-19:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MUV Fitness Center. Tutti i diritti riservati.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
