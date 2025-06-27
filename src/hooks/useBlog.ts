
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author_name: string;
  author_email: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  views_count: number | null;
  likes_count: number | null;
  reading_time: number | null;
  category_id: string | null;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlog = () => {
  // Fetch published blog posts
  const { 
    data: posts = [], 
    isLoading: postsLoading, 
    refetch: refetchPosts 
  } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (
            id,
            name,
            slug,
            color
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return data as BlogPost[];
    }
  });

  // Fetch blog categories
  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching blog categories:', error);
        throw error;
      }

      return data as BlogCategory[];
    }
  });

  // Get single post by slug
  const getPostBySlug = async (slug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          id,
          name,
          slug,
          color
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }

    return data as BlogPost | null;
  };

  // Increment post views
  const incrementViews = async (postId: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        views_count: supabase.raw('COALESCE(views_count, 0) + 1') 
      })
      .eq('id', postId);

    if (error) {
      console.error('Error incrementing views:', error);
    }
  };

  return {
    posts,
    categories,
    postsLoading,
    categoriesLoading,
    refetchPosts,
    getPostBySlug,
    incrementViews
  };
};
