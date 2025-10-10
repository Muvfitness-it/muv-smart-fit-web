
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
      
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600/20 via-gray-900 to-red-600/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <Users className="w-16 h-16 text-orange-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Corsi <span className="text-orange-600">Small Group</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Allenamenti di gruppo con massimo 12 partecipanti - Attenzione personalizzata e motivazione di gruppo
          </p>
          <Link to="/contatti">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full">
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
                Allenati con l'<span className="text-orange-600">Energia del Gruppo</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                I nostri corsi Small Group combinano l'attenzione personalizzata con la motivazione 
                di gruppo. Con massimo 12 persone per sessione, ogni partecipante riceve la giusta attenzione 
                mentre si allena in un ambiente energico, stimolante e inclusivo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>8 tipologie diverse di corsi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Attenzione personalizzata (max 12 persone)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <span>Motivazione e risultati di gruppo</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">I Nostri Corsi</h3>
              <div className="space-y-3 text-sm">
                {courses.map((course, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded">
                    <course.icon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">{course.name}</div>
                      <div className="text-gray-400 text-xs">{course.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Schedule */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Orari <span className="text-orange-600">Corsi Settimanali</span>
            </h2>
            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
              Consulta il nostro planning settimanale aggiornato. Trova il corso perfetto per i tuoi orari!
            </p>
            
            <WeeklySchedulePlanner />
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-400 mb-4">
                💡 Vuoi prenotare un corso? Contattaci subito!
              </p>
              <Link to="/contatti">
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  Prenota il Tuo Posto
                </Button>
              </Link>
            </div>
          </section>

          {/* Benefits */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché Scegliere i Nostri <span className="text-orange-600">Corsi Small Group</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">Varietà di Allenamenti</h3>
                <p className="text-gray-300">8 tipologie diverse di corsi per non annoiarsi mai e allenare il corpo in modo completo ed equilibrato.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Motivazione di Gruppo</h3>
                <p className="text-gray-300">L'energia del gruppo ti spinge oltre i tuoi limiti, rendendo ogni sessione stimolante e divertente.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-400">Attenzione Personalizzata</h3>
                <p className="text-gray-300">Con massimo 12 persone, ogni partecipante riceve la corretta attenzione e correzione posturale.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Per Tutti i Livelli</h3>
                <p className="text-gray-300">Dai principianti agli avanzati, ogni corso è adattabile al tuo livello di preparazione fisica.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Istruttori Qualificati</h3>
                <p className="text-gray-300">Team di professionisti certificati che ti guidano con competenza e passione.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Orari Flessibili</h3>
                <p className="text-gray-300">Corsi disponibili in diversi orari della settimana per adattarsi ai tuoi impegni.</p>
              </CardContent>
            </Card>
          </div>

          {/* Workout Structure */}
          <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 p-8 rounded-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Come Funziona una Sessione</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Warm-Up</h4>
                <p className="text-gray-300 text-sm">Riscaldamento dinamico per preparare il corpo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">HIIT Cardio</h4>
                <p className="text-gray-300 text-sm">Intervalli ad alta intensità per il sistema cardiovascolare</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Strength</h4>
                <p className="text-gray-300 text-sm">Esercizi di forza funzionale</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Cool Down</h4>
                <p className="text-gray-300 text-sm">Defaticamento e stretching</p>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Perfetto Per Te Se...</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Ami le sfide e l'adrenalina</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Vuoi dimagrire velocemente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Cerchi motivazione extra</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <span>Hai poco tempo disponibile</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Risultati Tipici</h3>
              <ul className="space-y-2 text-gray-300">
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
          <div className="text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 p-8 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Sfida Te Stesso in Gruppo!</h3>
            <p className="text-lg text-gray-300 mb-6">Unisciti al nostro HIIT Small Group e scopri di cosa sei capace</p>
            <Link to="/contatti">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full">
                Prenota Sessione HIIT
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
