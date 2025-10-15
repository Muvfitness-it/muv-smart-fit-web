import { Star, ExternalLink, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BUSINESS_DATA } from "@/config/businessData";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: "Google" | "Facebook" | "Trustpilot";
  verified: boolean;
  response?: string;
}

interface ReviewsManagerProps {
  reviews?: Review[];
  showCTA?: boolean;
  limit?: number;
}

const ReviewsManager = ({ 
  reviews = [], 
  showCTA = true,
  limit 
}: ReviewsManagerProps) => {
  
  // Mock reviews se non fornite (da sostituire con dati reali da API)
  const defaultReviews: Review[] = [
    {
      id: "1",
      author: "Maria R.",
      rating: 5,
      date: "2024-01-15",
      text: "Centro fitness fantastico! Personale competente e risultati visibili già dopo un mese. L'EMS Training è incredibile!",
      source: "Google",
      verified: true,
      response: "Grazie Maria! Siamo felici dei tuoi progressi. Continua così! 💪"
    },
    {
      id: "2",
      author: "Luca B.",
      rating: 5,
      date: "2024-01-10",
      text: "Professionalità al top. Francesco e il suo team sanno davvero come far raggiungere gli obiettivi. Consigliato!",
      source: "Google",
      verified: true
    },
    {
      id: "3",
      author: "Giulia M.",
      rating: 5,
      date: "2024-01-05",
      text: "Ho risolto il mio mal di schiena cronico grazie a Pancafit. Ambiente pulito, moderno e personale sempre disponibile.",
      source: "Google",
      verified: true
    }
  ];

  const displayReviews = (reviews.length > 0 ? reviews : defaultReviews).slice(0, limit || reviews.length);
  const averageRating = displayReviews.reduce((acc, r) => acc + r.rating, 0) / displayReviews.length;
  const totalReviews = displayReviews.length;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Google":
        return "🔵";
      case "Facebook":
        return "🔷";
      case "Trustpilot":
        return "⭐";
      default:
        return "📝";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con statistiche */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < Math.floor(averageRating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
        </div>
        <p className="text-muted-foreground">
          Basato su <strong>{totalReviews}+ recensioni</strong> verificate
        </p>
      </div>

      {/* Lista recensioni */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              {/* Header recensione */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        ✓ Verificata
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <span className="text-2xl">{getSourceIcon(review.source)}</span>
              </div>

              {/* Testo recensione */}
              <p className="text-muted-foreground mb-3 italic">
                "{review.text}"
              </p>

              {/* Risposta (se presente) */}
              {review.response && (
                <div className="bg-muted/50 p-3 rounded-lg mb-3">
                  <p className="text-sm font-semibold mb-1">Risposta del proprietario:</p>
                  <p className="text-sm text-muted-foreground">{review.response}</p>
                </div>
              )}

              {/* Footer con data e fonte */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                <span>{new Date(review.date).toLocaleDateString("it-IT")}</span>
                <span>{review.source}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA per lasciare recensioni */}
      {showCTA && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Sei un nostro cliente?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                La tua opinione è importante! Lascia una recensione e aiuta altri a scoprire MUV Fitness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-accent">
                  <a
                    href={BUSINESS_DATA.geo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 w-4 h-4" />
                    Recensisci su Google
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={BUSINESS_DATA.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Recensisci su Facebook
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewsManager;
