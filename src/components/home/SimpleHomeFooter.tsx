import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

const SimpleHomeFooter = () => {
  const menuLinks = [
    { label: "Il Metodo", href: "/metodo" },
    { label: "Servizi", href: "/servizi" },
    { label: "Tecnologie", href: "/tecnologie" },
    { label: "Perché MUV", href: "/perche-muv" },
    { label: "Chi Siamo", href: "/chi-siamo" },
    { label: "Contatti", href: "/contatti" },
    { label: "Blog", href: "/blog" },
  ];

  const whatsappNumber = "393291070374";
  const whatsappMessage = encodeURIComponent("Ciao! Vorrei informazioni sui vostri servizi.");

  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src="/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png"
              alt="MUV Fitness Legnago"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Links alle pagine */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>


        {/* Info contatto */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span>Piazzetta Don Walter Soave, 2 - 37045 Legnago (VR)</span>
          </div>
          <a 
            href="tel:+393291070374" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>329 107 0374</span>
          </a>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-500 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-green-500" />
            <span>WhatsApp</span>
          </a>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Lun-Ven 8:00-21:00 | Sab 8:00-12:00</span>
          </div>
        </div>

        {/* Newsletter + Social Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          {/* Newsletter Form */}
          <NewsletterForm variant="footer" />
          
          {/* Social Icons */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-muted-foreground">Seguici</p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/muvfitness_legnago/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/muvfitnesslegnago"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Privacy e Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-muted-foreground/70">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <span className="hidden md:inline">•</span>
          <Link to="/cookie-policy" className="hover:text-primary transition-colors">
            Cookie Policy
          </Link>
          <span className="hidden md:inline">•</span>
          <span>© {new Date().getFullYear()} MUV Fitness Legnago</span>
        </div>
      </div>
    </footer>
  );
};

export default SimpleHomeFooter;
