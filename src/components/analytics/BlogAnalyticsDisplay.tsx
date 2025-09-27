import React, { useEffect, useState } from 'react';
import { useBlogAnalytics } from '@/hooks/useBlogAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Clock, Search, Users, TrendingUp, MousePointer, 
  BarChart3, Calendar, RefreshCw, BookOpen, Target 
} from 'lucide-react';

const BlogAnalyticsDisplay = () => {
  const { analyticsData, isLoading, fetchBlogAnalytics } = useBlogAnalytics();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchBlogAnalytics();
    setLastUpdated(new Date());
  }, [fetchBlogAnalytics]);

  const handleRefresh = async () => {
    await fetchBlogAnalytics();
    setLastUpdated(new Date());
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      title: 'Visite Blog Totali',
      value: analyticsData.totalBlogViews.toLocaleString('it-IT'),
      icon: Eye,
      gradient: 'from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))]',
      bgGradient: 'from-[hsl(var(--brand-primary)/0.1)] to-[hsl(var(--brand-secondary)/0.05)]',
      description: 'Visualizzazioni cumulative'
    },
    {
      title: 'Sessioni Uniche',
      value: analyticsData.totalBlogSessions.toLocaleString('it-IT'),
      icon: Users,
      gradient: 'from-[hsl(var(--brand-secondary))] to-[hsl(var(--brand-accent))]',
      bgGradient: 'from-[hsl(var(--brand-secondary)/0.1)] to-[hsl(var(--brand-accent)/0.05)]',
      description: 'Sessioni di lettura'
    },
    {
      title: 'Tempo Medio',
      value: formatTime(analyticsData.avgTimeOnPage),
      icon: Clock,
      gradient: 'from-[hsl(var(--brand-accent))] to-[hsl(var(--brand-primary))]',
      bgGradient: 'from-[hsl(var(--brand-accent)/0.1)] to-[hsl(var(--brand-primary)/0.05)]',
      description: 'Permanenza su pagina'
    },
    {
      title: 'Ricerche Totali',
      value: analyticsData.totalSearches.toLocaleString('it-IT'),
      icon: Search,
      gradient: 'from-[hsl(var(--brand-primary))] via-[hsl(var(--brand-secondary))] to-[hsl(var(--brand-accent))]',
      bgGradient: 'from-[hsl(var(--brand-primary)/0.1)] to-[hsl(var(--brand-accent)/0.05)]',
      description: 'Query di ricerca'
    },
    {
      title: 'Frequenza Rimbalzo',
      value: `${analyticsData.bounceRate}%`,
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/5',
      description: 'Utenti usciti subito'
    },
    {
      title: 'Visite Oggi',
      value: analyticsData.dailyViews.toLocaleString('it-IT'),
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/5',
      description: 'Visualizzazioni giornaliere'
    },
    {
      title: 'Visite Settimana',
      value: analyticsData.weeklyViews.toLocaleString('it-IT'),
      icon: TrendingUp,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/5',
      description: 'Visualizzazioni settimanali'
    },
    {
      title: 'Visite Mese',
      value: analyticsData.monthlyViews.toLocaleString('it-IT'),
      icon: BarChart3,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/5',
      description: 'Visualizzazioni mensili'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))] shadow-lg">
            <BookOpen className="h-5 w-5 text-[hsl(var(--muv-on-dark))]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Blog Analytics</h2>
            <p className="text-sm text-muted-foreground">
              Statistiche dettagliate del blog
              {lastUpdated && (
                <span className="ml-2">
                  • Aggiornato: {lastUpdated.toLocaleTimeString('it-IT')}
                </span>
              )}
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Aggiorna
        </Button>
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
                  <IconComponent className="h-4 w-4 text-white" />
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

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Posts */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[hsl(var(--brand-primary))]" />
              Articoli Più Letti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analyticsData.mostViewedPosts.length > 0 ? (
              analyticsData.mostViewedPosts.slice(0, 5).map((post, index) => (
                <div key={post.post_id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="min-w-[1.5rem] h-6 text-xs font-medium">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm line-clamp-2">{post.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span className="text-sm font-medium">{post.views}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nessun dato disponibile
              </p>
            )}
          </CardContent>
        </Card>

        {/* Top Search Queries */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-[hsl(var(--brand-secondary))]" />
              Ricerche Più Frequenti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analyticsData.topSearchQueries.length > 0 ? (
              analyticsData.topSearchQueries.slice(0, 5).map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="min-w-[1.5rem] h-6 text-xs font-medium">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{query.query}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MousePointer className="h-3 w-3" />
                    <span className="text-sm font-medium">{query.count}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nessuna ricerca registrata
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogAnalyticsDisplay;