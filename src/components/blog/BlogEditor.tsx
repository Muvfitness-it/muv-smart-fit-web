import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import RichTextEditor from './RichTextEditor';
import ImageUploader from './ImageUploader';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Eye, Globe } from 'lucide-react';

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  status: 'draft' | 'published';
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  reading_time: number;
}

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  
  const [formData, setFormData] = useState<BlogPostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: 'MUV Team',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    reading_time: 5
  });

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        toast({
          title: "Errore",
          description: "Articolo non trovato",
          variant: "destructive"
        });
        navigate('/blog/gestisci');
        return;
      }

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        featured_image: data.featured_image || '',
        author_name: data.author_name || 'MUV Team',
        status: (data.status as 'draft' | 'published') || 'draft',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || '',
        reading_time: data.reading_time || 5
      });
    } catch (error) {
      console.error('Error loading post:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare l'articolo",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[àáäâ]/g, 'a')
      .replace(/[èéëê]/g, 'e')
      .replace(/[ìíïî]/g, 'i')
      .replace(/[òóöô]/g, 'o')
      .replace(/[ùúüû]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: !id ? generateSlug(value) : formData.slug, // Only auto-generate slug for new posts
      meta_title: value.slice(0, 60)
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
      reading_time: estimateReadingTime(content)
    });
  };

  const savePost = async (status: 'draft' | 'published') => {
    try {
      setSaving(true);

      if (!formData.title.trim()) {
        toast({
          title: "Errore",
          description: "Il titolo è obbligatorio",
          variant: "destructive"
        });
        return;
      }

      if (!formData.content.trim()) {
        toast({
          title: "Errore", 
          description: "Il contenuto è obbligatorio",
          variant: "destructive"
        });
        return;
      }

      const postData = {
        ...formData,
        status,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || formData.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...',
        meta_description: formData.meta_description || formData.excerpt.slice(0, 160),
        reading_time: estimateReadingTime(formData.content)
      };

      let result;
      if (id) {
        result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
      } else {
        result = await supabase
          .from('blog_posts')
          .insert([postData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Successo",
        description: `Articolo ${status === 'published' ? 'pubblicato' : 'salvato'} con successo`,
      });

      // Aggiungi un piccolo delay per permettere al database di aggiornarsi
      setTimeout(() => {
        navigate('/blog/gestisci');
      }, 500);
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Errore",
        description: "Impossibile salvare l'articolo",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog/gestisci')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna indietro
            </Button>
            <h1 className="text-2xl font-bold">
              {id ? 'Modifica Articolo' : 'Nuovo Articolo'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={formData.status === 'published' ? 'default' : 'secondary'}>
              {formData.status === 'published' ? 'Pubblicato' : 'Bozza'}
            </Badge>
            <Button
              variant="outline"
              onClick={() => savePost('draft')}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Salva Bozza
            </Button>
            <Button
              onClick={() => savePost('published')}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Pubblica
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg">
          <Button
            variant={activeTab === 'content' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('content')}
            className="flex-1"
          >
            Contenuto
          </Button>
          <Button
            variant={activeTab === 'seo' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('seo')}
            className="flex-1"
          >
            SEO & Metadati
          </Button>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Articolo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titolo *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Inserisci il titolo dell'articolo..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug URL</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-articolo"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    URL dell'articolo: /blog/{formData.slug}
                  </p>
                </div>

                <div>
                  <Label htmlFor="excerpt">Riassunto</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Breve descrizione dell'articolo..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Immagine in evidenza</Label>
                  <div className="mt-2 space-y-4">
                    <ImageUploader 
                      onImageUploaded={(url) => setFormData({ ...formData, featured_image: url })}
                      currentImage={formData.featured_image}
                    />
                    <div>
                      <Label htmlFor="featured_image_url" className="text-sm text-muted-foreground">Oppure inserisci URL manualmente</Label>
                      <Input
                        id="featured_image_url"
                        value={formData.featured_image}
                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Autore</Label>
                    <Input
                      id="author"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Tempo di lettura</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        max="60"
                        value={formData.reading_time}
                        onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) || 5 })}
                      />
                      <span className="text-sm text-muted-foreground">minuti</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Contenuto Articolo *</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Scrivi il contenuto del tuo articolo..."
                  className="min-h-[400px]"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <Card>
            <CardHeader>
              <CardTitle>SEO e Metadati</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="Titolo per i motori di ricerca..."
                  className="mt-1"
                  maxLength={60}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.meta_title.length}/60 caratteri
                </p>
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="Descrizione per i motori di ricerca..."
                  className="mt-1"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.meta_description.length}/160 caratteri
                </p>
              </div>

              <div>
                <Label htmlFor="meta_keywords">Parole Chiave</Label>
                <Input
                  id="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  placeholder="fitness, allenamento, benessere..."
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Separa le parole chiave con virgole
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;