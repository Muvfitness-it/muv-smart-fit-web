import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import LazyImage from "@/components/ui/LazyImage";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
  published_at: string | null;
  author_name: string | null;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, content, excerpt, meta_title, meta_description, featured_image, published_at, author_name")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) {
        console.error(error);
        setNotFound(true);
        return;
      }

      if (!data) {
        setNotFound(true);
        return;
      }

      setPost(data as Post);

      // Incrementa le visualizzazioni (best-effort)
      void (async () => { try { await supabase.rpc("increment_article_views", { article_id: slug }); } catch { /* no-op */ } })();
    };
    load();
  }, [slug]);

  const date = useMemo(
    () => (post?.published_at ? new Date(post.published_at).toLocaleDateString("it-IT") : ""),
    [post?.published_at]
  );

  const title = post?.meta_title || (post ? `${post.title} - Blog MUV Fitness Legnago` : "Articolo - Blog");
  const description = post?.meta_description || post?.excerpt || "Leggi l'articolo sul blog di MUV Fitness Legnago.";
  const canonical = slug ? `https://www.muvfitness.it/blog/${slug}` : undefined;

  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        datePublished: post.published_at || undefined,
        image: post.featured_image || undefined,
        author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
        mainEntityOfPage: canonical,
      }
    : undefined;

  if (notFound) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Articolo non trovato</h1>
        <p className="text-muted-foreground mb-6">Potrebbe essere stato rimosso o non è più disponibile.</p>
        <Link to="/blog" className="underline">Torna al blog</Link>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        {articleJsonLd && (
          <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        )}
      </Helmet>

      <article className="container mx-auto px-4 py-10">
        {post ? (
          <>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
              <p className="text-muted-foreground mt-2">{date}</p>
            </header>

            {post.featured_image && (
              <div className="mb-8">
                <LazyImage
                  src={post.featured_image}
                  alt={`Immagine di copertina per ${post.title} - MUV Fitness Legnago`}
                  className="w-full h-[320px] md:h-[420px] object-cover rounded-xl"
                  width={1200}
                  height={630}
                />
              </div>
            )}

            <section
              className="prose prose-invert max-w-none prose-headings:scroll-mt-24"
              // Sanitize HTML per sicurezza
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "") }}
            />
          </>
        ) : (
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-muted animate-pulse rounded" />
            <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
            <div className="h-[320px] w-full bg-muted animate-pulse rounded-xl" />
            <div className="h-40 w-full bg-muted animate-pulse rounded" />
          </div>
        )}
      </article>
    </>
  );
};

export default BlogArticle;
