import { Link } from "react-router-dom";

const SimpleHomeNavbar = () => {
  const handleFunnelClick = () => {
    // GA4 tracking via gtag
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'home_click_to_funnel', {
        event_category: 'conversion',
        event_label: 'navbar_cta'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png"
              alt="MUV Fitness Legnago"
              className="h-10 w-auto"
            />
          </Link>

          {/* Single CTA */}
          <Link
            to="/funnel"
            onClick={handleFunnelClick}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg"
          >
            Prenota Consulenza
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleHomeNavbar;
