import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Save, Globe, Eye, Bot, Link as LinkIcon, CheckCircle, Clock, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useGeminiAPI } from '@/hooks/useGeminiAPI';

interface BlogPostData {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  category_id: string;
  tags: string[];
  excerpt: string;
  content: string;
  featured_image: string;
  featured_image_alt: string;
  author_name: string;
  status: 'draft' | 'review' | 'published';
  canonical_url: string;
  reading_time: number;
}

interface ValidationErrors {
  title?: string;
  slug?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  category_id?: string;
  excerpt?: string;
  featured_image_alt?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const NewBlogAdmin: React.FC = () => {
  const { toast } = useToast();
  const { callGeminiAPI } = useGeminiAPI();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<BlogPostData>({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    category_id: '',
    tags: [],
    excerpt: '',
    content: '',
    featured_image: '',
    featured_image_alt: '',
    author_name: 'MUV Team',
    status: 'draft',
    canonical_url: '',
    reading_time: 5
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !formData.slug) {
      const slug = generateSlug(formData.title);
      setFormData(prev => ({
        ...prev,
        slug,
        canonical_url: \`https://www.muvfitness.it/blog/\${slug}\`
      }));
    }
  }, [formData.title]);

  useEffect(() => {
    // Auto-calculate reading time from content
    if (formData.content) {
      const wordCount = formData.content.replace(/<[^>]*>/g, '').trim().split(/\\s+/).length;
      const readingTime = Math.max(1, Math.round(wordCount / 200));
      setFormData(prev => ({ ...prev, reading_time: readingTime }));
    }
  }, [formData.content]);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('id, name, slug')
      .order('name');
    
    if (error) {
      console.error('Error loading categories:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare le categorie",
        variant: "destructive"
      });
    } else {
      setCategories(data || []);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9\\s-]/g, '')
      .replace(/\\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const validateField = (field: string, value: any): string | undefined => {
    switch (field) {
      case 'title':
        if (!value?.trim()) return 'Il titolo è obbligatorio';
        if (value.length > 65) return 'Il titolo deve essere massimo 65 caratteri';
        break;
      case 'slug':
        if (!value?.trim()) return 'Lo slug è obbligatorio';
        if (!/^[a-z0-9-]+$/.test(value)) return 'Lo slug può contenere solo lettere minuscole, numeri e trattini';
        break;
      case 'content':
        if (!value?.trim()) return 'Il contenuto è obbligatorio';
        if (value.length < 100) return 'Il contenuto deve essere almeno 100 caratteri';
        break;
      case 'meta_title':
        if (value && value.length > 60) return 'Il meta title deve essere massimo 60 caratteri';
        break;
      case 'meta_description':
        if (value && value.length > 155) return 'La meta description deve essere massimo 155 caratteri';
        break;
      case 'category_id':
        if (!value) return 'La categoria è obbligatoria';
        break;
      case 'excerpt':
        if (!value?.trim()) return 'L\\'estratto è obbligatorio';
        if (value.length < 160 || value.length > 220) return 'L\\'estratto deve essere tra 160 e 220 caratteri';
        break;
      case 'featured_image_alt':
        if (formData.featured_image && !value?.trim()) return 'L\\'alt text è obbligatorio quando c\\'è un\\'immagine';
        break;
    }
    return undefined;
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Real-time validation
    const error = validateField(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, (formData as any)[field]);
      if (error) errors[field as keyof ValidationErrors] = error;
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWithAI = async (type: 'write' | 'rewrite' | 'optimize') => {
    if (!formData.title.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un titolo prima di usare l'IA",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
        const prompt = type === 'write' 
        ? `SCRIVI un articolo completo per il blog MUV Fitness con titolo: "${formData.title}".
           Segui le regole STICKY: HTML semantico, professionale-empatico, keyword "${formData.title}" in H1/intro/conclusione.
           Includi 2-4 link interni, meta title/description, struttura H2/H3, CTA finale.
           OBIETTIVO: articolo AUTOREVOLE, conversion-oriented per MUV Fitness Legnago.`
        : type === 'rewrite'
        ? `RISCRIVI completamente l'articolo con titolo: "${formData.title}".
           Ignora il contenuto esistente, scrivi ex-novo seguendo le regole STICKY MUV Fitness.
           HTML semantico, keyword principale, meta ottimizzati, link interni, CTA finale.`
        : `OTTIMIZZA SEO l'articolo "${formData.title}" mantenendo il significato.
           Migliora: keyword density, meta title/description, struttura heading, link interni.
           NON alterare il significato principale, solo ottimizzazione tecnica.`;

      const response = await callGeminiAPI(prompt);
      
      if (response) {
        // Parse AI response and update form fields
        const lines = response.split('\\n');
        let content = '';
        let metaTitle = '';
        let metaDescription = '';
        let excerpt = '';
        let suggestions: string[] = [];
        
        let currentSection = '';
        for (const line of lines) {
          if (line.includes('META TITLE:')) {
            currentSection = 'meta_title';
            metaTitle = line.replace('META TITLE:', '').trim();
          } else if (line.includes('META DESCRIPTION:')) {
            currentSection = 'meta_description';
            metaDescription = line.replace('META DESCRIPTION:', '').trim();
          } else if (line.includes('EXCERPT:')) {
            currentSection = 'excerpt';
            excerpt = line.replace('EXCERPT:', '').trim();
          } else if (line.includes('LINK INTERNI:')) {
            currentSection = 'links';
          } else if (line.includes('CONTENT:') || line.includes('<h1>')) {
            currentSection = 'content';
            if (!line.includes('CONTENT:')) content += line + '\\n';
          } else if (currentSection === 'content') {
            content += line + '\\n';
          } else if (currentSection === 'links') {
            if (line.trim()) suggestions.push(line.trim());
          }
        }
        
        // Update form with AI-generated content
        setFormData(prev => ({
          ...prev,
          content: content.trim() || response,
          meta_title: metaTitle || prev.meta_title,
          meta_description: metaDescription || prev.meta_description,
          excerpt: excerpt || prev.excerpt
        }));
        
        setAiSuggestions(suggestions);
        setHasUnsavedChanges(true);
        
        toast({
          title: "Successo",
          description: \`Contenuto \${type === 'write' ? 'scritto' : type === 'rewrite' ? 'riscritto' : 'ottimizzato'} con IA\`,
        });
      }
    } catch (error) {
      console.error('Error generating with AI:', error);
      toast({
        title: "Errore IA",
        description: "Errore durante la generazione del contenuto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const suggestInternalLinks = async () => {
    if (!formData.content.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci del contenuto prima di suggerire link",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = \`Analizza questo contenuto del blog MUV Fitness e suggerisci 3-5 link interni pertinenti:
      
      TITOLO: \${formData.title}
      CONTENUTO: \${formData.content.substring(0, 1000)}...
      
      Suggerisci link verso pagine MUV come:
      - /servizi/personal-training
      - /servizi/ems  
      - /servizi/pilates
      - /servizi/hiit
      - /servizi/nutrizione
      - /contatti
      
      Formato: "anchor text descrittivo" -> URL\`;

      const response = await callGeminiAPI(prompt);
      if (response) {
        const links = response.split('\\n').filter(line => line.includes('->')).slice(0, 5);
        setAiSuggestions(links);
        
        toast({
          title: "Link suggeriti",
          description: \`\${links.length} link interni suggeriti\`,
        });
      }
    } catch (error) {
      console.error('Error suggesting links:', error);
      toast({
        title: "Errore",
        description: "Errore durante il suggerimento dei link",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAsDraft = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...formData,
          status: 'draft',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setFormData(prev => ({ ...prev, id: data.id }));
      
      toast({
        title: "Salvato",
        description: "Articolo salvato come bozza",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Errore",
        description: "Errore durante il salvataggio",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const publish = async () => {
    if (!validateForm()) {
      toast({
        title: "Errori di validazione",
        description: "Correggi gli errori prima di pubblicare",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const publishData = {
        ...formData,
        status: 'published' as const,
        published_at: new Date().toISOString()
      };

      const { error } = formData.id
        ? await supabase.from('blog_posts').update(publishData).eq('id', formData.id)
        : await supabase.from('blog_posts').insert([publishData]);

      if (error) throw error;

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      toast({
        title: "Pubblicato",
        description: "Articolo pubblicato con successo",
      });
    } catch (error) {
      console.error('Error publishing:', error);
      toast({
        title: "Errore",
        description: "Errore durante la pubblicazione",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = Object.keys(validationErrors).length > 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Editor Blog MUV Fitness</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            {lastSaved && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Salvato: {lastSaved.toLocaleTimeString()}
              </div>
            )}
            {hasUnsavedChanges && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <AlertCircle className="h-3 w-3 mr-1" />
                Modifiche non salvate
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Nascondi' : 'Anteprima'}
          </Button>
          <Button
            onClick={saveAsDraft}
            disabled={loading}
            variant="secondary"
          >
            <Save className="h-4 w-4 mr-2" />
            Salva Bozza
          </Button>
          <Button
            onClick={publish}
            disabled={loading || hasErrors}
            className="bg-green-600 hover:bg-green-700"
          >
            <Globe className="h-4 w-4 mr-2" />
            Pubblica
          </Button>
        </div>
      </div>

      {/* AI Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Azioni IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => generateWithAI('write')}
              disabled={loading || !formData.title.trim()}
              variant="outline"
            >
              <Bot className="h-4 w-4 mr-2" />
              Scrivi con IA (da titolo)
            </Button>
            <Button
              onClick={() => generateWithAI('rewrite')}
              disabled={loading || !formData.title.trim()}
              variant="outline"
            >
              <Bot className="h-4 w-4 mr-2" />
              Riscrivi con IA
            </Button>
            <Button
              onClick={() => generateWithAI('optimize')}
              disabled={loading || !formData.content.trim()}
              variant="outline"
            >
              <Bot className="h-4 w-4 mr-2" />
              Ottimizza SEO
            </Button>
            <Button
              onClick={suggestInternalLinks}
              disabled={loading || !formData.content.trim()}
              variant="outline"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Suggerisci Link Interni
            </Button>
          </div>
          
          {aiSuggestions.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Suggerimenti IA:</h4>
              <ul className="space-y-1 text-sm">
                {aiSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Contenuto</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="preview">Anteprima</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Titolo *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      placeholder="Inserisci il titolo dell'articolo"
                      className={validationErrors.title ? 'border-red-500' : ''}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {validationErrors.title && (
                        <span className="text-sm text-red-500">{validationErrors.title}</span>
                      )}
                      <span className="text-sm text-muted-foreground ml-auto">
                        {formData.title.length}/65
                      </span>
                    </div>
                  </div>

                  {/* Slug */}
                  <div>
                    <Label htmlFor="slug">Slug URL *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleFieldChange('slug', e.target.value)}
                      placeholder="url-articolo"
                      className={validationErrors.slug ? 'border-red-500' : ''}
                    />
                    {validationErrors.slug && (
                      <span className="text-sm text-red-500">{validationErrors.slug}</span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      URL: https://www.muvfitness.it/blog/{formData.slug}
                    </p>
                  </div>

                  {/* Content */}
                  <div>
                    <Label htmlFor="content">Contenuto HTML *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleFieldChange('content', e.target.value)}
                      placeholder="Inserisci il contenuto dell'articolo in HTML semantico"
                      className={validationErrors.content ? 'border-red-500' : ''}
                      rows={15}
                    />
                    {validationErrors.content && (
                      <span className="text-sm text-red-500">{validationErrors.content}</span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Caratteri: {formData.content.length} | Tempo di lettura: {formData.reading_time} min
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  {/* Meta Title */}
                  <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      value={formData.meta_title}
                      onChange={(e) => handleFieldChange('meta_title', e.target.value)}
                      placeholder="Titolo SEO ottimizzato"
                      className={validationErrors.meta_title ? 'border-red-500' : ''}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {validationErrors.meta_title && (
                        <span className="text-sm text-red-500">{validationErrors.meta_title}</span>
                      )}
                      <span className="text-sm text-muted-foreground ml-auto">
                        {formData.meta_title.length}/60
                      </span>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => handleFieldChange('meta_description', e.target.value)}
                      placeholder="Descrizione SEO ottimizzata"
                      className={validationErrors.meta_description ? 'border-red-500' : ''}
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {validationErrors.meta_description && (
                        <span className="text-sm text-red-500">{validationErrors.meta_description}</span>
                      )}
                      <span className="text-sm text-muted-foreground ml-auto">
                        {formData.meta_description.length}/155
                      </span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <Label htmlFor="excerpt">Estratto *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleFieldChange('excerpt', e.target.value)}
                      placeholder="Estratto per anteprima (160-220 caratteri)"
                      className={validationErrors.excerpt ? 'border-red-500' : ''}
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {validationErrors.excerpt && (
                        <span className="text-sm text-red-500">{validationErrors.excerpt}</span>
                      )}
                      <span className="text-sm text-muted-foreground ml-auto">
                        {formData.excerpt.length}/220
                      </span>
                    </div>
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <Label htmlFor="canonical_url">URL Canonical</Label>
                    <Input
                      id="canonical_url"
                      value={formData.canonical_url}
                      onChange={(e) => handleFieldChange('canonical_url', e.target.value)}
                      placeholder="https://www.muvfitness.it/blog/..."
                      disabled
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview">
              <Card>
                <CardContent className="p-6">
                  {formData.content ? (
                    <div className="prose max-w-none">
                      <h1>{formData.title}</h1>
                      <div className="text-sm text-muted-foreground mb-4">
                        {formData.excerpt}
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Inserisci del contenuto per vedere l'anteprima</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Publication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Stato Articolo
                <Badge variant={formData.status === 'published' ? 'default' : 'secondary'}>
                  {formData.status === 'draft' && 'Bozza'}
                  {formData.status === 'review' && 'In Revisione'}
                  {formData.status === 'published' && 'Pubblicato'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="author_name">Autore</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => handleFieldChange('author_name', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Categoria e Tag</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => handleFieldChange('category_id', value)}
                >
                  <SelectTrigger className={validationErrors.category_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.category_id && (
                  <span className="text-sm text-red-500">{validationErrors.category_id}</span>
                )}
              </div>

              <div>
                <Label>Tag (massimo 8)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          const newTags = formData.tags.filter((_, i) => i !== index);
                          handleFieldChange('tags', newTags);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Aggiungi tag e premi Invio"
                  className="mt-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      const value = input.value.trim();
                      if (value && formData.tags.length < 8 && !formData.tags.includes(value)) {
                        handleFieldChange('tags', [...formData.tags, value]);
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Immagine di Copertina</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="featured_image">URL Immagine</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => handleFieldChange('featured_image', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="featured_image_alt">Alt Text *</Label>
                <Input
                  id="featured_image_alt"
                  value={formData.featured_image_alt}
                  onChange={(e) => handleFieldChange('featured_image_alt', e.target.value)}
                  placeholder="Descrizione dell'immagine"
                  className={validationErrors.featured_image_alt ? 'border-red-500' : ''}
                />
                {validationErrors.featured_image_alt && (
                  <span className="text-sm text-red-500">{validationErrors.featured_image_alt}</span>
                )}
              </div>
              {formData.featured_image && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={formData.featured_image}
                    alt={formData.featured_image_alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quality Control */}
          <Card>
            <CardHeader>
              <CardTitle>Controllo Qualità</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Titolo (≤65 caratteri)</span>
                  {formData.title && formData.title.length <= 65 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contenuto (≥100 caratteri)</span>
                  {formData.content && formData.content.length >= 100 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Meta Description (≤155)</span>
                  {formData.meta_description && formData.meta_description.length <= 155 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Categoria selezionata</span>
                  {formData.category_id ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estratto (160-220 caratteri)</span>
                  {formData.excerpt && formData.excerpt.length >= 160 && formData.excerpt.length <= 220 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewBlogAdmin;