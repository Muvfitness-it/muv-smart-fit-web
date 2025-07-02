import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, Save, Eye, Globe, ArrowLeft, AlertCircle, 
  CheckCircle, Clock, Target, Zap, Image as ImageIcon 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ArticleContentParser from './ArticleContentParser';
import ImageUploader from './ImageUploader';
import RichTextEditor from './RichTextEditor';

interface AdvancedArticleEditorProps {
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

interface ValidationErrors {
  title?: string;
  slug?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
}

const AdvancedArticleEditor: React.FC<AdvancedArticleEditorProps> = ({ articleId }) => {
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
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const isEdit = Boolean(articleId);

  // Auto-save ogni 30 secondi
  useEffect(() => {
    if (hasUnsavedChanges && article.title.trim()) {
      const interval = setInterval(() => {
        saveAsDraft(true);
      }, 30000);
      setAutoSaveInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [hasUnsavedChanges, article.title]);

  // Cleanup auto-save interval
  useEffect(() => {
    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [autoSaveInterval]);

  // Carica articolo esistente
  useEffect(() => {
    if (isEdit && articleId) {
      loadArticle(articleId);
    }
  }, [articleId, isEdit]);

  // Genera slug automaticamente
  useEffect(() => {
    if (article.title && !isEdit) {
      const slug = generateSlug(article.title);
      setArticle(prev => ({ ...prev, slug }));
    }
  }, [article.title, isEdit]);

  // Genera meta_title automaticamente
  useEffect(() => {
    if (article.title && !article.meta_title) {
      setArticle(prev => ({ 
        ...prev, 
        meta_title: article.title.substring(0, 60) 
      }));
    }
  }, [article.title]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const loadArticle = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

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
        description: "Errore nel caricamento dell'articolo",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = useCallback((field: keyof Article, value: string) => {
    setArticle(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Real-time validation
    validateField(field, value);
  }, []);

  const validateField = (field: keyof Article, value: string) => {
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'title':
        if (!value.trim()) {
          errors.title = 'Il titolo è obbligatorio';
        } else if (value.length > 100) {
          errors.title = 'Il titolo deve essere massimo 100 caratteri';
        } else {
          delete errors.title;
        }
        break;
      
      case 'slug':
        if (!value.trim()) {
          errors.slug = 'Lo slug è obbligatorio';
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          errors.slug = 'Lo slug può contenere solo lettere minuscole, numeri e trattini';
        } else {
          delete errors.slug;
        }
        break;
      
      case 'content':
        if (!value.trim()) {
          errors.content = 'Il contenuto è obbligatorio';
        } else if (value.length < 100) {
          errors.content = 'Il contenuto deve essere almeno 100 caratteri';
        } else {
          delete errors.content;
        }
        break;
      
      case 'meta_title':
        if (value.length > 60) {
          errors.meta_title = 'Il titolo SEO deve essere massimo 60 caratteri';
        } else {
          delete errors.meta_title;
        }
        break;
      
      case 'meta_description':
        if (value.length > 160) {
          errors.meta_description = 'La descrizione SEO deve essere massimo 160 caratteri';
        } else {
          delete errors.meta_description;
        }
        break;
    }
    
    setValidationErrors(errors);
  };

  const saveAsDraft = async (silent: boolean = false) => {
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors && !silent) {
      toast({
        title: "Errori di validazione",
        description: "Correggi gli errori prima di salvare",
        variant: "destructive"
      });
      return;
    }

    // Verifica campi obbligatori
    if (!article.title.trim()) {
      if (!silent) {
        toast({
          title: "Errore",
          description: "Il titolo è obbligatorio",
          variant: "destructive"
        });
      }
      return;
    }

    try {
      setSaving(true);
      
      const readingTime = Math.ceil((article.content.replace(/<[^>]*>/g, '').match(/\S+/g) || []).length / 200);
      
      const articleData = {
        title: article.title.trim(),
        slug: article.slug.trim() || generateSlug(article.title),
        content: article.content.trim(),
        excerpt: article.excerpt.trim() || article.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        meta_title: article.meta_title.trim() || article.title.substring(0, 60),
        meta_description: article.meta_description.trim() || (article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 160)),
        status: 'draft',
        author_name: article.author_name || 'MUV Team',
        featured_image: article.featured_image || null,
        reading_time: readingTime
      };

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

      if (result.error) throw result.error;

      if (!silent) {
        toast({
          title: "Salvato",
          description: "Articolo salvato come bozza",
        });
      }

      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
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
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) {
      toast({
        title: "Errori di validazione",
        description: "Correggi tutti gli errori prima di pubblicare",
        variant: "destructive"
      });
      return;
    }

    if (!article.title.trim() || !article.content.trim()) {
      toast({
        title: "Errore",
        description: "Titolo e contenuto sono obbligatori per la pubblicazione",
        variant: "destructive"
      });
      return;
    }

    try {
      setPublishing(true);
      
      const readingTime = Math.ceil((article.content.replace(/<[^>]*>/g, '').match(/\S+/g) || []).length / 200);
      
      const articleData = {
        title: article.title.trim(),
        slug: article.slug.trim() || generateSlug(article.title),
        content: article.content.trim(),
        excerpt: article.excerpt.trim() || article.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        meta_title: article.meta_title.trim() || article.title.substring(0, 60),
        meta_description: article.meta_description.trim() || (article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 160)),
        status: 'published',
        author_name: article.author_name || 'MUV Team',
        featured_image: article.featured_image || null,
        reading_time: readingTime,
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
        title: "Pubblicato!",
        description: "Articolo pubblicato con successo",
      });

      setHasUnsavedChanges(false);
      navigate('/blog/admin');

    } catch (error: any) {
      console.error('Error publishing article:', error);
      toast({
        title: "Errore",
        description: "Errore nella pubblicazione: " + (error.message || 'Errore sconosciuto'),
        variant: "destructive"
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleImageUpload = (url: string) => {
    updateField('featured_image', url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <span className="ml-2 text-white">Caricamento...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog/admin')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna all'Admin
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEdit ? 'Modifica Articolo' : 'Nuovo Articolo'}  
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              {lastSaved && (
                <p className="text-sm text-gray-400 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Salvato: {lastSaved.toLocaleTimeString()}
                </p>
              )}
              {hasUnsavedChanges && (
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Modifiche non salvate
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => saveAsDraft()}
            disabled={saving}
            className="bg-gray-600 hover:bg-gray-700"
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Salva Bozza
          </Button>
          
          <Button
            onClick={publishArticle}
            disabled={publishing || Object.keys(validationErrors).length > 0}
            className="bg-green-600 hover:bg-green-700"
          >
            {publishing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Globe className="mr-2 h-4 w-4" />
            )}
            Pubblica
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="editor">📝 Editor</TabsTrigger>
          <TabsTrigger value="preview">👁️ Anteprima</TabsTrigger>
          <TabsTrigger value="seo">🚀 SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Editor principale */}
            <div className="lg:col-span-3 space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Contenuto Articolo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Titolo *</Label>
                    <Input
                      id="title"
                      value={article.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="Inserisci un titolo accattivante"
                      className={`bg-gray-700 border-gray-600 text-white ${validationErrors.title ? 'border-red-500' : ''}`}
                    />
                    <div className="flex justify-between items-center">
                      {validationErrors.title && (
                        <p className="text-red-400 text-sm">{validationErrors.title}</p>
                      )}
                      <p className="text-gray-400 text-sm ml-auto">
                        {article.title.length}/100 caratteri
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-white">Slug URL *</Label>
                    <Input
                      id="slug"
                      value={article.slug}
                      onChange={(e) => updateField('slug', e.target.value)}
                      placeholder="url-friendly-slug"
                      className={`bg-gray-700 border-gray-600 text-white ${validationErrors.slug ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.slug && (
                      <p className="text-red-400 text-sm">{validationErrors.slug}</p>
                    )}
                    <p className="text-gray-400 text-xs">
                      URL: /blog/{article.slug || 'slug-articolo'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-white">Estratto</Label>
                    <Textarea
                      id="excerpt"
                      value={article.excerpt}
                      onChange={(e) => updateField('excerpt', e.target.value)}
                      placeholder="Breve descrizione dell'articolo che apparirà nelle anteprime"
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                    />
                    <p className="text-gray-400 text-sm">
                      {article.excerpt.length}/200 caratteri consigliati
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Contenuto *</Label>
                    <RichTextEditor
                      value={article.content}
                      onChange={(value) => updateField('content', value)}
                      placeholder="Scrivi il contenuto del tuo articolo..."
                      className={validationErrors.content ? 'border-red-500' : ''}
                    />
                    <div className="flex justify-between items-center">
                      {validationErrors.content && (
                        <p className="text-red-400 text-sm">{validationErrors.content}</p>
                      )}
                      <div className="flex items-center space-x-4 ml-auto text-sm text-gray-400">
                        <span>{article.content.replace(/<[^>]*>/g, '').length} caratteri</span>
                        <span>~{Math.ceil((article.content.replace(/<[^>]*>/g, '').match(/\S+/g) || []).length / 200)} min lettura</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="mr-2 h-4 w-4" />
                    Stato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status:</span>
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status === 'published' ? 'Pubblicato' : 'Bozza'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Auto-save:</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">30s</span>
                    </div>
                  </div>

                  <Separator className="bg-gray-600" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-white">Autore</Label>
                    <Input
                      id="author"
                      value={article.author_name}
                      onChange={(e) => updateField('author_name', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Immagine in Evidenza
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUploader
                    onImageUploaded={handleImageUpload}
                    currentImage={article.featured_image}
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Controllo Qualità</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Titolo</span>
                      {validationErrors.title ? (
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Contenuto</span>
                      {validationErrors.content ? (
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">SEO</span>
                      {validationErrors.meta_title || validationErrors.meta_description ? (
                        <AlertCircle className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
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
                Anteprima Live
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-8 max-h-[80vh] overflow-y-auto">
                <article className="prose prose-lg max-w-none">
                  <header className="mb-8">
                    {article.featured_image && (
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {article.title || 'Titolo del tuo articolo'}
                    </h1>
                    {article.excerpt && (
                      <p className="text-xl text-gray-600 mb-6 font-medium">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 border-b pb-4">
                      <span>Di {article.author_name}</span>
                      <span>•</span>
                      <span>~{Math.ceil((article.content.replace(/<[^>]*>/g, '').match(/\S+/g) || []).length / 200)} min di lettura</span>
                    </div>
                  </header>
                  
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content || 'Il contenuto del tuo articolo apparirà qui...' }} />
                  </div>
                </article>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    className={`bg-gray-700 border-gray-600 text-white ${validationErrors.meta_title ? 'border-red-500' : ''}`}
                    maxLength={60}
                  />
                  <div className="flex justify-between items-center">
                    {validationErrors.meta_title && (
                      <p className="text-red-400 text-sm">{validationErrors.meta_title}</p>
                    )}
                    <p className={`text-sm ml-auto ${article.meta_title.length > 60 ? 'text-red-400' : article.meta_title.length > 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {article.meta_title.length}/60 caratteri
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description" className="text-white">Meta Descrizione</Label>
                  <Textarea
                    id="meta_description"
                    value={article.meta_description}
                    onChange={(e) => updateField('meta_description', e.target.value)}
                    placeholder="Descrizione che apparirà nei risultati di ricerca"
                    className={`bg-gray-700 border-gray-600 text-white ${validationErrors.meta_description ? 'border-red-500' : ''}`}
                    rows={3}
                    maxLength={160}
                  />
                  <div className="flex justify-between items-center">
                    {validationErrors.meta_description && (
                      <p className="text-red-400 text-sm">{validationErrors.meta_description}</p>
                    )}
                    <p className={`text-sm ml-auto ${article.meta_description.length > 160 ? 'text-red-400' : article.meta_description.length > 140 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {article.meta_description.length}/160 caratteri
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Anteprima Google</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg">
                  <div className="space-y-1">
                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                      {article.meta_title || article.title || 'Titolo articolo'}
                    </div>
                    <div className="text-green-700 text-sm">
                      https://www.muvfitness.it/blog/{article.slug || 'slug-articolo'}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {article.meta_description || article.excerpt || 'Descrizione che apparirà nei risultati di ricerca. Assicurati che sia convincente e includa le parole chiave principali.'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="text-white font-semibold">Suggerimenti SEO:</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Usa il titolo principale (H1) una sola volta
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Includi parole chiave nel titolo e sottotitoli
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Mantieni la meta descrizione sotto i 160 caratteri
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Usa immagini con attributi alt descrittivi
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedArticleEditor;
