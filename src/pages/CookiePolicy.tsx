
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";

const CookiePolicy = () => {
  return (
    <>
      <UnifiedSEOHead
        title="Cookie Policy MUV Fitness Legnago | Gestione Cookie e Privacy"
        description="Cookie Policy di MUV Fitness Legnago: informazioni sui cookie utilizzati sul sito, finalità, gestione delle preferenze e diritti dell'utente."
        keywords="cookie policy muv fitness, gestione cookie legnago, privacy web fitness, consenso cookie palestra"
        noindex={true}
      />
      
      <Navigation />
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-pink-600">COOKIE</span> POLICY
            </h1>
            <p className="text-xl text-gray-300">
              Informazioni sui cookie utilizzati dal sito
            </p>
          </div>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Cosa sono i Cookie</h2>
                <p className="text-gray-300 leading-relaxed">
                  I cookie sono piccoli file di testo che vengono automaticamente posizionati sul PC del navigatore quando visita un sito web. I cookie sono creati dal server del sito che si sta visitando e possono essere utilizzati in seguito dal medesimo sito, oppure da un sito diverso che sia in grado di riconoscerli.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Tipologie di Cookie Utilizzati</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Cookie Tecnici</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Sono necessari per il corretto funzionamento del sito e non richiedono consenso. Includono:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                      <li>Cookie di navigazione per memorizzare le preferenze dell'utente</li>
                      <li>Cookie di funzionalità per migliorare l'esperienza di navigazione</li>
                      <li>Cookie di sicurezza per proteggere da attacchi informatici</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Cookie di Analisi</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Utilizzati per raccogliere informazioni sull'uso del sito web in forma aggregata e anonima. Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Gestione dei Cookie</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  È possibile gestire o disabilitare i cookie attraverso le impostazioni del proprio browser:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Chrome:</strong> Impostazioni &gt; Privacy e sicurezza &gt; Cookie e altri dati dei siti</li>
                  <li><strong>Firefox:</strong> Opzioni &gt; Privacy e sicurezza &gt; Cookie e dati dei siti web</li>
                  <li><strong>Safari:</strong> Preferenze &gt; Privacy &gt; Cookie e dati dei siti web</li>
                  <li><strong>Edge:</strong> Impostazioni &gt; Cookie e autorizzazioni sito</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  La disabilitazione dei cookie tecnici può compromettere il corretto funzionamento del sito.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Cookie di Terze Parti</h2>
                <p className="text-gray-300 leading-relaxed">
                  Il sito può utilizzare servizi di terze parti che installano cookie per le proprie finalità. Per maggiori informazioni sui cookie di terze parti, consultare le rispettive privacy policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Aggiornamenti</h2>
                <p className="text-gray-300 leading-relaxed">
                  Questa Cookie Policy può essere aggiornata periodicamente. Si consiglia di consultare regolarmente questa pagina per essere informati su eventuali modifiche.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}
                </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default CookiePolicy;
