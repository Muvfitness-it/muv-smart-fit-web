import { TrendingUp, Users, Star, Award } from 'lucide-react';

interface Metric {
  icon: typeof TrendingUp;
  value: string;
  label: string;
  color?: 'primary' | 'secondary' | 'accent';
}

interface ProofMetricsProps {
  metrics?: Metric[];
}

const defaultMetrics: Metric[] = [
  {
    icon: Users,
    value: "500+",
    label: "Trasformazioni verificate",
    color: 'primary'
  },
  {
    icon: Star,
    value: "95%",
    label: "Soddisfazione clienti",
    color: 'secondary'
  },
  {
    icon: TrendingUp,
    value: "4-8",
    label: "Settimane per risultati visibili",
    color: 'accent'
  },
  {
    icon: Award,
    value: "10+",
    label: "Anni di esperienza certificata",
    color: 'primary'
  }
];

const ProofMetrics = ({ metrics = defaultMetrics }: ProofMetricsProps) => {
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  };
  
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const color = colorMap[metric.color || 'primary'];
              
              return (
                <div key={index} className="text-center">
                  <Icon className={`w-12 h-12 ${color} mx-auto mb-4`} strokeWidth={1.5} />
                  <div className={`text-4xl md:text-5xl font-bold ${color} mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-body-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofMetrics;
