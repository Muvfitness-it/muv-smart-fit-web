import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useSiteConfig, useUpdateSiteConfig } from '@/hooks/useSiteConfig';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import {
  LayoutDashboard,
  FileText,
  Search,
  Users,
  Target,
  Mail,
  Palette,
  Settings,
  Plus,
  Sparkles,
  PenTool,
  Eye,
  Edit,
  RefreshCw,
  Send,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  Phone,
  Calendar,
  Save,
  Globe,
  FileImage,
  Download,
  Loader2,
  Flame,
  Thermometer,
  Snowflake
} from 'lucide-react';

// Dashboard Stats Interface
interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalLeads: number;
  recentLeads: number;
  chatConversations: number;
  newsletterSubscribers: number;
  seoAlerts: number;
  indexedArticles: number;
}

// Lead interface with score
interface LeadWithScore {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
  score?: number;
  score_level?: string;
}

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  updated_at: string;
  views_count: number | null;
}

// SEO Log interface
interface SEOLog {
  id: string;
  url: string;
  title: string | null;
  indexing_status: string;
  days_in_current_status: number | null;
  meta_description: string | null;
}

// Newsletter subscriber
interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  status: string;
  subscribed_at: string;
}

export default function AdminControl() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signOut } = useAdminAuth();
  const { config, isLoading: configLoading, refetch: refetchConfig } = useSiteConfig();
  const updateConfig = useUpdateSiteConfig();

  // States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalLeads: 0,
    recentLeads: 0,
    chatConversations: 0,
    newsletterSubscribers: 0,
    seoAlerts: 0,
    indexedArticles: 0
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [leads, setLeads] = useState<LeadWithScore[]>([]);
  const [seoLogs, setSeoLogs] = useState<SEOLog[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [blogFilter, setBlogFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [leadFilter, setLeadFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');

  // Config states
  const [colors, setColors] = useState(config.colors);
  const [contact, setContact] = useState(config.contact);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin/auth');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  useEffect(() => {
    setColors(config.colors);
    setContact(config.contact);
  }, [config]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadDashboardStats(),
        loadBlogPosts(),
        loadLeads(),
        loadSEOLogs(),
        loadNewsletterSubscribers()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      // Blog posts count
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('id, status');
      
      const published = posts?.filter(p => p.status === 'published').length || 0;
      const drafts = posts?.filter(p => p.status === 'draft').length || 0;

      // Leads count
      const { data: leadsData } = await supabase
        .from('leads')
        .select('id, created_at');
      
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const recentLeads = leadsData?.filter(l => new Date(l.created_at) > sevenDaysAgo).length || 0;

      // Chat conversations
      const { count: chatCount } = await supabase
        .from('chat_conversations')
        .select('id', { count: 'exact', head: true });

      // Newsletter subscribers
      const { count: subscribersCount } = await supabase
        .from('newsletter_subscribers')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active');

      // SEO alerts (critical articles)
      const { data: seoData } = await supabase
        .from('seo_monitoring_log')
        .select('id, indexing_status, days_in_current_status');
      
      const criticalSEO = seoData?.filter(s => 
        s.indexing_status !== 'indexed' && (s.days_in_current_status || 0) > 14
      ).length || 0;

      const indexed = seoData?.filter(s => s.indexing_status === 'indexed').length || 0;

      setStats({
        totalArticles: posts?.length || 0,
        publishedArticles: published,
        draftArticles: drafts,
        totalLeads: leadsData?.length || 0,
        recentLeads,
        chatConversations: chatCount || 0,
        newsletterSubscribers: subscribersCount || 0,
        seoAlerts: criticalSEO,
        indexedArticles: indexed
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, status, published_at, updated_at, views_count')
        .order('updated_at', { ascending: false })
        .limit(50);
      
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const loadLeads = async () => {
    try {
      const { data: leadsData } = await supabase
        .from('leads')
        .select('id, name, email, phone, source, status, created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      const { data: scoresData } = await supabase
        .from('lead_scores')
        .select('lead_id, score, score_level');

      const leadsWithScores = (leadsData || []).map(lead => {
        const scoreData = scoresData?.find(s => s.lead_id === lead.id);
        return {
          ...lead,
          score: scoreData?.score || 0,
          score_level: scoreData?.score_level || 'cold'
        };
      });

      setLeads(leadsWithScores);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const loadSEOLogs = async () => {
    try {
      const { data } = await supabase
        .from('seo_monitoring_log')
        .select('id, url, title, indexing_status, days_in_current_status, meta_description')
        .order('check_date', { ascending: false });

      // Deduplicate by URL
      const uniqueLogs = data?.reduce((acc: SEOLog[], log) => {
        if (!acc.find(l => l.url === log.url)) {
          acc.push(log);
        }
        return acc;
      }, []) || [];

      setSeoLogs(uniqueLogs);
    } catch (error) {
      console.error('Error loading SEO logs:', error);
    }
  };

  const loadNewsletterSubscribers = async () => {
    try {
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('id, email, name, status, subscribed_at')
        .order('subscribed_at', { ascending: false });
      
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return format(new Date(dateStr), 'dd MMM yyyy', { locale: it });
  };

  const handleRequestIndexing = async (url: string) => {
    try {
      const { error } = await supabase.functions.invoke('indexnow-submitter', {
        body: { urls: [url] }
      });
      if (error) throw error;
      toast({ title: 'Richiesta inviata', description: 'URL inviato per indicizzazione' });
    } catch (error: any) {
      toast({ title: 'Errore', description: error.message, variant: 'destructive' });
    }
  };

  const handleSaveColors = async () => {
    try {
      await updateConfig.mutateAsync({ configKey: 'theme_colors', configValue: colors });
      toast({ title: 'Salvato', description: 'Colori aggiornati' });
    } catch (error) {
      toast({ title: 'Errore', description: 'Impossibile salvare', variant: 'destructive' });
    }
  };

  const handleSaveContact = async () => {
    try {
      await updateConfig.mutateAsync({ configKey: 'contact_info', configValue: contact });
      toast({ title: 'Salvato', description: 'Contatti aggiornati' });
    } catch (error) {
      toast({ title: 'Errore', description: 'Impossibile salvare', variant: 'destructive' });
    }
  };

  const handleTriggerNewsletter = async () => {
    try {
      const { error } = await supabase.functions.invoke('weekly-newsletter');
      if (error) throw error;
      toast({ title: 'Newsletter inviata', description: 'Email inviata a tutti gli iscritti' });
    } catch (error: any) {
      toast({ title: 'Errore', description: error.message, variant: 'destructive' });
    }
  };

  const getScoreBadge = (level: string) => {
    switch (level) {
      case 'qualified':
        return <Badge className="bg-purple-500"><Flame className="w-3 h-3 mr-1" />Qualificato</Badge>;
      case 'hot':
        return <Badge className="bg-red-500"><Flame className="w-3 h-3 mr-1" />Hot</Badge>;
      case 'warm':
        return <Badge className="bg-orange-500"><Thermometer className="w-3 h-3 mr-1" />Warm</Badge>;
      default:
        return <Badge variant="secondary"><Snowflake className="w-3 h-3 mr-1" />Cold</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'indexed') return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Indicizzato</Badge>;
    if (status === 'crawled_not_indexed') return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Non indicizzato</Badge>;
    return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" />In attesa</Badge>;
  };

  const filteredPosts = blogPosts.filter(p => {
    if (blogFilter === 'published') return p.status === 'published';
    if (blogFilter === 'draft') return p.status === 'draft';
    return true;
  });

  const filteredLeads = leads.filter(l => {
    if (leadFilter === 'hot') return l.score_level === 'hot' || l.score_level === 'qualified';
    if (leadFilter === 'warm') return l.score_level === 'warm';
    if (leadFilter === 'cold') return l.score_level === 'cold';
    return true;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <>
      <Helmet>
        <title>Admin Control - MUV Fitness</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">M</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Admin Control</h1>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadAllData} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Aggiorna
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Esci
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex flex-wrap gap-1 h-auto p-1 bg-muted/50">
              <TabsTrigger value="dashboard" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="seo" className="gap-2">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">SEO</span>
              </TabsTrigger>
              <TabsTrigger value="leads" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Lead & CRM</span>
              </TabsTrigger>
              <TabsTrigger value="funnel" className="gap-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Funnel</span>
              </TabsTrigger>
              <TabsTrigger value="newsletter" className="gap-2">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Newsletter</span>
              </TabsTrigger>
              <TabsTrigger value="brand" className="gap-2">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Brand</span>
              </TabsTrigger>
              <TabsTrigger value="sistema" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Sistema</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: DASHBOARD */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />Articoli
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalArticles}</div>
                    <p className="text-xs text-muted-foreground">{stats.publishedArticles} pubblicati</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Users className="w-4 h-4" />Lead Totali
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalLeads}</div>
                    <p className="text-xs text-muted-foreground">+{stats.recentLeads} ultimi 7gg</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />Chat AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.chatConversations}</div>
                    <p className="text-xs text-muted-foreground">conversazioni</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />Newsletter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.newsletterSubscribers}</div>
                    <p className="text-xs text-muted-foreground">iscritti attivi</p>
                  </CardContent>
                </Card>

                <Card className={stats.seoAlerts > 0 ? 'border-red-300 bg-red-50/50' : ''}>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />Alert SEO
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${stats.seoAlerts > 0 ? 'text-red-600' : ''}`}>
                      {stats.seoAlerts}
                    </div>
                    <p className="text-xs text-muted-foreground">articoli critici</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Azioni Rapide</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button onClick={() => navigate('/admin?section=crea-ai')}>
                    <Sparkles className="w-4 h-4 mr-2" />Nuovo Articolo AI
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/admin?section=crea-manuale')}>
                    <PenTool className="w-4 h-4 mr-2" />Articolo Manuale
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('leads')}>
                    <Users className="w-4 h-4 mr-2" />Vedi Lead
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('seo')}>
                    <Search className="w-4 h-4 mr-2" />Monitor SEO
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Leads */}
              <Card>
                <CardHeader>
                  <CardTitle>Lead Recenti</CardTitle>
                  <CardDescription>Ultimi 5 lead acquisiti</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fonte</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.slice(0, 5).map(lead => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email || '-'}</TableCell>
                          <TableCell><Badge variant="outline">{lead.source || 'website'}</Badge></TableCell>
                          <TableCell>{getScoreBadge(lead.score_level || 'cold')}</TableCell>
                          <TableCell>{formatDate(lead.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: BLOG & CONTENT */}
            <TabsContent value="blog" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <Button variant={blogFilter === 'all' ? 'default' : 'outline'} onClick={() => setBlogFilter('all')}>
                    Tutti ({blogPosts.length})
                  </Button>
                  <Button variant={blogFilter === 'published' ? 'default' : 'outline'} onClick={() => setBlogFilter('published')}>
                    Pubblicati ({blogPosts.filter(p => p.status === 'published').length})
                  </Button>
                  <Button variant={blogFilter === 'draft' ? 'default' : 'outline'} onClick={() => setBlogFilter('draft')}>
                    Bozze ({blogPosts.filter(p => p.status === 'draft').length})
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/admin?section=crea-ai')}>
                    <Sparkles className="w-4 h-4 mr-2" />Crea con AI
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/admin?section=crea-manuale')}>
                    <PenTool className="w-4 h-4 mr-2" />Crea Manuale
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titolo</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Aggiornato</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map(post => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{post.title}</div>
                              <div className="text-xs text-muted-foreground">/{post.slug}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {post.status === 'published' 
                              ? <Badge className="bg-green-500">Pubblicato</Badge>
                              : <Badge variant="secondary">Bozza</Badge>
                            }
                          </TableCell>
                          <TableCell>{post.views_count || 0}</TableCell>
                          <TableCell>{formatDate(post.updated_at)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => navigate(`/admin/blog/${post.id}`)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              {post.status === 'published' && (
                                <Button size="sm" variant="ghost" asChild>
                                  <a href={`/${post.slug}`} target="_blank" rel="noopener noreferrer">
                                    <Eye className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: SEO */}
            <TabsContent value="seo" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Indicizzati</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {seoLogs.filter(l => l.indexing_status === 'indexed').length}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-orange-200 bg-orange-50/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Non Indicizzati</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {seoLogs.filter(l => l.indexing_status !== 'indexed').length}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader className="pb-2">
                    <CardDescription>Critici ({'>'}14gg)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">
                      {seoLogs.filter(l => l.indexing_status !== 'indexed' && (l.days_in_current_status || 0) > 14).length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Stato Indicizzazione</CardTitle>
                      <CardDescription>Monitoraggio pagine su Google</CardDescription>
                    </div>
                    <Button onClick={() => navigate('/admin?section=seo-monitor')}>
                      <TrendingUp className="w-4 h-4 mr-2" />Dashboard Completa
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pagina</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Giorni</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {seoLogs.slice(0, 15).map(log => (
                        <TableRow key={log.id} className={
                          log.indexing_status !== 'indexed' && (log.days_in_current_status || 0) > 14 
                            ? 'bg-red-50/50' : ''
                        }>
                          <TableCell>
                            <div className="font-medium truncate max-w-xs">{log.title || log.url}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-xs">{log.url}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(log.indexing_status)}</TableCell>
                          <TableCell>{log.days_in_current_status || 0}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleRequestIndexing(log.url)}>
                              <Send className="w-4 h-4 mr-1" />Index
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: LEAD & CRM */}
            <TabsContent value="leads" className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Button variant={leadFilter === 'all' ? 'default' : 'outline'} onClick={() => setLeadFilter('all')}>
                  Tutti ({leads.length})
                </Button>
                <Button variant={leadFilter === 'hot' ? 'default' : 'outline'} onClick={() => setLeadFilter('hot')} className="gap-1">
                  <Flame className="w-4 h-4" />Hot ({leads.filter(l => l.score_level === 'hot' || l.score_level === 'qualified').length})
                </Button>
                <Button variant={leadFilter === 'warm' ? 'default' : 'outline'} onClick={() => setLeadFilter('warm')} className="gap-1">
                  <Thermometer className="w-4 h-4" />Warm ({leads.filter(l => l.score_level === 'warm').length})
                </Button>
                <Button variant={leadFilter === 'cold' ? 'default' : 'outline'} onClick={() => setLeadFilter('cold')} className="gap-1">
                  <Snowflake className="w-4 h-4" />Cold ({leads.filter(l => l.score_level === 'cold').length})
                </Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contatti</TableHead>
                        <TableHead>Fonte</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map(lead => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {lead.email && <div className="text-sm">{lead.email}</div>}
                              {lead.phone && <div className="text-sm text-muted-foreground">{lead.phone}</div>}
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="outline">{lead.source || 'website'}</Badge></TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getScoreBadge(lead.score_level || 'cold')}
                              <span className="text-sm text-muted-foreground">{lead.score}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(lead.created_at)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {lead.phone && (
                                <Button size="sm" variant="ghost" asChild>
                                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                    <Phone className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                              {lead.email && (
                                <Button size="sm" variant="ghost" asChild>
                                  <a href={`mailto:${lead.email}`}>
                                    <Mail className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: FUNNEL */}
            <TabsContent value="funnel" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Step 1: Qualifica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Primo step del funnel - Raccolta informazioni iniziali</p>
                    <Badge className="bg-green-500">Attivo</Badge>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <a href="/funnel" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />Visualizza
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Step 2: Approfondimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Secondo step - Dettagli e obiettivi</p>
                    <Badge className="bg-green-500">Attivo</Badge>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <a href="/funnel/qualifica" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />Visualizza
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Step 3: Prenotazione
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Terzo step - Prenotazione consulenza</p>
                    <Badge className="bg-green-500">Attivo</Badge>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <a href="/funnel/prenota" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />Visualizza
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Thank You Page
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Pagina di conferma prenotazione</p>
                    <Badge className="bg-green-500">Attivo</Badge>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <a href="/funnel/grazie" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />Visualizza
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Collegamenti Esterni</CardTitle>
                  <CardDescription>Tool e servizi collegati al funnel</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/393..." target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4 mr-2" />WhatsApp Business
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-4 h-4 mr-2" />Calendly
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/admin/leads')}>
                    <Users className="w-4 h-4 mr-2" />Lead Dashboard
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 6: NEWSLETTER */}
            <TabsContent value="newsletter" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Iscritti Attivi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{subscribers.filter(s => s.status === 'active').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Disiscritti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-muted-foreground">
                      {subscribers.filter(s => s.status === 'unsubscribed').length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Cron Job</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-green-500">Attivo - Lunedì 9:00</Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestione Newsletter</CardTitle>
                      <CardDescription>Invio manuale e gestione iscritti</CardDescription>
                    </div>
                    <Button onClick={handleTriggerNewsletter}>
                      <Send className="w-4 h-4 mr-2" />Invia Newsletter Ora
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Data Iscrizione</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.slice(0, 20).map(sub => (
                        <TableRow key={sub.id}>
                          <TableCell>{sub.email}</TableCell>
                          <TableCell>{sub.name || '-'}</TableCell>
                          <TableCell>
                            {sub.status === 'active' 
                              ? <Badge className="bg-green-500">Attivo</Badge>
                              : <Badge variant="secondary">Disiscritto</Badge>
                            }
                          </TableCell>
                          <TableCell>{formatDate(sub.subscribed_at)}</TableCell>
                        </TableRow>
                      ))}
                      {subscribers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            Nessun iscritto alla newsletter
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 7: BRAND & ASSETS */}
            <TabsContent value="brand" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Colori Tema</CardTitle>
                    <CardDescription>Modifica i colori del sito (formato HSL)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Testo su sfondo scuro</Label>
                        <Input
                          value={colors.textOnDark}
                          onChange={(e) => setColors({ ...colors, textOnDark: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Testo form</Label>
                        <Input
                          value={colors.formText}
                          onChange={(e) => setColors({ ...colors, formText: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pulsante Principale</Label>
                        <Input
                          value={colors.buttonPrimary}
                          onChange={(e) => setColors({ ...colors, buttonPrimary: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pulsante Secondario</Label>
                        <Input
                          value={colors.buttonSecondary}
                          onChange={(e) => setColors({ ...colors, buttonSecondary: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleSaveColors} disabled={updateConfig.isPending}>
                      <Save className="w-4 h-4 mr-2" />Salva Colori
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contatti</CardTitle>
                    <CardDescription>Informazioni di contatto visibili sul sito</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Telefono</Label>
                      <Input
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp (solo numeri)</Label>
                      <Input
                        value={contact.whatsappNumber}
                        onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                    <Button onClick={handleSaveContact} disabled={updateConfig.isPending}>
                      <Save className="w-4 h-4 mr-2" />Salva Contatti
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                  <CardDescription>Immagini e file del brand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <FileImage className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Logo Principale</p>
                      <p className="text-xs text-muted-foreground">PNG, SVG</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <FileImage className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Logo Bianco</p>
                      <p className="text-xs text-muted-foreground">PNG</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <Download className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Lead Magnet PDF</p>
                      <p className="text-xs text-muted-foreground">Guida gratuita</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <FileImage className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">OG Image</p>
                      <p className="text-xs text-muted-foreground">Social sharing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 8: SISTEMA */}
            <TabsContent value="sistema" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sitemap & SEO Tecnico</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Sitemap principale</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.muvfitness.it/sitemap.xml" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />Visualizza
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sitemap Blog</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.muvfitness.it/blog-sitemap.xml" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />Visualizza
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Robots.txt</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.muvfitness.it/robots.txt" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />Visualizza
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tracking & Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Google Analytics 4</p>
                        <p className="text-xs text-muted-foreground">GA4 integrato</p>
                      </div>
                      <Badge className="bg-green-500">Attivo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Microsoft Clarity</p>
                        <p className="text-xs text-muted-foreground">Heatmaps & Recordings</p>
                      </div>
                      <Badge className="bg-green-500">Attivo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Facebook Pixel</p>
                        <p className="text-xs text-muted-foreground">Conversion tracking</p>
                      </div>
                      <Badge variant="secondary">Non configurato</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cron Jobs & Automazioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job</TableHead>
                        <TableHead>Schedulazione</TableHead>
                        <TableHead>Stato</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Newsletter Settimanale</TableCell>
                        <TableCell>Ogni Lunedì alle 9:00</TableCell>
                        <TableCell><Badge className="bg-green-500">Attivo</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SEO Monitor</TableCell>
                        <TableCell>Giornaliero</TableCell>
                        <TableCell><Badge className="bg-green-500">Attivo</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Email Follow-up</TableCell>
                        <TableCell>Su evento (lead creato)</TableCell>
                        <TableCell><Badge className="bg-green-500">Attivo</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Redirect Attivi</CardTitle>
                  <CardDescription>Gestiti via netlify.toml</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    I redirect sono configurati lato server in <code className="bg-muted px-1 rounded">netlify.toml</code> per ottimizzare le performance SEO con redirect 301.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
