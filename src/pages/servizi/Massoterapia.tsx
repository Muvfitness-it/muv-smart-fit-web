import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, CheckCircle, Sparkles, Heart, Zap, Shield } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { FlexibleHero } from "@/features/hero";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getServiceSchema, getFAQSchema } from "@/utils/seoSchemas";

const Massoterapia = () => {
  const faqs = [
    {
      question: "Che differenza c'è tra massaggio rilassante e decontratturante?",
      answer: "Il massaggio rilassante mira al benessere generale e alla riduzione dello stress con manovre dolci. Il decontratturante utilizza pressioni specifiche per sciogliere tensioni e contratture muscolari."
    },
    {
      question: "Quanto dura una seduta di massoterapia?",
      answer: "Le sedute standard durano 50-60 minuti. Offriamo anche trattamenti più brevi (30 minuti) per zone specifiche o sessioni prolungate (90 minuti) per un relax completo."
    },
    {
      question: "Il massaggio sportivo quando è consigliato?",
      answer: "Il massaggio sportivo è ideale prima delle competizioni (attivante) o dopo l'allenamento (defaticante). Aiuta nel recupero muscolare e nella prevenzione degli infortuni."
    },
    {
      question: "Con che frequenza dovrei fare massoterapia?",
      answer: "Dipende dall'obiettivo: per il mantenimento del benessere 1-2 volte al mese, per problematiche specifiche 1-2 volte a settimana, per atleti anche 2-3 volte settimanali."
    },
    {
      question: "Il linfodrenaggio è doloroso?",
      answer: "No, il linfodrenaggio utilizza manovre molto delicate e rilassanti. È una tecnica specifica per stimolare il sistema linfatico senza causare dolore o fastidio."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a alla massoterapia. Vorrei prenotare un massaggio e conoscere i vostri trattamenti.");

  const structuredData = [
    getServiceSchema("Massoterapia Legnago", "Massoterapia a Legnago: massaggi terapeutici, decontratturanti e rilassanti. Recupero muscolare, riduzione stress e benessere totale.", "https://www.muvfitness.it/servizi/massoterapia"),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Massoterapia Legnago | Massaggio Terapeutico e Benessere – MUV Fitness"
        description="Massoterapia a Legnago: massaggi terapeutici, decontratturanti e rilassanti. Recupero muscolare, riduzione stress e benessere totale. Prenota il tuo trattamento."
        keywords="massoterapia Legnago, massaggio decontratturante, massaggio rilassante, linfodrenaggio, massaggio sportivo, benessere"
        structuredData={structuredData}
      />
      <ServicePageLayout
        title=""
        description=""
        canonical=""
        structuredData={null}
        keywords=""
      >
        <FlexibleHero
          variant="service"
          title="Massoterapia e Benessere"
          description="Recupero muscolare, rilassamento profondo e benessere totale per corpo e mente"
          primaryCTA={{
            text: "Prenota Massaggio",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`
          }}
          secondaryCTA={{
            text: "Contattaci",
            href: "/contatti"
          }}
          breadcrumbs={[
            { text: "Home", href: "/" },
            { text: "Servizi", href: "/servizi" },
            { text: "Massoterapia" }
          ]}
        />

        {/* What is Massage Therapy */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Il Potere del <span className="text-orange-600">Tocco Terapeutico</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  La massoterapia è molto più di un semplice rilassamento. I nostri massoterapisti qualificati 
                  utilizzano tecniche specifiche per accelerare il recupero muscolare, ridurre le tensioni 
                  e migliorare il benessere generale.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Accelera il recupero post-allenamento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Riduce tensioni e contratture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Migliora la circolazione sanguigna</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">Benefici Immediati</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Rilassamento profondo</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Recupero muscolare</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Prevenzione infortuni</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Benessere mentale</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Massage */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Tipologie di <span className="text-orange-600">Massaggio</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Massaggio Decontratturante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Tecnica specifica per sciogliere tensioni muscolari e contratture dovute ad allenamento intenso.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Massaggio Sportivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Preparazione pre-gara e recupero post-allenamento per atleti e sportivi.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Massaggio Rilassante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Riduzione dello stress e tensione generale per un benessere completo.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Linfodrenaggio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Stimolazione del sistema linfatico per ridurre gonfiori e migliorare la circolazione.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Massaggio Miofasciale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Tecniche specifiche per rilasciare le tensioni delle fasce muscolari.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Trigger Point</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Trattamento di punti specifici per eliminare dolori e tensioni localizzate.</p>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="bg-white p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Benefici della Massoterapia</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-600 mb-4">Benefici Fisici</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Riduzione delle tensioni muscolari</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Miglioramento della flessibilità</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Accelerazione del recupero</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Prevenzione degli infortuni</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-600 mb-4">Benefici Mentali</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Riduzione dello stress</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Miglioramento del sonno</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Rilassamento profondo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Benessere generale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Perfect For */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Perfetto Per Te Se...</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Hai tensioni e contratture muscolari</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Pratichi sport intensamente</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Soffri di stress quotidiano</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Vuoi prevenire infortuni</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Quando Prenotare</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Dopo allenamenti intensi</li>
                    <li>• In caso di dolori muscolari</li>
                    <li>• Per il mantenimento del benessere</li>
                    <li>• Prima di competizioni sportive</li>
                    <li>• Per il rilassamento settimanale</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sulla Massoterapia"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Regalati un Momento di Benessere"
          description="Prenota il tuo massaggio terapeutico e senti la differenza sul tuo corpo"
          primaryButton={{
            text: "Prenota Massaggio",
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

export default Massoterapia;