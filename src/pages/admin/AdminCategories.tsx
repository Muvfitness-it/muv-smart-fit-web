import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface Category { id: string; name: string; slug: string; description: string | null; color: string | null; }

const slugify = (s: string) => s
  .toLowerCase()
  .normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const AdminCategories = () => {
  const { isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name, slug, description, color')
        .order('name');
      if (error) toast({ title: 'Errore', description: error.message, variant: 'destructive' });
      setItems(data || []);
      setLoading(false);
    };
    load();
  }, [isAdmin]);

  const create = async () => {
    if (!name) { toast({ title: 'Nome richiesto', description: 'Inserisci un nome categoria' }); return; }
    setSaving(true);
    const payload = { name, slug: slug || slugify(name) } as any;
    const { error } = await supabase.from('blog_categories').insert(payload);
    if (error) {
      toast({ title: 'Errore creazione', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Categoria creata' });
      setName(""); setSlug("");
      const { data } = await supabase.from('blog_categories').select('id, name, slug, description, color').order('name');
      setItems(data || []);
    }
    setSaving(false);
  };

  const update = async (id: string, fields: Partial<Category>) => {
    const { error } = await supabase.from('blog_categories').update(fields).eq('id', id);
    if (error) {
      toast({ title: 'Errore salvataggio', description: error.message, variant: 'destructive' });
    } else {
      setItems(prev => prev.map(it => it.id === id ? { ...it, ...fields } as Category : it));
      toast({ title: 'Salvato' });
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Eliminare questa categoria?')) return;
    const { error } = await supabase.from('blog_categories').delete().eq('id', id);
    if (error) {
      toast({ title: 'Errore eliminazione', description: error.message, variant: 'destructive' });
    } else {
      setItems(prev => prev.filter(it => it.id !== id));
      toast({ title: 'Categoria eliminata' });
    }
  };

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Helmet><title>Categorie - Accesso riservato</title><meta name="robots" content="noindex, nofollow" /></Helmet>
        <h1 className="text-3xl font-bold mb-2">Accesso riservato</h1>
        <p className="text-muted-foreground">Questa sezione è disponibile solo agli amministratori.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Gestione Categorie - Admin Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin-control')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna a Admin Control
        </Button>
        <h1 className="text-2xl font-bold">Categorie Blog</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Nuova categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={name} onChange={e => setName(e.target.value)} onBlur={() => { if (!slug) setSlug(slugify(name)); }} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={slug} onChange={e => setSlug(slugify(e.target.value))} />
            </div>
            <div className="flex items-end">
              <Button onClick={create} disabled={saving}>{saving ? '...' : 'Crea'}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 bg-muted animate-pulse rounded" />)}
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map(cat => (
            <Card key={cat.id}>
              <CardContent className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                  <div className="md:col-span-2">
                    <Label className="text-xs text-muted-foreground">Nome</Label>
                    <Input value={cat.name} onChange={e => setItems(prev => prev.map(it => it.id === cat.id ? { ...it, name: e.target.value } : it))} onBlur={e => update(cat.id, { name: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs text-muted-foreground">Slug</Label>
                    <Input value={cat.slug} onChange={e => setItems(prev => prev.map(it => it.id === cat.id ? { ...it, slug: slugify(e.target.value) } : it))} onBlur={e => update(cat.id, { slug: slugify(e.target.value) })} />
                  </div>
                  <div className="flex justify-end">
                    <Button variant="destructive" onClick={() => remove(cat.id)}>Elimina</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminCategories;
