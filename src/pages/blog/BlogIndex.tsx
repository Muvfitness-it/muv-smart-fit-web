import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LazyImage from "@/components/ui/LazyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Load categories once
  useEffect(() => {
    const loadCats = async () => {
      const { data: cats } = await supabase.from("blog_categories").select("id, name, slug").order("name");
      setCategories(cats || []);
    };
    loadCats();
  }, []);

  // Load posts on page or filter change
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image, published_at, category_id", { count: "exact" })
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .range(from, to);

      if (selectedCatId) query = query.eq("category_id", selectedCatId);

      const { data, count } = await query;
      setPosts(data || []);
      setTotalPages(Math.max(1, Math.ceil((count || 0) / PAGE_SIZE)));
      setLoading(false);
    };

    // Update URL search params (SEO-friendly pagination)
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) newParams.set("page", String(page)); else newParams.delete("page");
    setSearchParams(newParams, { replace: true });

    loadPosts();
  }, [page, selectedCatId]);

  const pageTitle = "Blog MUV Fitness Legnago: articoli e guide";
  const pageDescription = "Scopri articoli, consigli e guide su allenamento, EMS, Pilates e benessere. Aggiornato dal team MUV Fitness.";

  const formattedPosts = useMemo(() =>
    posts.map(p => ({
      ...p,
      date: p.published_at ? new Date(p.published_at).toLocaleDateString("it-IT") : "",
    })),
    [posts]
  );

  const prevUrl = page > 1 ? (page === 2 ? "/blog" : `/blog?page=${page - 1}`) : undefined;
  const nextUrl = page < totalPages ? `/blog?page=${page + 1}` : undefined;
  const canonical = page > 1 ? `https://www.muvfitness.it/blog?page=${page}` : "https://www.muvfitness.it/blog";

  const goToPage = (p: number) => setPage(Math.min(Math.max(p, 1), totalPages));
  const pagesToShow = useMemo(() => {
    const arr: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }, [page, totalPages]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        {prevUrl && <link rel="prev" href={`https://www.muvfitness.it${prevUrl}`} />}
        {nextUrl && <link rel="next" href={`https://www.muvfitness.it${nextUrl}`} />}
        <link rel="alternate" type="application/rss+xml" title="MUV Fitness Blog RSS" href="https://baujoowgqeyraqnukkmw.functions.supabase.co/blog-rss" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.muvfitness.it/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.muvfitness.it/blog" },
          ],
        })}</script>
      </Helmet>

      <header className="relative border-b border-border">
        {/* Background image + overlay for readability */}
        <div className="absolute inset-0 bg-[url('/images/fitness-professional-bg.jpg')] bg-cover bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" aria-hidden="true" />

        <div className="container relative mx-auto px-4 py-12 md:py-16 min-h-[280px] md:min-h-[360px] flex flex-col items-center justify-center text-center gap-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">Blog MUV Fitness</h1>
          <p>
            <span className="inline-block rounded-md bg-black/50 backdrop-blur-sm px-3 py-1 text-sm md:text-base text-white ring-1 ring-white/20 shadow-sm">
              Articoli pratici e guide su Personal Training, EMS, Pilates e benessere, a cura del nostro team.
            </span>
          </p>
          <a
            href="https://baujoowgqeyraqnukkmw.functions.supabase.co/blog-rss"
            className="text-sm text-white/80 hover:text-white hover:underline transition-colors"
            aria-label="Feed RSS del Blog MUV Fitness"
          >RSS</a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Categories + Filter */}
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
              <Select value={selectedCatId || "all"} onValueChange={(v) => { setSelectedCatId(v === "all" ? null : v); setPage(1); }}>
                <SelectTrigger aria-label="Filtra per categoria" className="h-10 bg-muted/60 text-foreground border-border focus:ring-2 focus:ring-primary/40 focus:border-primary/40">
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

              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Paginazione articoli">
                  <Button variant="outline" size="sm" onClick={() => goToPage(page - 1)} disabled={page === 1}>Precedente</Button>
                  {pagesToShow.map(n => (
                    <Button key={n} size="sm" variant={n === page ? "default" : "outline"} onClick={() => goToPage(n)} aria-current={n === page ? "page" : undefined}>
                      {n}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Successiva</Button>
                </nav>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default BlogIndex;
