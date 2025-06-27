
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
      console.log('Fetching published blog posts...');
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

      console.log('Fetched posts:', data);
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
    console.log('Searching for post with slug:', slug);
    
    // First try to get published post
    const { data: publishedPost, error: publishedError } = await supabase
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

    if (publishedError) {
      console.error('Error fetching published post:', publishedError);
    }

    if (publishedPost) {
      console.log('Found published post:', publishedPost);
      return publishedPost as BlogPost;
    }

    // If no published post found, try to get any post (including drafts) for debugging
    const { data: anyPost, error: anyError } = await supabase
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
      .maybeSingle();

    if (anyError) {
      console.error('Error fetching any post:', anyError);
      throw anyError;
    }

    if (anyPost) {
      console.log('Found post (but not published):', anyPost);
      console.log('Post status:', anyPost.status);
    } else {
      console.log('No post found with slug:', slug);
      
      // Let's also check what posts exist in the database
      const { data: allPosts, error: allPostsError } = await supabase
        .from('blog_posts')
        .select('slug, title, status')
        .limit(10);
      
      if (!allPostsError) {
        console.log('Available posts in database:', allPosts);
      }
    }

    return null;
  };

  // Increment post views
  const incrementViews = async (postId: string) => {
    try {
      // First get the current views count
      const { data: currentPost, error: fetchError } = await supabase
        .from('blog_posts')
        .select('views_count')
        .eq('id', postId)
        .single();

      if (fetchError) {
        console.error('Error fetching current views:', fetchError);
        return;
      }

      const currentViews = currentPost?.views_count || 0;
      
      // Update with incremented value
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          views_count: currentViews + 1
        })
        .eq('id', postId);

      if (error) {
        console.error('Error incrementing views:', error);
      } else {
        console.log('Views incremented successfully');
      }
    } catch (error) {
      console.error('Unexpected error incrementing views:', error);
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
