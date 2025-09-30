import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import OptimizedImage from "@/components/ui/OptimizedImage";
const LOGO_URL = "/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png";

const Footer = () => {
  const [latest, setLatest] = useState<Array<{ title: string; slug: string }>>([]);
  const footerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let didLoad = false;

    const load = async () => {
      if (didLoad) return;
      didLoad = true;
      const { data } = await supabase
        .from('blog_posts')
        .select('title, slug, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);
      setLatest((data || []).map(d => ({ title: d.title as string, slug: d.slug as string })));
    };

    // Prefer loading when footer is near viewport
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && footerRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            load();
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px' });

      observer.observe(footerRef.current);
      return () => observer.disconnect();
    }

    // Fallback: defer to idle or timeout
    const ric = (window as any).requestIdleCallback as ((cb: () => void, opts?: any) => number) | undefined;
    if (ric) {
      ric(load, { timeout: 2000 });
    } else {
      const t = setTimeout(load, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contact Info & Orari */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contatti & Orari</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">Via Frattini, 113/D Legnago (VR)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+393291070374" className="text-muted-foreground hover:text-primary text-sm transition-colors">329 107 0374</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@muvfitness.it" className="text-muted-foreground hover:text-primary text-sm transition-colors">info@muvfitness.it</a>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm font-semibold">Orari di Apertura:</p>
                <p className="text-muted-foreground text-xs">Lun-Ven: 8:00 - 21:00</p>
                <p className="text-muted-foreground text-xs">Sab: 9:00 - 14:00</p>
                <p className="text-muted-foreground text-xs">Dom: Chiusi</p>
              </div>
            </div>
          </div>

          {/* Links Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Seguici</h3>
            <div className="space-y-3">
              <a href="https://www.facebook.com/muvfitness" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
                <span className="text-sm">Facebook</span>
              </a>
              <a href="https://www.instagram.com/muvfitness" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="text-sm">Instagram</span>
              </a>
              <div className="space-y-2 pt-4">
                <Link to="/chi-siamo" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Chi Siamo</Link>
                <Link to="/team" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Team</Link>
                <Link to="/risultati" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Risultati</Link>
              </div>
            </div>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Servizi</h3>
            <div className="space-y-2">
              <Link to="/servizi/ems" className="block text-muted-foreground hover:text-primary transition-colors text-sm">EMS Dimagrimento</Link>
              <Link to="/servizi/personal-training" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Personal Training</Link>
              <Link to="/servizi/pilates" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Pilates Reformer</Link>
              <Link to="/servizi/pancafit" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Pancafit</Link>
              <Link to="/servizi/vacuum-pressoterapia" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Vacuum + Pressoterapia</Link>
              <Link to="/servizi/nutrizione" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Nutrizione</Link>
            </div>
          </div>

          {/* Link Utili */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Link Utili</h3>
            <div className="space-y-2">
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Blog</Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link>
              <Link to="/contatti" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Prenotazione</Link>
              <Link to="/come-arrivare" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Come Arrivare</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-muted-foreground text-sm">
                © 2024 MUV Fitness. Tutti i diritti riservati.
              </p>
              <p className="text-muted-foreground text-sm">
                P.IVA: 05281920289
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors">
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
