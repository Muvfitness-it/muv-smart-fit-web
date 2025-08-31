import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="whatsapp-sticky fixed bottom-4 right-4 z-[999] flex flex-col gap-3 animate-slide-up">
      {/* WhatsApp Button - Enhanced for mobile */}
      <a
        href="https://wa.me/393291070374"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse-glow min-h-[64px] min-w-[64px] flex items-center justify-center"
        aria-label="Contattaci su WhatsApp"
      >
        <MessageCircle className="w-10 h-10" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Scrivici su WhatsApp
        </span>
      </a>

      {/* Phone Button - Enhanced for mobile */}
      <a
        href="tel:+393291070374"
        className="group bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-neon-pulse min-h-[64px] min-w-[64px] flex items-center justify-center"
        aria-label="Chiamaci ora"
      >
        <Phone className="w-10 h-10" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chiamaci ora
        </span>
      </a>
    </div>
  );
};

export default FloatingCTA;