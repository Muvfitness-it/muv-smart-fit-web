import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const MUVFooter = () => {
  return (
    <footer className="section-dark py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                MUV Fitness
              </h3>
              <p className="text-muted leading-relaxed">
                Via Frattini 113/D<br />
                37045 Legnago (VR)
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Orari
              </h3>
              <p className="text-muted leading-relaxed">
                Lun-Ven 8:00-21:00<br />
                Sab 9:00-14:00
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Seguici
              </h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/muvfitness.it/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="Instagram MUV Fitness"
                >
                  <Instagram size={28} />
                </a>
                <a 
                  href="https://www.facebook.com/MUVFitnessLegnago" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label="Facebook MUV Fitness"
                >
                  <Facebook size={28} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-footer">
                © 2024 MUV Fitness. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6">
                <Link 
                  to="/privacy" 
                  className="text-footer hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/cookie-policy" 
                  className="text-footer hover:text-secondary transition-colors"
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
