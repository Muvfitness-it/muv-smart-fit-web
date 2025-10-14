// Sezione Motivazione MUV - Design Energizzante
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Users, Target, Trophy, Heart } from "lucide-react";

const MUVMotivationSection = () => {
  return (
    <section className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4">
        {/* Titolo Motivazionale */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Trasforma il Tuo Corpo, Supera i Tuoi Limiti
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            In MUV Fitness crediamo che ogni persona abbia un potenziale straordinario. 
            Il nostro team ti accompagna verso risultati che non hai mai immaginato possibili.
          </p>
        </div>

        {/* Grid Motivazionale con Immagini */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Immagine Hero Motivazionale */}
          <div className="relative overflow-hidden rounded-2xl shadow-primary">
            <OptimizedImage
              src="/images/fitness-professional-bg.jpg"
              alt="Squadra MUV Fitness durante allenamento di gruppo - energia e motivazione"
              width={600}
              height={400}
              generateWebp={true}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-primary/20" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">La Tua Squadra di Successo</h3>
              <p className="text-lg opacity-90">Insieme raggiungiamo qualsiasi obiettivo</p>
            </div>
          </div>

          {/* Stats Motivazionali */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-primary mb-2">500+</h4>
                <p className="text-muted-foreground font-medium">Trasformazioni Completate</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-primary mb-2">98%</h4>
                <p className="text-muted-foreground font-medium">Obiettivi Raggiunti</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-primary mb-2">30</h4>
                <p className="text-muted-foreground font-medium">Giorni per Risultati</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-primary mb-2">100%</h4>
                <p className="text-muted-foreground font-medium">Soddisfazione Garantita</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Motivazionale */}
        <div className="text-center">
          <a
            href="/form-contatti"
            className="inline-flex items-center px-12 py-6 bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-bold rounded-2xl shadow-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Inizia la Tua Trasformazione Ora
          </a>
          <p className="text-muted-foreground mt-4 text-lg">
            Prima sessione gratuita • Risultati garantiti in 30 giorni
          </p>
        </div>
      </div>
    </section>
  );
};

export default MUVMotivationSection;