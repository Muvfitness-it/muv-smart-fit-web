import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const AllenamentoEMSLegnago: React.FC = () => {
  const canonical = "https://www.muvfitness.it/allenamento-ems-legnago/";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.muvfitness.it/" },
          { "@type": "ListItem", "position": 2, "name": "Allenamento EMS a Legnago", "item": canonical }
        ]
      },
      {
        "@type": "Service",
        "name": "Allenamento EMS a Legnago",
        "serviceType": "EMS Training",
        "provider": { "@type": "Organization", "name": "MUV Fitness" },
        "areaServed": [
          "Legnago","Cerea","Bovolone","Nogara","Villa Bartolomea","Minerbe","Castagnaro","Badia Polesine"
        ],
        "url": canonical,
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR" }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"Quante sedute EMS a settimana?","acceptedAnswer":{"@type":"Answer","text":"In genere 1–2 sedute sono sufficienti per risultati visibili, in base all’obiettivo e al livello di allenamento."}},
          {"@type":"Question","name":"L’EMS fa dimagrire davvero?","acceptedAnswer":{"@type":"Answer","text":"L’EMS aumenta l’intensità del lavoro muscolare e può supportare il dimagrimento se inserita in un percorso completo con alimentazione adeguata."}},
          {"@type":"Question","name":"È sicura? Chi non può farla?","acceptedAnswer":{"@type":"Answer","text":"È sicura se guidata da professionisti e in assenza di controindicazioni (pacemaker, gravidanza, specifiche patologie). In fase di consulenza faremo uno screening accurato."}},
          {"@type":"Question","name":"Serve un’alimentazione specifica?","acceptedAnswer":{"@type":"Answer","text":"Una nutrizione semplice e bilanciata amplifica i risultati. Forniamo linee guida pratiche, sostenibili e personalizzate."}}
        ]
      }
    ]
  };

  return (
    <>
      <SEOOptimizer
        title="Allenamento EMS a Legnago | Elettrostimolazione con Trainer"
        description="Sedute EMS guidate da professionisti per risultati in tempi ridotti. Dimagrimento, tonificazione e postura in sicurezza. Prova gratuita a Legnago."
        canonicalUrl={canonical}
        structuredData={structuredData}
      />

      <header className="bg-gradient-to-br from-purple-600/20 via-gray-900 to-blue-600/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Allenamento EMS a Legnago (Elettrostimolazione)</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">Risultati in meno tempo con l’elettrostimolazione muscolare: sedute guidate, protocolli personalizzati, massima sicurezza.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contatti"><Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-4 text-lg">Prenota prova EMS</Button></Link>
            <Link to="/personal-trainer-legnago/"><Button variant="outline" className="rounded-full px-8 py-4 text-lg">Personal Trainer</Button></Link>
          </div>
        </div>
      </header>

      <main className="bg-gray-900 text-white">
        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Come funziona l’EMS: benefici e limiti</h2>
          <article className="prose prose-invert max-w-none">
            <p>
              L’EMS (Elettrostimolazione Muscolare) utilizza impulsi elettrici controllati per attivare in profondità i gruppi muscolari durante gli esercizi. In pratica, amplifica lo stimolo prodotto dal movimento, consentendo di ottenere un lavoro intenso in tempi ridotti. È uno strumento molto efficace per chi ha poco tempo e vuole massimizzare il rendimento della seduta.
            </p>
            <p>
              Tra i benefici principali: maggiore attivazione muscolare, miglioramento della forza resistente, incremento della spesa calorica e supporto alla postura grazie al richiamo del core. Tuttavia, l’EMS non sostituisce l’allenamento tradizionale in ogni situazione: è ottima come acceleratore o come ciclo specifico in alcune fasi del percorso, ma va integrata con esercizi di forza e mobilità per risultati completi.
            </p>
          </article>
        </section>

        <section className="bg-gradient-to-r from-purple-600/10 to-blue-600/10">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Per chi è indicato: dimagrimento, performance, poco tempo</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p>
                  Consigliamo l’EMS a chi desidera dimagrire mantenendo la massa magra, a chi ha tempi stretti e a chi necessita di una spinta motivazionale. È indicata anche come richiamo metabolico per atleti e come supporto posturale per chi svolge lavori sedentari. Prima di iniziare, effettuiamo sempre una valutazione per escludere controindicazioni.
                </p>
                <p className="mt-4">
                  Se l’obiettivo principale è la postura o il mal di schiena, suggeriamo di integrare l’EMS con <Link to="/pilates-legnago/" className="text-purple-300 underline">Pilates a Legnago</Link>. Se vuoi un percorso completo di ricomposizione, scopri anche <Link to="/personal-trainer-legnago/" className="text-purple-300 underline">Personal Trainer a Legnago</Link>.
                </p>
              </div>
              <aside className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Caso reale (placeholder)</h3>
                <p>
                  Uomo, 36 anni, poco tempo, obiettivo: ricomposizione corporea. 1 seduta EMS/sett. + 1 seduta forza tradizionale. In 10 settimane: -4,1 kg, +2,3% massa magra, miglior controllo del core e meno dolori cervicali.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">EMS vs allenamento tradizionale: quando scegliere l’uno o l’altro</h2>
          <p className="mb-4">
            L’allenamento tradizionale rimane imprescindibile per sviluppare forza, tecnica e consapevolezza del movimento. L’EMS è perfetta per potenziare il lavoro in periodi di poco tempo o per dare una spinta in fasi specifiche. La scelta migliore è alternarli con criterio: cicli EMS per accelerare i risultati e sedute tradizionali per consolidare forza e postura.
          </p>
          <div className="bg-gray-800 rounded-lg p-6 mt-2">
            <h3 className="text-2xl font-semibold mb-2">Zone servite: Legnago e dintorni</h3>
            <p>
              Serviamo tutto il territorio di Legnago e i comuni limitrofi: Cerea, Bovolone, Nogara, Villa Bartolomea, Minerbe, Castagnaro e Badia Polesine. Studio riservato, tempi ottimizzati, parcheggio comodo.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">Quante sedute EMS a settimana?</h3><p className="text-gray-300 mt-2">Di norma 1–2 sedute sono sufficienti. In casi particolari si lavora in cicli brevi e intensi, monitorando il recupero.</p></div>
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">L’EMS fa dimagrire davvero?</h3><p className="text-gray-300 mt-2">È un ottimo acceleratore se abbinata a forza e nutrizione. I risultati sono rapidi e misurabili.</p></div>
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">È sicura? Chi non può farla?</h3><p className="text-gray-300 mt-2">È sicura se guidata da professionisti e in assenza di controindicazioni. Effettuiamo sempre uno screening iniziale.</p></div>
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">Serve un’alimentazione specifica?</h3><p className="text-gray-300 mt-2">Forniamo indicazioni semplici e personalizzate per massimizzare i risultati e mantenerli.</p></div>
          </div>
          <div className="text-center mt-8"><Link to="/contatti"><Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-4 text-lg">Prenota prova EMS</Button></Link></div>
        </section>

        {/* Approfondimenti EMS */}
        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Protocolli, sicurezza e integrazione con la forza</h2>
          <article className="prose prose-invert max-w-none space-y-4">
            <p>
              Un ciclo tipico prevede 8–12 sedute EMS con progressione dell’intensità e del controllo tecnico. Alterniamo spesso EMS e forza tradizionale: la prima accelera lo stimolo metabolico, la seconda consolida tecnica e carichi. Per chi ha molto poco tempo, 1 seduta EMS/sett. + 1 seduta forza 
              può già produrre risultati misurabili su circonferenze, percezione di tonicità e postura.
            </p>
            <p>
              Sicurezza: prima di iniziare, screening accurato e anamnesi. Evitiamo EMS in presenza di pacemaker, gravidanza o patologie non compatibili. Durante la seduta, monitoriamo sensazioni, respiro e qualità del gesto. L’obiettivo non è “sopportare la scarica”, ma usare lo stimolo in modo intelligente.
            </p>
            <p>
              Cosa aspettarsi: maggiore consapevolezza muscolare, miglior controllo del core, incremento della spesa calorica a parità di tempo. L’EMS non è una scorciatoia magica, ma uno strumento efficace se guidato da un professionista e inserito in un percorso coerente.
            </p>
            <p>
              Nutrizione e recupero: idratazione adeguata, apporto proteico sufficiente, sonno di qualità. Questi pilastri amplificano l’efficacia delle sedute e riducono la fatica percepita.
            </p>
          </article>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Come iniziare</h2>
          <p className="mb-4">Proponiamo una prova guidata gratuita per valutare risposta e obiettivi. I pacchetti EMS sono flessibili e trasparenti; definiamo insieme frequenza e durata in base al risultato desiderato e al tempo disponibile.</p>
          <p className="mb-4">Se vuoi un percorso completo, integra l’EMS con sedute di forza o Pilates in base alla priorità (dimagrimento, postura, performance). Prenota ora: in 2–3 settimane sentirai già la differenza.</p>
        </section>
      </main>

      <div className="fixed bottom-4 inset-x-0 flex justify-center px-4 sm:hidden z-40">
        <Link to="/contatti" className="w-full max-w-sm"><Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-full py-4 text-base">Prenota prova EMS</Button></Link>
      </div>
    </>
  );
};

export default AllenamentoEMSLegnago;
