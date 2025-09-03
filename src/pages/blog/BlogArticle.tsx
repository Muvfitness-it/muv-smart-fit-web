import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";
import { SecureHTMLRenderer } from "@/components/security/SecureHTMLRenderer";
import { SecureCommentForm } from "@/components/security/SecureCommentForm";
import { ApprovedComments } from "@/components/security/ApprovedComments";
import LazyImage from "@/components/ui/LazyImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPostAccentHue, cleanBlogContent, generatePostHero, processContentBlocks } from "@/utils/blogTheme";

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
  category_id: string | null;
  reading_time?: number;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [category, setCategory] = useState<{ id: string; name: string; slug: string } | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [related, setRelated] = useState<Array<{ id: string; title: string; slug: string; excerpt: string | null; featured_image: string | null; published_at: string | null }>>([]);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, content, excerpt, meta_title, meta_description, featured_image, published_at, author_name, category_id, reading_time")
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

      // Clean and process content for accessibility and theming
      const cleanedContent = cleanBlogContent(data.content || '');
      const processedContent = processContentBlocks(cleanedContent);
      
      setPost({ ...data, content: processedContent } as Post);

      // Carica categoria se presente
      if ((data as any).category_id) {
        const { data: cat } = await supabase
          .from('blog_categories')
          .select('id, name, slug')
          .eq('id', (data as any).category_id)
          .maybeSingle();
        setCategory(cat || null);
      }

      // Incrementa le visualizzazioni (best-effort)
      void (async () => { try { await supabase.rpc("increment_article_views", { article_id: slug }); } catch { /* no-op */ } })();
    };
    load();
  }, [slug]);

  const date = useMemo(
    () => (post?.published_at ? new Date(post.published_at).toLocaleDateString("it-IT") : ""),
    [post?.published_at]
  );

  // Get dynamic accent hue based on slug
  const accentHue = useMemo(() => {
    return slug ? getPostAccentHue(slug) : 312;
  }, [slug]);

  const title = post?.meta_title || (post ? `${post.title} - Blog MUV Fitness Legnago` : "Articolo - Blog");
  const description = post?.meta_description || post?.excerpt || "Leggi l'articolo sul blog di MUV Fitness Legnago.";
  const canonical = slug ? `https://www.muvfitness.it/${slug}` : undefined;

  // JSON-LD Article + optional NewsArticle (ultime 48 ore)
  const isRecent = post?.published_at ? (Date.now() - new Date(post.published_at).getTime()) < 1000 * 60 * 60 * 48 : false;
  const articleJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at || undefined,
    image: post.featured_image || undefined,
    author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    mainEntityOfPage: canonical,
  } : undefined;
  const newsJsonLd = post && isRecent ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.published_at || undefined,
    image: post.featured_image || undefined,
    author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    mainEntityOfPage: canonical,
  } : undefined;
  const breadcrumbJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.muvfitness.it/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.muvfitness.it/blog" },
      ...(category ? [{ "@type": "ListItem", position: 3, name: category.name, item: `https://www.muvfitness.it/blog/c/${category.slug}` }] : []),
      { "@type": "ListItem", position: category ? 4 : 3, name: post.title, item: canonical },
    ],
  } : undefined;

  // Estrai immagini aggiuntive dal contenuto per la galleria
  const galleryImages = useMemo(() => {
    const imgs: string[] = [];
    const html = post?.content || "";
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const src = match[1];
      if (src && !imgs.includes(src) && src !== post?.featured_image) imgs.push(src);
      if (imgs.length >= 12) break;
    }
    return imgs;
  }, [post?.content, post?.featured_image]);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox({ open: false, index: 0 });
      if (e.key === 'ArrowRight' && galleryImages.length > 0) {
        setLightbox(prev => ({ open: true, index: (prev.index + 1) % galleryImages.length }));
      }
      if (e.key === 'ArrowLeft' && galleryImages.length > 0) {
        setLightbox(prev => ({ open: true, index: (prev.index - 1 + galleryImages.length) % galleryImages.length }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, galleryImages.length]);

  useEffect(() => {
    const loadRelated = async () => {
      if (!post) return;
      let query = supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, published_at')
        .eq('status', 'published')
        .neq('id', post.id)
        .order('published_at', { ascending: false })
        .limit(3);
      if (post.category_id) query = query.eq('category_id', post.category_id);
      const { data } = await query;
      setRelated(data || []);
    };
    loadRelated();
  }, [post?.id, post?.category_id]);

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
        {articleJsonLd && (<script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>)}
        {newsJsonLd && (<script type="application/ld+json">{JSON.stringify(newsJsonLd)}</script>)}
        {breadcrumbJsonLd && (<script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>)}
      </Helmet>

      <article 
        className="container mx-auto px-4 py-10 blog" 
        style={{ '--accent-h': accentHue } as React.CSSProperties}
      >
        {post ? (
          <>
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
                {category && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/blog/c/${category.slug}`}>{category.name}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Render hero only if content doesn't already have one */}
            {!post.content.includes('post-hero') && (
              <header className="post-hero article-header mb-8 mt-4">
                <span className="post-hero-label">Guida • Metodo MUV</span>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{post.title}</h1>
                <p className="meta text-sm text-muted-foreground">
                  Team MUV • Aggiornato il {date} • Lettura {post.reading_time || 5} minuti
                </p>
                {category && (
                  <div className="mt-3">
                    <Link to={`/blog/c/${category.slug}`}>
                      <Badge variant="secondary">{category.name}</Badge>
                    </Link>
                  </div>
                )}
                {post.featured_image && (
                  <figure className="article-hero mt-6">
                    <LazyImage
                      src={post.featured_image}
                      alt={`Immagine di copertina per ${post.title} - MUV Fitness Legnago`}
                      className="w-full h-[320px] md:h-[420px] object-cover rounded-xl"
                      width={1200}
                      height={630}
                    />
                  </figure>
                )}
              </header>
            )}


            <div className="prose-custom">
              <SecureHTMLRenderer
                html={post.content || ""}
                className="max-w-none"
              />
            </div>

            {galleryImages.length > 0 && (
              <section aria-label="Galleria immagini" className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Galleria immagini</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((src, idx) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setLightbox({ open: true, index: idx })}
                      className="group relative focus:outline-none"
                      aria-label={`Apri immagine ${idx + 1} in galleria`}
                    >
                      <LazyImage
                        src={src}
                        alt={`Galleria: ${post.title} - immagine ${idx + 1}`}
                        className="w-full h-40 md:h-48 object-cover rounded-lg"
                        width={800}
                        height={600}
                      />
                      <span className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-white/30 transition" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Articoli correlati</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rp) => (
                    <Card key={rp.id} className="overflow-hidden">
                      {rp.featured_image && (
                        <Link to={`/${rp.slug}`} aria-label={`Apri articolo ${rp.title}`}>
                          <LazyImage
                            src={rp.featured_image}
                            alt={`Copertina articolo correlato ${rp.title}`}
                            className="w-full h-40 object-cover"
                            width={800}
                            height={450}
                          />
                        </Link>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">
                          <Link to={`/${rp.slug}`} className="hover:underline">{rp.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {rp.excerpt && <p className="text-muted-foreground line-clamp-2">{rp.excerpt}</p>}
                        <div className="mt-3">
                          <Button asChild size="sm" variant="outline"><Link to={`/${rp.slug}`}>Leggi</Link></Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
            
            {/* Call to Action Section */}
            <section className="my-12 p-8 glass-card rounded-2xl border-brand-primary/30 text-center">
              <h3 className="text-2xl md:text-3xl font-heading font-black text-brand-primary mb-4">
                🚀 PRONTO A TRASFORMARE IL TUO CORPO?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Applica quello che hai imparato con il supporto del Team MUV. 
                <strong className="text-brand-accent"> Prima consulenza GRATUITA</strong> per i primi 10 clienti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/form-contatti" 
                  className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-black px-6 py-3 rounded-full text-lg font-black transition-all duration-300 transform hover:scale-105"
                >
                  📝 CANDIDATI ORA
                </a>
                <a 
                  href="tel:+393291070374" 
                  className="glass-card border-2 border-brand-primary/30 text-foreground hover:bg-brand-primary/10 px-6 py-3 rounded-full text-lg font-black transition-all duration-300 transform hover:scale-105"
                >
                  📞 CHIAMA SUBITO
                </a>
              </div>
            </section>

            {/* Display approved comments */}
            <ApprovedComments postId={post.id} />
            
            {/* Secure Comment Form */}
            <SecureCommentForm postId={post.id} />
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

      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center" onClick={() => setLightbox({ open: false, index: 0 })}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white rounded px-3 py-1"
              onClick={() => setLightbox({ open: false, index: 0 })}
              aria-label="Chiudi galleria"
            >
              Chiudi
            </button>
            <img
              src={galleryImages[lightbox.index]}
              alt={`Galleria: ${post?.title} - immagine ${lightbox.index + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded"
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10"
                  onClick={() => setLightbox(prev => ({ open: true, index: (prev.index - 1 + galleryImages.length) % galleryImages.length }))}
                  aria-label="Immagine precedente"
                >‹</button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10"
                  onClick={() => setLightbox(prev => ({ open: true, index: (prev.index + 1) % galleryImages.length }))}
                  aria-label="Immagine successiva"
                >›</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogArticle;
