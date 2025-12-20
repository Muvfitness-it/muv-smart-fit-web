import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Flame, Dumbbell, Waves, User, Zap, Clock, HelpCircle, UserCheck, Users, PersonStanding } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  microcopy: string;
  options: { value: string; label: string; icon?: React.ReactNode; isExcluding?: boolean }[];
}

interface FunnelQualificationFormProps {
  onComplete: (answers: Record<string, string>) => void;
}

const questions: Question[] = [
  {
    id: 'obiettivo',
    question: 'Qual è il tuo obiettivo principale in questo momento?',
    microcopy: 'Ogni percorso MUV parte sempre da un obiettivo chiaro.',
    options: [
      { value: 'dimagrire', label: 'Perdere peso e dimagrire', icon: <Flame className="w-5 h-5" /> },
      { value: 'tonificare', label: 'Tonificare e rassodare il corpo', icon: <Dumbbell className="w-5 h-5" /> },
      { value: 'cellulite', label: 'Ridurre cellulite e ritenzione', icon: <Waves className="w-5 h-5" /> },
      { value: 'postura', label: 'Migliorare postura e ridurre il mal di schiena', icon: <User className="w-5 h-5" /> },
      { value: 'benessere', label: 'Ritrovare energia e benessere generale', icon: <Zap className="w-5 h-5" /> },
    ],
  },
  {
    id: 'tempo',
    question: 'Quanto tempo puoi dedicare all\'allenamento ogni settimana?',
    microcopy: 'Costruiamo il percorso in base alla tua routine, non il contrario.',
    options: [
      { value: '2x', label: '2 volte a settimana (40–45 minuti)', icon: <Clock className="w-5 h-5" /> },
      { value: '3x', label: '3 volte a settimana (circa 1 ora)', icon: <><Clock className="w-5 h-5" /><Clock className="w-5 h-5" /></> },
      { value: '4x+', label: 'Più di 3 volte a settimana', icon: <><Clock className="w-5 h-5" /><Clock className="w-5 h-5" /><Clock className="w-5 h-5" /></> },
      { value: 'variabile', label: 'Non lo so, dipende dagli impegni', icon: <HelpCircle className="w-5 h-5" /> },
    ],
  },
  {
    id: 'esperienza',
    question: 'Hai già provato altri percorsi senza ottenere i risultati sperati?',
    microcopy: 'Capire cosa non ha funzionato ci aiuta a fare meglio.',
    options: [
      { value: 'palestra', label: 'Sì, palestre tradizionali' },
      { value: 'diete', label: 'Sì, diete o soluzioni fai da te' },
      { value: 'app', label: 'Sì, app o programmi online' },
      { value: 'prima_volta', label: 'No, sarebbe la prima esperienza strutturata' },
    ],
  },
  {
    id: 'supporto',
    question: 'Che tipo di supporto stai cercando?',
    microcopy: 'Il nostro metodo funziona solo se c\'è collaborazione.',
    options: [
      { value: 'seguito', label: 'Voglio essere seguito passo dopo passo da un professionista', icon: <UserCheck className="w-5 h-5" /> },
      { value: 'mix', label: 'Un mix di guida e autonomia', icon: <Users className="w-5 h-5" /> },
      { value: 'autonomo', label: 'Preferisco totale autonomia', icon: <PersonStanding className="w-5 h-5" />, isExcluding: true },
    ],
  },
];

const FunnelQualificationForm: React.FC<FunnelQualificationFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExcluded, setIsExcluded] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSelect = (value: string, isExcluding?: boolean) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    
    if (isExcluding) {
      setIsExcluded(true);
      return;
    }
    
    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Save to localStorage
        localStorage.setItem('funnel_answers', JSON.stringify(newAnswers));
        setShowCompletion(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsExcluded(false);
    }
  };

  const handleContinue = () => {
    onComplete(answers);
  };

  // Messaggio esclusione per autonomia
  if (isExcluded) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <span className="text-4xl">🤔</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Probabilmente non siamo il centro giusto per te
        </h2>
        <p className="text-muted-foreground mb-8">
          Il nostro metodo è basato su un percorso guidato con personal trainer dedicato. 
          Se preferisci allenarti in totale autonomia, una palestra tradizionale potrebbe essere più adatta alle tue esigenze.
        </p>
        <button 
          onClick={() => setIsExcluded(false)}
          className="text-primary hover:underline font-medium"
        >
          ← Torna indietro e cambia risposta
        </button>
      </div>
    );
  }

  // Messaggio completamento questionario
  if (showCompletion) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Ottimo. Abbiamo le informazioni che ci servono.
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          In base alle tue risposte, possiamo costruire un percorso personalizzato,
          guidato e compatibile con il tuo tempo e i tuoi obiettivi.
        </p>
        
        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Prenota la tua consulenza personalizzata
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <p className="mt-6 text-sm text-muted-foreground">
          Nessun impegno. Valutazione conoscitiva in studio, dedicata solo a te.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep + 1} di {questions.length}
          </span>
          <span className="text-xs text-muted-foreground">
            👉 Meno di 30 secondi
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-8 text-center">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value, option.isExcluding)}
            className={`
              w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3
              ${answers[currentQuestion.id] === option.value 
                ? 'border-primary bg-primary/5 text-foreground' 
                : 'border-border hover:border-primary/50 text-foreground'
              }
            `}
          >
            {option.icon && (
              <span className="text-primary flex-shrink-0">{option.icon}</span>
            )}
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Microcopy */}
      <p className="text-center text-sm text-muted-foreground mb-8">
        {currentQuestion.microcopy}
      </p>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`
            flex items-center gap-2 text-sm font-medium transition-colors
            ${currentStep === 0 
              ? 'text-muted-foreground/50 cursor-not-allowed' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          Indietro
        </button>
      </div>
    </div>
  );
};

export default FunnelQualificationForm;
