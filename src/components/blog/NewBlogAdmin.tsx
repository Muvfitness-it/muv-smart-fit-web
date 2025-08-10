import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Eye, Save, Send, Wand2, Link } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  category: string;
  tags: string[];
  excerpt: string;
  reading_time: number;
  featured_image: string;
  alt_text: string;
  content: string;
  canonical_url: string;
  status: 'draft' | 'review' | 'published';
}

interface QACheck {
  id: string;
  label: string;
  passed: boolean;
  required: boolean;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[àáâäã]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôöõ]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const NewBlogAdmin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    category: '',
    tags: [],
    excerpt: '',
    reading_time: 5,
    featured_image: '',
    alt_text: '',
    content: '',
    canonical_url: '',
    status: 'draft'
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [qaChecks, setQaChecks] = useState<QACheck[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = generateSlug(formData.title);
      setFormData(prev => ({
        ...prev,
        slug,
        canonical_url: `https://www.muvfitness.it/blog/${slug}`
      }));
    }
  }, [formData.title]);

  // QA Checks
  useEffect(() => {
    const checks: QACheck[] = [
      {
        id: 'h1',
        label: 'H1 unico con keyword principale',
        passed: /<h1[^>]*>.*?<\/h1>/i.test(formData.content) && (formData.content.match(/<h1[^>]*>/gi) || []).length === 1,
        required: true
      },
      {
        id: 'hierarchy',
        label: 'Gerarchia heading valida (H2/H3)',
        passed: /<h2[^>]*>.*?<\/h2>/i.test(formData.content),
        required: true
      },
      {
        id: 'meta_title',
        label: 'Meta title ≤60 caratteri',
        passed: formData.meta_title.length > 0 && formData.meta_title.length <= 60,
        required: true
      },
      {
        id: 'meta_description',
        label: 'Meta description ≤155 caratteri',
        passed: formData.meta_description.length > 0 && formData.meta_description.length <= 155,
        required: true
      },
      {
        id: 'slug',
        label: 'Slug univoco e SEO-friendly',
        passed: formData.slug.length > 0 && /^[a-z0-9-]+$/.test(formData.slug),
        required: true
      },
      {
        id: 'excerpt',
        label: 'Estratto 160-220 caratteri',
        passed: formData.excerpt.length >= 160 && formData.excerpt.length <= 220,
        required: true
      },
      {
        id: 'cta',
        label: 'CTA finale presente',
        passed: /prenota.*prova.*gratuita|prova.*gratuita.*prenota/i.test(formData.content),
        required: true
      },
      {
        id: 'images',
        label: 'Immagini con alt text',
        passed: !/<img[^>]*>/i.test(formData.content) || /<img[^>]*alt="[^"]+"/i.test(formData.content),
        required: true
      },
      {
        id: 'clean_html',
        label: 'HTML pulito (no markdown)',
        passed: !formData.content.includes('```') && !formData.content.includes('**') && !formData.content.includes('##'),
        required: true
      }
    ];

    setQaChecks(checks);
  }, [formData]);

  const handleAIAction = async (type: 'write' | 'rewrite' | 'optimize' | 'links') => {
    if (!formData.title) {
      toast({
        title: "Errore",
        description: "Inserisci un titolo prima di usare l'IA",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/ai-article-writer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw'
        },
        body: JSON.stringify({
          title: formData.title,
          action: type === 'write' ? 'write_from_title' : 'rewrite_from_title'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          content: result.post.content || prev.content,
          meta_title: result.post.meta_title || prev.meta_title,
          meta_description: result.post.meta_description || prev.meta_description,
          excerpt: result.post.excerpt || prev.excerpt,
          slug: result.post.slug || prev.slug,
          canonical_url: `https://www.muvfitness.it/blog/${result.post.slug || prev.slug}`
        }));

        toast({
          title: "Successo",
          description: result.message
        });

        if (result.internal_links) {
          console.log('Link interni suggeriti:', result.internal_links);
        }
      } else {
        throw new Error(result.error || 'Errore nella generazione');
      }
    } catch (error) {
      console.error('AI Error:', error);
      toast({
        title: "Errore",
        description: "Errore nella generazione del contenuto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'review' | 'published') => {
    const allRequiredPassed = qaChecks.filter(check => check.required).every(check => check.passed);
    
    if (status === 'published' && !allRequiredPassed) {
      toast({
        title: "QA non superato",
        description: "Correggi tutti i controlli obbligatori prima di pubblicare",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...formData,
          status,
          published_at: status === 'published' ? new Date().toISOString() : null
        });

      if (error) throw error;

      toast({
        title: "Successo",
        description: `Articolo salvato come ${status.toUpperCase()}`
      });

      // Reset form after successful save
      if (status === 'published') {
        setFormData({
          title: '',
          slug: '',
          meta_title: '',
          meta_description: '',
          category: '',
          tags: [],
          excerpt: '',
          reading_time: 5,
          featured_image: '',
          alt_text: '',
          content: '',
          canonical_url: '',
          status: 'draft'
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Errore",
        description: "Errore nel salvataggio",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 8) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const allRequiredPassed = qaChecks.filter(check => check.required).every(check => check.passed);
  const passedChecks = qaChecks.filter(check => check.passed).length;

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height)]">
      <Helmet>
        <title>Blog Admin - MUV Fitness | Editor con IA</title>
        <meta name="description" content="Area amministrativa del blog MUV Fitness con editor avanzato e strumenti IA per la creazione di contenuti." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Blog Admin</h1>
              <p className="text-muted-foreground">Editor con IA - SEO-first</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={allRequiredPassed ? "default" : "secondary"}>
                QA: {passedChecks}/{qaChecks.length}
              </Badge>
              <Badge variant="outline">
                {formData.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="preview">Anteprima</TabsTrigger>
              <TabsTrigger value="qa">QA</TabsTrigger>
            </TabsList>

            {/* Editor Tab */}
            <TabsContent value="editor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Azioni IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleAIAction('write')} 
                      disabled={loading || !formData.title}
                      variant="default"
                    >
                      SCRIVI CON IA
                    </Button>
                    <Button 
                      onClick={() => handleAIAction('rewrite')} 
                      disabled={loading || !formData.title}
                      variant="outline"
                    >
                      RISCRIVI CON IA
                    </Button>
                    <Button 
                      onClick={() => handleAIAction('optimize')} 
                      disabled={loading || !formData.content}
                      variant="outline"
                    >
                      OTTIMIZZA SEO
                    </Button>
                    <Button 
                      onClick={() => handleAIAction('links')} 
                      disabled={loading || !formData.content}
                      variant="outline"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      SUGGERISCI LINK INTERNI
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contenuto Base</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Titolo (H1) *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Es: Dimagrire con EMS a Legnago: guida completa"
                          maxLength={65}
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {formData.title.length}/65 caratteri
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="dimagrire-ems-legnago-guida"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Categoria *</Label>
                          <Select 
                            value={formData.category} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fitness">Fitness</SelectItem>
                              <SelectItem value="nutrizione">Nutrizione</SelectItem>
                              <SelectItem value="tecnologie">Tecnologie</SelectItem>
                              <SelectItem value="benessere">Benessere</SelectItem>
                              <SelectItem value="allenamento">Allenamento</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="reading_time">Tempo lettura (min)</Label>
                          <Input
                            id="reading_time"
                            type="number"
                            value={formData.reading_time}
                            onChange={(e) => setFormData(prev => ({ ...prev, reading_time: parseInt(e.target.value) || 5 }))}
                            min={1}
                            max={30}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="tags">Tag (max 8)</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Aggiungi tag..."
                            onKeyPress={(e) => e.key === 'Enter' && addTag()}
                          />
                          <Button type="button" onClick={addTag} variant="outline">
                            Aggiungi
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
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
                          onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="alt_text">Alt Text *</Label>
                        <Input
                          id="alt_text"
                          value={formData.alt_text}
                          onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
                          placeholder="Descrizione dettagliata dell'immagine"
                        />
                      </div>

                      {formData.featured_image && (
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={formData.featured_image} 
                            alt={formData.alt_text} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Estratto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Breve descrizione dell'articolo per l'archivio..."
                        maxLength={220}
                        rows={4}
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {formData.excerpt.length}/220 caratteri (ideale: 160-220)
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Contenuto HTML</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Scrivi qui il contenuto in HTML semantico..."
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    Usa HTML semantico: &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meta Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">Meta Title *</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                        placeholder="Titolo per i motori di ricerca"
                        maxLength={60}
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {formData.meta_title.length}/60 caratteri
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="meta_description">Meta Description *</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                        placeholder="Descrizione per i risultati di ricerca"
                        maxLength={155}
                        rows={3}
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {formData.meta_description.length}/155 caratteri
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="canonical_url">URL Canonical</Label>
                      <Input
                        id="canonical_url"
                        value={formData.canonical_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, canonical_url: e.target.value }))}
                        placeholder="https://www.muvfitness.it/blog/slug"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Structured Data Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": formData.title || "Titolo articolo",
  "description": formData.meta_description || "Descrizione articolo",
  "image": formData.featured_image || "https://www.muvfitness.it/images/default.jpg",
  "author": {
    "@type": "Organization",
    "name": "MUV Fitness"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MUV Fitness",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.muvfitness.it/images/muv-logo.png"
    }
  },
  "datePublished": new Date().toISOString(),
  "dateModified": new Date().toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": formData.canonical_url || `https://www.muvfitness.it/blog/${formData.slug}`
  },
  "keywords": formData.tags.join(', ') || 'fitness, MUV',
  "articleSection": formData.category || 'Fitness'
}, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Anteprima Articolo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>Nessun contenuto da mostrare</p>' }} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* QA Tab */}
            <TabsContent value="qa" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Controlli Qualità (QA)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {qaChecks.map((check) => (
                      <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {check.passed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className={check.required ? 'font-medium' : ''}>
                            {check.label}
                            {check.required && <span className="text-red-500 ml-1">*</span>}
                          </span>
                        </div>
                        <Badge variant={check.passed ? "default" : "destructive"}>
                          {check.passed ? "PASS" : "FAIL"}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {!allRequiredPassed && (
                    <Alert className="mt-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Alcuni controlli obbligatori non sono superati. 
                        L'articolo non può essere pubblicato fino a quando tutti i controlli obbligatori (*) non sono verdi.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-6">
            <div className="text-sm text-muted-foreground">
              Status: <Badge variant="outline">{formData.status.toUpperCase()}</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSave('draft')}
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                Salva Draft
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleSave('review')}
                disabled={loading}
              >
                Salva per Review
              </Button>
              
              <Button 
                onClick={() => handleSave('published')}
                disabled={loading || !allRequiredPassed}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Pubblica
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlogAdmin;