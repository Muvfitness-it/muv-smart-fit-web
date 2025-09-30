// Sezione Esperienza/Tour - MUV Fitness
import OptimizedImage from '@/components/ui/OptimizedImage';

const MUVEsperienzaSection = () => {
  const gallery = [
    { src: '/images/fitness-professional-bg.jpg', alt: 'Sala attrezzi MUV Fitness' },
    { src: '/lovable-uploads/74047076-b154-41c0-8ecb-ee355fc220f1.png', alt: 'Zona relax' },
    { src: '/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png', alt: 'Dettagli design' },
    { src: '/lovable-uploads/470f5162-68c3-4cc1-8e0c-9402f101b13d.png', alt: 'Attimi coaching' },
    { src: '/lovable-uploads/df526450-5eb6-4c2b-a603-0d3470cb0484.png', alt: 'Clienti soddisfatti' },
    { src: '/lovable-uploads/6a6b9274-a4a0-48ab-a512-74641f84240f.png', alt: 'Allenamento EMS' },
  ];

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
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {gallery.map((image, index) => (
              <div 
                key={index}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ aspectRatio: '16/10' }}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVEsperienzaSection;
