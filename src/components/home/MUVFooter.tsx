// Footer - MUV Fitness
import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const MUVFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* Indirizzo e Info */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#10B981' 
                }}
              >
                MUV Fitness
              </h3>
              <p 
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '16px', 
                  fontWeight: '400', 
                  color: '#CBD5E1',
                  lineHeight: '1.6'
                }}
              >
                Via Frattini, 113/D<br />
                37045 Legnago (VR)
              </p>
            </div>
            
            {/* Orari */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#10B981' 
                }}
              >
                Orari
              </h3>
              <p 
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '16px', 
                  fontWeight: '400', 
                  color: '#CBD5E1',
                  lineHeight: '1.6'
                }}
              >
                Lun-Ven 8:00-21:00<br />
                Sab 9:00-14:00
              </p>
            </div>
            
            {/* Social */}
            <div>
              <h3 
                className="mb-4"
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#10B981' 
                }}
              >
                Seguici
              </h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/muvfitness.it/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-green-400"
                  aria-label="Instagram MUV Fitness"
                >
                  <Instagram size={28} />
                </a>
                <a 
                  href="https://www.facebook.com/MUVFitnessLegnago" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-green-400"
                  aria-label="Facebook MUV Fitness"
                >
                  <Facebook size={28} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p 
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '14px', 
                  fontWeight: '400', 
                  color: '#CBD5E1' 
                }}
              >
                © 2024 MUV Fitness. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6">
                <Link 
                  to="/privacy" 
                  className="transition-colors hover:text-green-400"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '14px', 
                    fontWeight: '400', 
                    color: '#CBD5E1' 
                  }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/cookie-policy" 
                  className="transition-colors hover:text-green-400"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '14px', 
                    fontWeight: '400', 
                    color: '#CBD5E1' 
                  }}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MUVFooter;
