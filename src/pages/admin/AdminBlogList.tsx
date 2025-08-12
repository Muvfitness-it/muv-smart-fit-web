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

interface PostListItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
  published_at: string | null;
}

const AdminBlogList = () => {
  const { isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [items, setItems] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string | "all">("all");

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, status, updated_at, published_at")
        .order("updated_at", { ascending: false });
      if (error) {
        toast({ title: "Errore", description: error.message, variant: "destructive" });
      }
      setItems(data || []);
      setLoading(false);
    };
    load();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return items.filter(i => {
      const matchesQ = q ? (i.title.toLowerCase().includes(q.toLowerCase()) || i.slug.includes(q)) : true;
      const matchesStatus = status === "all" ? true : i.status === status;
      return matchesQ && matchesStatus;
    });
  }, [items, q, status]);

  if (!isAdmin) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Helmet>
          <title>Admin Blog - Accesso riservato</title>
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
        <title>Gestione Blog - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Articoli</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/admin/blog/categorie")} variant="outline">Categorie</Button>
          <Button onClick={() => navigate("/admin/blog/new")}>Nuovo articolo</Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Input placeholder="Cerca titolo o slug..." value={q} onChange={e => setQ(e.target.value)} className="max-w-xs" />
        <div className="flex items-center gap-2">
          <Button variant={status === "all" ? "default" : "outline"} size="sm" onClick={() => setStatus("all")}>Tutti</Button>
          <Button variant={status === "draft" ? "default" : "outline"} size="sm" onClick={() => setStatus("draft")}>Bozze</Button>
          <Button variant={status === "published" ? "default" : "outline"} size="sm" onClick={() => setStatus("published")}>Pubblicati</Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-1">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-2">/{p.slug}</div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
                  {p.published_at && <span className="text-xs text-muted-foreground">{new Date(p.published_at).toLocaleDateString("it-IT")}</span>}
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm"><Link to={`/admin/blog/${p.id}`}>Modifica</Link></Button>
                  <Button asChild variant="ghost" size="sm"><Link to={`/blog/${p.slug}`}>Apri</Link></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminBlogList;
