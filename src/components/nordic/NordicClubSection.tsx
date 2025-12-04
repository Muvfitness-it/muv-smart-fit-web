import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NordicClubSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
      alt: 'Area allenamento luminosa',
    },
    {
      src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80',
      alt: 'Attrezzatura moderna',
    },
    {
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
      alt: 'Spazio open space',
    },
    {
      src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80',
      alt: 'Area functional training',
    },
    {
      src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80',
      alt: 'Reception moderna',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[hsl(var(--nordic-white))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(var(--nordic-text))] mb-4">
            Più di una palestra.{' '}
            <span className="bg-gradient-to-r from-[#C13697] to-[#0055A4] bg-clip-text text-transparent">
              Un Club.
            </span>
          </h2>
          <p className="text-lg text-[hsl(var(--nordic-text))]/60 max-w-2xl mx-auto">
            Un ambiente esclusivo dove allenarsi è un piacere, non un dovere.
          </p>
        </div>

        {/* Gallery */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors -translate-x-4 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-[hsl(var(--nordic-text))]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors translate-x-4 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-[hsl(var(--nordic-text))]" />
          </button>

          {/* Scrollable Gallery */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none w-72 sm:w-80 snap-center"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-[#C13697] to-[#0055A4] bg-clip-text text-transparent">
              300+
            </div>
            <div className="text-sm text-[hsl(var(--nordic-text))]/60 mt-1">mq di Spazio</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-[#C13697] to-[#0055A4] bg-clip-text text-transparent">
              6
            </div>
            <div className="text-sm text-[hsl(var(--nordic-text))]/60 mt-1">Tecnologie Esclusive</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-[#C13697] to-[#0055A4] bg-clip-text text-transparent">
              1:1
            </div>
            <div className="text-sm text-[hsl(var(--nordic-text))]/60 mt-1">Coaching Personale</div>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-[#C13697] to-[#0055A4] bg-clip-text text-transparent">
              ∞
            </div>
            <div className="text-sm text-[hsl(var(--nordic-text))]/60 mt-1">Possibilità</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NordicClubSection;
