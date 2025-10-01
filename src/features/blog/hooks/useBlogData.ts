/**
 * Blog Data Hook
 * Abstracts blog data fetching from components
 */

import { useState, useEffect } from 'react';
import { DatabaseService } from '@/services/database.service';
import type { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export const useBlogData = (options?: {
  status?: string;
  limit?: number;
  slug?: string;
  id?: string;
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (options?.slug) {
          const data = await DatabaseService.getBlogPostBySlug(options.slug);
          setPost(data);
        } else if (options?.id) {
          const data = await DatabaseService.getBlogPostById(options.id);
          setPost(data);
        } else {
          const data = await DatabaseService.getBlogPosts({
            status: options?.status || 'published',
            limit: options?.limit || 10,
            orderBy: 'published_at',
            ascending: false
          });
          setPosts(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [options?.status, options?.limit, options?.slug, options?.id]);

  return {
    posts,
    post,
    loading,
    error
  };
};
