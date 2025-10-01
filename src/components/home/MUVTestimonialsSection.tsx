import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const MUVTestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Ho ritrovato entusiasmo ed energia grazie al team MUV!",
      name: "Serena",
      age: "28 anni"
    },
    {
      quote: "Ambiente moderno, staff super qualificato: qui ti senti davvero seguito.",
      name: "Marco",
      age: "41 anni"
    },
    {
      quote: "Allenamenti efficaci ma mai stressanti, ho raggiunto i miei obiettivi col sorriso.",
      name: "Roberta",
      age: "56 anni"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-white section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-16">
            Le storie di chi ha scelto MUV
          </h2>
          
          <div className="card-testimonial relative">
            <Quote 
              size={64} 
              className="absolute top-6 left-6 text-secondary opacity-20"
            />
            
            <div className="relative z-10 text-center">
              <p className="text-2xl md:text-3xl italic text-primary mb-6 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <p className="text-lg font-bold text-primary">
                {testimonials[currentIndex].name}, {testimonials[currentIndex].age}
              </p>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index 
                      ? 'w-8 h-3 bg-secondary' 
                      : 'w-3 h-3 bg-muted'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVTestimonialsSection;
