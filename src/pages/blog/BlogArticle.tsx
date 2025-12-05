import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";
import { SecureHTMLRenderer } from "@/components/security/SecureHTMLRenderer";
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
import { humanizeText, humanizeTitle, humanizeExcerpt } from "@/utils/copyHumanizer";
import { addInternalLinks } from "@/utils/internalLinker";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { BUSINESS_DATA } from "@/config/businessData";
import SocialShareButtons from "@/components/blog/SocialShareButtons";


interface Author {
  id: string;
  name: string;
  bio: string | null;
  role: string | null;
  avatar_url: string | null;
  expertise: string | null;
}

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
  author_id: string | null;
  category_id: string | null;
  reading_time?: number;
  author?: Author;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [category, setCategory] = useState<{ id: string; name: string; slug: string } | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id, title, slug, content, excerpt, meta_title, meta_description, 
          featured_image, published_at, author_name, author_id, category_id, reading_time,
          author:authors(id, name, bio, role, avatar_url, expertise)
        `)
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

      // Apply internal linking for SEO
      const linkedContent = addInternalLinks(processedContent, slug);

      // Humanize for display (non distruttivo)
      const humanized = humanizeText(linkedContent);
      const humanizedTitle = humanizeTitle(data.title || '');
      const humanizedExcerpt = humanizeExcerpt(data.excerpt || '');
      
      setPost({ ...data, title: humanizedTitle, excerpt: humanizedExcerpt, content: humanized } as Post);

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
    author: post.author ? {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role || undefined,
      description: post.author.bio || undefined,
    } : post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    publisher: {
      "@type": "Organization",
      name: "MUV Fitness Legnago",
      logo: {
        "@type": "ImageObject",
        url: "https://www.muvfitness.it/lovable-uploads/muv-logo-transparent.png"
      }
    },
    mainEntityOfPage: canonical,
  } : undefined;
  const newsJsonLd = post && isRecent ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.published_at || undefined,
    image: post.featured_image || undefined,
    author: post.author ? {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role || undefined,
    } : post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    publisher: {
      "@type": "Organization",
      name: "MUV Fitness Legnago",
      logo: {
        "@type": "ImageObject",
        url: "https://www.muvfitness.it/lovable-uploads/muv-logo-transparent.png"
      }
    },
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

      <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
        <article 
          className="container mx-auto px-4 py-10 blog max-w-6xl" 
          style={{ '--accent-h': accentHue } as React.CSSProperties}
        >
          {post ? (
            <>
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-6">
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
              </nav>

              {/* Article Header */}
              {!post.content.includes('post-hero') && (
                <header className="post-hero mb-12 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
                  <div className="text-center">
                    <span className="post-hero-label">Guida Fitness • Metodo MUV</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
                      {post.title}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-2">
                        👥 <strong>Team MUV</strong>
                      </span>
                      <span className="flex items-center gap-2">
                        📅 Aggiornato il <strong>{date}</strong>
                      </span>
                      <span className="flex items-center gap-2">
                        ⏱️ Lettura <strong>{post.reading_time || 5} minuti</strong>
                      </span>
                    </div>
                    {category && (
                      <div className="mb-6">
                        <Link to={`/blog/c/${category.slug}`}>
                          <Badge variant="secondary" className="text-sm px-4 py-2">
                            {category.name}
                          </Badge>
                        </Link>
                      </div>
                    )}
                    
                    {/* Social Share Buttons - Header */}
                    <SocialShareButtons
                      url={canonical || `https://www.muvfitness.it/${slug}`}
                      title={post.title}
                      description={post.excerpt || undefined}
                      variant="inline"
                      className="justify-center"
                    />
                  </div>
                  
                  {post.featured_image && (
                    <figure className="article-hero mt-8">
                      <LazyImage
                        src={post.featured_image}
                        alt={`Immagine di copertina per ${post.title} - MUV Fitness Legnago`}
                        className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
                        width={1200}
                        height={630}
                      />
                    </figure>
                  )}
                </header>
              )}

              {/* Article Content */}
              <main className="prose-custom bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/30 shadow-sm">
                <SecureHTMLRenderer
                  html={post.content || ""}
                  className="max-w-none"
                />
              </main>
              
              {/* Social Share Buttons - After Content */}
              <section className="mt-8 p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30">
                <SocialShareButtons
                  url={canonical || `https://www.muvfitness.it/${slug}`}
                  title={post.title}
                  description={post.excerpt || undefined}
                  variant="expanded"
                />
              </section>

              {/* Author Box - E-E-A-T Optimization */}
              <section className="mt-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-primary/50 shadow-md">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="shrink-0">
                    {post.author?.avatar_url ? (
                      <LazyImage
                        src={post.author.avatar_url}
                        alt={`${post.author.name} - ${post.author.role || 'Esperto MUV Fitness'}`}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg ring-2 ring-primary/20"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg">
                        {(post.author?.name || post.author_name || "MUV").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
                      {post.author?.name || post.author_name || "Team MUV Fitness"}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-medium mb-3">
                      {post.author?.role || "Centro Fitness MUV - Legnago (VR)"}
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                      {post.author?.bio || 
                        "Il Team MUV è composto da personal trainer certificati con oltre 10 anni di esperienza in allenamento personalizzato, EMS training, Pilates Reformer, riabilitazione posturale e coaching nutrizionale. Esperti nelle tecnologie più avanzate per fitness e benessere."
                      }
                    </p>
                    {post.author?.expertise && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.author.expertise.split(',').map((exp, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {exp.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Image Gallery */}
              {galleryImages.length > 0 && (
                <section aria-label="Galleria immagini" className="mt-12 bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    🖼️ Galleria immagini
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryImages.map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightbox({ open: true, index: idx })}
                        className="group relative focus:outline-none rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        aria-label={`Apri immagine ${idx + 1} in galleria`}
                      >
                        <LazyImage
                          src={src}
                          alt={`Galleria: ${post.title} - immagine ${idx + 1}`}
                          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                          width={800}
                          height={600}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                          <span className="text-white text-sm font-medium pb-2">Visualizza</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Articles - AI-Powered Similarity Algorithm */}
              {post && slug && (
                <RelatedArticles
                  currentPostId={post.id}
                  currentSlug={slug}
                  maxResults={3}
                />
              )}
              
              
              {/* Local Call to Action Section */}
              <section className="mt-12 p-8 md:p-12 glass-card rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
                    Vuoi Risultati Concreti?
                  </h3>
                  <p className="text-base md:text-lg text-center text-muted-foreground mb-6 leading-relaxed">
                    Scopri come il <strong className="text-primary">Metodo MUV</strong> può trasformare il tuo corpo in modo sicuro e duraturo. 
                    Tecnologie <strong>EMS</strong>, <strong>Vacuum</strong>, <strong>Pilates Reformer</strong> e programmi personalizzati.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Button asChild size="lg" className="text-base md:text-lg font-bold">
                      <Link to="/trasformazione-30-giorni">
                        🎯 Prenota Prova Gratuita
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-base md:text-lg font-bold">
                      <Link to="/contatti">
                        💬 Contattaci Ora
                      </Link>
                    </Button>
                  </div>
                  <div className="text-center text-sm md:text-base text-muted-foreground pt-4 border-t border-border/50">
                    <p className="font-medium">
                      📍 <strong>{BUSINESS_DATA.name}</strong> - {BUSINESS_DATA.address.street}, {BUSINESS_DATA.address.postalCode} {BUSINESS_DATA.address.city} ({BUSINESS_DATA.address.province})
                    </p>
                    <p className="mt-2">
                      ☎️ <a href={`tel:${BUSINESS_DATA.contact.whatsapp.replace(/\s/g, '')}`} className="text-primary hover:underline font-semibold">{BUSINESS_DATA.contact.whatsapp}</a>
                      {" | "}
                      ✉️ <a href={`mailto:${BUSINESS_DATA.contact.email}`} className="text-primary hover:underline font-semibold">{BUSINESS_DATA.contact.email}</a>
                    </p>
                  </div>
                </div>
              </section>

            </>
          ) : (
            /* Loading State */
            <div className="space-y-6 animate-pulse">
              <div className="h-8 w-2/3 bg-muted rounded-lg" />
              <div className="h-6 w-1/3 bg-muted rounded" />
              <div className="h-[400px] w-full bg-muted rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>
          )}
        </article>
      </div>

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
