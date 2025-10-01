import { useContactForm } from '@/hooks/useContactForm';

const MUVCTAFinaleSection = () => {
  const { formData, isSubmitted, handleChange, handleSubmit } = useContactForm();

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-2xl">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-heading-lg mb-4">
                Grazie!
              </h3>
              <p className="text-body-lg">
                Il nostro staff ti contatterà al più presto.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-6 text-white">
            Vuoi scoprire MUV Fitness dal vivo?
          </h2>
          
          <p className="text-body-lg text-center mb-12 text-white/95">
            Compila il modulo: ti ricontatteremo entro 24 ore per fissare una visita senza impegno.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              
              <div>
                <label htmlFor="nome" className="text-label block mb-2 text-primary">
                  Nome e Cognome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Mario Rossi"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-label block mb-2 text-primary">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="mario.rossi@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="telefono" className="text-label block mb-2 text-primary">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="3XX XXX XXXX"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn-accent w-full text-lg py-4"
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
