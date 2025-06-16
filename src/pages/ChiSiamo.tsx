
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ChiSiamo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">
            NON UNA PALESTRA, UN{" "}
            <span className="text-pink-600">PROGETTO</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center"
                alt="MUV Fitness Environment"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-xl leading-relaxed">
                MUV Fitness non è una semplice palestra, ma un progetto innovativo che coniuga 
                scienza, tecnologia e passione per il benessere. Il nostro approccio si basa su 
                metodologie scientifiche avanzate e tecnologie all'avanguardia.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Ogni programma di allenamento è personalizzato e studiato per garantire risultati 
                concreti e duraturi. Il nostro team di professionisti qualificati ti accompagnerà 
                in ogni fase del tuo percorso di trasformazione.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-300">
                Crediamo nel fitness intelligente: un approccio che unisce l'efficacia dell'allenamento 
                tradizionale con l'innovazione tecnologica, per offrirti un'esperienza unica e risultati 
                straordinari.
              </p>
              
              <Link to="/team">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
                  Conosci il nostro Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
