// Sezione Storie & Testimonianze - MUV Fitness
import { Quote } from 'lucide-react';

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

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Titolo */}
          <h2 
            className="text-center mb-12"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '42px', 
              fontWeight: '700', 
              color: '#1E3A8A' 
            }}
          >
            Le storie di chi ha scelto MUV
          </h2>
          
          {/* Grid Testimonianze */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100"
              >
                <Quote 
                  size={48} 
                  style={{ color: '#10B981', opacity: 0.3 }} 
                  className="mb-4"
                />
                
                <p 
                  className="mb-6 italic"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '18px', 
                    fontWeight: '400', 
                    color: '#1E3A8A',
                    lineHeight: '1.6'
                  }}
                >
                  "{testimonial.quote}"
                </p>
                
                <div className="pt-4 border-t border-blue-100">
                  <p 
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '16px', 
                      fontWeight: '700', 
                      color: '#1E3A8A' 
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p 
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '14px', 
                      fontWeight: '400', 
                      color: '#10B981' 
                    }}
                  >
                    {testimonial.age}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVTestimonialsSection;
