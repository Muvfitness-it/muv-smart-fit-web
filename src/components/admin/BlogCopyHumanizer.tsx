import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
}

interface HumanizationResult {
  id: string;
  original: {
    title: string;
    content: string;
    excerpt: string;
  };
  humanized: {
    title: string;
    content: string;
    excerpt: string;
  };
  applied: boolean;
}

const BlogCopyHumanizer: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [results, setResults] = useState<HumanizationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, content, excerpt, status')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const previewHumanization = async () => {
    if (selectedPosts.length === 0) {
      toast({
        title: 'Nessun post selezionato',
        description: 'Seleziona almeno un post per vedere l\'anteprima'
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('humanize-blog-copy', {
        body: {
          postIds: selectedPosts,
          mode: 'preview'
        }
      });

      if (error) throw error;
      setResults(data.results || []);
      
      toast({
        title: 'Anteprima generata',
        description: `${data.results?.length || 0} post processati`
      });
    } catch (error: any) {
      toast({
        title: 'Errore anteprima',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const applyHumanization = async () => {
    if (selectedPosts.length === 0) return;

    setApplying(true);
    try {
      const { data, error } = await supabase.functions.invoke('humanize-blog-copy', {
        body: {
          postIds: selectedPosts,
          mode: 'apply'
        }
      });

      if (error) throw error;
      
      toast({
        title: 'Copy umanizzato applicato',
        description: `${data.results?.length || 0} post aggiornati con successo`
      });

      // Ricarica i post per vedere le modifiche
      await loadPosts();
      setResults([]);
      setSelectedPosts([]);
    } catch (error: any) {
      toast({
        title: 'Errore applicazione',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setApplying(false);
    }
  };

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const selectAllPosts = () => {
    setSelectedPosts(posts.map(p => p.id));
  };

  const deselectAllPosts = () => {
    setSelectedPosts([]);
  };

  const getContentPreview = (content: string, maxLength: number = 150) => {
    const textOnly = content.replace(/<[^>]*>/g, '').trim();
    return textOnly.length > maxLength 
      ? textOnly.substring(0, maxLength) + '...'
      : textOnly;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ✨ Umanizzazione Copy Blog
          </CardTitle>
          <p className="text-muted-foreground">
            Trasforma il copy degli articoli del blog in un linguaggio più naturale, diretto e orientato alla conversione.
            Il sistema mantiene automaticamente un backup dei contenuti originali.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={selectAllPosts} variant="outline" size="sm">
              Seleziona tutti ({posts.length})
            </Button>
            <Button onClick={deselectAllPosts} variant="outline" size="sm">
              Deseleziona tutti
            </Button>
            <Badge variant="secondary">
              {selectedPosts.length} selezionati
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={previewHumanization}
              disabled={loading || selectedPosts.length === 0}
              variant="outline"
            >
              {loading ? 'Generando anteprima...' : 'Anteprima umanizzazione'}
            </Button>

            {results.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    disabled={applying || selectedPosts.length === 0}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {applying ? 'Applicando...' : 'Applica umanizzazione'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Conferma applicazione</AlertDialogTitle>
                    <AlertDialogDescription>
                      Stai per applicare l'umanizzazione del copy a {selectedPosts.length} post. 
                      I contenuti originali verranno salvati in backup automaticamente.
                      Questa operazione non può essere annullata facilmente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={applyHumanization}>
                      Applica umanizzazione
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Post del Blog ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {posts.map(post => (
                <div 
                  key={post.id} 
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50"
                >
                  <Checkbox
                    checked={selectedPosts.includes(post.id)}
                    onCheckedChange={() => togglePostSelection(post.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{post.title}</h4>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getContentPreview(post.excerpt || post.content)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Anteprima Risultati */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Anteprima Umanizzazione</CardTitle>
            <p className="text-sm text-muted-foreground">
              Confronta il copy originale con quello umanizzato
            </p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                {results.map(result => (
                  <Card key={result.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        Post: {result.original.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="title" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="title">Titolo</TabsTrigger>
                          <TabsTrigger value="excerpt">Excerpt</TabsTrigger>
                          <TabsTrigger value="content">Contenuto</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="title" className="space-y-4">
                          <div>
                            <h4 className="font-medium text-red-600 mb-2">Originale:</h4>
                            <p className="p-3 bg-red-50 border border-red-200 rounded">
                              {result.original.title}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-600 mb-2">Umanizzato:</h4>
                            <p className="p-3 bg-green-50 border border-green-200 rounded">
                              {result.humanized.title}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="excerpt" className="space-y-4">
                          <div>
                            <h4 className="font-medium text-red-600 mb-2">Originale:</h4>
                            <p className="p-3 bg-red-50 border border-red-200 rounded">
                              {result.original.excerpt}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-600 mb-2">Umanizzato:</h4>
                            <p className="p-3 bg-green-50 border border-green-200 rounded">
                              {result.humanized.excerpt}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="content" className="space-y-4">
                          <div>
                            <h4 className="font-medium text-red-600 mb-2">Originale (anteprima):</h4>
                            <div className="p-3 bg-red-50 border border-red-200 rounded max-h-32 overflow-y-auto">
                              <p className="text-sm">{getContentPreview(result.original.content, 300)}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-600 mb-2">Umanizzato (anteprima):</h4>
                            <div className="p-3 bg-green-50 border border-green-200 rounded max-h-32 overflow-y-auto">
                              <p className="text-sm">{getContentPreview(result.humanized.content, 300)}</p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogCopyHumanizer;