import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; isExcluding?: boolean }[];
  optional?: boolean;
}

interface FunnelQualificationFormProps {
  onComplete: (answers: Record<string, string>) => void;
}

const questions: Question[] = [
  {
    id: 'obiettivo',
    question: 'Qual è il tuo obiettivo principale?',
    options: [
      { value: 'dimagrire', label: 'Dimagrire e perdere peso' },
      { value: 'tonificare', label: 'Tonificare e rassodare' },
      { value: 'cellulite', label: 'Eliminare la cellulite' },
      { value: 'postura', label: 'Migliorare postura e mal di schiena' },
      { value: 'benessere', label: 'Ritrovare energia e benessere' },
    ],
  },
  {
    id: 'tempo',
    question: 'Quanto tempo puoi dedicare all\'allenamento?',
    options: [
      { value: '2x', label: '2 volte a settimana (40 min totali)' },
      { value: '3x', label: '3 volte a settimana (1 ora totale)' },
      { value: '4x+', label: 'Più di 3 volte a settimana' },
    ],
  },
  {
    id: 'esperienza',
    question: 'Hai già provato altri percorsi senza successo?',
    options: [
      { value: 'palestra', label: 'Sì, palestre tradizionali' },
      { value: 'diete', label: 'Sì, diete fai da te' },
      { value: 'app', label: 'Sì, app e programmi online' },
      { value: 'prima_volta', label: 'No, è la prima volta' },
    ],
  },
  {
    id: 'guida',
    question: 'Preferisci allenarti da solo/a o con guida costante?',
    options: [
      { value: 'seguito', label: 'Preferisco essere seguito/a passo passo' },
      { value: 'mix', label: 'Vorrei un mix di autonomia e guida' },
      { value: 'autonomo', label: 'Preferisco totale autonomia', isExcluding: true },
    ],
  },
  // Correzione #3: 5° domanda filtro opzionale
  {
    id: 'ostacolo',
    question: 'Cosa ti ha impedito finora di ottenere risultati?',
    optional: true,
    options: [
      { value: 'tempo', label: 'Mancanza di tempo' },
      { value: 'guida', label: 'Mancanza di guida' },
      { value: 'dolori', label: 'Dolori / limiti fisici' },
      { value: 'motivazione', label: 'Scarsa motivazione' },
      { value: 'altro', label: 'Altro' },
    ],
  },
];

const FunnelQualificationForm: React.FC<FunnelQualificationFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExcluded, setIsExcluded] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSelect = (value: string, isExcluding?: boolean) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (isExcluding) {
      setIsExcluded(true);
      return;
    }
    
    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        onComplete(answers);
      }
    }, 300);
  };

  const handleSkip = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsExcluded(false);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  if (isExcluded) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <span className="text-4xl">🤔</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          MUV potrebbe non essere la soluzione ideale per te
        </h2>
        <p className="text-muted-foreground mb-8">
          Il nostro metodo è basato su un percorso guidato con personal trainer dedicato. 
          Se preferisci allenarti in autonomia, una palestra tradizionale potrebbe essere più adatta.
        </p>
        <button 
          onClick={() => setIsExcluded(false)}
          className="text-primary hover:underline"
        >
          ← Torna indietro e cambia risposta
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Domanda {currentStep + 1} di {questions.length}
          </span>
          {currentQuestion.optional && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
              Opzionale
            </span>
          )}
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
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value, option.isExcluding)}
            className={`
              w-full p-4 rounded-xl border-2 text-left transition-all duration-200
              ${answers[currentQuestion.id] === option.value 
                ? 'border-primary bg-primary/5 text-foreground' 
                : 'border-border hover:border-primary/50 text-foreground'
              }
            `}
          >
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>

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

        {currentQuestion.optional && (
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Salta →
          </button>
        )}

        {currentStep === questions.length - 1 && answers[currentQuestion.id] && (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Continua
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FunnelQualificationForm;
