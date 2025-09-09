import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];
    
    // Map path segments to readable labels
    const pathLabels: Record<string, string> = {
      'servizi': 'Servizi',
      'personal-training': 'Personal Training',
      'ems': 'Allenamento EMS',
      'pilates': 'Pilates',
      'hiit': 'HIIT',
      'nutrizione': 'Nutrizione',
      'massoterapia': 'Massoterapia',
      'pancafit': 'Pancafit',
      'psicologo': 'Psicologo Sportivo',
      'small-group': 'Small Group',
      'chi-siamo': 'Chi Siamo',
      'team': 'Team',
      'risultati': 'Risultati',
      'contatti': 'Contatti',
      'blog': 'Blog',
      'privacy': 'Privacy Policy',
      'cookie-policy': 'Cookie Policy',
      'pilates-legnago': 'Pilates Legnago',
      'palestra-legnago': 'Palestra Legnago',
      'dimagrire-legnago': 'Dimagrire Legnago',
      'mal-di-schiena-legnago': 'Mal di Schiena Legnago',
      'massaggio-sportivo-legnago': 'Massaggio Sportivo Legnago',
      'cerea-fitness': 'Fitness Cerea',
      'bovolone-fitness': 'Fitness Bovolone',
      'san-bonifacio-fitness': 'Fitness San Bonifacio',
      'trasformazione-30-giorni': 'Trasformazione 30 Giorni'
    };
    
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = pathLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbs.push({
        label,
        path: currentPath
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs(location.pathname);
  
  // Don't show breadcrumbs on homepage or if only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://www.muvfitness.it${crumb.path}`
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-white mx-2" />
                )}
                {index === 0 ? (
                  <Link 
                    to={crumb.path} 
                    className="flex items-center text-white font-bold hover:text-primary transition-colors"
                    aria-label="Torna alla homepage"
                  >
                    <Home className="w-4 h-4 mr-1" />
                    {crumb.label}
                  </Link>
                ) : index === breadcrumbs.length - 1 ? (
                  <span className="text-white font-bold" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link 
                    to={crumb.path} 
                    className="text-white font-bold hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default BreadcrumbNavigation;