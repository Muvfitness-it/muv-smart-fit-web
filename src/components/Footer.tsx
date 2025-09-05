import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import OptimizedImage from "@/components/ui/OptimizedImage";
// Use the new logo from public folder

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
    <footer ref={footerRef} className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <OptimizedImage
                src="/lovable-uploads/80ae4a77-9aab-42ac-90cc-32152298a358.png"
                alt="MUV Fitness Logo"
                className="h-16 w-auto object-contain"
                width={64}
                height={64}
              />
            </Link>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-primary" />
                <span className="text-gray-300 text-sm">Via Venti Settembre, 5/7 Legnago (VR)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-primary" />
                <span className="text-gray-300 text-sm">+39 329 107 0374</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-primary" />
                <span className="text-gray-300 text-sm">info@muvfitness.it</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Rapidi</h3>
            <div className="space-y-2">
              <Link to="/chi-siamo" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Chi Siamo
              </Link>
              <Link to="/team" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Team
              </Link>
              <Link to="/risultati" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Risultati
              </Link>
              <Link to="/contatti" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Contatti
              </Link>
              <Link to="/recensioni" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Recensioni
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servizi</h3>
            <div className="space-y-2">
              <Link to="/servizi/personal-training" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Personal Training
              </Link>
              <Link to="/servizi/ems" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Tecnologia EMS
              </Link>
              <Link to="/servizi/pancafit" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Pancafit
              </Link>
              <Link to="/servizi/pilates" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Pilates Reformer
              </Link>
              <Link to="/servizi/small-group" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Small Group
              </Link>
              <Link to="/servizi/nutrizione" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Consulenza Nutrizionale
              </Link>
            </div>
          </div>
          {/* Zone di Servizio */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Zone di Servizio</h3>
            <div className="space-y-2">
              <Link to="/fitness-palestra-legnago" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Fitness Legnago
              </Link>
              <Link to="/servizi/personal-training" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Personal Trainer Legnago
              </Link>
              <Link to="/bovolone-fitness" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Bovolone Fitness
              </Link>
              <Link to="/cerea-fitness" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                Cerea Fitness
              </Link>
              <Link to="/san-bonifacio-fitness" className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                San Bonifacio
              </Link>
            </div>
          </div>

          {/* Ultimi Articoli */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ultimi articoli</h3>
            <div className="space-y-2">
              {latest.map(p => (
                <Link key={p.slug} to={`/${p.slug}`} className="block text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  {p.title}
                </Link>
              ))}
              <a
                href="https://baujoowgqeyraqnukkmw.functions.supabase.co/blog-rss"
                className="block text-gray-400 hover:text-brand-primary text-sm"
                aria-label="Feed RSS del blog MUV Fitness Legnago"
              >RSS Feed</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Seguici</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/MuvLegnago/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-brand-primary transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/MuvLegnago/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-brand-primary transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-400 text-sm">
                © 2024 MUV Fitness. Tutti i diritti riservati.
              </p>
              <p className="text-gray-400 text-sm">
                P.IVA: 05281920289
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-brand-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-brand-primary transition-colors duration-300">
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
