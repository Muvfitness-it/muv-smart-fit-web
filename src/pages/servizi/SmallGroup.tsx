
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Heart, Zap, Target, TrendingUp, Activity, Flame, Music, Dumbbell } from "lucide-react";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getServiceSchema, getFAQSchema } from "@/utils/seoSchemas";
import { WeeklySchedulePlanner } from "@/components/small-group/WeeklySchedulePlanner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const SmallGroup = () => {
  const { isAdmin } = useAdminAuth();

  const faqs = [
    {
      question: "Quante persone al massimo in un HIIT Small Group?",
      answer: "Massimo 3 persone per sessione per garantire attenzione personalizzata mantenendo l'energia motivante del gruppo."
    },
    {
      question: "È adatto ai principianti l'HIIT Small Group?",
      answer: "Sì, ogni esercizio viene adattato al livello dei partecipanti. Il trainer personalizza intensità e movimenti per tutti."
    },
    {
      question: "Quanto dura una sessione HIIT Small Group?",
      answer: "Ogni sessione dura 45 minuti: 10 minuti riscaldamento, 25 minuti HIIT intenso, 10 minuti defaticamento e stretching."
    },
    {
      question: "Posso partecipare con amici o familiari?",
      answer: "Assolutamente sì! È perfetto per allenarsi con amici, partner o familiari condividendo motivazione e divertimento."
    }
  ];

  const courses = [
    { name: 'Postural Pilates', icon: Activity, description: 'Pilates posturale per migliorare allineamento e flessibilità', duration: '60 min', level: 'Tutti i livelli' },
    { name: 'Pancafit', icon: Heart, description: 'Allungamento muscolare globale per benessere e postura', duration: '60 min', level: 'Tutti i livelli' },
    { name: 'Ginnastica Dolce', icon: Heart, description: 'Esercizi a basso impatto per mobilità e benessere', duration: '60 min', level: 'Principiante' },
    { name: 'Total Body', icon: Dumbbell, description: 'Allenamento completo per tonificare tutto il corpo', duration: '60 min', level: 'Intermedio' },
    { name: 'Music Pump', icon: Music, description: 'Workout con bilanciere a ritmo di musica', duration: '60 min', level: 'Intermedio' },
    { name: 'GAG', icon: Flame, description: 'Gambe, addome e glutei per tonificazione mirata', duration: '60 min', level: 'Tutti i livelli' },
    { name: 'Funzionale', icon: Target, description: 'Allenamento funzionale per forza e agilità', duration: '60 min', level: 'Intermedio' },
    { name: 'Tabata', icon: Zap, description: 'HIIT ad alta intensità con intervalli brevi', duration: '45 min', level: 'Avanzato' }
  ];

  const structuredData = [
    getServiceSchema("Corsi Small Group Legnago", "Corsi fitness in piccoli gruppi a Legnago: Postural Pilates, Pancafit, Ginnastica Dolce, Total Body, Music Pump, GAG, Funzionale, Tabata. Massimo 12 persone.", "https://www.muvfitness.it/servizi/small-group"),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Corsi Small Group Legnago | Pilates, Pancafit, GAG, Total Body – MUV Fitness"
        description="Corsi fitness in piccoli gruppi a Legnago: Postural Pilates, Pancafit, Ginnastica Dolce, Total Body, Music Pump, GAG, Funzionale, Tabata. Max 12 persone per attenzione personalizzata."
        keywords="corsi small group legnago, pilates gruppo legnago, pancafit legnago, gag total body verona, corsi fitness piccoli gruppi"
        structuredData={structuredData}
      />
      
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Users className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Corsi <span className="text-primary">Small Group</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Allenamenti di gruppo con massimo 12 partecipanti - Attenzione personalizzata e motivazione di gruppo
          </p>
          <Link to="/contatti">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full">
              Prenota il Tuo Corso
            </Button>
          </Link>
        </div>
      </section>

      {/* What is HIIT Small Group */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Allenati con l'<span className="text-primary">Energia del Gruppo</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                I nostri corsi Small Group combinano l'attenzione personalizzata con la motivazione 
                di gruppo. Con massimo 12 persone per sessione, ogni partecipante riceve la giusta attenzione 
                mentre si allena in un ambiente energico, stimolante e inclusivo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                  <span>8 tipologie diverse di corsi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                  <span>Attenzione personalizzata (max 12 persone)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                  <span>Motivazione e risultati di gruppo</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-center mb-6">I Nostri Corsi</h3>
              <div className="space-y-3 text-sm">
                {courses.map((course, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded border border-gray-100">
                    <course.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">{course.name}</div>
                      <div className="text-muted-foreground text-xs">{course.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Schedule */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Orari <span className="text-primary">Corsi Settimanali</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Consulta il nostro planning settimanale aggiornato. Trova il corso perfetto per i tuoi orari!
            </p>
            
            <WeeklySchedulePlanner />
            
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                💡 Vuoi prenotare un corso? Contattaci subito!
              </p>
              <Link to="/contatti">
                <Button className="bg-primary hover:bg-primary/90">
                  Prenota il Tuo Posto
                </Button>
              </Link>
            </div>
          </section>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché Scegliere i Nostri <span className="text-primary">Corsi Small Group</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Varietà di Allenamenti</h3>
                <p className="text-muted-foreground">8 tipologie diverse di corsi per non annoiarsi mai e allenare il corpo in modo completo ed equilibrato.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Motivazione di Gruppo</h3>
                <p className="text-muted-foreground">L'energia del gruppo ti spinge oltre i tuoi limiti, rendendo ogni sessione stimolante e divertente.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Attenzione Personalizzata</h3>
                <p className="text-muted-foreground">Con massimo 12 persone, ogni partecipante riceve la corretta attenzione e correzione posturale.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-secondary/30 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-secondary">Per Tutti i Livelli</h3>
                <p className="text-muted-foreground">Dai principianti agli avanzati, ogni corso è adattabile al tuo livello di preparazione fisica.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-secondary/30 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-secondary">Istruttori Qualificati</h3>
                <p className="text-muted-foreground">Team di professionisti certificati che ti guidano con competenza e passione.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-accent">Orari Flessibili</h3>
                <p className="text-muted-foreground">Corsi disponibili in diversi orari della settimana per adattarsi ai tuoi impegni.</p>
              </CardContent>
            </Card>
          </div>

          {/* Workout Structure */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg border-2 border-gray-200 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Come Funziona una Sessione</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Warm-Up</h4>
                <p className="text-muted-foreground text-sm">Riscaldamento dinamico per preparare il corpo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">HIIT Cardio</h4>
                <p className="text-muted-foreground text-sm">Intervalli ad alta intensità per il sistema cardiovascolare</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Strength</h4>
                <p className="text-muted-foreground text-sm">Esercizi di forza funzionale</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Cool Down</h4>
                <p className="text-muted-foreground text-sm">Defaticamento e stretching</p>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-primary mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Ami le sfide e l'adrenalina</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Vuoi dimagrire velocemente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Cerchi motivazione extra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Hai poco tempo disponibile</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-secondary mb-4">Risultati Tipici</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Dimagrimento accelerato (3-5kg/mese)</li>
                <li>• Miglioramento resistenza cardiovascolare</li>
                <li>• Aumento forza e potenza</li>
                <li>• Maggiore fiducia in se stessi</li>
                <li>• Divertimento e socializzazione</li>
                <li>• Abitudini di allenamento solide</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg border-2 border-gray-200">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Sfida Te Stesso in Gruppo!</h3>
            <p className="text-lg text-muted-foreground mb-6">Unisciti ai nostri Corsi Small Group e scopri di cosa sei capace</p>
            <Link to="/contatti">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full">
                Prenota il Tuo Corso
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default SmallGroup;
