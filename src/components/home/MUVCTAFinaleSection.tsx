// Sezione CTA Finale con Form - MUV Fitness
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const MUVCTAFinaleSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nome || !formData.email || !formData.telefono) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi per continuare",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Richiesta inviata!",
      description: "Il nostro staff ti contatterà al più presto.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-2xl">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto" fill="#10B981" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 
                className="mb-4"
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: '#1E3A8A' 
                }}
              >
                Grazie!
              </h3>
              <p 
                style={{ 
                  fontFamily: 'Poppins', 
                  fontSize: '18px', 
                  fontWeight: '400', 
                  color: '#374151' 
                }}
              >
                Il nostro staff ti contatterà al più presto.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Titolo */}
          <h2 
            className="text-center mb-6"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '42px', 
              fontWeight: '700', 
              color: 'white' 
            }}
          >
            Vuoi scoprire MUV Fitness dal vivo?
          </h2>
          
          {/* Testo */}
          <p 
            className="text-center mb-12"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '18px', 
              fontWeight: '400', 
              color: 'white',
              opacity: 0.95
            }}
          >
            Compila il modulo: ti ricontatteremo entro 24 ore per fissare una visita senza impegno.
          </p>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              
              {/* Nome e Cognome */}
              <div>
                <label 
                  htmlFor="nome"
                  className="block mb-2"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#1E3A8A' 
                  }}
                >
                  Nome e Cognome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins', fontSize: '16px' }}
                  placeholder="Mario Rossi"
                  required
                />
              </div>
              
              {/* Email */}
              <div>
                <label 
                  htmlFor="email"
                  className="block mb-2"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#1E3A8A' 
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins', fontSize: '16px' }}
                  placeholder="mario.rossi@email.com"
                  required
                />
              </div>
              
              {/* Telefono */}
              <div>
                <label 
                  htmlFor="telefono"
                  className="block mb-2"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#1E3A8A' 
                  }}
                >
                  Telefono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  style={{ fontFamily: 'Poppins', fontSize: '16px' }}
                  placeholder="3XX XXX XXXX"
                  required
                />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 transition-all duration-300 hover:opacity-80"
                style={{ 
                  backgroundColor: '#F97316', 
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  fontWeight: '500',
                  borderRadius: '12px'
                }}
              >
                Prenota una visita
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MUVCTAFinaleSection;
