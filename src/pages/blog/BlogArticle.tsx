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

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Funzione per generare ID sicuri dai titoli
const generateTocId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Funzione per estrarre l'indice dei contenuti dall'HTML
const extractTocFromHtml = (html: string): TocItem[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  return Array.from(headings).map((heading) => {
    const text = heading.textContent || '';
    const level = parseInt(heading.tagName.charAt(1));
    const id = generateTocId(text);
    return { id, text, level };
  });
};

// Funzione per aggiungere ID ai titoli nell'HTML
const addIdsToHeadings = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headings.forEach((heading) => {
    const text = heading.textContent || '';
    const id = generateTocId(text);
    heading.setAttribute('id', id);
  });
  
  return doc.body.innerHTML;
};

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
  const [processedContent, setProcessedContent] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);

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
      const processedHtml = processContentBlocks(cleanedContent);
      
      // Add IDs to headings and extract table of contents
      const contentWithIds = addIdsToHeadings(processedHtml);
      const toc = extractTocFromHtml(processedHtml);
      
      setProcessedContent(contentWithIds);
      setTableOfContents(toc);
      setPost({ ...data, content: contentWithIds } as Post);

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

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

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

              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <nav className="toc mb-12">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    📋 Indice dei contenuti
                  </h2>
                  <ul className="space-y-2">
                    {tableOfContents.map((item) => (
                      <li 
                        key={item.id} 
                        className={`level-${item.level}`}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className="text-left hover:text-accent transition-colors duration-200 text-sm leading-relaxed"
                        >
                          {item.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Article Content */}
              <main className="prose-custom bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/30 shadow-sm">
                <SecureHTMLRenderer
                  html={processedContent || ""}
                  className="max-w-none"
                />
              </main>

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

              {/* Related Articles */}
              {related.length > 0 && (
                <section className="mt-12 bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    🔗 Articoli correlati
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {related.map((rp) => (
                      <Card key={rp.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        {rp.featured_image && (
                          <Link to={`/${rp.slug}`} aria-label={`Apri articolo ${rp.title}`}>
                            <div className="overflow-hidden">
                              <LazyImage
                                src={rp.featured_image}
                                alt={`Copertina articolo correlato ${rp.title}`}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                width={800}
                                height={450}
                              />
                            </div>
                          </Link>
                        )}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg leading-tight">
                            <Link 
                              to={`/${rp.slug}`} 
                              className="hover:text-accent transition-colors duration-200"
                            >
                              {rp.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {rp.excerpt && (
                            <p className="text-muted-foreground line-clamp-3 mb-4">{rp.excerpt}</p>
                          )}
                          <Button asChild size="sm" variant="outline" className="w-full">
                            <Link to={`/${rp.slug}`}>Leggi articolo</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Call to Action Section */}
              <section className="mt-12 p-8 md:p-12 glass-card rounded-2xl border-2 border-brand-primary/20 text-center bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text mb-6">
                    🚀 PRONTO A TRASFORMARE IL TUO CORPO?
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                    Applica quello che hai imparato con il supporto del Team MUV. 
                    <br />
                    <strong className="text-brand-accent">Prima consulenza GRATUITA</strong> per i primi 10 clienti del mese.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/form-contatti" 
                      className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-white px-8 py-4 rounded-full text-lg font-black transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      📝 CANDIDATI ORA
                    </a>
                    <a 
                      href="tel:+393291070374" 
                      className="glass-card border-2 border-brand-primary/30 text-foreground hover:bg-brand-primary/10 px-8 py-4 rounded-full text-lg font-black transition-all duration-300 transform hover:scale-105"
                    >
                      📞 CHIAMA SUBITO
                    </a>
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
