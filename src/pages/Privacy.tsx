
import { Card, CardContent } from "@/components/ui/card";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import BreadcrumbNavigation from "@/components/SEO/BreadcrumbNavigation";

const Privacy = () => {
  return (
    <>
      <UnifiedSEOHead
        title="Privacy Policy MUV Fitness Legnago | Trattamento Dati Personali"
        description="Informativa Privacy di MUV Fitness Legnago: come trattiamo i tuoi dati personali nel rispetto del GDPR per servizi fitness, consulenze e comunicazioni."
        keywords="privacy policy muv fitness, trattamento dati personali legnago, gdpr centro fitness, informativa privacy palestra"
        noindex={true}
      />
      
      <BreadcrumbNavigation />
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-pink-600">INFORMATIVA</span> SULLA PRIVACY
            </h1>
            <p className="text-xl text-gray-300">
              Ai sensi del Regolamento UE 2016/679 (GDPR)
            </p>
          </div>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">1. Titolare del Trattamento</h2>
                <p className="text-gray-300 leading-relaxed">
                  Il Titolare del trattamento dei dati personali è <strong>MUV Fitness</strong>, con sede in Via Venti Settembre, 5/7, Legnago (VR), P.IVA: 05281920289.
                  <br />
                  Email: info@muvfitness.it
                  <br />
                  Telefono: +39 3459188197
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">2. Tipologie di Dati Raccolti</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Raccogliamo i seguenti dati personali:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Dati identificativi:</strong> nome, cognome, email</li>
                  <li><strong>Dati di contatto:</strong> numero di telefono, indirizzo email</li>
                  <li><strong>Dati di navigazione:</strong> cookie tecnici e di analisi</li>
                  <li><strong>Messaggi e comunicazioni:</strong> contenuto delle richieste inviate tramite form di contatto</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">3. Finalità del Trattamento</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I dati personali vengono trattati per le seguenti finalità:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Rispondere alle richieste di informazioni e contatti</li>
                  <li>Fornire consulenze e servizi fitness personalizzati</li>
                  <li>Invio di comunicazioni commerciali (solo previo consenso)</li>
                  <li>Adempimento di obblighi legali e contabili</li>
                  <li>Analisi statistiche per migliorare i servizi offerti</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">4. Base Giuridica del Trattamento</h2>
                <p className="text-gray-300 leading-relaxed">
                  Il trattamento è basato su:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                  <li><strong>Consenso dell'interessato</strong> (art. 6, par. 1, lett. a GDPR)</li>
                  <li><strong>Esecuzione di un contratto</strong> o di misure precontrattuali (art. 6, par. 1, lett. b GDPR)</li>
                  <li><strong>Interesse legittimo</strong> del titolare per finalità commerciali (art. 6, par. 1, lett. f GDPR)</li>
                  <li><strong>Adempimento di obblighi legali</strong> (art. 6, par. 1, lett. c GDPR)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">5. Modalità di Trattamento</h2>
                <p className="text-gray-300 leading-relaxed">
                  I dati sono trattati con strumenti informatici e telematici, con modalità organizzative e logiche strettamente correlate alle finalità indicate. Sono adottate misure di sicurezza tecniche e organizzative appropriate per proteggere i dati da accessi non autorizzati, perdita, distruzione o alterazione.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">6. Comunicazione e Diffusione</h2>
                <p className="text-gray-300 leading-relaxed">
                  I dati potranno essere comunicati a:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                  <li>Fornitori di servizi tecnici (hosting, email marketing)</li>
                  <li>Consulenti e professionisti per adempimenti legali</li>
                  <li>Autorità competenti per obblighi di legge</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  I dati non sono soggetti a diffusione pubblica.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">7. Conservazione dei Dati</h2>
                <p className="text-gray-300 leading-relaxed">
                  I dati personali sono conservati per il tempo necessario al raggiungimento delle finalità per cui sono stati raccolti:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                  <li><strong>Dati di contatto:</strong> fino a revoca del consenso o cessazione del rapporto</li>
                  <li><strong>Dati contrattuali:</strong> 10 anni dalla cessazione del contratto</li>
                  <li><strong>Dati di marketing:</strong> fino a revoca del consenso</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">8. Diritti dell'Interessato</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  L'interessato ha diritto di:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Accedere ai propri dati personali (art. 15 GDPR)</li>
                  <li>Rettificare dati inesatti o incompleti (art. 16 GDPR)</li>
                  <li>Cancellare i dati in determinate circostanze (art. 17 GDPR)</li>
                  <li>Limitare il trattamento (art. 18 GDPR)</li>
                  <li>Portabilità dei dati (art. 20 GDPR)</li>
                  <li>Opporsi al trattamento (art. 21 GDPR)</li>
                  <li>Revocare il consenso in qualsiasi momento</li>
                  <li>Proporre reclamo al Garante per la Protezione dei Dati Personali</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Per esercitare i propri diritti, contattare: <strong>info@muvfitness.it</strong>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">9. Cookie</h2>
                <p className="text-gray-300 leading-relaxed">
                  Il sito utilizza cookie tecnici necessari per il funzionamento e cookie di analisi per migliorare l'esperienza utente. L'uso di cookie è disciplinato dalla Cookie Policy accessibile dal footer del sito.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">10. Modifiche alla Privacy Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Questa informativa può essere aggiornata periodicamente. Le modifiche saranno comunicate attraverso pubblicazione sul sito web.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}
                </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
};

export default Privacy;
