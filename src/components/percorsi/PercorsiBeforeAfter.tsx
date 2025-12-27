import React from 'react';
import { CheckCircle, TrendingUp, Clock, Zap } from 'lucide-react';

interface PercorsiBeforeAfterProps {
  gender?: 'donna' | 'uomo' | null;
}

interface TransformationResult {
  name: string;
  age: string;
  duration: string;
  beforeStats: string[];
  afterStats: string[];
  highlight: string;
  avatar: string;
}

const donnaResults: TransformationResult[] = [
  {
    name: "Giulia M.",
    age: "34 anni",
    duration: "12 settimane",
    beforeStats: [
      "Cellulite visibile su cosce e glutei",
      "Poca tonicità muscolare",
      "Stanchezza cronica",
      "Taglie M/L"
    ],
    afterStats: [
      "Cellulite ridotta del 70%",
      "Glutei e cosce toniche",
      "Energia durante tutta la giornata",
      "Taglia S stabile"
    ],
    highlight: "-8 cm sui fianchi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Francesca L.",
    age: "42 anni",
    duration: "16 settimane",
    beforeStats: [
      "Postura scorretta da ufficio",
      "Mal di schiena frequente",
      "Addome rilassato post-gravidanza",
      "Difficoltà a trovare tempo"
    ],
    afterStats: [
      "Postura corretta e naturale",
      "Zero dolori lombari",
      "Core tonico e definito",
      "20 minuti, 2 volte a settimana"
    ],
    highlight: "-6 kg di grasso",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

const uomoResults: TransformationResult[] = [
  {
    name: "Marco R.",
    age: "38 anni",
    duration: "12 settimane",
    beforeStats: [
      "Grasso addominale ostinato",
      "Poco tempo per la palestra",
      "Massa muscolare in calo",
      "Energia bassa"
    ],
    afterStats: [
      "Addome definito e visibile",
      "Solo 40 min a settimana",
      "+3 kg di massa magra",
      "Performance al top"
    ],
    highlight: "-12% grasso corporeo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Luca B.",
    age: "45 anni",
    duration: "16 settimane",
    beforeStats: [
      "Mal di schiena cronico",
      "Muscoli deboli e poco definiti",
      "Postura compromessa",
      "Stanchezza frequente"
    ],
    afterStats: [
      "Zero dolori alla schiena",
      "Muscoli tonici e forti",
      "Postura corretta",
      "Energia tutto il giorno"
    ],
    highlight: "+5 kg massa muscolare",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const neutralResults = [donnaResults[0], uomoResults[0]];

const PercorsiBeforeAfter: React.FC<PercorsiBeforeAfterProps> = ({ gender }) => {
  const results = gender === 'donna' 
    ? donnaResults 
    : gender === 'uomo' 
      ? uomoResults 
      : neutralResults;

  const sectionTitle = gender === 'donna'
    ? "Trasformazioni reali di donne come te"
    : gender === 'uomo'
      ? "Trasformazioni reali di uomini come te"
      : "Trasformazioni reali dei nostri clienti";

  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Risultati documentati</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Questi sono risultati reali ottenuti dai nostri clienti seguendo i percorsi MUV
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl border border-border overflow-hidden hover-scale transition-all duration-300"
            >
              {/* Header with Avatar and Info */}
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center gap-4">
                  <img 
                    src={result.avatar} 
                    alt={result.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.age}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {result.duration}
                    </div>
                  </div>
                </div>
                
                {/* Highlight Badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  <Zap className="w-4 h-4" />
                  {result.highlight}
                </div>
              </div>

              {/* Before / After Comparison */}
              <div className="grid grid-cols-2 divide-x divide-border">
                {/* Before */}
                <div className="p-5">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Prima
                  </h4>
                  <ul className="space-y-2">
                    {result.beforeStats.map((stat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-1.5 flex-shrink-0" />
                        {stat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="p-5 bg-primary/5">
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                    Dopo
                  </h4>
                  <ul className="space-y-2">
                    {result.afterStats.map((stat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          * I risultati possono variare da persona a persona in base a fattori individuali come metabolismo, 
          costanza e stile di vita. I nomi e le foto utilizzati sono fittizi per tutelare la privacy dei nostri clienti. 
          I risultati riportati sono basati su esperienze reali documentate presso il Centro Fitness MUV.
        </p>
      </div>
    </section>
  );
};

export default PercorsiBeforeAfter;
