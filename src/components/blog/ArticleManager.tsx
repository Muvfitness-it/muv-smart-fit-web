import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Search, Edit, Trash2, Eye, Calendar, 
  FileText, Loader2, AlertCircle, CheckCircle,
  Sparkles, PenTool
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useGeminiAPI } from '@/hooks/useGeminiAPI';
import { Checkbox } from '@/components/ui/checkbox';
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  views_count: number | null;
  reading_time: number | null;
}

const ArticleManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { callAIAPI } = useGeminiAPI();

  useEffect(() => {
    loadPosts();
  }, []);

  // Ricarica i post quando la pagina diventa visibile
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadPosts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error loading posts:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento degli articoli",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Sei sicuro di voler eliminare l'articolo "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Articolo eliminato con successo"
      });

      loadPosts();
    } catch (error: any) {
      console.error('Error deleting post:', error);
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
        .update({ 
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: `Articolo ${newStatus === 'published' ? 'pubblicato' : 'salvato come bozza'}`
      });

      loadPosts();
    } catch (error: any) {
      console.error('Error updating post status:', error);
      toast({
        title: "Errore",
        description: "Errore nell'aggiornamento dello stato",
        variant: "destructive"
      });
    }
  };

  const handleEditClick = (post: BlogPost) => {
    console.log('Editing post:', post.id, post.title);
    try {
      navigate(`/blog/edit/${post.id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Errore",
        description: "Errore nella navigazione",
        variant: "destructive"
      });
    }
  };

  const handleViewClick = (post: BlogPost) => {
    console.log('Viewing post:', post.slug, post.status);
    if (post.status === 'published') {
      try {
        // Apri in una nuova scheda per evitare problemi di navigazione
        window.open(`/blog/${post.slug}`, '_blank');
      } catch (error) {
        console.error('Navigation error:', error);
        navigate(`/blog/${post.slug}`);
      }
    } else {
      toast({
        title: "Avviso",
        description: "Non puoi visualizzare un articolo in bozza. Pubblicalo prima.",
        variant: "destructive"
      });
    }
  };

  const batchRewriteSelected = async () => {
    if (selectedIds.length === 0) return;
    toast({ title: 'Avvio riscrittura', description: `${selectedIds.length} articoli`, });

    const rules = `AGISCI COME: Editor Senior SEO/SEM/Copywriting per il blog del Centro Fitness MUV (Legnago, VR).
OBIETTIVO: Riscrivere articoli a partire dal titolo fornito, in stile naturale e autorevole, HTML pulito e SEO ottimizzato.
REGOLE:
- 1 solo <h1> con keyword principale all’inizio
- Intro 80–120 parole
- Struttura con <h2> e <h3>
- Paragrafi <= 4 righe, frasi <= 20 parole
- Liste dove utile
- Conclusione con CTA: “Vuoi risultati concreti e duraturi? Prenota oggi la tua prova gratuita al Centro Fitness MUV a Legnago.”
- Slug breve (lo mantiene il sistema), Meta title ≤60, Meta desc ≤155
- Keyword principale in H1, primo paragrafo, almeno un H2 e conclusione
- 3–6 keyword correlate naturali
- 2–4 link interni pertinenti con anchor descrittive
- Immagini con alt descrittivo e loading="lazy"
- HTML valido e leggibile`;

    for (const id of selectedIds) {
      try {
        const { data: post, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (error || !post) continue;

        const lengthPref = post.reading_time && post.reading_time > 10 ? 'long' : 'medium';
        const lengthMap: Record<string, string> = {
          short: '800-1000 parole',
          medium: '1200-1500 parole',
          long: '2000-2500 parole'
        };

        const taskLine = `RISCRITTURA: Riscrivi completamente l’articolo partendo dal titolo: "${post.title}". Mantieni info utili, aggiorna dati, migliora leggibilità e SEO.`;
        const prompt = `${rules}\n\nCONTESTO:\n- Lunghezza: ${lengthMap[lengthPref]}\n- Tono: professionale\n- Target: generale\n- Parole chiave: ${post.meta_keywords || ''}\n\n${taskLine}\n\nFORMATTAZIONE:\n- Usa solo HTML semantico (h1, h2, h3, p, strong, em, ul, li, a)\n- Inserisci la CTA standard in chiusura\n\nOUTPUT:\nRispondi SOLO con l’HTML completo dell’articolo, iniziando con <h1>.`;

        const response = await callAIAPI(prompt, 'gemini');
        const titleMatch = response.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const extractedTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : post.title;
        const paragraphMatches = response.match(/<p[^>]*>(.*?)<\/p>/gi) || [];
        const extractedExcerpt = paragraphMatches
          ? paragraphMatches.slice(0, 2).join(' ').replace(/<[^>]*>/g, '').substring(0, 200) + '...'
          : post.excerpt || '';
        const readingTime = Math.max(1, Math.ceil((response.replace(/<[^>]*>/g, '').split(/\s+/).length) / 200));

        // Backup
        try {
          await supabase.from('blog_posts_backup').insert({ id: post.id, content_backup: post.content || '' });
        } catch (_) {}

        // Update post (mantiene slug e published_at)
        await supabase
          .from('blog_posts')
          .update({
            title: extractedTitle.substring(0, 180),
            content: response.trim(),
            excerpt: extractedExcerpt,
            meta_title: (extractedTitle || post.title).substring(0, 60),
            meta_description: extractedExcerpt.substring(0, 155),
            reading_time: readingTime,
          })
          .eq('id', post.id);

        toast({ title: 'Riscritto', description: `Aggiornato: ${post.title}` });
      } catch (e) {
        console.error('Batch rewrite error:', e);
        toast({ title: 'Errore riscrittura', description: 'Uno degli articoli non è stato aggiornato', variant: 'destructive' });
      }
    }

    setSelectedIds([]);
    await loadPosts();
    toast({ title: 'Completato', description: 'Riscrittura batch completata' });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <span className="ml-2 text-white">Caricamento articoli...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con azioni principali */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestione Articoli</h2>
          <p className="text-gray-400">Crea, modifica e gestisci i tuoi articoli del blog</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate('/blog/scrivi-con-ia')}
            className="bg-purple-600 hover:bg-purple-700 flex items-center"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Scrivi con IA
          </Button>
          
          <Button
            onClick={() => {
              console.log('Navigating to /blog/nuovo');
              navigate('/blog/nuovo');
            }}
            className="bg-blue-600 hover:bg-blue-700 flex items-center"
          >
            <PenTool className="mr-2 h-4 w-4" />
            Editor Manuale
          </Button>
        </div>
      </div>

      {/* Filtri e ricerca */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cerca articoli per titolo o autore..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full lg:w-auto">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="all">Tutti ({posts.length})</TabsTrigger>
                <TabsTrigger value="published">
                  Pubblicati ({posts.filter(p => p.status === 'published').length})
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Bozze ({posts.filter(p => p.status === 'draft').length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar batch riscrittura */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-300">{selectedIds.length} articoli selezionati</p>
          <div className="flex gap-2">
            <Button onClick={batchRewriteSelected} className="bg-purple-600 hover:bg-purple-700" size="sm">
              <Sparkles className="w-4 h-4 mr-1" /> Riscrivi con IA (Batch)
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedIds([])}>Annulla selezione</Button>
          </div>
        </div>
      )}

      {/* Lista articoli */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                {searchTerm || statusFilter !== 'all' ? 'Nessun articolo trovato' : 'Nessun articolo presente'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Prova a modificare i filtri di ricerca'
                  : 'Inizia creando il tuo primo articolo'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => navigate('/blog/scrivi-con-ia')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Scrivi con IA
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('Navigating to /blog/nuovo');
                      navigate('/blog/nuovo');
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <PenTool className="mr-2 h-4 w-4" />
                    Editor Manuale
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Checkbox
                        checked={selectedIds.includes(post.id)}
                        onCheckedChange={(checked) => {
                          setSelectedIds(prev => checked ? [...prev, post.id] : prev.filter(id => id !== post.id));
                        }}
                      />
                      <h3 className="text-lg font-semibold text-white">
                        {post.title}
                      </h3>
                      <Badge 
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                        className={post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'}
                      >
                        {post.status === 'published' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Pubblicato
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Bozza
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>Autore: {post.author_name}</p>
                      <p>Creato: {formatDate(post.created_at)}</p>
                      {post.published_at && (
                        <p>Pubblicato: {formatDate(post.published_at)}</p>
                      )}
                      <div className="flex items-center gap-4">
                        {post.views_count !== null && (
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {post.views_count} visualizzazioni
                          </span>
                        )}
                        {post.reading_time && (
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.reading_time} min lettura
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(post)}
                      className="border-magenta-500 text-magenta-600 hover:bg-magenta-50 hover:text-magenta-700"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      MODIFICA
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClick(post)}
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      disabled={post.status !== 'published'}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      VISUALIZZA
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/blog/scrivi-con-ia?rewrite=${post.id}`)}
                      className="border-purple-500 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      RISCRIVI IA
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(post.id, post.status)}
                      className={`border-gray-600 text-white hover:bg-gray-700 ${
                        post.status === 'published' ? 'text-yellow-400' : 'text-green-400'
                      }`}
                    >
                      {post.status === 'published' ? 'Rendi Bozza' : 'Pubblica'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePost(post.id, post.title)}
                      className="border-red-600 text-red-400 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Elimina
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleManager;