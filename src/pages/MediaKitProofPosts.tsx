import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Calendar, Target, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MediaKitProofPosts = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copiato!",
        description: `"${title}" copiato negli appunti`,
      });
    });
  };

  const proofPosts = [
    {
      title: "30 giorni, differenza reale",
      angle: "Trasformazione misurabile",
      image: "Before/after anonimizzato con misure",
      copy: `30 giorni di percorso MUV: -8cm vita, -6cm fianchi, +15% energia quotidiana. 💪

Non promesse magiche, ma un metodo che funziona: 2 sessioni a settimana, alimentazione sostenibile, tecnologie innovative.

Il segreto? Una routine che si adatta alla TUA vita, non viceversa. 

Risultati che durano nel tempo perché nascono da abitudini sane, non da sacrifici estremi.`,
      cta: "Prenota la tua consulenza gratuita",
      hashtags: "#Legnago #BassaVeronese #MUVFitness #TrasformazioneFisica #PersonalTraining"
    },
    {
      title: "EMS: 20 minuti che contano",
      angle: "Efficienza temporale",
      image: "Cliente durante sessione EMS",
      copy: `"Non ho tempo per allenarmi" 🕐

Te lo dice spesso anche la tua giornata? EMS è la risposta: 20 minuti reali = 90 minuti di palestra tradizionale.

Elettrostimolazione + movimento mirati = risultati concreti in metà tempo.

Perfetto per chi ha famiglia, lavoro e mille impegni ma non vuole rinunciare alla forma fisica.

Tecnologia sicura, supervisione costante, risultati misurabili.`,
      cta: "Prova EMS gratuitamente",
      hashtags: "#Legnago #EMS #AllenamentoRapido #MUVFitness #PocoTempo"
    },
    {
      title: "Mal di schiena: da rigido a fluido",
      angle: "Risoluzione problemi posturali",
      image: "Sessione Pancafit/Pilates",
      copy: `Mal di schiena da anni? Sarah (nome di fantasia) anche. 🎯

6 settimane di Pancafit + Pilates Reformer: da dolore quotidiano a libertà di movimento.

Il nostro approccio: prima eliminiamo tensioni e compensi, poi rinforziamo la muscolatura profonda.

Non copriamo il sintomo – risolviamo la causa.

Ogni percorso è diverso perché ogni schiena ha una storia. La sicurezza viene sempre prima di tutto.`,
      cta: "Valutazione posturale gratuita",
      hashtags: "#Legnago #MalDiSchiena #Pancafit #PilatesReformer #PosturaCorretta"
    },
    {
      title: "Cellulite: gambe leggere in 6–8 settimane",
      angle: "Risultati estetici specifici",
      image: "Trattamento Vacuum + Pressoterapia",
      copy: `Cellulite e gambe pesanti: problema risolto in 6-8 settimane. ✨

Il nostro protocollo: Vacuum terapia + Pressoterapia + movimento mirato + consigli nutrizionali.

Non solo estetica – anche benessere quotidiano. Gambe più leggere, circolazione migliorata, autostima ritrovata.

2 sedute a settimana, ambiente riservato, tecnologie all'avanguardia.

Risultati che si vedono e si sentono.`,
      cta: "Check-up Cellulite & Drenaggio",
      hashtags: "#Legnago #Cellulite #VacumTerapia #Pressoterapia #GambeLeggere"
    },
    {
      title: "Come misuriamo i progressi",
      angle: "Metodo scientifico",
      image: "Strumenti di misurazione corporea",
      copy: `I numeri non mentono mai. 📊

Ogni 2-4 settimane: misure precise (vita, fianchi, coscia), foto tecniche, bioimpedenza per massa magra/grassa.

Non ti diciamo "ti vedo meglio" – ti mostriamo i dati reali.

Progressi chiari = motivazione alta = risultati duraturi.

Il tuo corpo cambia ogni giorno. Noi lo documentiamo con precisione scientifica per guidarti verso l'obiettivo.`,
      cta: "Scopri il nostro metodo",
      hashtags: "#Legnago #MisurazioniCorporee #ProgressiReali #MUVFitness #Bioimpedenza"
    },
    {
      title: "2×/settimana, risultati veri",
      angle: "Programmazione intelligente",
      image: "Pianificazione settimanale",
      copy: `2 sessioni a settimana. Basta. 💯

La nostra programmazione 'smart' è pensata per chi ha una vita oltre la palestra.

Ogni minuto conta: esercizi mirati, progressioni studiate, recupero ottimizzato.

Non serve ammazzarsi tutti i giorni. Serve allenarsi con intelligenza.

Risultati concreti con il minimo tempo necessario. Sostenibile = duraturo.`,
      cta: "Consulenza gratuita programmazione",
      hashtags: "#Legnago #AllenamentoSmart #2VolteASettimana #MUVFitness #Sostenibile"
    },
    {
      title: "Ergonomia d'ufficio in 7 mosse",
      angle: "Valore gratuito",
      image: "Infografica postura ufficio",
      copy: `8 ore in ufficio? La tua schiena lo sa. 💻

7 mosse semplici per sopravvivere alla sedia:
• Monitor all'altezza degli occhi
• Piedi sempre appoggiati
• Pausa ogni 45 minuti
• Stretching collo/spalle
• Respirazione diaframmatica
• Rinforzo core a casa
• Valutazione posturale professionale

Quest'ultimo punto fa la differenza tra sopravvivere e stare davvero bene.`,
      cta: "Valutazione posturale gratuita",
      hashtags: "#Legnago #ErgonomiaUfficio #PosturaCorretta #MUVFitness #PrevenzioneNeeded"
    },
    {
      title: "Prima/dopo (anonimizzato)",
      angle: "Proof sociale",
      image: "Trasformazione anonimizzata",
      copy: `12 settimane, stessa persona. 🔥

-12cm vita, -8cm fianchi, +200% autostima.

Metodo MUV: niente diete estreme, niente allenamenti impossibili. Solo un percorso studiato sulla sua vita quotidiana.

Ogni trasformazione è unica. Ogni persona ha bisogni diversi.

Il nostro lavoro? Trovare la strada più diretta tra dove sei ora e dove vuoi arrivare.

(Foto pubblicata con autorizzazione, dati anonimizzati per privacy)`,
      cta: "Inizia la tua trasformazione",
      hashtags: "#Legnago #Trasformazione #PrimaDopo #MUVFitness #RisultatiReali"
    },
    {
      title: "Per chi NON è MUV",
      angle: "Qualifica lead",
      image: "Centro MUV ambiente esclusivo",
      copy: `MUV non è per tutti. Te lo diciamo subito. 🎯

Non è per chi:
❌ Cerca palestre affollate
❌ Vuole solo "sfogare stress"
❌ Non ha obiettivi chiari
❌ Preferisce il fai-da-te

MUV è per chi:
✅ Vuole risultati misurabili
✅ Cerca coaching professionale  
✅ Preferisce ambienti riservati
✅ Investe nella propria salute

Se ti riconosci nel secondo gruppo, parliamoci.`,
      cta: "Verifica se MUV fa per te",
      hashtags: "#Legnago #QualificazioneCliente #MUVFitness #CoachingProfessionale #NonPerTutti"
    },
    {
      title: "Tour del centro",
      angle: "Trasparenza e ambiente",
      image: "Ambienti MUV riservati",
      copy: `Ambiente fa la differenza. Sempre. 🏢

Spazi riservati, tecnologie all'avanguardia, pulizia maniacale, atmosfera professionale ma accogliente.

Ogni angolo è pensato per il tuo benessere: dalle cabine EMS agli spazi Pilates, dal relax post-allenamento ai supporti nutrizionali.

Non una palestra. Un centro di trasformazione fisica.

Vieni a vedere con i tuoi occhi. La prima consulenza è sempre gratuita e include il tour completo.`,
      cta: "Prenota il tuo tour gratuito",
      hashtags: "#Legnago #TourCentro #AmbienteRiservato #MUVFitness #TecnologieAvanzate"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Proof-post pronti (Meta & GBP)</title>
        <meta name="description" content="10 proof-post ottimizzati per Facebook, Instagram e Google Business Profile. Copy pronti con hashtag e CTA." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                10 proof-post per social e Google
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Copy ottimizzati per Facebook, Instagram e Google Business Profile. 
                Ogni post è pensato per informare, coinvolgere e convertire. 
                <span className="text-brand-primary"> Usa il pulsante copia per pubblicare subito.</span>
              </p>
            </div>

            {/* Proof Posts Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {proofPosts.map((post, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl text-brand-primary mb-2">{post.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Target className="w-4 h-4" />
                          <span>{post.angle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <Users className="w-4 h-4" />
                          <span>{post.image}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`${post.copy}\n\n👉 ${post.cta}\n\n${post.hashtags}`, post.title)}
                        className="min-h-[44px] min-w-[44px] border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10 flex-shrink-0"
                        aria-label={`Copia post: ${post.title}`}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">
                        {post.copy}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-brand-primary font-semibold text-sm">CTA:</span>
                        <span className="text-gray-300 text-sm">{post.cta}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-brand-primary font-semibold text-sm">#:</span>
                        <span className="text-gray-400 text-sm">{post.hashtags}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Guidelines */}
            <Card className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                  <Calendar className="w-6 h-6" />
                  Linee guida pubblicazione
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-primary mb-3">Orari consigliati</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                        <strong>Google Business Profile:</strong> 12:30 (Europe/Rome)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
                        <strong>Facebook/Instagram:</strong> 19:00 (Europe/Rome)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                        <strong>Frequenza:</strong> 2-3 post/settimana max
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-brand-primary mb-3">Template risposte recensioni</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-1"><strong>Recensione positiva:</strong></p>
                        <p className="text-xs text-gray-400">"Grazie [nome]! È bellissimo sapere che hai raggiunto i tuoi obiettivi. Il team MUV è sempre qui per supportarti nel tuo percorso di benessere. 💪"</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-1"><strong>Recensione critica:</strong></p>
                        <p className="text-xs text-gray-400">"Ciao [nome], ci dispiace per l'esperienza. Ti contatteremo in privato per capire come migliorare. Il tuo feedback è prezioso per crescere. Grazie."</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-brand-primary mb-3">Tracciamento UTM per link al sito</h3>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mb-2">Usa questi parametri per trackare le conversioni:</p>
                    <code className="text-xs text-brand-primary">
                      ?utm_source=[facebook|instagram|google]&utm_medium=social&utm_campaign=reputation
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default MediaKitProofPosts;