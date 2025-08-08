import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const PilatesLegnago: React.FC = () => {
  const canonical = "https://www.muvfitness.it/pilates-legnago/";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.muvfitness.it/" },
          { "@type": "ListItem", "position": 2, "name": "Pilates a Legnago", "item": canonical }
        ]
      },
      {
        "@type": "Service",
        "name": "Pilates a Legnago",
        "serviceType": "Pilates Reformer e Matwork",
        "provider": { "@type": "Organization", "name": "MUV Fitness" },
        "areaServed": [
          "Legnago","Cerea","Bovolone","Nogara","Villa Bartolomea","Minerbe","Castagnaro","Badia Polesine"
        ],
        "url": canonical
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"Quante lezioni servono per migliorare la postura?","acceptedAnswer":{"@type":"Answer","text":"I primi benefici si percepiscono in 4–6 settimane con 1–2 lezioni a settimana, in base al punto di partenza."}},
          {"@type":"Question","name":"Reformer o Matwork: cosa scegliere?","acceptedAnswer":{"@type":"Answer","text":"Il Reformer aiuta a guidare il movimento e modulare l’intensità; il Matwork rafforza controllo e consapevolezza. Spesso li alterniamo per un percorso completo."}},
          {"@type":"Question","name":"È adatto se ho dolori lombari?","acceptedAnswer":{"@type":"Answer","text":"Sì, con le dovute precauzioni e dopo la valutazione iniziale. Lavoriamo su mobilità, core stability e respirazione per ridurre il carico sulla zona lombare."}},
          {"@type":"Question","name":"Posso fare una prova?","acceptedAnswer":{"@type":"Answer","text":"Sì, puoi prenotare una lezione di prova per conoscere metodo, trainer e macchinari, senza impegno."}}
        ]
      }
    ]
  };

  return (
    <>
      <SEOOptimizer
        title="Pilates a Legnago | Reformer & Matwork per Postura e Core"
        description="Lezioni individuali e piccoli gruppi. Migliora postura, core e flessibilità con insegnanti qualificati. Prenota ora a Legnago (VR)."
        canonicalUrl={canonical}
        structuredData={structuredData}
      />

      <header className="bg-gradient-to-br from-purple-600/20 via-gray-900 to-pink-600/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Pilates a Legnago (Reformer e Matwork)</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">Percorsi personalizzati per postura, core stability e flessibilità. Lezioni individuali o small group con macchinari professionali.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contatti"><Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-4 text-lg">Prenota lezione di prova Pilates</Button></Link>
            <Link to="/personal-trainer-legnago/"><Button variant="outline" className="rounded-full px-8 py-4 text-lg">Personal Trainer</Button></Link>
          </div>
        </div>
      </header>

      <main className="bg-gray-900 text-white">
        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Perché il Pilates funziona per schiena e postura</h2>
          <article className="prose prose-invert max-w-none">
            <p>
              Il Pilates lavora sul controllo del movimento, sulla stabilità del core e sulla corretta attivazione dei muscoli posturali. Per questo è tra i metodi più efficaci per alleviare fastidi alla schiena, migliorare l’allineamento e sviluppare una forza elegante. In MUV Fitness uniamo precisione tecnica e progressioni accessibili: impari a muoverti meglio fin dalla prima seduta.
            </p>
            <p>
              Le sedute includono esercizi di respirazione, mobilità, stabilità e allungamento, con un’attenzione costante alla qualità del gesto. Questo approccio permette di rinforzare in sicurezza, prevenire ricadute e trasferire benefici nella vita quotidiana.
            </p>
          </article>
        </section>

        <section className="bg-gradient-to-r from-purple-600/10 to-pink-600/10">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Reformer vs Matwork: differenze e percorsi</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Reformer</h3>
                <p>
                  Il Reformer utilizza un carrello scorrevole e molle regolabili per guidare e intensificare il movimento. È ideale per chi cerca supporto nella tecnica, per la progressione controllata e per chi vuole sentire subito il lavoro muscolare in sicurezza.
                </p>
                <h3 className="text-2xl font-semibold mt-6 mb-2">Matwork</h3>
                <p>
                  Il Matwork si svolge a corpo libero su tappetino e sviluppa controllo, equilibrio e consapevolezza. È perfetto per costruire basi solide e per mantenere i benefici nel tempo, anche con semplici routine a casa.
                </p>
              </div>
              <aside className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Caso reale (placeholder)</h3>
                <p>
                  Donna, 55 anni, dolore lombare ricorrente. 1 lezione Reformer/sett. + 1 lezione Matwork/sett. In 12 settimane: dolore ridotto, mobilità delle anche migliorata, postura più stabile e respirazione più fluida.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Chi segue le lezioni: trainer qualificati MUV</h2>
          <p className="mb-4">Le lezioni sono tenute da insegnanti qualificati che curano tecnica, respirazione e progressione. Ogni dettaglio è pensato per farti lavorare in sicurezza e ottenere benefici concreti.</p>
          <div className="bg-gray-800 rounded-lg p-6 mt-2">
            <h3 className="text-2xl font-semibold mb-2">Dalla valutazione alla progressione</h3>
            <p>
              Prima lezione: valutazione posturale e definizione degli obiettivi. Quindi costruiamo un percorso su misura, con richiami periodici per verificare miglioramenti e calibrare intensità e difficoltà degli esercizi.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">Quante lezioni servono per migliorare la postura?</h3><p className="text-gray-300 mt-2">Con 1–2 lezioni/sett., i miglioramenti si notano in 4–6 settimane. La costanza è la chiave.</p></div>
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">Reformer o Matwork: cosa scegliere?</h3><p className="text-gray-300 mt-2">Spesso alterniamo entrambi: il Reformer guida e intensifica, il Matwork consolida controllo e consapevolezza.</p></div>
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">È adatto se ho dolori lombari?</h3><p className="text-gray-300 mt-2">Sì, dopo valutazione iniziale e con le dovute precauzioni. Focus su core stability e mobilità.</p></div>
            <div className="bg-gray-800 p-6 rounded-lg"><h3 className="text-xl font-semibold">Posso fare una prova?</h3><p className="text-gray-300 mt-2">Certo: prenota una lezione di prova per conoscere metodo, trainer e macchinari.</p></div>
          </div>
          <div className="text-center mt-8"><Link to="/contatti"><Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-4 text-lg">Prenota lezione di prova Pilates</Button></Link></div>
        </section>
      </main>

      <div className="fixed bottom-4 inset-x-0 flex justify-center px-4 sm:hidden z-40">
        <Link to="/contatti" className="w-full max-w-sm"><Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-full py-4 text-base">Prenota lezione di prova</Button></Link>
      </div>
    </>
  );
};

export default PilatesLegnago;
