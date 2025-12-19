import { AlertCircle } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    "Diete che funzionano 2 settimane e poi nulla",
    "Palestre affollate dove ti senti perso",
    "Personal trainer che ti danno schede standard",
    "App che promettono miracoli ma non cambiano nulla"
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-foreground">
            Hai già provato di tutto?
          </h2>
          
          <div className="space-y-4 mb-10">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-background border border-border rounded-xl p-4 text-left"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-foreground/90">{problem}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8">
            <p className="text-xl md:text-2xl font-semibold text-primary">
              Il problema non sei tu.
            </p>
            <p className="text-lg md:text-xl text-foreground/80 mt-2">
              È l'approccio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
