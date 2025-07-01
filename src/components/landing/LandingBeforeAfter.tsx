
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  age: number;
  beforeImage?: string;
  afterImage?: string;
  result: string;
  testimonial: string;
  timeframe: string;
}

interface LandingBeforeAfterProps {
  testimonials: Testimonial[];
}

const LandingBeforeAfter: React.FC<LandingBeforeAfterProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-magenta-400">RISULTATI</span> 
            <span className="text-viola-400"> REALI</span> di 
            <span className="text-blu-400"> PERSONE VERE</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-semibold">
            🚫 Non promettiamo miracoli. Ti mostriamo <span className="text-yellow-400 font-black">FATTI CONCRETI</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-magenta-600/30 hover:border-magenta-600/60 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                {(testimonial.beforeImage || testimonial.afterImage) && (
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {testimonial.beforeImage && (
                        <div className="text-center">
                          <img 
                            src={testimonial.beforeImage} 
                            alt="Prima" 
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <span className="text-sm text-gray-400 font-semibold">PRIMA</span>
                        </div>
                      )}
                      {testimonial.afterImage && (
                        <div className="text-center">
                          <img 
                            src={testimonial.afterImage} 
                            alt="Dopo" 
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <span className="text-sm text-green-400 font-semibold">DOPO</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <div className="text-2xl font-black text-magenta-400 mb-1">
                    {testimonial.result}
                  </div>
                  <div className="text-sm text-gray-300">
                    in {testimonial.timeframe}
                  </div>
                </div>
                
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-viola-400 mb-2" />
                  <p className="text-gray-200 italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.age} anni</div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingBeforeAfter;
