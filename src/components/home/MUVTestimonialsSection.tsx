// Sezione Storie & Testimonianze - MUV Fitness
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Titolo */}
          <h2 
            className="text-center mb-16"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '42px', 
              fontWeight: '700', 
              color: '#1E3A8A' 
            }}
          >
            Le storie di chi ha scelto MUV
          </h2>
          
          {/* Testimonial Rotante */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-12 shadow-lg">
            <Quote 
              size={64} 
              style={{ color: '#10B981', opacity: 0.2 }} 
              className="absolute top-6 left-6"
            />
            
            <div className="relative z-10 text-center">
              <p 
                className="mb-6 italic"
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '24px', 
                  fontWeight: '400', 
                  color: '#1E3A8A',
                  lineHeight: '1.6'
                }}
              >
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div>
                <p 
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#1E3A8A' 
                  }}
                >
                  {testimonials[currentIndex].name}, {testimonials[currentIndex].age}
                </p>
              </div>
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="transition-all duration-300"
                  style={{
                    width: currentIndex === index ? '32px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: currentIndex === index ? '#10B981' : '#CBD5E1'
                  }}
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
