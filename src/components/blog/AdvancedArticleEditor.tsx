import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './RichTextEditor';
import EditorHeader from './EditorHeader';
import EditorSidebar from './EditorSidebar';
import SEOTab from './SEOTab';
import PreviewTab from './PreviewTab';
import { validateField, generateSlug } from './EditorValidation';

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

  // Auto-save every 30 seconds
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

  // Load existing article
  useEffect(() => {
    if (isEdit && articleId) {
      loadArticle(articleId);
    }
  }, [articleId, isEdit]);

  // Generate slug automatically
  useEffect(() => {
    if (article.title && !isEdit) {
      const slug = generateSlug(article.title);
      setArticle(prev => ({ ...prev, slug }));
    }
  }, [article.title, isEdit]);

  // Generate meta_title automatically
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
    const newErrors = validateField(field, value, validationErrors);
    setValidationErrors(newErrors);
  }, [validationErrors]);

  const checkUserPermissions = async () => {
    console.log('🔍 Checking user permissions...');
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('👤 Current user:', user);
    console.log('❌ User error:', userError);
    
    if (!user) {
      console.log('❌ No user found');
      toast({
        title: "Errore",
        description: "Devi essere autenticato per salvare articoli",
        variant: "destructive"
      });
      return false;
    }

    console.log('🔑 Fetching user roles for user ID:', user.id);
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    console.log('👥 User roles data:', userRoles);
    console.log('❌ Roles error:', rolesError);
    
    const hasPermission = userRoles && userRoles.length > 0 && userRoles.some(r => r.role === 'admin' || r.role === 'editor');
    console.log('✅ Has permission:', hasPermission);

    if (!hasPermission) {
      console.log('❌ Permission denied');
      toast({
        title: "Errore di Permessi",
        description: `Non hai i permessi per salvare articoli. Ruoli: ${userRoles?.map(r => r.role).join(', ') || 'nessuno'}`,
        variant: "destructive"
      });
      return false;
    }

    console.log('✅ Permission check passed');
    return true;
  };

  const saveAsDraft = async (silent: boolean = false) => {
    console.log('🚀 saveAsDraft called with silent:', silent);
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors && !silent) {
      toast({
        title: "Errori di validazione",
        description: "Correggi gli errori prima di salvare",
        variant: "destructive"
      });
      return;
    }

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

    const hasPermissions = await checkUserPermissions();
    if (!hasPermissions) return;

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
        console.error('Supabase error:', result.error);
        
        if (result.error.message.includes('row-level security')) {
          toast({
            title: "Errore di Permessi",
            description: "Non hai i permessi per salvare articoli. Assicurati di essere autenticato come admin.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Errore",
            description: `Errore nel salvataggio: ${result.error.message}`,
            variant: "destructive"
          });
        }
        return;
      }

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

    const hasPermissions = await checkUserPermissions();
    if (!hasPermissions) return;

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

      if (result.error) {
        console.error('Publish error:', result.error);
        
        if (result.error.message.includes('row-level security')) {
          toast({
            title: "Errore di Permessi",
            description: "Non hai i permessi per pubblicare articoli. Assicurati di essere autenticato come admin.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Errore",
            description: `Errore nella pubblicazione: ${result.error.message}`,
            variant: "destructive"
          });
        }
        return;
      }

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
      <EditorHeader
        isEdit={isEdit}
        lastSaved={lastSaved}
        hasUnsavedChanges={hasUnsavedChanges}
        saving={saving}
        publishing={publishing}
        validationErrors={validationErrors}
        onSaveAsDraft={() => saveAsDraft()}
        onPublish={publishArticle}
      />

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="editor">📝 Editor</TabsTrigger>
          <TabsTrigger value="preview">👁️ Anteprima</TabsTrigger>
          <TabsTrigger value="seo">🚀 SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

            <EditorSidebar
              article={article}
              validationErrors={validationErrors}
              onUpdateField={updateField}
              onImageUpload={handleImageUpload}
            />
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <PreviewTab article={article} />
        </TabsContent>

        <TabsContent value="seo">
          <SEOTab
            article={article}
            validationErrors={validationErrors}
            onUpdateField={updateField}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedArticleEditor;
