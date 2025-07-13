import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const BreadcrumbSchema: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: 'https://www.muvfitness.it/' }
    ];

    if (pathname === '/') return breadcrumbs;

    const pathSegments = pathname.split('/').filter(segment => segment);
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let name = segment;
      
      // Map path segments to readable names
      switch (segment) {
        case 'chi-siamo':
          name = 'Chi Siamo';
          break;
        case 'servizi':
          name = 'Servizi';
          break;
        case 'personal-training':
          name = 'Personal Training';
          break;
        case 'small-group':
          name = 'Small Group';
          break;
        case 'ems':
          name = 'EMS';
          break;
        case 'hiit':
          name = 'HIIT';
          break;
        case 'pilates':
          name = 'Pilates';
          break;
        case 'pancafit':
          name = 'Pancafit';
          break;
        case 'nutrizione':
          name = 'Nutrizione';
          break;
        case 'massoterapia':
          name = 'Massoterapia';
          break;
        case 'psicologo':
          name = 'Psicologo';
          break;
        case 'team':
          name = 'Team';
          break;
        case 'risultati':
          name = 'Risultati';
          break;
        case 'blog':
          name = 'Blog';
          break;
        case 'contatti':
          name = 'Contatti';
          break;
        case 'muv-planner':
          name = 'MUV Planner';
          break;
        case 'trasformazione-30-giorni':
          name = 'Trasformazione 30 Giorni';
          break;
        case 'privacy':
          name = 'Privacy Policy';
          break;
        case 'cookie-policy':
          name = 'Cookie Policy';
          break;
        default:
          // For blog posts and other dynamic content
          name = segment.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
      }

      breadcrumbs.push({
        name,
        url: `https://www.muvfitness.it${currentPath}`
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;