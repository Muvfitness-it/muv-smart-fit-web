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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Save, Eye, Globe, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  status: 'draft' | 'published' | 'scheduled';
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  reading_time: number;
  scheduled_publish_at?: string | null;
  category_id?: string | null;
}

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [tags, setTags] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
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
    reading_time: 5,
    scheduled_publish_at: null,
    category_id: null
  });

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  useEffect(() => {
    const loadTaxonomies = async () => {
      const { data: cats } = await supabase
        .from('blog_categories')
        .select('id, name')
        .order('name');
      setCategories(cats || []);

      const { data: tagList } = await supabase
        .from('blog_tags')
        .select('id, name')
        .order('name');
      setTags(tagList || []);
    };
    loadTaxonomies();
  }, []);

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
        status: (data.status as 'draft' | 'published' | 'scheduled') || 'draft',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || '',
        reading_time: data.reading_time || 5,
        scheduled_publish_at: data.scheduled_publish_at || null,
        category_id: data.category_id || null
      });
      setScheduledDate(data.scheduled_publish_at ? new Date(data.scheduled_publish_at) : undefined);

      // Carica tag collegati
      const { data: postTags } = await supabase
        .from('blog_post_tags')
        .select('tag_id')
        .eq('post_id', id);
      setSelectedTags((postTags || []).map((r: any) => r.tag_id).filter(Boolean));
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

  const saveTagRelations = async (postId: string) => {
    try {
      await supabase.from('blog_post_tags').delete().eq('post_id', postId);
      if (selectedTags.length > 0) {
        const rows = selectedTags.map((tagId) => ({ post_id: postId, tag_id: tagId }));
        await supabase.from('blog_post_tags').insert(rows);
      }
    } catch (e) {
      console.error('Errore salvataggio tag:', e);
    }
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

      let postId: string | undefined = id;
      if (id) {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id)
          .select('id')
          .maybeSingle();
        if (error) throw error;
        postId = data?.id || id;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select('id')
          .maybeSingle();
        if (error) throw error;
        postId = data?.id;
      }

      if (postId) {
        await saveTagRelations(postId);
      }

      toast({
        title: "Successo",
        description: `Articolo ${status === 'published' ? 'pubblicato' : 'salvato'} con successo`,
      });

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

  const schedulePost = async () => {
    try {
      if (!scheduledDate) {
        toast({ title: 'Data mancante', description: 'Seleziona una data futura per programmare la pubblicazione', variant: 'destructive' });
        return;
      }
      setSaving(true);
      const dateAtNine = new Date(scheduledDate);
      dateAtNine.setHours(9, 0, 0, 0);

      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || formData.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...',
        meta_description: formData.meta_description || formData.excerpt.slice(0, 160),
        reading_time: estimateReadingTime(formData.content),
        scheduled_publish_at: dateAtNine.toISOString(),
        status: 'scheduled' as const,
      };

      let postId: string | undefined = id;
      if (id) {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', id)
          .select('id')
          .maybeSingle();
        if (error) throw error;
        postId = data?.id || id;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([payload])
          .select('id')
          .maybeSingle();
        if (error) throw error;
        postId = data?.id;
      }

      if (postId) {
        await saveTagRelations(postId);
      }

      toast({ title: 'Programmato', description: 'Articolo programmato con successo' });
      setTimeout(() => navigate('/blog/gestisci'), 500);
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({ title: 'Errore', description: 'Impossibile programmare l\'articolo', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const cancelSchedule = async () => {
    try {
      if (!id) return;
      setSaving(true);
      const { error } = await supabase
        .from('blog_posts')
        .update({ scheduled_publish_at: null, status: 'draft' })
        .eq('id', id);
      if (error) throw error;
      setScheduledDate(undefined);
      setFormData({ ...formData, status: 'draft', scheduled_publish_at: null });
      toast({ title: 'Programmazione annullata', description: 'L\'articolo è tornato in bozza' });
    } catch (error) {
      console.error('Error canceling schedule:', error);
      toast({ title: 'Errore', description: 'Impossibile annullare la programmazione', variant: 'destructive' });
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
            <Badge variant={
              formData.status === 'published' ? 'default' : 'secondary'
            }>
              {formData.status === 'published' ? 'Pubblicato' : formData.status === 'scheduled' ? 'Programmato' : 'Bozza'}
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

                {/* Categoria */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Categoria</Label>
                    <div className="mt-1">
                      <Select value={formData.category_id || ''} onValueChange={(val) => setFormData({ ...formData, category_id: val || null })}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleziona categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Nessuna</SelectItem>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Tag */}
                  <div>
                    <Label>Tag</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 max-h-40 overflow-auto border border-border rounded p-2">
                      {tags.map(t => (
                        <label key={t.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={selectedTags.includes(t.id)}
                            onCheckedChange={(checked) => {
                              setSelectedTags(prev => checked ? [...prev, t.id] : prev.filter(id => id !== t.id));
                            }}
                          />
                          <span>{t.name}</span>
                        </label>
                      ))}
                      {tags.length === 0 && (
                        <span className="text-muted-foreground text-sm">Nessun tag disponibile</span>
                      )}
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle>Programmazione Pubblicazione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-[260px] justify-start font-normal ${!scheduledDate ? 'text-muted-foreground' : ''}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledDate ? scheduledDate.toLocaleDateString('it-IT') : <span>Scegli una data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduledDate}
                        onSelect={setScheduledDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="flex gap-2">
                    <Button onClick={schedulePost} disabled={saving || !scheduledDate} className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Programma
                    </Button>
                    {formData.status === 'scheduled' && (
                      <Button variant="outline" onClick={cancelSchedule} disabled={saving}>
                        Annulla Programmazione
                      </Button>
                    )}
                  </div>
                </div>
                {formData.scheduled_publish_at && (
                  <p className="text-sm text-muted-foreground">Attuale: {new Date(formData.scheduled_publish_at).toLocaleString('it-IT')}</p>
                )}
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