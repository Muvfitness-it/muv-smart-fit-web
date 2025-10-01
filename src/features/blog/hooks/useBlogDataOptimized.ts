/**
 * Optimized Blog Data Hook with React Query
 * Replaces useBlogData with caching and deduplication
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/services/database.service';
import type { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

// Query keys for cache management
export const blogQueryKeys = {
  all: ['blog'] as const,
  posts: (status?: string, limit?: number) => ['blog', 'posts', { status, limit }] as const,
  post: (slug: string) => ['blog', 'post', slug] as const,
  postById: (id: string) => ['blog', 'post', 'id', id] as const,
};

export const useBlogPosts = (options?: {
  status?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: blogQueryKeys.posts(options?.status, options?.limit),
    queryFn: () => DatabaseService.getBlogPosts({
      status: options?.status || 'published',
      limit: options?.limit || 10,
      orderBy: 'published_at',
      ascending: false
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlogPost = (slug?: string) => {
  return useQuery({
    queryKey: blogQueryKeys.post(slug || ''),
    queryFn: () => {
      if (!slug) throw new Error('Slug is required');
      return DatabaseService.getBlogPostBySlug(slug);
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useBlogPostById = (id?: string) => {
  return useQuery({
    queryKey: blogQueryKeys.postById(id || ''),
    queryFn: () => {
      if (!id) throw new Error('ID is required');
      return DatabaseService.getBlogPostById(id);
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Prefetch utility for performance optimization
export const usePrefetchBlogPost = () => {
  const queryClient = useQueryClient();
  
  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: blogQueryKeys.post(slug),
      queryFn: () => DatabaseService.getBlogPostBySlug(slug),
      staleTime: 10 * 60 * 1000,
    });
  };
};
