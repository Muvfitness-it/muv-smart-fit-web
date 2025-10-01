import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, CheckCircle, Brain, Heart, TrendingUp, Users, Target } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { FlexibleHero } from "@/features/hero";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getServiceSchema, getFAQSchema } from "@/utils/seoSchemas";

const Nutrizione = () => {
  const faqs = [
    {
      question: "Come funziona la consulenza nutrizionale a Legnago?",
      answer: "La consulenza inizia con un'analisi completa delle tue abitudini alimentari, composizione corporea e obiettivi. Poi creiamo un piano nutrizionale personalizzato con monitoraggio costante."
    },
    {
      question: "Il nutrizionista può aiutarmi a dimagrire?",
      answer: "Sì, il nostro approccio si basa su piani alimentari sostenibili che favoriscono un dimagrimento graduale e duraturo, senza rinunce estreme o effetti yo-yo."
    },
    {
      question: "Quanto costa la consulenza nutrizionale?",
      answer: "Offriamo diverse opzioni: consulenza singola, pacchetti mensili e programmi integrati con l'allenamento. La prima consulenza è gratuita per valutare insieme il percorso migliore."
    },
    {
      question: "Il piano alimentare tiene conto di intolleranze e allergie?",
      answer: "Assolutamente sì. Personalizziamo ogni piano considerando intolleranze, allergie, preferenze alimentari e stile di vita per garantire un percorso sostenibile."
    },
    {
      question: "Quanto tempo serve per vedere i risultati?",
      answer: "I primi cambiamenti si notano già dopo 2-3 settimane. Risultati significativi e duraturi si ottengono in 2-3 mesi con un approccio costante e personalizzato."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a alla consulenza nutrizionale. Vorrei prenotare la consulenza gratuita per conoscere il programma.");

  const structuredData = [
    getServiceSchema("Nutrizionista Legnago", "Consulenza nutrizionale personalizzata a Legnago. Piani alimentari su misura per dimagrimento, aumento massa muscolare e benessere generale.", "https://www.muvfitness.it/servizi/nutrizione"),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Nutrizionista Legnago | Consulenza Alimentare MUV Fitness"
        description="Nutrizionista a Legnago: piani alimentari personalizzati per dimagrimento, massa muscolare e benessere. Consulenza gratuita. Approccio sostenibile."
        keywords="nutrizionista Legnago, consulenza nutrizionale, dieta personalizzata, dimagrimento, alimentazione sana, dietologo Verona"
        structuredData={structuredData}
      />
      <ServicePageLayout
        title=""
        description=""
        keywords=""
        canonical=""
        structuredData={null}
      >
        <FlexibleHero
          variant="service"
          title="Nutrizionista Legnago"
          description="Alimentazione personalizzata per raggiungere i tuoi obiettivi di salute e forma fisica"
          primaryCTA={{
            text: "Consulenza Gratuita",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`
          }}
          secondaryCTA={{
            text: "Contattaci",
            href: "/contatti"
          }}
          breadcrumbs={[
            { text: "Home", href: "/" },
            { text: "Servizi", href: "/servizi" },
            { text: "Nutrizione" }
          ]}
        />

        {/* Approccio Nutrizionale */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Il Nostro <span className="text-orange-600">Approccio Nutrizionale</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Non crediamo nelle diete estreme o temporanee. Il nostro metodo si basa sull'educazione 
                  alimentare e sulla creazione di abitudini sostenibili che ti accompagneranno per tutta la vita. 
                  Ogni piano è studiato su misura per te, considerando i tuoi gusti, stile di vita e obiettivi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Piani alimentari completamente personalizzati</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Educazione nutrizionale per l'autonomia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Monitoraggio costante e adattamenti</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Integrazione con il programma di allenamento</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">I Nostri Valori</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Apple className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Sostenibilità</p>
                    <p className="text-sm text-gray-500">A lungo termine</p>
                  </div>
                  <div className="text-center">
                    <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Educazione</p>
                    <p className="text-sm text-gray-500">Alimentare</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Benessere</p>
                    <p className="text-sm text-gray-500">Completo</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Risultati</p>
                    <p className="text-sm text-gray-500">Misurabili</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servizi Nutrizionali */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              I Nostri <span className="text-orange-600">Servizi Nutrizionali</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Dimagrimento Sostenibile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Piani per perdere peso in modo graduale e duraturo, senza rinunce estreme o effetti yo-yo.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Aumento Massa Muscolare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Alimentazione specifica per supportare la crescita muscolare e ottimizzare i risultati dell'allenamento.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Ricomposizione Corporea</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Strategie nutrizionali per perdere grasso e aumentare la massa magra contemporaneamente.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Alimentazione Sportiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Piani specifici per atleti e sportivi per ottimizzare performance e recupero.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Gestione Patologie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Supporto nutrizionale per diabete, ipertensione, colesterolo alto e altre condizioni metaboliche.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Educazione Alimentare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Workshop e consulenze per imparare a mangiare in modo consapevole e bilanciato.</p>
                </CardContent>
              </Card>
            </div>

            {/* Processo Consulenza */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Il Nostro <span className="text-orange-600">Percorso</span>
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Valutazione Iniziale</h4>
                <p className="text-sm text-gray-600">Analisi completa di abitudini, composizione corporea e obiettivi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Piano Personalizzato</h4>
                <p className="text-sm text-gray-600">Creazione del piano alimentare su misura per te</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Monitoraggio</h4>
                <p className="text-sm text-gray-600">Controlli regolari e adattamenti del piano</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Autonomia</h4>
                <p className="text-sm text-gray-600">Educazione per mantenere i risultati nel tempo</p>
              </div>
            </div>

            {/* Cosa Include */}
            <div className="bg-gray-50 p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Cosa Include la Consulenza</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Analisi della composizione corporea</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Piano alimentare personalizzato</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Lista della spesa settimanale</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Ricette e menu giornalieri</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Supporto via WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Adattamenti del piano</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Educazione nutrizionale</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Integrazione con l'allenamento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sul Nutrizionista a Legnago"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Inizia la Tua Trasformazione Alimentare"
          description="Prenota una consulenza nutrizionale gratuita e scopri come raggiungere i tuoi obiettivi con un approccio sostenibile"
          primaryButton={{
            text: "Consulenza Gratuita",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`,
            isExternal: true
          }}
          secondaryButton={{
            text: "Chiama Ora",
            href: "/contatti"
          }}
          contactInfo="📞 347 1234567"
          locationInfo="📍 Viale dei Tigli 14, Legnago (VR) | Servizio per Legnago, Cerea, Bovolone, San Bonifacio"
        />
      </ServicePageLayout>
    </>
  );
};

export default Nutrizione;