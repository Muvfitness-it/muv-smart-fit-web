
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Calendar, TrendingUp, Users, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  avgReadingTime: number;
  recentActivity: Array<{
    id: string;
    title: string;
    action: string;
    date: string;
  }>;
}

const BlogAdminStats: React.FC = () => {
  const [stats, setStats] = useState<BlogStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    avgReadingTime: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: articles, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalArticles = articles?.length || 0;
      const publishedArticles = articles?.filter(a => a.status === 'published').length || 0;
      const draftArticles = articles?.filter(a => a.status === 'draft').length || 0;
      const totalViews = articles?.reduce((sum, a) => sum + (a.views_count || 0), 0) || 0;
      const avgReadingTime = articles?.length > 0 
        ? Math.round(articles.reduce((sum, a) => sum + (a.reading_time || 0), 0) / articles.length)
        : 0;

      const recentActivity = articles?.slice(0, 5).map(article => ({
        id: article.id,
        title: article.title,
        action: article.status === 'published' ? 'Pubblicato' : 'Salvato come bozza',
        date: new Date(article.updated_at).toLocaleDateString('it-IT')
      })) || [];

      setStats({
        totalArticles,
        publishedArticles,
        draftArticles,
        totalViews,
        avgReadingTime,
        recentActivity
      });
    } catch (error) {
      console.error('Errore caricamento statistiche:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-600 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-magenta-600 rounded">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Totale Articoli</p>
                <p className="text-2xl font-bold text-white">{stats.totalArticles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-600 rounded">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Pubblicati</p>
                <p className="text-2xl font-bold text-white">{stats.publishedArticles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Visualizzazioni</p>
                <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-600 rounded">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Tempo Lettura Medio</p>
                <p className="text-2xl font-bold text-white">{stats.avgReadingTime} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Attività Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <div>
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-400">{activity.date}</p>
                  </div>
                  <Badge variant={activity.action === 'Pubblicato' ? 'default' : 'secondary'}>
                    {activity.action}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Nessuna attività recente</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Articoli per Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pubblicati</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalArticles > 0 ? (stats.publishedArticles / stats.totalArticles) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold">{stats.publishedArticles}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Bozze</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalArticles > 0 ? (stats.draftArticles / stats.totalArticles) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold">{stats.draftArticles}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Metriche Coinvolgimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Views per articolo</span>
                <span className="text-white font-semibold">
                  {stats.publishedArticles > 0 ? Math.round(stats.totalViews / stats.publishedArticles) : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tempo lettura medio</span>
                <span className="text-white font-semibold">{stats.avgReadingTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tasso pubblicazione</span>
                <span className="text-white font-semibold">
                  {stats.totalArticles > 0 ? Math.round((stats.publishedArticles / stats.totalArticles) * 100) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogAdminStats;
