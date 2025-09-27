import React from 'react';
import { Star, Quote } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marco B.",
      age: 34,
      image: "/lovable-uploads/74047076-b154-41c0-8ecb-ee355fc220f1.png",
      result: "-8kg in 6 settimane",
      quote: "Con l'EMS ho ottenuto in 20 minuti quello che prima richiedeva 2 ore di palestra. Il team MUV è professionale e i risultati sono reali.",
      service: "EMS + Personal Training"
    },
    {
      name: "Giulia M.",
      age: 29,
      image: "/lovable-uploads/80ae4a77-9aab-42ac-90cc-32152298a358.png",
      result: "Cellulite ridotta del 70%",
      quote: "Vacuum e Pressoterapia hanno completamente trasformato le mie gambe. Finalmente posso indossare shorts senza imbarazzo!",
      service: "Vacuum + Pressoterapia"
    },
    {
      name: "Roberto L.",
      age: 42,
      image: "/lovable-uploads/6a6b9274-a4a0-48ab-a512-74641f84240f.png",
      result: "Dolore lombare eliminato",
      quote: "Dopo anni di mal di schiena, con Pancafit ho risolto definitivamente. Non avrei mai creduto fosse possibile in così poco tempo.",
      service: "Pancafit + Postural Coach"
    },
    {
      name: "Elena R.",
      age: 38,
      image: "/lovable-uploads/47d51820-31e5-44e1-9369-96eb744f9ad7.png",
      result: "-12kg + tonificazione",
      quote: "Il programma integrato nutrizione + allenamento mi ha dato una forma fisica che non avevo nemmeno a 20 anni.",
      service: "Nutrizione + Personal Training"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Storie di Successo <span className="text-primary">Reali</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Oltre 500 persone hanno già raggiunto i loro obiettivi con i nostri metodi scientifici.
            Questi sono solo alcuni dei risultati certificati.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              {/* Profile Section */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.age} anni</div>
                </div>
              </div>

              {/* Result Badge */}
              <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-full px-3 py-1 text-green-400 text-sm font-semibold mb-4">
                {testimonial.result}
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-primary/50 mb-2" />
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Service */}
              <div className="text-xs text-accent font-medium">
                {testimonial.service}
              </div>

              {/* Stars */}
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certification Badges */}
        <div className="text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-blue-600/20 border border-blue-400/30 px-4 py-2 rounded-full text-blue-400 text-sm font-semibold">
              ✅ Risultati Certificati
            </div>
            <div className="bg-green-600/20 border border-green-400/30 px-4 py-2 rounded-full text-green-400 text-sm font-semibold">
              ✅ 30 giorni o Rimborso
            </div>
            <div className="bg-purple-600/20 border border-purple-400/30 px-4 py-2 rounded-full text-purple-400 text-sm font-semibold">
              ✅ Metodi Scientifici
            </div>
            <div className="bg-pink-600/20 border border-pink-400/30 px-4 py-2 rounded-full text-pink-400 text-sm font-semibold">
              ✅ Team Qualificato
            </div>
          </div>

          <div className="flex justify-center items-center text-yellow-400 text-sm">
            <Star className="w-5 h-5 fill-current mr-1" />
            <span className="font-semibold">4.9/5</span>
            <span className="text-gray-400 ml-2">su 200+ recensioni verificate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;