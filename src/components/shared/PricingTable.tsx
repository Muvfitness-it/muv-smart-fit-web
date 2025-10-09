import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PricingTier {
  name: string;
  description: string;
  price?: string;
  priceNote?: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
}

interface PricingTableProps {
  title?: string;
  description?: string;
  tiers: PricingTier[];
}

const PricingTable = ({ 
  title = "I Nostri Pacchetti",
  description,
  tiers 
}: PricingTableProps) => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-4">
            {title}
          </h2>
          
          {description && (
            <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              {description}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card 
                key={index}
                className={`relative p-8 ${
                  tier.highlighted 
                    ? 'border-2 border-primary shadow-2xl scale-105 bg-background' 
                    : 'border border-border hover:border-primary/30 transition-colors'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Più scelto
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-heading-md mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-body-md text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                
                {tier.price && (
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {tier.price}
                    </div>
                    {tier.priceNote && (
                      <p className="text-sm text-muted-foreground">
                        {tier.priceNote}
                      </p>
                    )}
                  </div>
                )}
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-body-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  asChild
                  className={`w-full ${
                    tier.highlighted 
                      ? 'bg-primary hover:bg-primary-hover text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary-hover text-secondary-foreground'
                  }`}
                  size="lg"
                >
                  <Link to={tier.cta.href}>
                    {tier.cta.text}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
