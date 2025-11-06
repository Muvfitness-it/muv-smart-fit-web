import { Link } from 'react-router-dom';
import { Clock, Sparkles, Zap, FlaskConical } from 'lucide-react';
import { useRelatedArticles, type RelatedArticle } from '@/hooks/useRelatedArticles';
import { usePrefetchRelated } from '@/hooks/usePrefetchRelated';
import { useABTestPrefetch } from '@/hooks/useABTestPrefetch';
import { RelatedArticlesSkeleton } from './RelatedArticlesSkeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RelatedArticlesProps {
  currentPostId: string;
  currentSlug: string;
  maxResults?: number;
  showSimilarityScore?: boolean;
}

export function RelatedArticles({
  currentPostId,
  currentSlug,
  maxResults = 3,
  showSimilarityScore = false
}: RelatedArticlesProps) {
  const { relatedArticles, loading, error } = useRelatedArticles({
    currentPostId,
    currentSlug,
    maxResults
  });

  // A/B Testing for prefetch threshold
  const { config: abTestConfig, trackPrefetchTriggered, trackArticleClick } = useABTestPrefetch(currentSlug);

  // Strategic prefetching with A/B test integration
  const { prefetched } = usePrefetchRelated({
    articles: relatedArticles,
    enabled: !loading && relatedArticles.length > 0,
    abTestConfig,
    onPrefetchTriggered: trackPrefetchTriggered
  });

  if (loading) {
    return <RelatedArticlesSkeleton />;
  }

  if (error || relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-12" data-prefetch-trigger>
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold">Potrebbe Interessarti</h2>
        <div className="ml-auto flex gap-2">
          {abTestConfig && (
            <Badge variant="outline" className="text-xs gap-1.5">
              <FlaskConical className="w-3 h-3" />
              Test {abTestConfig.variant} ({abTestConfig.threshold * 100}%)
            </Badge>
          )}
          {prefetched && (
            <Badge variant="secondary" className="text-xs gap-1.5">
              <Zap className="w-3 h-3" />
              Caricamento rapido
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article, index) => (
          <RelatedArticleCard
            key={article.id}
            article={article}
            position={index}
            currentSlug={currentSlug}
            showSimilarityScore={showSimilarityScore}
            onArticleClick={trackArticleClick}
          />
        ))}
      </div>
    </section>
  );
}

interface RelatedArticleCardProps {
  article: RelatedArticle;
  position: number;
  currentSlug: string;
  showSimilarityScore?: boolean;
  onArticleClick?: (clickedSlug: string, position: number) => void;
}

function RelatedArticleCard({
  article,
  position,
  currentSlug,
  showSimilarityScore = false,
  onArticleClick
}: RelatedArticleCardProps) {
  const handleClick = () => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'related_article_click', {
        from_article: currentSlug,
        to_article: article.slug,
        position: position + 1,
        similarity_score: article.similarityScore
          ? Math.round(article.similarityScore * 100)
          : 0
      });
    }

    // Track for A/B test
    onArticleClick?.(article.slug, position);
  };

  return (
    <Link
      to={`/${article.slug}`}
      onClick={handleClick}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
    >
      {/* Image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        {article.featured_image ? (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Similarity score badge (for admin/debug) */}
        {showSimilarityScore && article.similarityScore && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white text-xs">
              {Math.round(article.similarityScore * 100)}%
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer with reading time */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <Clock className="w-3.5 h-3.5" />
          <span>{article.reading_time || 5} min di lettura</span>
        </div>
      </div>
    </Link>
  );
}
