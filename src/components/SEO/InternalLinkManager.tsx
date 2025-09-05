import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin, Users, Clock } from 'lucide-react';

interface InternalLinkManagerProps {
  currentPage?: string;
  location?: string;
  serviceType?: string;
}

const InternalLinkManager: React.FC<InternalLinkManagerProps> = ({
  currentPage = '',
  location = 'Legnago',
  serviceType = 'fitness'
}) => {
  
  const getRelatedServices = () => {
    const allServices = [
      { path: '/servizi/personal-training', title: 'Personal Training', description: 'Allenamento personalizzato 1-to-1' },
      { path: '/servizi/ems', title: 'Allenamento EMS', description: '20 minuti = 3 ore di palestra' },
      { path: '/servizi/pilates', title: 'Pilates', description: 'Postura e core strength' },
      { path: '/servizi/hiit', title: 'HIIT', description: 'Alta intensità per bruciare grassi' },
      { path: '/servizi/nutrizione', title: 'Consulenza Nutrizionale', description: 'Piani alimentari personalizzati' },
      { path: '/servizi/massoterapia', title: 'Massoterapia', description: 'Recupero e benessere muscolare' }
    ];
    
    // Exclude current page and return 3 related services
    return allServices.filter(service => service.path !== currentPage).slice(0, 3);
  };

  const getLocalPages = () => {
    if (location === 'Legnago') {
      return [
        { path: '/servizi/personal-training', title: 'Personal Training', icon: Users },
        { path: '/palestra-legnago', title: 'Palestra Legnago', icon: MapPin },
        { path: '/dimagrire-legnago', title: 'Dimagrire Legnago', icon: Clock }
      ];
    }
    return [];
  };

  const relatedServices = getRelatedServices();
  const localPages = getLocalPages();

  if (relatedServices.length === 0 && localPages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        
        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Altri <span className="text-primary">Servizi MUV Fitness</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-3 text-primary">{service.title}</h4>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Link to={service.path} className="inline-flex items-center text-primary font-semibold hover:underline">
                      Scopri di più <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Local SEO Pages */}
        {localPages.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Servizi Fitness <span className="text-primary">a {location}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {localPages.map((page, index) => {
                const IconComponent = page.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="text-lg font-bold mb-3">{page.title}</h4>
                      <Link to={page.path} className="inline-flex items-center text-primary font-semibold hover:underline">
                        Vai alla pagina <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA to main services page */}
        <div className="text-center mt-12">
          <Link to="/servizi" className="inline-flex items-center text-lg font-semibold text-primary hover:underline">
            Vedi tutti i servizi MUV Fitness <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InternalLinkManager;