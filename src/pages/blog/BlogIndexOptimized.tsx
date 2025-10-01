/**
 * Optimized Blog Index using React Query
 * This is an example showing how to migrate from the old useBlogData to the new cached hooks
 * 
 * To use: Replace BlogIndex imports in App.tsx with this file
 */

import { useMemo, useState, memo } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { useBlogPosts, usePrefetchBlogPost } from "@/features/blog/hooks/useBlogDataOptimized";
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
import { humanizeTitle, humanizeExcerpt } from "@/utils/copyHumanizer";

const PAGE_SIZE = 9;

// Memoized blog card component to prevent unnecessary re-renders
const BlogCard = memo(({ 
  post, 
  onHover 
}: { 
  post: any; 
  onHover: (slug: string) => void;
}) => (
  <Card 
    className="overflow-hidden hover:shadow-lg transition-all duration-300"
    onMouseEnter={() => onHover(post.slug)}
  >
    {post.featured_image && (
      <Link to={`/${post.slug}`} aria-label={`Apri articolo ${post.title}`}>
        <LazyImage
          src={post.featured_image}
          alt={`Copertina articolo ${post.title} - MUV Fitness Legnago`}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          width={1200}
          height={630}
        />
      </Link>
    )}
    <CardHeader className="pb-3">
      <CardTitle className="text-xl leading-tight">
        <Link to={`/${post.slug}`} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </CardTitle>
      <p className="text-sm text-muted-foreground">{post.date}</p>
    </CardHeader>
    <CardContent className="pt-0">
      {post.excerpt && (
        <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
      )}
      <Button asChild variant="outline" size="sm" className="w-full">
        <Link to={`/${post.slug}`}>Leggi l'articolo</Link>
      </Button>
    </CardContent>
  </Card>
));

BlogCard.displayName = 'BlogCard';

const BlogIndexOptimized = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);

  // Use React Query hook instead of useState + useEffect
  const { data: posts = [], isLoading } = useBlogPosts({ 
    status: 'published',
    limit: PAGE_SIZE 
  });

  // Prefetch utility for hover states
  const prefetchPost = usePrefetchBlogPost();

  // Memoized formatted posts to prevent recalculation
  const formattedPosts = useMemo(() =>
    posts.map(p => ({
      ...p,
      title: humanizeTitle(p.title || ''),
      excerpt: p.excerpt ? humanizeExcerpt(p.excerpt) : null,
      date: p.published_at ? new Date(p.published_at).toLocaleDateString("it-IT") : "",
    })),
    [posts]
  );

  const totalPages = 1; // TODO: Implement pagination with count

  const pageTitle = "Blog MUV Fitness Legnago: articoli e guide";
  const pageDescription = "Scopri articoli, consigli e guide su allenamento, EMS, Pilates e benessere. Aggiornato dal team MUV Fitness.";

  const canonical = page > 1 ? `https://www.muvfitness.it/blog?page=${page}` : "https://www.muvfitness.it/blog";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" type="application/rss+xml" title="MUV Fitness Blog RSS" href="https://baujoowgqeyraqnukkmw.functions.supabase.co/blog-rss" />
      </Helmet>

      <header className="relative border-b border-border">
        <div className="absolute inset-0 bg-[url('/images/fitness-professional-bg.jpg')] bg-cover bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" aria-hidden="true" />

        <div className="container relative mx-auto px-4 py-12 md:py-16 min-h-[280px] md:min-h-[360px] flex flex-col items-center justify-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">Blog MUV Fitness</h1>
          <p>
            <span className="inline-block rounded-md bg-black/50 backdrop-blur-sm px-3 py-1 text-sm md:text-base text-white ring-1 ring-white/20 shadow-sm">
              Articoli pratici e guide su personal training, EMS, Pilates e benessere, a cura del nostro team.
            </span>
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section aria-label="Articoli">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post}
                  onHover={prefetchPost}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default BlogIndexOptimized;
