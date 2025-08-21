import { Helmet } from "react-helmet";
import { MapPin, Car, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComeArrivare = () => {
  const pageTitle = "Come Arrivare – MUV Fitness Legnago (Mappa e Parcheggio)";
  const pageDescription = "Indicazioni chiare, parcheggi consigliati e foto dell'ingresso. Scrivici su WhatsApp per info.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.muvfitness.it/come-arrivare/" />
      </Helmet>

      <main className="pt-16">
        <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Dove siamo e dove parcheggiare
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Raggiungi facilmente MUV Fitness nel centro di Legnago
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Indirizzo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">MUV Fitness Legnago</p>
                    <p className="text-gray-600 mb-4">{{INDIRIZZO_ATTUALE_COMPLETO}}</p>
                    <p className="text-gray-600">Telefono: {{TELEFONO}}</p>
                    <p className="text-gray-600">Email: {{EMAIL}}</p>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Orari di Apertura
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>{{ORARI_STANDARD}}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5 text-blue-600" />
                      Parcheggi Consigliati
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">Parcheggio Gratuito</p>
                        <p className="text-sm text-gray-600">Posti disponibili nelle vie limitrofe</p>
                      </div>
                      <div>
                        <p className="font-semibold">Parcheggio a Pagamento</p>
                        <p className="text-sm text-gray-600">Centro storico - strisce blu</p>
                      </div>
                      <div>
                        <p className="font-semibold">In Bicicletta</p>
                        <p className="text-sm text-gray-600">Rastrelliere disponibili nei paraggi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ComeArrivare;