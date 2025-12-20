import React from 'react';

interface FunnelProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const FunnelProgress: React.FC<FunnelProgressProps> = ({ 
  currentStep, 
  totalSteps, 
  labels = ['Scopri', 'Qualifica', 'Prenota'] 
}) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-border" />
        
        {/* Progress line filled */}
        <div 
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        
        {/* Step indicators */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          
          return (
            <div key={stepNum} className="relative flex flex-col items-center z-10">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' 
                    : isCurrent 
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              {labels[i] && (
                <span 
                  className={`
                    mt-2 text-xs font-medium transition-colors
                    ${isCurrent ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelProgress;
