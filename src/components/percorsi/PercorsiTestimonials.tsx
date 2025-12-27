import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Gender } from './GenderSelector';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  gender: 'donna' | 'uomo';
  percorso: 'START' | 'TRASFORMAZIONE' | 'ELITE';
  quote: string;
  result: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  // Testimonianze Donna
  {
    id: 'd1',
    name: 'Giulia M.',
    age: 34,
    gender: 'donna',
    percorso: 'TRASFORMAZIONE',
    quote: 'Finalmente ho trovato un posto dove mi sento a mio agio. I risultati sulla cellulite sono incredibili.',
    result: '-2 taglie in 8 settimane'
  },
  {
    id: 'd2',
    name: 'Francesca R.',
    age: 42,
    gender: 'donna',
    percorso: 'ELITE',
    quote: 'Il percorso Elite ha superato ogni aspettativa. Pelle più tonica, silhouette definita e un\'energia che non avevo da anni.',
    result: 'Trasformazione completa in 12 settimane'
  },
  {
    id: 'd3',
    name: 'Sara L.',
    age: 28,
    gender: 'donna',
    percorso: 'START',
    quote: 'Perfetto per iniziare! Ho capito subito che questo metodo funziona davvero.',
    result: 'Glutei più tonici in 4 settimane'
  },
  {
    id: 'd4',
    name: 'Valentina C.',
    age: 38,
    gender: 'donna',
    percorso: 'TRASFORMAZIONE',
    quote: 'Dopo due gravidanze pensavo fosse impossibile tornare in forma. Mi sbagliavo.',
    result: '-8 cm di girovita'
  },
  // Testimonianze Uomo
  {
    id: 'u1',
    name: 'Marco B.',
    age: 45,
    gender: 'uomo',
    percorso: 'TRASFORMAZIONE',
    quote: 'Lavoro 12 ore al giorno. Con 2 sessioni a settimana ho ottenuto risultati che non avevo in palestra con 5 allenamenti.',
    result: '-5 kg di grasso, +3 kg di muscolo'
  },
  {
    id: 'u2',
    name: 'Andrea P.',
    age: 52,
    gender: 'uomo',
    percorso: 'ELITE',
    quote: 'Il mal di schiena che mi perseguitava da anni è sparito. E fisicamente non sono mai stato così in forma.',
    result: 'Zero mal di schiena, addome definito'
  },
  {
    id: 'u3',
    name: 'Luca T.',
    age: 31,
    gender: 'uomo',
    percorso: 'START',
    quote: 'Ero scettico sulla tecnologia EMS. Dopo la prima prova ho capito che era quello che cercavo.',
    result: '+15% massa muscolare in 6 settimane'
  },
  {
    id: 'u4',
    name: 'Roberto G.',
    age: 48,
    gender: 'uomo',
    percorso: 'TRASFORMAZIONE',
    quote: 'Finalmente un approccio serio e professionale. Niente palestre affollate, solo risultati concreti.',
    result: 'Pancia piatta dopo 10 settimane'
  }
];

interface PercorsiTestimonialsProps {
  gender: Gender;
}

const PercorsiTestimonials: React.FC<PercorsiTestimonialsProps> = ({ gender }) => {
  // Filter testimonials based on selected gender, or show all if none selected
  const filteredTestimonials = gender 
    ? testimonials.filter(t => t.gender === gender)
    : testimonials.slice(0, 4); // Show first 4 (2 donna + 2 uomo) if no selection

  const percorsoColors = {
    START: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    TRASFORMAZIONE: 'bg-primary/10 text-primary border-primary/20',
    ELITE: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {gender === 'donna' 
              ? 'Storie di donne come te' 
              : gender === 'uomo' 
                ? 'Storie di uomini come te' 
                : 'Storie di trasformazione'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {gender === 'donna'
              ? 'Scopri come altre donne hanno raggiunto i loro obiettivi con il metodo MUV.'
              : gender === 'uomo'
                ? 'Scopri come altri uomini hanno raggiunto i loro obiettivi con il metodo MUV.'
                : 'Risultati reali di persone reali che hanno scelto MUV.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredTestimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="p-6 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              
              {/* Quote */}
              <p className="text-foreground text-lg mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Result Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="h-3 w-3 fill-current" />
                  {testimonial.result}
                </span>
              </div>
              
              {/* Author */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.age} anni
                  </p>
                </div>
                
                {/* Percorso Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${percorsoColors[testimonial.percorso]}`}>
                  Percorso {testimonial.percorso}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Stars rating */}
        <div className="text-center mt-10">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            4.9/5 basato su 120+ recensioni verificate
          </p>
        </div>
      </div>
    </section>
  );
};

export default PercorsiTestimonials;
