import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LazyImage from "@/components/ui/LazyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const PAGE_SIZE = 9;

const BlogIndex = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      const [{ data: cats }, { data: firstPosts, count }] = await Promise.all([
        supabase.from("blog_categories").select("id, name, slug").order("name"),
        supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, featured_image, published_at, category_id", { count: "exact" })
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .range(0, PAGE_SIZE - 1),
      ]);

      setCategories(cats || []);
      setPosts(firstPosts || []);
      setHasMore((count || 0) > PAGE_SIZE);
      setLoading(false);
    };
    loadInitial();
  }, []);

  // Ricarica quando cambia il filtro categoria
  useEffect(() => {
    const reload = async () => {
      setLoading(true);
      setPage(0);
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, published_at, category_id", { count: "exact" })
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .range(0, PAGE_SIZE - 1);
      if (selectedCatId) query = query.eq("category_id", selectedCatId);
      const { data, count } = await query;
      setPosts(data || []);
      setHasMore((count || 0) > PAGE_SIZE);
      setLoading(false);
    };
    // esegui su ogni cambio filtro
    reload();
  }, [selectedCatId]);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const from = (page + 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    let query = supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, published_at, category_id")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to);
    if (selectedCatId) query = query.eq("category_id", selectedCatId);
    const { data } = await query;

    const newPosts = data || [];
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    if (newPosts.length < PAGE_SIZE) setHasMore(false);
    setLoadingMore(false);
  };

  const pageTitle = "Blog MUV Fitness Legnago: articoli e guide";
  const pageDescription = "Scopri articoli, consigli e guide su allenamento, EMS, Pilates e benessere. Aggiornato dal team MUV Fitness.";

  const formattedPosts = useMemo(() =>
    posts.map(p => ({
      ...p,
      date: p.published_at ? new Date(p.published_at).toLocaleDateString("it-IT") : "",
    })),
    [posts]
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.muvfitness.it/blog" />
        <link rel="alternate" type="application/rss+xml" title="MUV Fitness Blog RSS" href="https://baujoowgqeyraqnukkmw.functions.supabase.co/blog-rss" />
      </Helmet>

      <header className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog MUV Fitness</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Articoli pratici e guide su Personal Training, EMS, Pilates e benessere, a cura del nostro team.
              </p>
            </div>
            <a
              href="https://baujoowgqeyraqnukkmw.functions.supabase.co/blog-rss"
              className="text-sm text-muted-foreground hover:underline"
              aria-label="Feed RSS del Blog MUV Fitness"
            >RSS</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <section aria-label="Categorie" className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link key={c.id} to={`/blog/c/${c.slug}`}>
                  <Badge variant="secondary" className="hover:opacity-80 transition" aria-label={`Categoria ${c.name}`}>
                    {c.name}
                  </Badge>
                </Link>
              ))}
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCatId || "all"} onValueChange={(v) => setSelectedCatId(v === "all" ? null : v)}>
                <SelectTrigger aria-label="Filtra per categoria">
                  <SelectValue placeholder="Filtra per categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le categorie</SelectItem>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section aria-label="Articoli">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formattedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    {post.featured_image && (
                      <Link to={`/blog/${post.slug}`} aria-label={`Apri articolo ${post.title}`}>
                        <LazyImage
                          src={post.featured_image}
                          alt={`Copertina articolo ${post.title} - MUV Fitness Legnago`}
                          className="w-full h-48 object-cover"
                          width={1200}
                          height={630}
                        />
                      </Link>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="mt-4">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/blog/${post.slug}`}>Leggi l'articolo</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button onClick={loadMore} disabled={loadingMore} variant="secondary">
                    {loadingMore ? "Caricamento..." : "Carica altri"}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default BlogIndex;
