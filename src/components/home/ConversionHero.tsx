import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const ConversionHero = () => {
  const badges = ["Consulenza conoscitiva gratuita", "Ambiente riservato", "Posti limitati"];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contatto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Centro Fitness Boutique a Legnago
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Trasforma il tuo corpo con un percorso guidato e personalizzato.
            <span className="block text-primary text-2xl sm:text-3xl md:text-4xl mt-4">
              Anche se hai poco tempo o hai già fallito in altre palestre.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Non siamo una palestra tradizionale. Siamo un{" "}
            <strong className="text-foreground">Centro Fitness Boutique</strong> che lavora su obiettivi reali con
            tecnologie avanzate, personal training e consulenza dedicata.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/funnel">
                Prenota la consulenza
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto" onClick={scrollToContact}>
              Richiedi informazioni
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionHero;
