import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit3, Calendar } from "lucide-react";

interface DraftItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
  created_at: string;
  excerpt: string | null;
}

const AdminBlogDrafts = () => {
  const { isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    loadDrafts();
  }, [isAdmin]);

  const loadDrafts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, status, updated_at, created_at, excerpt")
        .eq("status", "draft")
        .order("updated_at", { ascending: false });
      
      if (error) {
        toast({ title: "Errore", description: error.message, variant: "destructive" });
      } else {
        setDrafts(data || []);
      }
    } catch (error) {
      toast({ title: "Errore", description: "Impossibile caricare le bozze", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteDraft = async (id: string, title: string) => {
    if (!confirm(`Sei sicuro di voler eliminare la bozza "${title}"? Questa azione non può essere annullata.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) {
        toast({ title: "Errore", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Bozza eliminata", description: `"${title}" è stata eliminata con successo` });
        loadDrafts(); // Ricarica la lista
      }
    } catch (error) {
      toast({ title: "Errore", description: "Impossibile eliminare la bozza", variant: "destructive" });
    }
  };

  const publishDraft = async (id: string, title: string) => {
    if (!confirm(`Vuoi pubblicare immediatamente la bozza "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ status: "published", published_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        toast({ title: "Errore", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Articolo pubblicato", description: `"${title}" è ora pubblicato` });
        loadDrafts(); // Ricarica la lista
      }
    } catch (error) {
      toast({ title: "Errore", description: "Impossibile pubblicare l'articolo", variant: "destructive" });
    }
  };

  const filtered = useMemo(() => {
    return drafts.filter(d => {
      return q ? (d.title.toLowerCase().includes(q.toLowerCase()) || d.slug.includes(q)) : true;
    });
  }, [drafts, q]);

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Helmet>
          <title>Bozze Blog - Accesso riservato</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="text-3xl font-bold mb-2">Accesso riservato</h1>
        <p className="text-muted-foreground">Questa sezione è disponibile solo agli amministratori.</p>
        <Link to="/admin/auth" className="underline mt-4 inline-block">Vai al login admin</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Bozze Articoli - Admin Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bozze Articoli</h1>
          <p className="text-muted-foreground">Gestisci le bozze dei tuoi articoli</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/admin/blog")} variant="outline">Tutti gli articoli</Button>
          <Button onClick={() => navigate("/admin/blog/new")}>Nuova bozza</Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Input 
          placeholder="Cerca nelle bozze..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
          className="max-w-xs" 
        />
        <Badge variant="secondary">{filtered.length} bozze</Badge>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Nessuna bozza trovata</h3>
          <p className="text-muted-foreground mb-4">
            {q ? 'Nessuna bozza corrisponde alla tua ricerca.' : 'Non hai ancora creato nessuna bozza.'}
          </p>
          <Button onClick={() => navigate("/admin/blog/new")}>Crea la prima bozza</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(draft => (
            <Card key={draft.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{draft.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-2 font-mono">
                  /{draft.slug}
                </div>
                
                {draft.excerpt && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {draft.excerpt}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Modificata: {new Date(draft.updated_at).toLocaleDateString("it-IT")}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Link to={`/admin/blog/${draft.id}`}>
                      <Edit3 className="w-3 h-3 mr-1" />
                      Modifica
                    </Link>
                  </Button>
                  
                  <Button 
                    onClick={() => publishDraft(draft.id, draft.title)}
                    variant="default" 
                    size="sm"
                    className="flex-1"
                  >
                    Pubblica
                  </Button>
                  
                  <Button 
                    onClick={() => deleteDraft(draft.id, draft.title)}
                    variant="destructive" 
                    size="sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminBlogDrafts;