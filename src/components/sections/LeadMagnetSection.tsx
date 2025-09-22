import React from 'react';
import LeadMagnetCard from '@/components/leadmagnet/LeadMagnetCard';
import VideoPlaceholder from '@/components/media/VideoPlaceholder';
import { Card, CardContent } from '@/components/ui/card';

const LeadMagnetSection: React.FC = () => {
  const leadMagnets = [
    {
      title: "7 Segreti per Dimagrire Velocemente",
      description: "Scopri i metodi più efficaci per perdere peso in modo sano e duraturo con il nostro approccio scientifico.",
      benefits: [
        "7 strategie comprovate per dimagrire",
        "Piano alimentare bilanciato",
        "Consigli per accelerare il metabolismo",
        "Tecniche di allenamento mirate",
        "Come mantenere i risultati nel tempo"
      ],
      downloadUrl: "/guide/7-segreti-per-dimagrire.pdf",
      downloads: 2847,
      rating: 4.9
    },
    {
      title: "Accelera i Tuoi Risultati in Palestra", 
      description: "Guida completa per massimizzare i risultati del tuo allenamento e raggiungere i tuoi obiettivi più velocemente.",
      benefits: [
        "Tecniche di allenamento avanzate",
        "Protocolli per forza e resistenza",
        "Ottimizzazione del recupero",
        "Programmazione dell'allenamento",
        "Consigli nutrizionali per il fitness"
      ],
      downloadUrl: "/guide/accelera-i-tuoi-risultati-in-palestra.pdf",
      downloads: 1567,
      rating: 5.0
    },
    {
      title: "Fitness Smart: Allena Corpo e Mente",
      description: "Approccio olistico al fitness che combina allenamento fisico, benessere mentale e stile di vita sano.",
      benefits: [
        "Programma di allenamento completo",
        "Tecniche di mindfulness per sportivi",
        "Gestione dello stress attraverso il movimento",
        "Equilibrio vita-allenamento",
        "Motivazione e obiettivi sostenibili"
      ],
      downloadUrl: "/guide/7-segreti-per-dimagrire.pdf",
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