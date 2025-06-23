import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Target, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-green-900" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{
          backgroundImage: "url('/images/fitness-professional-bg.jpg')"
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-blue-900/70 to-green-900/80"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            CENTRO FITNESS MUV
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            <strong><span className="text-green-400 font-bold">Oltre 500 persone</span> a Legnago hanno già perso fino a 5 kg in 30 giorni.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/servizi" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center">
              Prenota la Tua Prova Gratuita e Inizia a Cambiare Subito
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
              Perché il 95% dei Nostri Clienti Raggiunge l'Obiettivo?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <strong>Non siamo una palestra qualsiasi.</strong> Siamo l'unico centro a Legnago che garantisce risultati 
              misurabili grazie a tecnologie esclusive e un metodo collaudato su centinaia di trasformazioni.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition-colors">
              <Dumbbell className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Tecnologia EMS Esclusiva</h3>
              <p className="text-gray-300 mb-4">
                <strong>20 minuti = 3 ore di palestra tradizionale.</strong> La tecnologia EMS attiva oltre 300 muscoli 
                contemporaneamente, bruciando il 30% di calorie in più.
              </p>
              <div className="text-green-400 font-semibold text-sm">
                ✓ Risultati 3x più veloci ✓ Solo 2 sedute a settimana ✓ Zero spreco di tempo
              </div>
            </div>
            
            <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition-colors">
              <Users className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Personal Trainer d'Élite</h3>
              <p className="text-gray-300 mb-4">
                <strong>I migliori specialisti di Legnago.</strong> Christian ha risolto il mal di schiena al 95% dei suoi clienti. 
                Serena ha fatto perdere oltre 200kg in un anno alle sue clienti.
              </p>
              <div className="text-green-400 font-semibold text-sm">
                ✓ Laureati in Scienze Motorie ✓ Specialisti certificati ✓ Track record comprovato
              </div>
            </div>
            
            <div className="bg-gray-700 p-8 rounded-2xl text-center hover:bg-gray-600 transition-colors">
              <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Metodo Scientifico Personalizzato</h3>
              <p className="text-gray-300 mb-4">
                <strong>Zero improvvisazione. Solo scienza.</strong> Analisi corporea avanzata, programmi su misura 
                e monitoraggio costante per garantire che raggiungi l'obiettivo nei tempi previsti.
              </p>
              <div className="text-green-400 font-semibold text-sm">
                ✓ Piano su misura ✓ Risultati misurabili ✓ Garanzia di successo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              I Numeri Che Dimostrano la Nostra Eccellenza
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              <strong>Non promettiamo miracoli.</strong> Ti mostriamo risultati concreti, 
              ottenuti da persone vere che hanno scelto di cambiare la loro vita con noi.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Trasformazioni Completate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Tasso di Successo</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">-5kg</div>
              <div className="text-lg opacity-90">Media Perdita Peso (30gg)</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5</div>
              <div className="text-lg opacity-90">Specialisti Certificati</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Star className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sei Pronto a Vedere il Cambiamento che Hai Sempre Sognato?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            <strong>Basta scuse, basta rimandare.</strong> Oggi puoi iniziare il percorso che in 30 giorni 
            ti farà guardare allo specchio con orgoglio. <span className="text-green-400">La prima consulenza è completamente gratuita.</span>
          </p>
          <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30 mb-8">
            <h3 className="text-lg font-bold text-white mb-3">🎁 OFFERTA ESCLUSIVA PER I PRIMI 10</h3>
            <p className="text-gray-300 mb-4">
              <strong>Check-up completo GRATUITO</strong> (valore €80) + Prima seduta di prova 
              + Piano personalizzato. <span className="text-green-400 font-semibold">Zero impegno, risultati garantiti.</span>
            </p>
          </div>
          <Link to="/contatti" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-flex items-center">
            Prenota Ora la Tua Trasformazione Gratuita
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            ⏰ Posti limitati - Solo 10 consulenze gratuite questo mese
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
