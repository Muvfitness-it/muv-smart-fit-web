import { Star, Quote } from 'lucide-react';

const SocialProofSection = () => {
  const stats = [
    { value: "500+", label: "Clienti soddisfatti" },
    { value: "4.9", label: "Rating Google", isStar: true },
    { value: "10+", label: "Anni di esperienza" },
    { value: "95%", label: "Tasso di rinnovo" }
  ];

  const testimonials = [
    {
      name: "Laura M.",
      age: 42,
      result: "-8kg in 10 settimane",
      quote: "Finalmente un posto dove non mi sento giudicata. In 10 settimane ho perso 8kg che cercavo di eliminare da anni."
    },
    {
      name: "Marco B.",
      age: 35,
      result: "Mal di schiena risolto",
      quote: "Dopo 3 anni di mal di schiena cronico, 2 mesi di Pilates Reformer hanno fatto quello che fisioterapia e farmaci non riuscivano."
    },
    {
      name: "Giulia R.",
      age: 55,
      result: "-2 taglie in 8 settimane",
      quote: "A 55 anni pensavo fosse impossibile. L'EMS e l'attenzione personalizzata hanno cambiato tutto."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </span>
                  {stat.isStar && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Testimonials */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
            Storie di trasformazione reali
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-background border border-border rounded-2xl p-6 relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4 text-sm md:text-base italic">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}, {testimonial.age} anni</p>
                  <p className="text-primary text-sm font-medium">{testimonial.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
