// Sezione Esperienza/Tour - MUV Fitness
import ImageSEO from '@/components/SEO/ImageSEO';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const MUVEsperienzaSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const gallery = [
    { 
      src: '/images/fitness-professional-bg.jpg', 
      alt: 'Sala attrezzi MUV Fitness Legnago - Attrezzature professionali per allenamento completo',
      title: 'Sala Attrezzi Professionale'
    },
    { 
      src: '/lovable-uploads/74047076-b154-41c0-8ecb-ee355fc220f1.png', 
      alt: 'Zona relax e recupero MUV Fitness - Spazio dedicato al benessere post allenamento',
      title: 'Zona Relax'
    },
    { 
      src: '/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png', 
      alt: 'Dettagli design moderno palestra MUV Fitness Legnago',
      title: 'Design Moderno'
    },
    { 
      src: '/lovable-uploads/470f5162-68c3-4cc1-8e0c-9402f101b13d.png', 
      alt: 'Personal trainer durante sessione di coaching MUV Fitness',
      title: 'Coaching Personalizzato'
    },
    { 
      src: '/lovable-uploads/df526450-5eb6-4c2b-a603-0d3470cb0484.png', 
      alt: 'Clienti soddisfatti dopo allenamento MUV Fitness Legnago',
      title: 'Risultati Reali'
    },
    { 
      src: '/lovable-uploads/6a6b9274-a4a0-48ab-a512-74641f84240f.png', 
      alt: 'Allenamento EMS dimagrimento MUV Fitness Legnago - Tecnologia avanzata',
      title: 'Allenamento EMS'
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Titolo */}
          <h2 
            className="mb-6"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '42px', 
              fontWeight: '700', 
              color: '#1E3A8A' 
            }}
          >
            Vivi l'esperienza MUV
          </h2>
          
          {/* Testo descrittivo */}
          <p 
            className="mb-10 mx-auto"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '18px', 
              fontWeight: '400', 
              color: '#374151',
              maxWidth: '800px',
              lineHeight: '1.8'
            }}
          >
            Nel nostro centro proverai un nuovo modo di allenarti: accoglienza familiare, sale curate fin nei dettagli, strumenti innovativi e personale sempre presente.<br />
            Entra e scopri un luogo dove allenarsi è un piacere e ogni allenamento ti avvicina al benessere che cerchi.
          </p>
          
          {/* CTA */}
          <a 
            href="/risultati"
            className="inline-flex items-center justify-center px-8 py-4 mb-12 transition-all duration-300 hover:opacity-80"
            style={{ 
              backgroundColor: '#F97316', 
              color: 'white',
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontWeight: '500',
              borderRadius: '12px'
            }}
          >
            Guarda la gallery
          </a>
          
          {/* Gallery Grid - Cliccabile con Lightbox */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {gallery.map((image, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                style={{ aspectRatio: '16/10' }}
                onClick={() => openLightbox(index)}
              >
                <ImageSEO
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div 
              className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
                aria-label="Chiudi lightbox"
              >
                <X size={32} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors"
                aria-label="Immagine precedente"
              >
                <ChevronLeft size={48} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors"
                aria-label="Immagine successiva"
              >
                <ChevronRight size={48} />
              </button>

              <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <ImageSEO
                  src={gallery[currentImage].src}
                  alt={gallery[currentImage].alt}
                  title={gallery[currentImage].title}
                  width={1920}
                  height={1200}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                <div className="text-center mt-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{gallery[currentImage].title}</h3>
                  <p className="text-sm text-gray-300">
                    {currentImage + 1} di {gallery.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MUVEsperienzaSection;
