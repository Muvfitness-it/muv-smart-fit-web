import { CheckCircle, Phone, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';

const Grazie = () => {
  return (
    <>
      <UnifiedSEOHead
        title="Grazie per averci contattato | MUV Fitness Legnago"
        description="Abbiamo ricevuto la tua richiesta. Ti ricontatteremo entro 10 minuti negli orari di apertura per fissare la tua prova gratuita."
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Hero Success Message */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6 relative">
              <CheckCircle className="w-24 h-24 text-green-500 animate-scale-in mx-auto" strokeWidth={2} />
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/20 animate-ping mx-auto" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Richiesta Inviata con Successo! 🎉
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ti ricontatteremo <strong className="text-primary">entro 10 minuti</strong> negli orari di apertura
            </p>
            
            <div className="mt-6 inline-block bg-primary/20 border border-primary/30 rounded-lg px-6 py-3">
              <p className="text-foreground font-semibold">
                🔥 Sei tra le <strong>127+ trasformazioni</strong> di quest'anno!
              </p>
            </div>
          </div>

          {/* Timeline: Cosa succede ora? */}
          <Card className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
                Cosa Succede Ora?
              </h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border border-border transition-all hover:border-primary">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-foreground">Verifica della tua richiesta</h3>
                    <p className="text-muted-foreground">
                      Stiamo processando i tuoi dati per personalizzare la tua esperienza
                    </p>
                    <span className="text-sm text-primary font-semibold">⏱ Immediato</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border border-border transition-all hover:border-primary">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-foreground">Ti chiamiamo o scriviamo</h3>
                    <p className="text-muted-foreground">
                      Un nostro consulente ti contatterà per una breve chiacchierata sui tuoi obiettivi
                    </p>
                    <span className="text-sm text-primary font-semibold">⏱ Entro 10 minuti (orari apertura)</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border border-border transition-all hover:border-primary">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-foreground">Prenotiamo la tua prova gratuita</h3>
                    <p className="text-muted-foreground">
                      Fissiamo data e ora per la tua prima sessione personalizzata nel centro
                    </p>
                    <span className="text-sm text-primary font-semibold">⏱ Stesso giorno o a tua scelta</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Alternativi */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3 text-foreground">Hai Fretta?</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Scrivici subito su WhatsApp per una risposta immediata
                </p>
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a 
                    href="https://wa.me/393291070374" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    💬 Scrivici su WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-3 text-foreground">Scopri di Più</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Vuoi sapere come funziona il nostro metodo?
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                >
                  <Link to="/perche-muv">
                    📖 Il Nostro Metodo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contatti Diretti */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Preferisci Chiamarci Direttamente?
              </h3>
              <p className="text-muted-foreground mb-6">
                Siamo disponibili dal Lunedì al Venerdì 08:00-21:00, Sabato 08:00-12:00
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:+393291070374"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  329 107 0374
                </a>
                
                <span className="hidden sm:block text-muted-foreground">•</span>
                
                <a 
                  href="mailto:info@muvfitness.it"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  info@muvfitness.it
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button asChild variant="ghost">
              <Link to="/">
                ← Torna alla Homepage
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grazie;
