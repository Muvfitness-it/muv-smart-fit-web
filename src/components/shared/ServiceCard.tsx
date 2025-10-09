import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ServiceCardProps {
  icon?: LucideIcon;
  iconColor?: 'primary' | 'secondary' | 'accent';
  title: string;
  subtitle?: string;
  description: string;
  link: string;
  image?: string;
}

const ServiceCard = ({
  icon: Icon,
  iconColor = 'primary',
  title,
  subtitle,
  description,
  link,
  image,
}: ServiceCardProps) => {
  const colorMap = {
    primary: {
      icon: 'text-primary',
      bg: 'bg-primary/10',
      accent: 'text-primary'
    },
    secondary: {
      icon: 'text-secondary',
      bg: 'bg-secondary/10',
      accent: 'text-secondary'
    },
    accent: {
      icon: 'text-accent',
      bg: 'bg-accent/10',
      accent: 'text-accent'
    }
  };
  
  const colors = colorMap[iconColor];
  
  return (
    <Link to={link} className="block group">
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
        {image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-6">
          {Icon && (
            <div className={`mb-4 inline-flex p-4 rounded-full ${colors.bg}`}>
              <Icon className={`w-10 h-10 ${colors.icon}`} strokeWidth={1.5} />
            </div>
          )}
          
          <h3 className="text-heading-sm mb-2">
            {title}
          </h3>
          
          {subtitle && (
            <p className={`text-lg font-semibold mb-3 ${colors.accent}`}>
              {subtitle}
            </p>
          )}
          
          <p className="text-body-md text-muted-foreground mb-6">
            {description}
          </p>
          
          <div className={`flex items-center gap-2 font-semibold transition-all group-hover:gap-3 ${colors.accent}`}>
            <span>Scopri di più</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCard;
