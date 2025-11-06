import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RelatedArticle } from './useRelatedArticles';

interface UsePrefetchRelatedOptions {
  articles: RelatedArticle[];
  threshold?: number; // Scroll percentage to trigger prefetch (default 0.5 = 50%)
  enabled?: boolean;
}

/**
 * Custom hook for strategic prefetching of related articles
 * Triggers when user scrolls past threshold percentage
 */
export function usePrefetchRelated({
  articles,
  threshold = 0.5,
  enabled = true
}: UsePrefetchRelatedOptions) {
  const [prefetched, setPrefetched] = useState(false);
  const navigate = useNavigate();

  // Prefetch article data and images
  const prefetchArticle = useCallback((article: RelatedArticle) => {
    // Prefetch featured image if exists
    if (article.featured_image) {
      const img = new Image();
      img.src = article.featured_image;
    }

    // Prefetch route data (React Router will cache the component)
    // This is a "touch" to prepare the route
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/${article.slug}`;
    document.head.appendChild(link);

    // Store in sessionStorage for instant retrieval
    try {
      const cacheKey = `prefetch_${article.slug}`;
      sessionStorage.setItem(cacheKey, JSON.stringify({
        article,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn('Failed to cache prefetched article:', err);
    }
  }, []);

  // Prefetch all related articles
  const prefetchAllArticles = useCallback(() => {
    if (prefetched || !enabled || articles.length === 0) return;

    console.log(`[Prefetch] Starting prefetch of ${articles.length} related articles`);
    
    articles.forEach((article, index) => {
      // Stagger prefetch requests to avoid overwhelming the browser
      setTimeout(() => {
        prefetchArticle(article);
        console.log(`[Prefetch] Prefetched: ${article.slug}`);
      }, index * 100); // 100ms delay between each prefetch
    });

    setPrefetched(true);

    // Track prefetch event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'prefetch_triggered', {
        article_count: articles.length,
        scroll_threshold: threshold
      });
    }
  }, [articles, prefetched, enabled, threshold, prefetchArticle]);

  // Scroll detection
  useEffect(() => {
    if (!enabled || prefetched) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrolled / documentHeight;

      if (scrollPercentage >= threshold) {
        prefetchAllArticles();
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also trigger on visibility change (user comes back to tab)
    const handleVisibility = () => {
      if (!document.hidden) {
        const scrolled = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = scrolled / documentHeight;
        
        if (scrollPercentage >= threshold) {
          prefetchAllArticles();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [enabled, prefetched, threshold, prefetchAllArticles]);

  // Intersection Observer for more precise prefetching
  // Triggers when "Related Articles" section enters viewport
  useEffect(() => {
    if (!enabled || prefetched || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prefetchAllArticles();
          }
        });
      },
      {
        rootMargin: '200px', // Start prefetching 200px before section is visible
        threshold: 0.1
      }
    );

    // Find the related articles section
    const relatedSection = document.querySelector('[data-prefetch-trigger]');
    if (relatedSection) {
      observer.observe(relatedSection);
    }

    return () => {
      if (relatedSection) {
        observer.unobserve(relatedSection);
      }
    };
  }, [enabled, prefetched, prefetchAllArticles]);

  return {
    prefetched,
    prefetchNow: prefetchAllArticles
  };
}

/**
 * Get prefetched article data from cache
 */
export function getPrefetchedArticle(slug: string): any | null {
  try {
    const cacheKey = `prefetch_${slug}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      const { article, timestamp } = JSON.parse(cached);
      // Cache valid for 10 minutes
      if (Date.now() - timestamp < 600000) {
        return article;
      }
    }
  } catch (err) {
    console.warn('Failed to retrieve prefetched article:', err);
  }
  
  return null;
}
