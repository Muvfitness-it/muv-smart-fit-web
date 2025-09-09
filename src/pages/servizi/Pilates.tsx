import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle, Flower, Flame, Heart, Users } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { ServiceHeroSection } from "@/components/layouts/ServiceHeroSection";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getServiceSchema, getFAQSchema } from "@/utils/seoSchemas";
import PilatesInfographic from "@/components/infographics/PilatesInfographic";

const Pilates = () => {
  const faqs = [
    {
      question: "Cos'è il Pilates Reformer e come funziona?",
      answer: "Il Reformer è il macchinario originale ideato da Joseph Pilates. Utilizza un sistema di molle e cavi che permette di eseguire movimenti fluidi e controllati, adattandosi perfettamente alle capacità di ogni persona."
    },
    {
      question: "È adatto ai principianti il Pilates Reformer?",
      answer: "Assolutamente sì. Il Reformer si adatta a tutti i livelli, dai principianti agli esperti. Gli esercizi possono essere modificati e personalizzati secondo le capacità individuali."
    },
    {
      question: "Che differenza c'è tra lezione individuale e small group?",
      answer: "Le lezioni individuali offrono attenzione dedicata al 100% e programmi completamente personalizzati. Lo small group (2-3 persone) mantiene l'attenzione personalizzata ma con energia motivante del gruppo."
    },
    {
      question: "Quanto tempo serve per vedere i risultati?",
      answer: "I primi benefici si sentono già dalle prime sessioni. Miglioramenti posturali e di flessibilità sono visibili in 2-3 settimane, mentre i cambiamenti di tonificazione in 4-6 settimane."
    },
    {
      question: "Il Pilates Reformer aiuta con il mal di schiena?",
      answer: "Sì, è particolarmente efficace per il mal di schiena. Rafforza il core, migliora la postura e allunga i muscoli in modo controllato, riducendo tensioni e dolori."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a al Pilates Reformer. Vorrei prenotare una lezione di prova per conoscere il programma.");

  const structuredData = [
    getServiceSchema("Pilates Reformer Legnago", "Pilates con Reformer a Legnago: lezioni individuali e small group su macchinari professionali. Tonificazione, flessibilità e postura perfetta.", "https://www.muvfitness.it/servizi/pilates"),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Pilates Reformer Legnago | Lezioni Individuali e Small Group – MUV Fitness"
        description="Pilates con Reformer a Legnago: lezioni individuali e small group su macchinari professionali. Tonificazione, flessibilità e postura perfetta. Prenota la tua lezione."
        keywords="pilates reformer Legnago, pilates macchinari, tonificazione, flessibilità, postura, lezioni individuali"
        structuredData={structuredData}
      />
      <ServicePageLayout
        title=""
        description=""
        canonical=""
        structuredData={null}
        keywords=""
      >
        <ServiceHeroSection
          title="Pilates con Reformer"
          description="Il metodo originale Pilates su macchinari professionali per un corpo tonico e flessibile"
          primaryButton={{
            text: "Prenota Lezione di Prova",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`,
            isExternal: true
          }}
          secondaryButton={{
            text: "Contattaci",
            href: "/contatti"
          }}
          breadcrumbs={[
            { text: "Home", href: "/" },
            { text: "Servizi", href: "/servizi" },
            { text: "Pilates Reformer" }
          ]}
        />

        {/* Pilates Infographic */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PilatesInfographic />
          </div>
        </section>

        {/* What is Pilates Reformer */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Il Vero <span className="text-orange-600">Pilates Reformer</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Il Reformer è il macchinario originale ideato da Joseph Pilates. Utilizza un sistema di molle 
                  e cavi che permette di eseguire movimenti fluidi e controllati, adattandosi perfettamente 
                  alle capacità di ogni persona.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Allenamento a basso impatto ma alta intensità</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Sviluppo della forza profonda del core</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Miglioramento posturale e flessibilità</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">Benefici Unici</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Flower className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Corpo più lungo e snello</span>
                  </div>
                  <div className="flex items-center">
                    <Flame className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Tonificazione senza volume</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Miglioramento della postura</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Equilibrio e coordinazione</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perché Scegliere il <span className="text-orange-600">Pilates Reformer</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Tonificazione Profonda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Lavora su tutti i gruppi muscolari in modo equilibrato, creando un fisico tonico ma elegante.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Flessibilità Aumentata</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Allunga e rafforza i muscoli contemporaneamente per un corpo più flessibile e funzionale.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Core Stability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Rinforza il "powerhouse" del corpo migliorando stabilità e controllo motorio.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Riabilitazione Sicura</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Ideale per il recupero da infortuni e la prevenzione di problematiche fisiche.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Mente-Corpo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Connessione profonda tra movimento, respirazione e concentrazione mentale.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Risultati Duraturi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Cambiamenti posturali e di forza che si mantengono nel tempo.</p>
                </CardContent>
              </Card>
            </div>

            {/* Perfect For */}
            <div className="bg-gray-50 p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Perfetto Per...</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Donne che vogliono tonificare senza "ingrossare"</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Chi soffre di mal di schiena cronico</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Atleti che vogliono migliorare le performance</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Over 50 che cercano un movimento sicuro ed efficace</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Riabilitazione post-infortunio o post-parto</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Chi cerca equilibrio tra mente e corpo</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Types of Lessons */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Lezioni Individuali</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Programma completamente personalizzato</li>
                    <li>• Attenzione dedicata al 100%</li>
                    <li>• Progressione adattata alle tue capacità</li>
                    <li>• Ideale per principianti o esigenze specifiche</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Small Group (2-3 persone)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Energia motivante del gruppo</li>
                    <li>• Costi più contenuti</li>
                    <li>• Attenzione comunque personalizzata</li>
                    <li>• Perfetto per amiche o coppie</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sul Pilates Reformer"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Scopri il Pilates Autentico"
          description="Prenota una lezione di prova e scopri come il Reformer può trasformare il tuo corpo"
          primaryButton={{
            text: "Prenota Lezione di Prova",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`,
            isExternal: true
          }}
          secondaryButton={{
            text: "Contattaci",
            href: "/contatti"
          }}
        />
      </ServicePageLayout>
    </>
  );
};

export default Pilates;