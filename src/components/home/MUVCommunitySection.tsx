// Sezione Community MUV - Spirito di Gruppo e Motivazione
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Quote } from "lucide-react";

const MUVCommunitySection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      age: "28 anni",
      result: "-8kg in 30 giorni",
      image: "/images/professional-bg.jpg",
      quote: "MUV ha cambiato la mia vita. Non solo ho perso peso, ma ho trovato una nuova energia e fiducia in me stessa che non avevo mai avuto prima.",
      highlight: "Energia e Fiducia"
    },
    {
      name: "Marco R.",
      age: "35 anni", 
      result: "+15kg massa muscolare",
      image: "/images/fitness-professional-bg.jpg",
      quote: "L'approccio personalizzato e la tecnologia EMS mi hanno permesso di raggiungere risultati che in palestra tradizionale non avevo mai ottenuto.",
      highlight: "Risultati Straordinari"
    },
    {
      name: "Elena T.",
      age: "42 anni",
      result: "Forma fisica perfetta",
      image: "/images/professional-bg.jpg", 
      quote: "Dopo anni di diete fallimentari, finalmente ho trovato un metodo che funziona. Il team MUV mi supporta in ogni passo del percorso.",
      highlight: "Supporto Continuo"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Titolo Sezione */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            La Nostra Community di Successo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ogni giorno persone come te raggiungono i loro obiettivi con MUV Fitness. 
            Scopri le storie di chi ha già trasformato la propria vita.
          </p>
        </div>

        {/* Grid Testimonial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-light rounded-2xl p-8 shadow-soft hover:shadow-primary transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-muted-foreground text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Profile */}
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-soft">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={`${testimonial.name} - testimonianza MUV Fitness`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-primary font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.age}</p>
                  <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold mt-1">
                    {testimonial.result}
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-secondary font-semibold text-center">{testimonial.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Community CTA */}
        <div className="text-center bg-gradient-primary rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Unisciti alla Famiglia MUV</h3>
          <p className="text-xl mb-8 opacity-90">
            Diventa parte di una community che crede nel tuo potenziale e ti supporta ogni giorno
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/form-contatti"
              className="inline-flex items-center px-8 py-4 bg-white text-primary text-lg font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              Prenota la Tua Prova Gratuita
            </a>
            <a
              href="/recensioni"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300"
            >
              Leggi Tutte le Storie
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVCommunitySection;