
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-pink-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-white mb-4">
            Pagina Non Trovata
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Ops! La pagina che stai cercando non esiste o è stata spostata. 
            <span className="text-pink-400 block mt-2">
              Ma non preoccuparti, il tuo percorso fitness ti aspetta!
            </span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Torna alla Home
            </Button>
          </Link>
          
          <Link to="/contatti">
            <Button 
              variant="outline" 
              className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Prenota Prova Gratuita
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-400">
          <p>Se pensi che questa sia un'errore, contattaci a info@muvfitness.it</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
