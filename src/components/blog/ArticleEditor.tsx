
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Eye, Globe, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ArticleContentParser from './ArticleContentParser';

interface ArticleEditorProps {
  articleId?: string;
}

interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  status: string;
  featured_image?: string;
  author_name: string;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ articleId }) => {
  const [article, setArticle] = useState<Article>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    meta_title: '',
    meta_description: '',
    status: 'draft',
    author_name: 'MUV Team'
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const isEdit = Boolean(articleId);

  // Carica articolo esistente se in modalità edit
  useEffect(() => {
    if (isEdit && articleId) {
      loadArticle(articleId);
    }
  }, [articleId, isEdit]);

  // Auto-save ogni 30 secondi
  useEffect(() => {
    if (!autoSaveEnabled || !hasUnsavedChanges) return;

    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        saveAsDraft(true); // silent save
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [hasUnsavedChanges, autoSaveEnabled]);

  // Genera slug automaticamente dal titolo
  useEffect(() => {
    if (article.title && !isEdit) {
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setArticle(prev => ({ ...prev, slug }));
    }
  }, [article.title, isEdit]);

  // Genera meta_title automaticamente se vuoto
  useEffect(() => {
    if (article.title && !article.meta_title) {
      setArticle(prev => ({ 
        ...prev, 
        meta_title: article.title.substring(0, 60) 
      }));
    }
  }, [article.title]);

  const loadArticle = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading article:', error);
        throw error;
      }

      if (data) {
        setArticle({
          id: data.id,
          title: data.title || '',
          slug: data.slug || '',
          content: data.content || '',
          excerpt: data.excerpt || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          status: data.status || 'draft',
          featured_image: data.featured_image || '',
          author_name: data.author_name || 'MUV Team'
        });
        setHasUnsavedChanges(false);
      }
    } catch (error: any) {
      console.error('Error loading article:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dell'articolo: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof Article, value: string) => {
    setArticle(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const validateArticle = (): string[] => {
    const errors: string[] = [];
    
    if (!article.title.trim()) errors.push('Il titolo è obbligatorio');
    if (!article.slug.trim()) errors.push('Lo slug è obbligatorio');
    if (!article.content.trim()) errors.push('Il contenuto è obbligatorio');
    if (article.meta_title.length > 60) errors.push('Il titolo SEO deve essere massimo 60 caratteri');
    if (article.meta_description.length > 160) errors.push('La meta descrizione deve essere massimo 160 caratteri');
    
    return errors;
  };

  const saveAsDraft = async (silent: boolean = false) => {
    const errors = validateArticle();
    if (errors.length > 0 && !silent) {
      toast({
        title: "Errori di validazione",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    try {
      setSaving(true);
      
      const articleData = {
        title: article.title.trim(),
        slug: article.slug.trim(),
        content: article.content.trim(),
        excerpt: article.excerpt.trim() || article.content.substring(0, 200) + '...',
        meta_title: article.meta_title.trim() || article.title.substring(0, 60),
        meta_description: article.meta_description.trim() || article.excerpt.substring(0, 160),
        status: 'draft',
        author_name: article.author_name || 'MUV Team',
        featured_image: article.featured_image || null,
        reading_time: Math.ceil(article.content.split(' ').length / 200) // ~200 parole al minuto
      };

      console.log('Saving article data:', articleData);

      let result;
      if (isEdit && article.id) {
        result = await supabase
          .from('blog_posts')
          .update(articleData)
          .eq('id', article.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('blog_posts')
          .insert(articleData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Database error:', result.error);
        throw result.error;
      }

      if (!silent) {
        toast({
          title: "Successo",
          description: isEdit ? "Articolo aggiornato come bozza" : "Articolo salvato come bozza"
        });
      }

      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      // Se è un nuovo articolo, passa in modalità edit
      if (!isEdit && result.data) {
        setArticle(prev => ({ ...prev, id: result.data.id }));
        navigate(`/blog/edit/${result.data.id}`, { replace: true });
      }

    } catch (error: any) {
      console.error('Error saving article:', error);
      if (!silent) {
        toast({
          title: "Errore",
          description: "Errore nel salvataggio: " + (error.message || 'Errore sconosciuto'),
          variant: "destructive"
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const publishArticle = async () => {
    const errors = validateArticle();
    if (errors.length > 0) {
      toast({
        title: "Errori di validazione",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    try {
      setPublishing(true);
      
      const articleData = {
        title: article.title.trim(),
        slug: article.slug.trim(),
        content: article.content.trim(),
        excerpt: article.excerpt.trim() || article.content.substring(0, 200) + '...',
        meta_title: article.meta_title.trim() || article.title.substring(0, 60),
        meta_description: article.meta_description.trim() || article.excerpt.substring(0, 160),
        status: 'published',
        author_name: article.author_name || 'MUV Team',
        featured_image: article.featured_image || null,
        reading_time: Math.ceil(article.content.split(' ').length / 200),
        published_at: new Date().toISOString()
      };

      let result;
      if (isEdit && article.id) {
        result = await supabase
          .from('blog_posts')
          .update(articleData)
          .eq('id', article.id);
      } else {
        result = await supabase
          .from('blog_posts')
          .insert(articleData);
      }

      if (result.error) throw result.error;

      toast({
        title: "Successo",
        description: "Articolo pubblicato con successo!"
      });

      setHasUnsavedChanges(false);
      navigate('/blog/gestisci');

    } catch (error: any) {
      console.error('Error publishing article:', error);
      toast({
        title: "Errore",
        description: "Errore nella pubblicazione: " + error.message,
        variant: "destructive"
      });
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <span className="ml-2 text-white">Caricamento articolo...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog/gestisci')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alla gestione
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEdit ? 'Modifica Articolo' : 'Nuovo Articolo'}  
            </h1>
            {lastSaved && (
              <p className="text-sm text-gray-400">
                Ultimo salvataggio: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        
        {hasUnsavedChanges && (
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            Modifiche non salvate
          </Badge>
        )}
      </div>

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Anteprima</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor principale */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Contenuto Articolo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Titolo *</Label>
                    <Input
                      id="title"
                      value={article.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="Inserisci il titolo dell'articolo"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-white">Slug *</Label>
                    <Input
                      id="slug"
                      value={article.slug}
                      onChange={(e) => updateField('slug', e.target.value)}
                      placeholder="url-friendly-slug"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-white">Estratto</Label>
                    <Textarea
                      id="excerpt"
                      value={article.excerpt}
                      onChange={(e) => updateField('excerpt', e.target.value)}
                      placeholder="Breve descrizione dell'articolo"
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-white">Contenuto HTML *</Label>
                    <Textarea
                      id="content"
                      value={article.content}
                      onChange={(e) => updateField('content', e.target.value)}
                      placeholder="Inserisci il contenuto dell'articolo in HTML"
                      className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                      rows={20}
                    />
                    <p className="text-xs text-gray-400">
                      Puoi usare HTML per formattare il contenuto (h1, h2, p, strong, em, ul, li, etc.)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Azioni</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => saveAsDraft()}
                    disabled={saving}
                    className="w-full bg-gray-600 hover:bg-gray-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvataggio...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salva Bozza
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={publishArticle}
                    disabled={publishing}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {publishing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Pubblicazione...
                      </>
                    ) : (
                      <>
                        <Globe className="mr-2 h-4 w-4" />
                        Pubblica
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Impostazioni</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-white">Autore</Label>
                    <Input
                      id="author"
                      value={article.author_name}
                      onChange={(e) => updateField('author_name', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured_image" className="text-white">Immagine in evidenza</Label>
                    <Input
                      id="featured_image"
                      value={article.featured_image || ''}
                      onChange={(e) => updateField('featured_image', e.target.value)}
                      placeholder="URL dell'immagine"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Anteprima Articolo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {article.title || 'Titolo articolo'}
                </h1>
                {article.excerpt && (
                  <p className="text-xl text-gray-600 mb-6">
                    {article.excerpt}
                  </p>
                )}
                <div className="prose prose-lg max-w-none">
                  <ArticleContentParser content={article.content || 'Contenuto articolo...'} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Ottimizzazione SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title" className="text-white">Titolo SEO</Label>
                <Input
                  id="meta_title"
                  value={article.meta_title}
                  onChange={(e) => updateField('meta_title', e.target.value)}
                  placeholder="Titolo ottimizzato per i motori di ricerca"
                  className="bg-gray-700 border-gray-600 text-white"
                  maxLength={60}
                />
                <p className="text-xs text-gray-400">
                  {article.meta_title.length}/60 caratteri
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description" className="text-white">Meta Descrizione</Label>
                <Textarea
                  id="meta_description"
                  value={article.meta_description}
                  onChange={(e) => updateField('meta_description', e.target.value)}
                  placeholder="Descrizione che apparirà nei risultati di ricerca"
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-gray-400">
                  {article.meta_description.length}/160 caratteri
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Anteprima Google</h4>
                <div className="space-y-1">
                  <div className="text-blue-600 text-lg font-medium">
                    {article.meta_title || article.title || 'Titolo articolo'}
                  </div>
                  <div className="text-green-700 text-sm">
                    https://www.muvfitness.it/blog/{article.slug || 'slug-articolo'}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {article.meta_description || article.excerpt || 'Descrizione articolo...'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticleEditor;
