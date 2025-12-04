import React from 'react';
import { Shield, CheckCircle, Heart, Clock } from 'lucide-react';

const LandingGuarantee: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Il nostro impegno verso di te
        </h2>
        
        <p className="text-xl text-muted-foreground mb-12">
          Crediamo nei risultati che offriamo e ci impegniamo a supportarti in ogni fase del percorso
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-3">Percorso personalizzato</h3>
            <p className="text-muted-foreground text-sm">
              Ogni programma è studiato sulle tue esigenze specifiche e sui tuoi obiettivi
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-3">Supporto costante</h3>
            <p className="text-muted-foreground text-sm">
              Un team dedicato ti accompagna durante tutto il percorso di trasformazione
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-3">Flessibilità totale</h3>
            <p className="text-muted-foreground text-sm">
              Orari personalizzabili e programmi adattabili ai tuoi impegni quotidiani
            </p>
          </div>
        </div>
        
        <div className="bg-primary/10 p-8 rounded-2xl border border-primary/20">
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
            La nostra promessa
          </h3>
          <p className="text-lg text-foreground mb-4">
            Ti accompagniamo verso i tuoi obiettivi con professionalità, tecnologie avanzate 
            e un approccio completamente personalizzato.
          </p>
          <p className="text-muted-foreground">
            Trasparenza totale • Nessun vincolo • Soddisfazione del cliente al primo posto
          </p>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>I risultati individuali possono variare in base all'impegno e alle condizioni di partenza</p>
        </div>
      </div>
    </section>
  );
};

export default LandingGuarantee;
