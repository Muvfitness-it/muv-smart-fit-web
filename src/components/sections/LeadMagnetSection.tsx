import React from 'react';
import LeadMagnetCard from '@/components/leadmagnet/LeadMagnetCard';
import EMSInfographic from '@/components/infographics/EMSInfographic';
import PancafitInfographic from '@/components/infographics/PancafitInfographic';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import { Card, CardContent } from '@/components/ui/card';

const LeadMagnetSection: React.FC = () => {
  const leadMagnets = [
    {
      title: "10 Esercizi per Eliminare il Mal di Schiena",
      description: "Guida completa con esercizi specifici per risolvere lombalgia e cervicalgia in modo naturale.",
      benefits: [
        "10 esercizi illustrati passo-passo",
        "Programma giornaliero di 15 minuti",
        "Consigli per prevenire ricadute",
        "Tecniche di respirazione per rilassamento",
        "Quando consultare un professionista"
      ],
      downloadUrl: "/guides/mal-di-schiena.pdf",
      downloads: 2847,
      rating: 4.9
    },
    {
      title: "Pilates in Gravidanza: Guida Sicura",
      description: "Programma completo di Pilates pre-natale per un parto più facile e recupero veloce.",
      benefits: [
        "Esercizi sicuri per ogni trimestre",
        "Preparazione del pavimento pelvico",
        "Tecniche di respirazione per il parto",
        "Programma post-parto per il recupero",
        "Consigli nutrizionali specializzati"
      ],
      downloadUrl: "/guides/pilates-gravidanza.pdf",
      downloads: 1567,
      rating: 5.0
    },
    {
      title: "Fitness Over 60: Mantenersi Giovani",
      description: "Programma completo per rimanere attivi, forti e indipendenti dopo i 60 anni.",
      benefits: [
        "Programma di ginnastica dolce illustrato",
        "Esercizi per prevenire le cadute",
        "Piano nutrizionale per senior",
        "Test di autovalutazione funzionale",
        "Consigli per l'attività quotidiana"
      ],
      downloadUrl: "/guides/fitness-over-60.pdf",
      downloads: 1789,
      rating: 4.8
    }
  ];

  const videos = [
    {
      title: "Come Funziona l'EMS - Dimostrazione Pratica",
      description: "Scopri come una sessione EMS di 20 minuti equivale a 4 ore di palestra tradizionale"
    },
    {
      title: "Pancafit® in Azione - Riequilibrio Posturale",
      description: "Vedi come il Metodo Raggi® corregge la postura e elimina i dolori in tempo reale"
    },
    {
      title: "Ginnastica Dolce Over 60 - Lezione Completa",
      description: "Una lezione tipo di ginnastica dolce per mantenersi attivi dopo i 60 anni"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Lead Magnets */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
            Guide <span className="text-brand-primary">Gratuite</span> per il Tuo Benessere
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scarica le nostre guide specializzate e inizia subito il tuo percorso verso una vita più sana e attiva
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {leadMagnets.map((magnet, index) => (
            <LeadMagnetCard 
              key={index}
              title={magnet.title}
              description={magnet.description}
              benefits={magnet.benefits}
              downloadUrl={magnet.downloadUrl}
              downloads={magnet.downloads}
              rating={magnet.rating}
            />
          ))}
        </div>

        {/* Infographics */}
        <div className="space-y-16 mb-16">
          <EMSInfographic />
          <PancafitInfographic />
        </div>

        {/* Video Demonstrations */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
            Vedi le Nostre <span className="text-brand-primary">Tecnologie</span> in Azione
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scopri come funzionano i nostri metodi innovativi attraverso video dimostrativi professionali
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {videos.map((video, index) => (
            <VideoPlaceholder 
              key={index}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 border-brand-primary/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-brand-primary mb-4">
              🎯 Hai Trovato la Tua Soluzione?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Se hai domande specifiche o vuoi un programma personalizzato, siamo qui per aiutarti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/393887078662?text=Ciao! Ho scaricato le guide e vorrei maggiori informazioni"
                target="_blank"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                💬 Scrivici su WhatsApp
              </a>
              <a 
                href="/form-contatti"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                📅 Prenota Consulenza Gratuita
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadMagnetSection;