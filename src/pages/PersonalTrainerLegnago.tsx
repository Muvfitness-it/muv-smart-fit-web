import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const PersonalTrainerLegnago: React.FC = () => {
  const canonical = "https://www.muvfitness.it/personal-trainer-legnago/";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.muvfitness.it/" },
          { "@type": "ListItem", "position": 2, "name": "Personal Trainer a Legnago", "item": canonical }
        ]
      },
      {
        "@type": "Service",
        "name": "Personal Trainer a Legnago",
        "serviceType": "Personal Training",
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
          {
            "@type": "Question",
            "name": "Quanto costa un personal trainer a Legnago?",
            "acceptedAnswer": {"@type": "Answer","text": "Il costo varia in base alla frequenza e alla durata delle sedute. Offriamo pacchetti personalizzati e una prima consulenza gratuita per definire il percorso più adatto al tuo obiettivo."}
          },
          {
            "@type": "Question",
            "name": "Quante sedute a settimana servono per dimagrire?",
            "acceptedAnswer": {"@type": "Answer","text": "In media consigliamo 2–3 sedute a settimana, integrate da un piano nutrizionale semplice e sostenibile. Il protocollo viene sempre adattato alle tue esigenze di tempo."}
          },
          {
            "@type": "Question",
            "name": "Posso allenarmi in coppia?",
            "acceptedAnswer": {"@type": "Answer","text": "Sì, è possibile allenarsi in coppia con programmi dedicati. È una formula motivante e più conveniente senza perdere qualità e personalizzazione."}
          },
          {
            "@type": "Question",
            "name": "È adatto se ho poco tempo?",
            "acceptedAnswer": {"@type": "Answer","text": "Assolutamente sì. I nostri protocolli sono pensati per ottenere risultati misurabili anche con 60–90 minuti a settimana, grazie a progressioni mirate."}
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOOptimizer
        title="Personal Trainer a Legnago | Dimagrimento & Forza con MUV Fitness"
        description="Allenamenti 1-to-1 con trainer qualificati. Programmi su misura per dimagrire, tonificare e stare meglio. Prenota la consulenza gratuita a Legnago (VR)."
        canonicalUrl={canonical}
        structuredData={structuredData}
      />

      <header className="bg-gradient-to-br from-pink-600/20 via-gray-900 to-purple-600/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Personal Trainer a Legnago</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Programmi personalizzati di dimagrimento, forza e ricomposizione corporea. Metodo MUV: valutazione iniziale, progressi settimanali e risultati reali.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contatti"><Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 py-4 text-lg">Prenota consulenza gratuita</Button></Link>
            <Link to="/allenamento-ems-legnago/"><Button variant="outline" className="rounded-full px-8 py-4 text-lg">Scopri EMS</Button></Link>
          </div>
        </div>
      </header>

      <main className="bg-gray-900 text-white">
        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Programmi personalizzati: dimagrimento, forza, ricomposizione</h2>
          <article className="prose prose-invert max-w-none">
            <p>
              Lavorare con un personal trainer a Legnago significa affidarsi a un professionista che costruisce un percorso su misura, calibrato sul tuo livello attuale, sul tempo realmente a disposizione e sugli obiettivi che vuoi raggiungere. Nel nostro studio MUV Fitness, ogni programma nasce da una valutazione oggettiva – misurazioni iniziali, analisi posturale e test di forza – e prosegue con una progressione chiara settimana dopo settimana. Due persone con lo stesso obiettivo non seguono mai lo stesso protocollo: la personalizzazione riguarda volumi, intensità, frequenza, selezione degli esercizi e strategie di recupero.
            </p>
            <p>
              Se il tuo obiettivo è il dimagrimento, impostiamo un mix di lavoro metabolico e forza, con esercizi multiarticolari e circuiti mirati a massimizzare la spesa energetica conservando la massa magra. Per la ricomposizione corporea combiniamo cicli di ipertrofia con fasi di richiamo metabolico, mentre per la forza pura utilizziamo progressioni a carico crescente, cura della tecnica e una periodizzazione semplice da seguire. Ogni seduta ha un obiettivo misurabile e si integra con indicazioni nutrizionali pragmatiche – niente di complicato: abitudini sostenibili che funzionano nel mondo reale.
            </p>
            <p>
              Lavoriamo con clienti di tutte le età e livelli: principiante assoluto, chi riprende dopo uno stop, chi vuole tornare in forma dopo una gravidanza, chi desidera migliorare performance e postura. Il nostro approccio è concreto: niente promesse miracolose, ma una guida precisa, feedback costanti e risultati tracciati. In media, chi inizia un percorso con noi percepisce più energia in 2–3 settimane, una riduzione delle circonferenze entro il primo mese e un miglioramento posturale progressivo.
            </p>
          </article>
        </section>

        <section className="bg-gradient-to-r from-pink-600/10 to-purple-600/10">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Metodo MUV: valutazione iniziale e progressi settimana per settimana</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">1) Valutazione e obiettivi SMART</h3>
                <p>
                  La prima seduta è dedicata alla valutazione: anamnesi, misurazioni, mobilità articolare, schemi motori essenziali e postura. Definiamo obiettivi specifici, misurabili e realistici, con un orizzonte temporale chiaro e un piano di allenamento calibrato in base al tuo stile di vita.
                </p>
                <h3 className="text-2xl font-semibold mt-6 mb-2">2) Programmazione semplice e sostenibile</h3>
                <p>
                  Prediligiamo schemi efficaci e ripetibili: pochi esercizi fondamentali eseguiti bene, con un carico e un volume che salgono in modo graduale. Inseriamo il giusto recupero, anche tramite tecniche di mobilità e respirazione, e suggeriamo routine brevi da svolgere a casa per accelerare i risultati.
                </p>
                <h3 className="text-2xl font-semibold mt-6 mb-2">3) Monitoraggio e adattamenti</h3>
                <p>
                  Ogni 2–3 settimane rivediamo i carichi, la tecnica, la resa metabolica e la risposta soggettiva. Se necessario, ottimizziamo le progressioni, modifichiamo frequenza o durata e aggiorniamo la parte nutrizionale per mantenere alta l’aderenza.
                </p>
              </div>
              <aside className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Caso reale (placeholder)</h3>
                <p>
                  Donna, 42 anni, poco tempo a disposizione, obiettivo: -6 kg e meno mal di schiena. 2 sedute/sett. da 45’ + 1 micro-routine a casa. Risultati in 8 settimane: -5,2 kg, circonferenza vita -6 cm, dolore lombare ridotto, postura migliorata. Protocollo calibrato su agenda lavorativa e famiglia.
                </p>
                <p className="mt-3 text-sm text-gray-300">Nota: i risultati variano in base al punto di partenza e alla costanza del percorso.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Allenarsi a Legnago e nei comuni vicini</h2>
          <p className="mb-4">
            Il nostro studio è nel cuore di Legnago ed è facilmente raggiungibile dai comuni vicini: Cerea, Bovolone, Nogara, Villa Bartolomea, Minerbe, Castagnaro e Badia Polesine. Che tu venga in auto o in bici, la logistica è semplice e il parcheggio comodo. L’ambiente è riservato, senza affollamento: ti alleni con il tuo trainer senza attese alle macchine e senza distrazioni, con la massima privacy.
          </p>
          <p className="mb-4">
            Se hai poco tempo, possiamo lavorare in finestre di 45–50 minuti e allineare le sedute ai tuoi impegni. Se preferisci integrare con una seduta di attivazione metabolica rapida, puoi valutare anche <Link to="/allenamento-ems-legnago/" className="text-pink-400 underline">l’Allenamento EMS a Legnago</Link>. Per il lavoro posturale approfondito, invece, scopri <Link to="/pilates-legnago/" className="text-pink-400 underline">Pilates a Legnago</Link>.
          </p>
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <h3 className="text-2xl font-semibold mb-2">Risultati reali: casi studio e testimonianze</h3>
            <p>
              I nostri clienti riportano miglioramenti concreti: più energia, riduzione delle misure e una percezione diversa del proprio corpo. Nel blog pubblichiamo periodicamente casi studio locali e consigli pratici da applicare subito. Dai un’occhiata alla sezione <Link to="/blog" className="text-pink-400 underline">Blog</Link> per approfondire.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Quanto costa un personal trainer a Legnago?</h3>
              <p className="text-gray-300 mt-2">Proponiamo soluzioni flessibili: pacchetti da 1, 2 o 3 sedute a settimana, con durata 45’ o 60’. Prenota una consulenza gratuita per un preventivo su misura.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Quante sedute a settimana servono per dimagrire?</h3>
              <p className="text-gray-300 mt-2">In genere 2–3 sedute/sett. sono sufficienti per risultati misurabili; la qualità dell’allenamento e la costanza fanno la differenza.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Posso allenarmi in coppia?</h3>
              <p className="text-gray-300 mt-2">Sì, abbiamo programmi per coppie e amici. È un formato motivante e conveniente, mantenendo l’attenzione del trainer.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">È adatto se ho poco tempo?</h3>
              <p className="text-gray-300 mt-2">Sì. Strutturiamo protocolli smart con progressioni mirate e routine rapide a casa per massimizzare i risultati con tempi ridotti.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/contatti"><Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 py-4 text-lg">Prenota consulenza gratuita</Button></Link>
          </div>
        </section>

        <section className="bg-gradient-to-r from-pink-600/20 to-purple-600/20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Come funziona il Metodo MUV</h2>
            <p className="mb-3">Il Metodo MUV è la nostra filosofia operativa: essenziale, misurabile, sostenibile. Usiamo pochi indicatori chiari (forza, circonferenze, sensazioni soggettive) per orientare le scelte di allenamento e nutrizione. Evitiamo complessità inutili e puntiamo all’aderenza: se il programma è sostenibile, i risultati arrivano e si mantengono.</p>
            <p className="mb-3">Ogni mese, rivediamo insieme ciò che è cambiato e decidiamo come progredire: più carico, più controllo tecnico, o più lavoro metabolico a seconda dell’obiettivo e della risposta individuale. Il tutto in un ambiente curato, riservato e accogliente.</p>
          </div>
        </section>
      </main>

      {/* Sticky CTA on mobile */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center px-4 sm:hidden z-40">
        <Link to="/contatti" className="w-full max-w-sm">
          <Button className="w-full bg-pink-600 hover:bg-pink-700 rounded-full py-4 text-base">Prenota consulenza gratuita</Button>
        </Link>
      </div>
    </>
  );
};

export default PersonalTrainerLegnago;
