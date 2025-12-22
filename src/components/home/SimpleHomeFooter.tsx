import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

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

  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4">
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
            <MapPin className="h-4 w-4 text-primary" />
            <span>Via Togliatti 1/C, 37045 Legnago (VR)</span>
          </div>
          <a 
            href="tel:+393516893853" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>351 689 3853</span>
          </a>
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
