import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';
import { Link } from 'react-router-dom';

const NordicFooter = () => {
  return (
    <footer className="bg-[hsl(var(--nordic-text))] text-white">
      {/* Map Section */}
      <div className="h-80 w-full">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.234!2d${BUSINESS_DATA.geo.longitude}!3d${BUSINESS_DATA.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDExJzI5LjAiTiAxMcKwMTgnMjMuNCJF!5e0!3m2!1sit!2sit!4v1234567890`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MUV Fitness Legnago Location"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={BUSINESS_DATA.branding.logo}
              alt="MUV Fitness"
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              {BUSINESS_DATA.description.substring(0, 150)}...
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contatti</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={BUSINESS_DATA.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  {BUSINESS_DATA.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_DATA.contact.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#C13697]" />
                  {BUSINESS_DATA.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_DATA.geo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 text-[#0055A4] flex-shrink-0 mt-0.5" />
                  <span>{BUSINESS_DATA.address.fullAddress}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Orari</h3>
            <ul className="space-y-3">
              {BUSINESS_DATA.openingHours.structured.map((hours, index) => (
                <li key={index} className="flex items-center gap-3 text-white/70">
                  <Clock className="w-4 h-4 text-[#C13697]" />
                  <span className="font-medium">{hours.displayDays}:</span>
                  <span>{hours.displayHours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Inizia Oggi</h3>
            <p className="text-white/70 text-sm mb-6">
              Prenota la tua consulenza iniziale gratuita e scopri il percorso perfetto per te.
            </p>
            <a
              href={BUSINESS_DATA.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center px-6 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#C13697] to-[#0055A4] hover:opacity-90 transition-opacity shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Richiedi Consulenza
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} {BUSINESS_DATA.legalName} - P.IVA {BUSINESS_DATA.business.vatNumber}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="text-white/50 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {BUSINESS_DATA.social.facebook && (
              <a
                href={BUSINESS_DATA.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {BUSINESS_DATA.social.instagram && (
              <a
                href={BUSINESS_DATA.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NordicFooter;
