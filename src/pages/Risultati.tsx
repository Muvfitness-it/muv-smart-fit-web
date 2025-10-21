
import { Star } from "lucide-react";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getLocalBusinessSchema } from "@/utils/seoSchemas";
import { BUSINESS_DATA } from "@/config/businessData";

const Risultati = () => {
  const structuredData = [
    getLocalBusinessSchema()
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Recensioni Google MUV Fitness Legnago | Testimonianze Reali"
        description="Leggi le recensioni reali dei clienti MUV Fitness su Google. Scopri cosa dicono le persone che si sono allenate con noi a Legnago."
        keywords="recensioni muv fitness legnago, testimonianze google, opinioni personal training legnago"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background text-foreground">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Widget Recensioni Google Ufficiale */}
            <section className="bg-muted/30 rounded-lg p-8 border border-border">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Le Recensioni Reali dei Nostri Clienti su <span className="text-brand-primary">Google</span>
              </h1>
              <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
                Verificate e autentiche: scopri cosa dicono le persone che si sono allenate con noi
              </p>
              
              {/* Google Reviews Widget */}
              <div 
                className="max-w-5xl mx-auto"
                dangerouslySetInnerHTML={{
                  __html: `
                    <gmpx-place-overview 
                      place="${BUSINESS_DATA.google.placeId}"
                      size="large"
                      google-logo-already-displayed>
                    </gmpx-place-overview>
                  `
                }}
              />
              
              {/* CTA per lasciare recensione */}
              <div className="text-center mt-8">
                <a
                  href={BUSINESS_DATA.google.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 min-h-[44px]"
                >
                  <Star className="w-5 h-5" />
                  Scrivi una Recensione su Google
                </a>
              </div>
            </section>
          </div>
        </section>
    </div>
    </>
  );
};

export default Risultati;
