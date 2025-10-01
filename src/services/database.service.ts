/**
 * Database Service Layer
 * Abstracts all database operations to avoid direct Supabase client usage throughout the app
 */

import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

export class DatabaseService {
  /**
   * Blog Posts Operations
   */
  static async getBlogPosts(options?: {
    status?: string;
    limit?: number;
    orderBy?: 'created_at' | 'published_at' | 'views_count';
    ascending?: boolean;
  }) {
    let query = supabase
      .from('blog_posts')
      .select('*');

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    
    if (error) throw new Error(`Failed to fetch blog posts: ${error.message}`);
    return data as BlogPost[];
  }

  static async getBlogPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw new Error(`Failed to fetch blog post: ${error.message}`);
    return data as BlogPost;
  }

  static async getBlogPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch blog post: ${error.message}`);
    return data as BlogPost;
  }

  static async createBlogPost(post: BlogPostInsert) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw new Error(`Failed to create blog post: ${error.message}`);
    return data as BlogPost;
  }

  static async updateBlogPost(id: string, updates: BlogPostUpdate) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update blog post: ${error.message}`);
    return data as BlogPost;
  }

  static async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete blog post: ${error.message}`);
    return true;
  }

  static async incrementBlogViews(slug: string) {
    const { error } = await supabase.rpc('increment_article_views', {
      article_id: slug
    });

    if (error) console.error('Failed to increment views:', error);
  }

  /**
   * Analytics Operations
   */
  static async logSiteVisit(data: {
    page_path: string;
    referrer?: string;
    user_agent?: string;
  }) {
    const { error } = await supabase
      .from('site_visits')
      .insert(data);

    if (error) console.error('Failed to log site visit:', error);
  }

  static async logBlogAnalytics(data: {
    post_id?: string;
    session_id?: string;
    time_on_page?: number;
    scroll_depth?: number;
    page_path?: string;
    visitor_id?: string;
  }) {
    const analyticsData = {
      post_id: data.post_id || null,
      session_id: data.session_id || null,
      time_on_page: data.time_on_page || 0,
      scroll_depth: data.scroll_depth || 0,
      page_path: data.page_path || window.location.pathname,
      visitor_id: data.visitor_id || 'anonymous',
      device_type: 'unknown',
      browser: 'unknown',
      ...data
    };

    const { error } = await supabase
      .from('blog_analytics')
      .insert(analyticsData);

    if (error) console.error('Failed to log blog analytics:', error);
  }

  /**
   * Authentication Operations
   */
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw new Error(`Failed to get current user: ${error.message}`);
    return user;
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw new Error(`Failed to sign in: ${error.message}`);
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`Failed to sign out: ${error.message}`);
  }

  /**
   * Storage Operations
   */
  static async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw new Error(`Failed to upload file: ${error.message}`);
    return data;
  }

  static getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
