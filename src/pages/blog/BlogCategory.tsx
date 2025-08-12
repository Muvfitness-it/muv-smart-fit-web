import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LazyImage from "@/components/ui/LazyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
        const { data: firstPosts, count } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, featured_image, published_at", { count: "exact" })
          .eq("status", "published")
          .eq("category_id", cat.id)
          .order("published_at", { ascending: false })
          .range(0, PAGE_SIZE - 1);

        setPosts(firstPosts || []);
        setHasMore((count || 0) > PAGE_SIZE);
      } else {
        setPosts([]);
        setHasMore(false);
      }

      setLoading(false);
    };
    load();
  }, [slug]);

  const loadMore = async () => {
    if (!category || !hasMore || loadingMore) return;
    setLoadingMore(true);
    const from = (page + 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, published_at")
      .eq("status", "published")
      .eq("category_id", category.id)
      .order("published_at", { ascending: false })
      .range(from, to);

    const newPosts = data || [];
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    if (newPosts.length < PAGE_SIZE) setHasMore(false);
    setLoadingMore(false);
  };

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

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {slug && <link rel="canonical" href={`https://www.muvfitness.it/blog/c/${slug}`} />}
      </Helmet>

      <header className="bg-background/60 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {category ? category.name : "Categoria"}
          </h1>
          <p className="text-muted-foreground mt-2">Articoli filtrati per categoria.</p>
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
      </main>
    </>
  );
};

export default BlogCategory;
