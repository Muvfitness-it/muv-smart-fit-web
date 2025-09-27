import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

const GallerySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryItems = [
    {
      type: 'image',
      src: '/lovable-uploads/29b9c5b1-c958-454c-9d7f-5d1c1b4f38ff.png',
      alt: 'Sala EMS MUV Fitness Legnago - Tecnologia avanzata',
      title: 'Sala EMS con Tecnologia Avanzata'
    },
    {
      type: 'image',
      src: '/lovable-uploads/3c810b2b-3275-47fd-8d43-a3ead4abd35b.png',
      alt: 'Personal Training 1:1 MUV Fitness',
      title: 'Personal Training Individuale'
    },
    {
      type: 'image',
      src: '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
      alt: 'Pilates Reformer MUV Fitness Legnago',
      title: 'Sala Pilates Reformer'
    },
    {
      type: 'image',
      src: '/lovable-uploads/470f5162-68c3-4cc1-8e0c-9402f101b13d.png',
      alt: 'Vacuum e Pressoterapia MUV Fitness',
      title: 'Trattamenti Vacuum e Pressoterapia'
    },
    {
      type: 'image',
      src: '/lovable-uploads/df526450-5eb6-4c2b-a603-0d3470cb0484.png',
      alt: 'Reception MUV Fitness Legnago',
      title: 'Reception e Area Accoglienza'
    },
    {
      type: 'image',
      src: '/lovable-uploads/d2c2bba4-7f76-46b7-ac23-34fe7830a7eb.png',
      alt: 'Spogliatoi MUV Fitness',
      title: 'Spogliatoi Moderni e Puliti'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Il Nostro <span className="text-primary">Centro</span> in HD
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Scopri gli spazi moderni e le tecnologie all'avanguardia che rendono MUV Fitness 
            il centro più innovativo di Legnago.
          </p>
        </div>

        {/* Main Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-800"
              onClick={() => openLightbox(index)}
            >
              <OptimizedImage
                src={item.src}
                alt={item.alt}
                className="w-full h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Play className="w-6 h-6" />
                  </div>
                  <p className="font-semibold">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-primary mb-2">300m²</div>
            <div className="text-gray-300 text-sm">Spazio Totale</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-accent mb-2">6</div>
            <div className="text-gray-300 text-sm">Aree Specializzate</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-secondary mb-2">12</div>
            <div className="text-gray-300 text-sm">Postazioni Attive</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-green-400 mb-2">24h</div>
            <div className="text-gray-300 text-sm">Aria Purificata</div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <OptimizedImage
                src={galleryItems[currentImageIndex].src}
                alt={galleryItems[currentImageIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-xl font-bold">{galleryItems[currentImageIndex].title}</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {currentImageIndex + 1} di {galleryItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;