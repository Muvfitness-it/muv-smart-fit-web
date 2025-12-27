import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Giulia M.",
    result: "-2 taglie in 8 settimane",
    quote: "Finalmente ho trovato il percorso giusto per me!",
    avatar: "GM",
    rating: 5
  },
  {
    name: "Marco T.",
    result: "-8kg in 3 mesi",
    quote: "L'EMS ha cambiato il mio modo di allenarmi.",
    avatar: "MT",
    rating: 5
  },
  {
    name: "Sara B.",
    result: "Mal di schiena sparito",
    quote: "Pancafit è stato la soluzione ai miei problemi.",
    avatar: "SB",
    rating: 5
  }
];

const MiniTestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8 px-4">
      {/* Label */}
      <p className="text-white/60 text-xs uppercase tracking-wider text-center mb-4">
        Cosa dicono i nostri clienti
      </p>

      {/* Carousel container */}
      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-5 md:p-6">
        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          aria-label="Precedente"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          aria-label="Successivo"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Testimonial content */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 flex flex-col items-center text-center px-8"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg mb-3">
                  {testimonial.avatar}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/90 text-sm md:text-base mb-2 italic">
                  "{testimonial.quote}"
                </p>

                {/* Name and result */}
                <p className="text-white font-semibold text-sm">
                  {testimonial.name}
                </p>
                <p className="text-primary text-xs font-medium">
                  {testimonial.result}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === activeIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-white/40 hover:bg-white/60'
                }
              `}
              aria-label={`Vai alla testimonianza ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniTestimonialCarousel;
