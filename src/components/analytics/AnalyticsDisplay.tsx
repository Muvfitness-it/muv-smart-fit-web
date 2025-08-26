
import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Calculator, Eye, Activity, BarChart3 } from 'lucide-react';

const AnalyticsDisplay = () => {
  const { analyticsData, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-muted/60 rounded w-20"></div>
                  <div className="h-4 w-4 bg-muted/60 rounded"></div>
                </div>
                <div className="h-8 bg-muted/60 rounded w-16"></div>
                <div className="h-2 bg-muted/30 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Visite Totali',
      value: analyticsData.totalSiteVisits.toLocaleString('it-IT'),
      icon: Eye,
      gradient: 'from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))]',
      bgGradient: 'from-[hsl(var(--brand-primary)/0.1)] to-[hsl(var(--brand-secondary)/0.05)]',
      description: 'Visite cumulative al sito'
    },
    {
      title: 'Visitatori Oggi',
      value: analyticsData.uniqueVisitorsToday.toLocaleString('it-IT'),
      icon: Users,
      gradient: 'from-[hsl(var(--brand-secondary))] to-[hsl(var(--brand-accent))]',
      bgGradient: 'from-[hsl(var(--brand-secondary)/0.1)] to-[hsl(var(--brand-accent)/0.05)]',
      description: 'Visitatori unici di oggi'
    },
    {
      title: 'Utilizzi Planner',
      value: analyticsData.totalPlannerUsage.toLocaleString('it-IT'),
      icon: Calculator,
      gradient: 'from-[hsl(var(--brand-accent))] to-[hsl(var(--brand-primary))]',
      bgGradient: 'from-[hsl(var(--brand-accent)/0.1)] to-[hsl(var(--brand-primary)/0.05)]',
      description: 'Piani alimentari generati'
    },
    {
      title: 'Planner Oggi',
      value: analyticsData.plannerUsageToday.toLocaleString('it-IT'),
      icon: TrendingUp,
      gradient: 'from-[hsl(var(--brand-primary))] via-[hsl(var(--brand-secondary))] to-[hsl(var(--brand-accent))]',
      bgGradient: 'from-[hsl(var(--brand-primary)/0.1)] to-[hsl(var(--brand-accent)/0.05)]',
      description: 'Utilizzi planner di oggi'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))] shadow-lg">
          <BarChart3 className="h-5 w-5 text-[hsl(var(--muv-on-dark))]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Dashboard Analytics</h2>
          <p className="text-sm text-muted-foreground">Statistiche in tempo reale</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden bg-card/80 border-border/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
              
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground/90 group-hover:text-foreground transition-colors">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full bg-gradient-to-r ${stat.gradient} shadow-md`}>
                  <IconComponent className="h-4 w-4 text-[hsl(var(--muv-on-dark))]" />
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-2">
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground/70">
                  {stat.description}
                </p>
                
                {/* Progress indicator */}
                <div className="mt-3 h-1 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: '75%' }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Activity className="h-3 w-3 animate-pulse text-[hsl(var(--brand-primary))]" />
        <span>Aggiornato in tempo reale</span>
      </div>
    </div>
  );
};

export default AnalyticsDisplay;
