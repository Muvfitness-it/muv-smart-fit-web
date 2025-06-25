
import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Calculator, Eye } from 'lucide-react';

const AnalyticsDisplay = () => {
  const { analyticsData, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-600 rounded w-16"></div>
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
      value: analyticsData.totalSiteVisits.toLocaleString(),
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      title: 'Visitatori Oggi',
      value: analyticsData.uniqueVisitorsToday.toLocaleString(),
      icon: Users,
      color: 'text-green-400'
    },
    {
      title: 'Utilizzi Planner',
      value: analyticsData.totalPlannerUsage.toLocaleString(),
      icon: Calculator,
      color: 'text-purple-400'
    },
    {
      title: 'Planner Oggi',
      value: analyticsData.plannerUsageToday.toLocaleString(),
      icon: TrendingUp,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <IconComponent className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsDisplay;
