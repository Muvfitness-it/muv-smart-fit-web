import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LazyImage from "@/components/ui/LazyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const PAGE_SIZE = 9;

const BlogCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [recommended, setRecommended] = useState<Post[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const { data: cat } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .eq("slug", slug)
        .maybeSingle();

      setCategory(cat || null);

      if (cat) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        const { data: pagePosts, count } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, featured_image, published_at", { count: "exact" })
          .eq("status", "published")
          .eq("category_id", cat.id)
          .order("published_at", { ascending: false })
          .range(from, to);

        setPosts(pagePosts || []);
        setTotalPages(Math.max(1, Math.ceil((count || 0) / PAGE_SIZE)));

        // Consigliati (ultimi 6 della categoria, esclusi quelli della pagina corrente)
        const { data: rec } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, published_at')
          .eq('status', 'published')
          .eq('category_id', cat.id)
          .order('published_at', { ascending: false })
          .limit(6);
        const existingIds = new Set((pagePosts || []).map(p => p.id));
        const filtered = (rec || []).filter(p => !existingIds.has(p.id)).slice(0, 3) as Post[];
        setRecommended(filtered);
      } else {
        setPosts([]);
        setTotalPages(1);
        setRecommended([]);
      }

      setLoading(false);

      // Update URL params
      const newParams = new URLSearchParams(searchParams);
      if (page > 1) newParams.set("page", String(page)); else newParams.delete("page");
      setSearchParams(newParams, { replace: true });
    };
    load();
  }, [slug, page]);

  const formattedPosts = useMemo(() =>
    posts.map(p => ({
      ...p,
      date: p.published_at ? new Date(p.published_at).toLocaleDateString("it-IT") : "",
    })),
    [posts]
  );

  const title = category ? `${category.name} - Blog MUV Fitness Legnago` : "Categoria - Blog";
  const description = category
    ? `Articoli della categoria ${category.name} del Blog MUV Fitness: consigli pratici e guide.`
    : "Articoli per categoria - Blog MUV Fitness.";

  const canonical = slug
    ? (page > 1
        ? `https://www.muvfitness.it/blog/c/${slug}?page=${page}`
        : `https://www.muvfitness.it/blog/c/${slug}`)
    : undefined;
  const prevUrl = page > 1 ? (page === 2 ? `/blog/c/${slug}` : `/blog/c/${slug}?page=${page - 1}`) : undefined;
  const nextUrl = page < totalPages ? `/blog/c/${slug}?page=${page + 1}` : undefined;

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
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        {prevUrl && <link rel="prev" href={`https://www.muvfitness.it${prevUrl}`} />}
        {nextUrl && <link rel="next" href={`https://www.muvfitness.it${nextUrl}`} />}
        {slug && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.muvfitness.it/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.muvfitness.it/blog" },
              { "@type": "ListItem", position: 3, name: category?.name || "Categoria", item: `https://www.muvfitness.it/blog/c/${slug}` },
            ],
          })}</script>
        )}
      </Helmet>

      <header className="bg-background/60 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-6">
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/blog/c/${slug}`}>{category?.name || "Categoria"}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {category ? category.name : "Categoria"}
            </h1>
            <p className="text-muted-foreground mt-2">Articoli filtrati per categoria.</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-muted-foreground">Nessun articolo trovato per questa categoria.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  {post.featured_image && (
                    <Link to={`/${post.slug}`} aria-label={`Apri articolo ${post.title}`}>
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
                      <Link to={`/${post.slug}`} className="hover:underline">
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
                        <Link to={`/${post.slug}`}>Leggi l'articolo</Link>
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

            {recommended.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Articoli consigliati{category ? ` in ${category.name}` : ''}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommended.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      {post.featured_image && (
                        <Link to={`/${post.slug}`} aria-label={`Apri articolo ${post.title}`}>
                          <LazyImage
                            src={post.featured_image}
                            alt={`Copertina articolo ${post.title} - MUV Fitness Legnago`}
                            className="w-full h-40 object-cover"
                            width={800}
                            height={450}
                          />
                        </Link>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">
                          <Link to={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {post.excerpt && <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                        <div className="mt-3">
                          <Button asChild size="sm" variant="outline"><Link to={`/blog/${post.slug}`}>Leggi</Link></Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default BlogCategory;
