import React, { useEffect, useState } from 'react';
import FunnelTemplate from '@/components/funnel/FunnelTemplate';
import { Helmet } from 'react-helmet';
import { CheckCircle, Phone, MapPin, Clock, Shirt, FileText, Heart, ExternalLink } from 'lucide-react';

const FunnelGrazie: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Try to get the name from localStorage if saved
    const stored = localStorage.getItem('funnel_user_name');
    if (stored) {
      setUserName(stored);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Richiesta Ricevuta | MUV Fitness Legnago</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <FunnelTemplate>
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            
            {/* Success header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Richiesta ricevuta con successo!
              </h1>
              <p className="text-lg text-muted-foreground">
                {userName ? `Grazie ${userName}, a` : 'A'}bbiamo ricevuto la tua richiesta di consulenza
              </p>
            </div>

            {/* Correzione #5: Pagina Grazie potenziata */}
            
            {/* What happens next */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Cosa succede ora?</h2>
                  <p className="text-muted-foreground">Ecco i prossimi passi:</p>
                </div>
              </div>
              
              <ol className="space-y-4 ml-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-foreground">Ti contatteremo entro 24 ore</p>
                    <p className="text-sm text-muted-foreground">Per confermare l'appuntamento</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-foreground">Fisseremo insieme data e orario</p>
                    <p className="text-sm text-muted-foreground">Per la tua consulenza in studio</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-foreground">La consulenza dura circa 30 minuti</p>
                    <p className="text-sm text-muted-foreground">Ed è completamente gratuita</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* How to prepare */}
            <div className="bg-muted/50 rounded-2xl p-6 sm:p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                  <Shirt className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Come prepararti</h2>
                  <p className="text-muted-foreground">Per sfruttare al meglio la consulenza:</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Indossa abbigliamento comodo</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Porta eventuali referti medici (solo se hai problemi specifici)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Arriva 5 minuti prima dell'appuntamento</span>
                </li>
              </ul>
            </div>

            {/* Remember */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8 mb-6 border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Ricorda</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    La consulenza <strong className="text-foreground">non è una vendita</strong>. 
                    È un momento per capire insieme se il nostro metodo è adatto a te.
                  </p>
                  <p className="text-primary font-medium mt-3">
                    Nessun impegno, nessuna pressione.
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">Dove trovarci</h2>
                  <p className="text-muted-foreground">MUV Fitness Legnago</p>
                </div>
              </div>
              
              <div className="ml-16">
                <p className="text-foreground font-medium mb-1">
                  Piazzetta Don Walter Soave, 2
                </p>
                <p className="text-muted-foreground mb-4">
                  37045 Legnago (VR)
                </p>
                <a
                  href="https://maps.google.com/?q=Piazzetta+Don+Walter+Soave+2+Legnago+VR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apri in Google Maps
                </a>
              </div>
            </div>

            {/* Back to home */}
            <div className="text-center mt-10">
              <a 
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                ← Torna alla homepage
              </a>
            </div>

          </div>
        </div>
      </FunnelTemplate>
    </>
  );
};

export default FunnelGrazie;
