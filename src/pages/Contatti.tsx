import { useState, useEffect } from "react";
import ContactInfo from "@/components/contact/ContactInfo";
import { UnifiedContactForm } from "@/features/forms";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import BreadcrumbNavigation from "@/components/SEO/BreadcrumbNavigation";
import { getLocalBusinessSchema, getFAQSchema } from "@/utils/seoSchemas";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail } from "lucide-react";

console.log('Contatti page loading...');

const Contatti = () => {
  // FAQ dinamiche da Supabase con fallback
  const [faqs, setFaqs] = useState([
    {
      question: "Dove si trova MUV Fitness?",
      answer: "MUV Fitness si trova in Piazzetta Don Walter Soave 2 a Legnago (VR). Siamo facilmente raggiungibili dal centro città e disponiamo di parcheggio."
    },
    {
      question: "Quali sono gli orari di apertura?",
      answer: "Siamo aperti dal lunedì al venerdì dalle 08:00 alle 21:00, il sabato dalle 8:00 alle 12:00. La domenica su appuntamento per servizi specifici."
    },
    {
      question: "Come posso prenotare una consulenza gratuita?",
      answer: "Puoi prenotare chiamando il 329 107 0374, inviando una email a info@muvfitness.it o compilando il form di contatto sul sito."
    }
  ]);

  // Carica FAQ dinamiche da Supabase
  useEffect(() => {
    const fetchFAQs = async () => {
      const { data } = await supabase
        .from('contact_faqs')
        .select('question, answer')
        .eq('is_active', true)
        .order('order_index');
      
      if (data && data.length > 0) {
        setFaqs(data);
      }
    };
    fetchFAQs();
  }, []);

  // Structured Data con ContactPoint
  const structuredData = [
    getLocalBusinessSchema(),
    getFAQSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "MUV Fitness",
        "telephone": "+39-329-107-0374",
        "contactType": "Customer Service",
        "availableLanguage": "Italian",
        "areaServed": "Legnago, Verona"
      }
    }
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Contatta MUV Fitness Legnago – Richiedi Prova Gratuita e Trasformazione Corpo"
        description="Contatta MUV Fitness a Legnago (Piazzetta Don Walter Soave 2). Consulenza gratuita, personal training EMS, Pilates Reformer, nutrizione. Ti richiamiamo in 10 minuti!"
        keywords="contatti muv fitness legnago, richiedi prova gratuita legnago, personal trainer legnago contatti, palestra piazzetta don walter soave, prenotazione ems legnago"
        structuredData={structuredData}
      />
      
      <BreadcrumbNavigation />
      
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2 leading-tight text-foreground">
              Trasforma il tuo corpo in 30 giorni
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed mb-6">
              <strong className="text-primary">Consulenza gratuita</strong> senza impegno. 
              Ti richiamiamo entro 10 minuti negli orari di apertura.
            </p>
            
            <div className="bg-primary/20 border border-primary/30 rounded-lg p-4 inline-block mb-6">
              <p className="text-foreground text-base md:text-lg font-medium">
                🔥 <strong>127+ trasformazioni completate</strong> quest'anno
              </p>
            </div>
          </header>
          
          {/* Info Rapide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-6 rounded-xl text-white text-center shadow-xl hover:scale-105 transition-transform">
              <MapPin className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Vieni a Trovarci</h3>
              <p className="text-sm">Piazzetta Don Walter Soave, 2<br/>37045 Legnago (VR)</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-xl text-white text-center shadow-xl hover:scale-105 transition-transform">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Chiamaci Ora</h3>
              <a href="tel:+393291070374" className="text-lg font-bold hover:underline">
                329 107 0374
              </a>
              <p className="text-xs mt-1">Lun-Ven 08:00-21:00</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-xl text-white text-center shadow-xl hover:scale-105 transition-transform">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Scrivici</h3>
              <a href="mailto:info@muvfitness.it" className="text-sm hover:underline break-all">
                info@muvfitness.it
              </a>
              <p className="text-xs mt-1">Risposta in 24h</p>
            </div>
          </div>
          
          {/* Pulsanti CTA principali */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
            <a 
              href="https://wa.me/393291070374"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl min-h-[64px] focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
            >
              💬 SCRIVICI SU WHATSAPP
            </a>
            <a
              href="tel:+393291070374"
              className="bg-card text-foreground hover:bg-muted px-8 py-5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[64px] text-lg shadow-xl border border-border"
              aria-label="Chiamaci al 329 107 0374"
            >
              📞 CHIAMACI ORA
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <UnifiedContactForm 
              campaign="Contatti MUV Fitness"
              source="contatti-page"
              className="lg:col-span-1"
              enableAIData={true}
            />
            <ContactInfo />
          </div>
          
          {/* Mini-FAQ per contatti - Espanse */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">Domande frequenti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.slice(3, 9).map((faq, index) => (
                <div key={index} className="text-center p-6 bg-muted rounded-lg border border-border hover:border-primary transition-colors">
                  <h3 className="text-lg font-bold mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Sticky CTA */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-600 to-purple-600 p-4 shadow-2xl z-50 animate-fade-in">
            <div className="flex gap-2">
              <a 
                href="https://wa.me/393291070374"
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold text-center hover:bg-green-700 transition-colors"
                aria-label="Contattaci su WhatsApp"
              >
                💬 WhatsApp
              </a>
              <a 
                href="tel:+393291070374"
                className="flex-1 bg-white text-gray-900 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
                aria-label="Chiamaci ora"
              >
                📞 Chiama
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contatti;
