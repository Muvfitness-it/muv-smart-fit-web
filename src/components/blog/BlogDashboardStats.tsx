import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface BlogStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  thisWeekArticles: number;
  thisWeekViews: number;
}

const BlogDashboardStats = () => {
  const [stats, setStats] = useState<BlogStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    thisWeekArticles: 0,
    thisWeekViews: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total articles and by status
        const { data: articles, error: articlesError } = await supabase
          .from('blog_posts')
          .select('id, status, views_count, created_at');

        if (articlesError) {
          console.error('Error fetching articles:', articlesError);
          return;
        }

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const totalArticles = articles?.length || 0;
        const publishedArticles = articles?.filter(a => a.status === 'published').length || 0;
        const draftArticles = articles?.filter(a => a.status === 'draft').length || 0;
        const totalViews = articles?.reduce((sum, article) => sum + (article.views_count || 0), 0) || 0;
        
        const thisWeekArticles = articles?.filter(a => 
          new Date(a.created_at) >= oneWeekAgo
        ).length || 0;

        const thisWeekViews = articles?.filter(a => 
          new Date(a.created_at) >= oneWeekAgo
        ).reduce((sum, article) => sum + (article.views_count || 0), 0) || 0;

        setStats({
          totalArticles,
          publishedArticles,
          draftArticles,
          totalViews,
          thisWeekArticles,
          thisWeekViews
        });

      } catch (error) {
        console.error('Error fetching blog stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Articoli Totali
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalArticles}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.thisWeekArticles} questa settimana
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Visualizzazioni Totali
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.thisWeekViews} questa settimana
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Articoli Pubblicati
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.publishedArticles}</div>
          <p className="text-xs text-muted-foreground">
            {stats.draftArticles} in bozza
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Media Visualizzazioni
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.publishedArticles > 0 
              ? Math.round(stats.totalViews / stats.publishedArticles).toLocaleString()
              : '0'
            }
          </div>
          <p className="text-xs text-muted-foreground">
            per articolo pubblicato
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDashboardStats;