import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGeminiAPI } from "@/hooks/useGeminiAPI";

interface Category { id: string; name: string; slug: string; }

const slugify = (s: string) => s
  .toLowerCase()
  .normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const AdminBlogEditor = () => {
  const { isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const editingId = params.id;
  const isEdit = !!editingId;
  const { callGeminiAPI } = useGeminiAPI();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>("draft");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    const loadCats = async () => {
      const { data } = await supabase.from('blog_categories').select('id,name,slug').order('name');
      setCategories(data || []);
    };
    loadCats();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', editingId)
        .maybeSingle();
      if (error) {
        toast({ title: 'Errore', description: error.message, variant: 'destructive' });
        return;
      }
      if (data) {
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setFeatured(data.featured_image || '');
        setStatus((data.status as any) || 'draft');
        setCategoryId(data.category_id || undefined);
      }
    };
    load();
  }, [isEdit, editingId]);

  const onTitleBlur = () => {
    if (!slug && title) setSlug(slugify(title));
  };

  const save = async (nextStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      toast({ title: 'Errore', description: 'Il titolo è obbligatorio', variant: 'destructive' });
      return;
    }
    
    if (!slug.trim()) {
      toast({ title: 'Errore', description: 'Lo slug è obbligatorio', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const payload: any = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, '').slice(0, 160),
      content: content.trim(),
      featured_image: featured.trim() || null,
      status: nextStatus || status,
      category_id: categoryId || null,
    };

    let error;
    if (isEdit) {
      const res = await supabase.from('blog_posts').update(payload).eq('id', editingId).select('id').maybeSingle();
      error = res.error as any;
    } else {
      const res = await supabase.from('blog_posts').insert(payload).select('id').maybeSingle();
      error = res.error as any;
    }

    if (error) {
      if (error.message?.includes('duplicate key value violates unique constraint')) {
        toast({ title: 'Errore slug duplicato', description: 'Questo slug è già in uso. Modificalo per renderlo unico.', variant: 'destructive' });
      } else {
        toast({ title: 'Errore salvataggio', description: error.message, variant: 'destructive' });
      }
    } else {
      toast({ title: 'Salvato', description: nextStatus === 'published' ? 'Articolo pubblicato' : 'Bozza salvata' });
      
      // Submit to search engines when published
      if (nextStatus === 'published') {
        try {
          const postUrl = `https://www.muvfitness.it/${slug.trim()}`;
          await supabase.functions.invoke('indexnow-submitter', {
            body: { urls: [postUrl] }
          });
          toast({
            title: "Invio automatico completato",
            description: "Articolo inviato ai motori di ricerca",
          });
        } catch (indexError: any) {
          console.error('IndexNow submission error:', indexError);
          // Don't show error toast for IndexNow failures, it's not critical
        }
      }
      
      navigate('/admin/blog');
    }
    setSaving(false);
  };

  const generateAI = async () => {
    if (!aiTopic) {
      toast({ title: 'Inserisci un argomento', description: 'Es. Allenamento EMS per principianti' });
      return;
    }
    setAiLoading(true);
    try {
      const prompt = `Scrivi un articolo di blog in italiano per il sito MUV Fitness (Personal Training, EMS, Pilates a Legnago). Titolo accattivante, introduzione breve, paragrafi con sottotitoli H2/H3, punti elenco quando utile, conclusione con CTA gentile. Tema: ${aiTopic}.`;
      const ai = await callGeminiAPI(prompt);
      const text = typeof ai === 'string' ? ai : (ai?.content || JSON.stringify(ai));
      setContent(text);
      if (!title) setTitle(aiTopic);
      if (!excerpt) setExcerpt(text.replace(/<[^>]*>/g, '').slice(0, 160));
      if (!slug) setSlug(slugify(aiTopic));
      toast({ title: 'Bozza generata', description: 'Rivedi il testo prima di pubblicare.' });
    } catch (e: any) {
      toast({ title: 'Errore IA', description: e.message || 'Impossibile generare la bozza', variant: 'destructive' });
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast({ title: 'Seleziona un file', description: 'Scegli un\'immagine da caricare' });
      return;
    }
    try {
      setUploading(true);
      const ext = uploadFile.name.split('.').pop() || 'jpg';
      const safeName = uploadFile.name.replace(/[^a-zA-Z0-9.\-_/]/g, '-');
      const path = `blog/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('immagini').upload(path, uploadFile, {
        cacheControl: '3600',
        contentType: uploadFile.type || 'image/*',
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('immagini').getPublicUrl(path);
      if (data?.publicUrl) {
        console.log('Generated featured image URL:', data.publicUrl); // Debug log
        setFeatured(data.publicUrl);
        toast({ title: 'Immagine caricata', description: 'URL inserito automaticamente' });
      }
    } catch (e: any) {
      toast({ title: 'Errore upload', description: e.message || 'Caricamento non riuscito', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Helmet><title>Editor Blog - Accesso riservato</title><meta name="robots" content="noindex, nofollow" /></Helmet>
        <h1 className="text-3xl font-bold mb-2">Accesso riservato</h1>
        <p className="text-muted-foreground">Questa sezione è disponibile solo agli amministratori.</p>
      </main>
    );
  }

  const headerTitle = isEdit ? 'Modifica articolo' : 'Nuovo articolo';

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>{headerTitle} - Admin Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{headerTitle}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/blog')}>Annulla</Button>
          <Button disabled={saving} onClick={() => save('draft')}>{saving ? 'Salvataggio...' : 'Salva bozza'}</Button>
          <Button disabled={saving} variant="secondary" onClick={() => save('published')}>{saving ? '...' : 'Pubblica'}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <Label htmlFor="title">Titolo</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} onBlur={onTitleBlur} />
          </div>
          <div>
            <Label htmlFor="slug">Slug URL (modificabile)</Label>
            <Input 
              id="slug" 
              value={slug} 
              onChange={e => setSlug(e.target.value)}
              placeholder="scrivi-il-tuo-slug-personalizzato"
              className="bg-background border-input"
              autoComplete="off"
            />
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (title) {
                    const autoSlug = slugify(title);
                    setSlug(autoSlug);
                  }
                }}
              >
                Auto-genera da titolo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const cleanSlug = slug
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');
                  setSlug(cleanSlug);
                }}
              >
                Pulisci slug
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              URL finale: <code className="bg-muted px-1 rounded text-xs">www.muvfitness.it/{slug || 'il-tuo-slug'}</code>
            </p>
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ Modifica lo slug solo se necessario. Cambiarlo dopo la pubblicazione può danneggiare i link esistenti.
            </p>
          </div>
          <div>
            <Label htmlFor="excerpt">Excerpt (max 160 caratteri)</Label>
            <Textarea id="excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} />
          </div>
          <div>
            <Label htmlFor="content">Contenuto (HTML o testo)</Label>
            <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={20} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId as any}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="featured">Immagine di copertina</Label>
            <Input id="featured" value={featured} onChange={e => setFeatured(e.target.value)} placeholder="https://..." className="mb-2" />
            <div className="flex items-center gap-2">
              <Input type="file" accept="image/*" onChange={e => setUploadFile(e.target.files?.[0] || null)} />
              <Button onClick={handleUpload} disabled={uploading}>{uploading ? 'Caricamento...' : 'Carica'}</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Carica su Storage e imposta automaticamente l'URL pubblico.</p>
          </div>
          <div>
            <Label>Stato</Label>
            <div className="flex gap-2 mt-2">
              <Button variant={status === 'draft' ? 'default' : 'outline'} size="sm" onClick={() => setStatus('draft')}>Bozza</Button>
              <Button variant={status === 'published' ? 'default' : 'outline'} size="sm" onClick={() => setStatus('published')}>Pubblicato</Button>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Genera bozza con IA</h2>
            <Input placeholder="Argomento (es. Allenamento EMS per principianti)" value={aiTopic} onChange={e => setAiTopic(e.target.value)} className="mb-2" />
            <Button onClick={generateAI} disabled={aiLoading}>{aiLoading ? 'Generazione...' : 'Genera bozza'}</Button>
            <p className="text-xs text-muted-foreground mt-2">La bozza verrà inserita nel campo contenuto. Rivedi e modifica prima della pubblicazione.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminBlogEditor;
