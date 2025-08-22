import { Link } from 'react-router-dom';
import { Star, TrendingDown, TrendingUp } from 'lucide-react';

const ProofSection = () => {
  const testimonials = [
    {
      name: "Laura M.",
      age: 35,
      weeks: 8,
      results: "-6cm vita, -4cm fianchi",
      note: "EMS 2x/sett + Pressoterapia. Obiettivo: forma pre-gravidanza"
    },
    {
      name: "Marco R.",
      age: 42,
      weeks: 12,
      results: "-8cm vita, +15% forza",  
      note: "Personal Training + Pancafit per mal di schiena cronico"
    },
    {
      name: "Giulia T.",
      age: 28,
      weeks: 6,
      results: "-3cm cosce, gambe leggere",
      note: "Vacuum + Pressoterapia per ritenzione idrica"
    }
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-6 font-heading text-white">
            Prove reali
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trasformazioni documentate con misure e tempi precisi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.age} anni • {testimonial.weeks} settimane</p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center text-brand-primary font-bold mb-2">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  {testimonial.results}
                </div>
              </div>
              
              <p className="text-sm text-gray-300 italic">
                "{testimonial.note}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/risultati" 
            className="inline-flex items-center bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
          >
            Vedi tutte le trasformazioni
            <TrendingUp className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;