
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Trash2, Search, Plus, Calendar, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  published_at?: string;
  views_count?: number;
  reading_time?: number;
  author_name: string;
  excerpt?: string;
}

const ArticleManager: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterAndSortArticles();
  }, [articles, searchTerm, statusFilter, sortBy]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      console.error('Errore caricamento articoli:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento degli articoli",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortArticles = () => {
    let filtered = articles;

    // Filtro per testo
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro per status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => article.status === statusFilter);
    }

    // Ordinamento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'views':
          return (b.views_count || 0) - (a.views_count || 0);
        case 'published_at':
          return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime();
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredArticles(filtered);
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Articolo eliminato",
        description: "L'articolo è stato eliminato con successo",
      });

      fetchArticles();
    } catch (error: any) {
      console.error('Errore eliminazione:', error);
      toast({
        title: "Errore",
        description: "Errore nell'eliminazione dell'articolo",
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status aggiornato",
        description: `Articolo ${newStatus === 'published' ? 'pubblicato' : 'salvato come bozza'}`,
      });

      fetchArticles();
    } catch (error: any) {
      console.error('Errore aggiornamento status:', error);
      toast({
        title: "Errore",
        description: "Errore nell'aggiornamento dello status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-600">Pubblicato</Badge>;
      case 'draft':
        return <Badge variant="secondary">Bozza</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Caricamento articoli...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestione Articoli</h1>
          <p className="text-gray-400">Gestisci e organizza tutti i tuoi contenuti</p>
        </div>
        <Button
          onClick={() => navigate('/blog/scrivi')}
          className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuovo Articolo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-magenta-600 rounded">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Totale Articoli</p>
                <p className="text-xl font-bold text-white">{articles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-600 rounded">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Pubblicati</p>
                <p className="text-xl font-bold text-white">
                  {articles.filter(a => a.status === 'published').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-600 rounded">
                <Edit className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Bozze</p>
                <p className="text-xl font-bold text-white">
                  {articles.filter(a => a.status === 'draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blu-600 rounded">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Visualizzazioni</p>
                <p className="text-xl font-bold text-white">
                  {articles.reduce((sum, a) => sum + (a.views_count || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Cerca articoli..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Filtra per status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti</SelectItem>
                <SelectItem value="published">Pubblicati</SelectItem>
                <SelectItem value="draft">Bozze</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Data creazione</SelectItem>
                <SelectItem value="published_at">Data pubblicazione</SelectItem>
                <SelectItem value="title">Titolo</SelectItem>
                <SelectItem value="views">Visualizzazioni</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Titolo</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Data</TableHead>
                <TableHead className="text-gray-300">Views</TableHead>
                <TableHead className="text-gray-300">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id} className="border-gray-700 hover:bg-gray-750">
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-400">/{article.slug}</div>
                      {article.excerpt && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {article.excerpt}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleStatus(article.id, article.status)}
                      className="cursor-pointer"
                    >
                      {getStatusBadge(article.status)}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.status === 'published' && article.published_at 
                          ? article.published_at 
                          : article.created_at
                        ).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                    {article.reading_time && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{article.reading_time} min</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {article.views_count || 0}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/blog/${article.slug}`)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteArticle(article.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Nessun articolo trovato con i filtri selezionati'
                : 'Nessun articolo trovato. Inizia creando il tuo primo articolo!'
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleManager;
