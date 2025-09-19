import React from 'react';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Target, Users, CheckCircle, Phone, MapPin } from 'lucide-react';
import MUVContactForm from '@/components/contact/MUVContactForm';

const ProvaGratuitaEMS = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Prova Gratuita EMS Legnago",
    "description": "Prova gratuita di allenamento EMS a Legnago. Elettrostimolazione muscolare per dimagrimento rapido e tonificazione.",
    "url": "https://www.muvfitness.it/prova-gratuita-ems",
    "priceCurrency": "EUR",
    "price": "0",
    "availability": "https://schema.org/LimitedAvailability",
    "validThrough": "2024-12-31",
    "offeredBy": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Roma 123",
        "addressLocality": "Legnago",
        "addressRegion": "Veneto",
        "postalCode": "37045",
        "addressCountry": "IT"
      },
      "telephone": "+393491234567"
    }
  };

  const benefits = [
    "Fino a 90% del tempo di allenamento in meno",
    "Stimolazione del 98% delle fibre muscolari",
    "Risultati visibili già dalla 3ª sessione",
    "Basso impatto articolare",
    "Adatto a tutte le età (18+)",
    "Personal trainer dedicato"
  ];

  const faq = [
    {
      question: "La prova gratuita include tutto?",
      answer: "Sì, la prova gratuita include: consulenza iniziale, test posturale, sessione EMS completa di 20 minuti e piano personalizzato."
    },
    {
      question: "Devo portare abbigliamento specifico?",
      answer: "No, forniamo noi tutto il necessario: tuta EMS, calze e asciugamani. Porta solo scarpe da ginnastica pulite."
    },
    {
      question: "Ci sono controindicazioni?",
      answer: "L'EMS è sicuro per la maggior parte delle persone. Durante la consulenza verifichiamo eventuali controindicazioni specifiche."
    }
  ];

  return (
    <ServicePageLayout
      title="Prova Gratuita EMS Legnago - Dimagrimento Rapido | MUV Fitness"
      description="Prenota la tua prova gratuita di allenamento EMS a Legnago. Elettrostimolazione muscolare per dimagrire velocemente. Posti limitati!"
      keywords="prova gratuita EMS Legnago, elettrostimolazione gratuita, dimagrimento rapido Legnago, offerta EMS"
      canonical="https://www.muvfitness.it/prova-gratuita-ems"
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/40" />
        <img
          src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
          alt="Prova Gratuita EMS Legnago"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Offer */}
            <div className="text-white">
              <Badge className="bg-red-600 text-white mb-4 animate-pulse">
                <Clock className="h-4 w-4 mr-2" />
                OFFERTA LIMITATA
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                Prova Gratuita EMS
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 leading-relaxed">
                <strong className="text-orange-300">Dimagrisci con la tecnologia più avanzata</strong>
              </p>
              
              <p className="text-lg mb-8 opacity-90">
                20 minuti di allenamento EMS equivalgono a 4 ore di palestra tradizionale. 
                Scopri il futuro del fitness a Legnago!
              </p>

              <div className="space-y-3 mb-8">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Chiama Ora: 349 123 4567
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <MapPin className="mr-2 h-5 w-5" />
                  Come Arrivare
                </Button>
              </div>

              <div className="text-sm opacity-75">
                <p>📍 Via Roma 123, Legnago (VR)</p>
                <p>⏰ Lun-Ven: 7:00-21:00 | Sab: 8:00-18:00</p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Prenota la Tua Prova Gratuita
                </h2>
                <p className="text-gray-600">
                  Zero impegno. Ti richiamiamo entro 24 ore.
                </p>
                <Badge variant="destructive" className="mt-2">
                  Solo 10 posti disponibili questo mese
                </Badge>
              </div>

              <MUVContactForm 
                campaignName="Prova Gratuita EMS Legnago"
                defaultObjective="Dimagrimento con EMS"
                className="space-y-4"
              />

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>✓ Nessun costo nascosto</p>
                <p>✓ Nessun obbligo di iscrizione</p>
                <p>✓ Consulenza personalizzata inclusa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-lg text-muted-foreground">Risultati reali di persone reali</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <p className="mb-4 italic">
                  "In 6 settimane ho perso 8 kg e la mia schiena non mi fa più male. 
                  L'EMS è incredibile!"
                </p>
                <div className="font-semibold">
                  <p>Laura M., 42 anni</p>
                  <p className="text-sm text-muted-foreground">Impiegata, Legnago</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <p className="mb-4 italic">
                  "20 minuti che valgono ore di palestra. Finalmente un allenamento 
                  che si adatta ai miei tempi!"
                </p>
                <div className="font-semibold">
                  <p>Marco R., 38 anni</p>
                  <p className="text-sm text-muted-foreground">Manager, Verona</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <p className="mb-4 italic">
                  "Dopo il parto pensavo di non riuscire più a tornare in forma. 
                  L'EMS mi ha ridato fiducia!"
                </p>
                <div className="font-semibold">
                  <p>Giulia T., 34 anni</p>
                  <p className="text-sm text-muted-foreground">Mamma, Cerea</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Domande Frequenti</h2>
              <p className="text-lg text-muted-foreground">
                Tutto quello che devi sapere sulla prova gratuita EMS
              </p>
            </div>

            <div className="space-y-6">
              {faq.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground pl-7">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Non Perdere Questa Occasione!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Solo 10 posti disponibili questo mese per la prova gratuita EMS. 
            Prenota ora e inizia la tua trasformazione!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8"
            >
              <Phone className="mr-2 h-5 w-5" />
              PRENOTA ORA: 349 123 4567
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              WhatsApp: Prenota Subito
            </Button>
          </div>

          <p className="text-sm mt-6 opacity-90">
            Disponibilità limitata - Affrettati a prenotare!
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default ProvaGratuitaEMS;