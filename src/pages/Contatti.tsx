
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contatti = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CONTATTACI E PRENOTA UN{" "}
              <span className="text-pink-600">CHECK-UP GRATUITO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Inizia il tuo percorso di trasformazione con una consulenza personalizzata gratuita.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contatti;
