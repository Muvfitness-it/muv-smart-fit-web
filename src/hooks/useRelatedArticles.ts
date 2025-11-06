import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  createKeywordVector,
  cosineSimilarity,
  extractSimpleKeywords,
  calculateCompositeScore,
  calculateRecencyScore,
  type KeywordVector
} from '@/utils/keywordSimilarity';
import { extractKeywords } from '@/utils/internalLinker';

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
  category_id: string | null;
  reading_time?: number;
  similarityScore?: number;
}

interface UseRelatedArticlesOptions {
  currentPostId: string;
  currentSlug: string;
  maxResults?: number;
  minSimilarity?: number;
}

interface UseRelatedArticlesResult {
  relatedArticles: RelatedArticle[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching and ranking related articles using advanced similarity algorithms
 */
export function useRelatedArticles({
  currentPostId,
  currentSlug,
  maxResults = 3,
  minSimilarity = 0.2
}: UseRelatedArticlesOptions): UseRelatedArticlesResult {
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cacheKey = `related_${currentSlug}_${maxResults}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          // Cache valid for 1 hour
          if (Date.now() - timestamp < 3600000) {
            setRelatedArticles(data);
            setLoading(false);
            return;
          }
        }

        // Fetch current post with full content
        const { data: currentPost, error: currentError } = await supabase
          .from('blog_posts')
          .select('content, title, excerpt, meta_keywords, category_id')
          .eq('id', currentPostId)
          .single();

        if (currentError) throw currentError;
        if (!currentPost) throw new Error('Current post not found');

        // Fetch all published posts except current
        const { data: allPosts, error: postsError } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, published_at, content, meta_keywords, category_id')
          .eq('status', 'published')
          .neq('id', currentPostId)
          .order('published_at', { ascending: false });

        if (postsError) throw postsError;
        if (!allPosts || allPosts.length === 0) {
          setRelatedArticles([]);
          setLoading(false);
          return;
        }

        // Extract keywords from current post
        const currentKeywords = extractPostKeywords(currentPost);
        
        // Create all documents array for IDF calculation
        const allDocuments = [
          createDocument(currentPost),
          ...allPosts.map(post => createDocument(post))
        ];

        // Calculate current post vector
        const currentVector = createKeywordVector(
          currentKeywords,
          createDocument(currentPost),
          allDocuments
        );

        // Calculate similarity scores for all posts
        const scoredPosts = allPosts.map(post => {
          const postKeywords = extractPostKeywords(post);
          const postVector = createKeywordVector(
            postKeywords,
            createDocument(post),
            allDocuments
          );

          const contentSimilarity = cosineSimilarity(currentVector, postVector);
          const categoryMatch = post.category_id === currentPost.category_id;
          const recencyScore = calculateRecencyScore(post.published_at);

          const compositeScore = calculateCompositeScore(
            contentSimilarity,
            categoryMatch,
            recencyScore
          );

          // Estimate reading time (words per minute = 200)
          const wordCount = post.content?.split(/\s+/).length || 0;
          const reading_time = Math.max(1, Math.ceil(wordCount / 200));

          return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || '',
            featured_image: post.featured_image,
            published_at: post.published_at,
            category_id: post.category_id,
            reading_time,
            similarityScore: compositeScore
          };
        });

        // Filter by minimum similarity and sort by score
        const related = scoredPosts
          .filter(post => (post.similarityScore || 0) >= minSimilarity)
          .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0))
          .slice(0, maxResults);

        setRelatedArticles(related);

        // Cache results
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ data: related, timestamp: Date.now() })
        );

      } catch (err) {
        console.error('Error fetching related articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch related articles');
        setRelatedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentPostId && currentSlug) {
      fetchRelatedArticles();
    }
  }, [currentPostId, currentSlug, maxResults, minSimilarity]);

  return { relatedArticles, loading, error };
}

/**
 * Extract keywords from a blog post
 */
function extractPostKeywords(post: any): string[] {
  const keywords = new Set<string>();

  // From meta_keywords
  if (post.meta_keywords) {
    const metaKeys = post.meta_keywords
      .split(',')
      .map((k: string) => k.trim().toLowerCase())
      .filter((k: string) => k.length > 0);
    metaKeys.forEach((k: string) => keywords.add(k));
  }

  // From title (tokenize)
  if (post.title) {
    extractSimpleKeywords(post.title, 4).forEach(k => keywords.add(k));
  }

  // From excerpt
  if (post.excerpt) {
    extractSimpleKeywords(post.excerpt, 4).forEach(k => keywords.add(k));
  }

  // From content using existing extractor
  if (post.content) {
    const contentKeywords = extractKeywords(post.content);
    contentKeywords.forEach(k => keywords.add(k.toLowerCase()));
  }

  return Array.from(keywords);
}

/**
 * Create a searchable document from post fields
 */
function createDocument(post: any): string {
  return [
    post.title || '',
    post.excerpt || '',
    post.content || '',
    post.meta_keywords || ''
  ].join(' ').toLowerCase();
}
