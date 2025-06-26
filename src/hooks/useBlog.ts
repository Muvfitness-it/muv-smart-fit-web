
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogCategory, BlogTag, BlogFilters } from '@/types/blog';

export const useBlogPosts = (filters?: BlogFilters) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            blog_categories(*)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (filters?.category) {
          const { data: categoryData } = await supabase
            .from('blog_categories')
            .select('id')
            .eq('slug', filters.category)
            .single();
          
          if (categoryData) {
            query = query.eq('category_id', categoryData.id);
          }
        }

        if (filters?.search) {
          query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        }

        const limit = filters?.limit || 10;
        const offset = ((filters?.page || 1) - 1) * limit;
        
        query = query.range(offset, offset + limit - 1);

        const { data, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;

        setPosts(data?.map(post => ({
          ...post,
          category: post.blog_categories
        })) || []);
        setTotalCount(count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore nel caricamento dei post');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters?.category, filters?.search, filters?.page, filters?.limit]);

  return { posts, loading, error, totalCount };
};

export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            blog_categories(*),
            blog_post_tags(
              blog_tags(*)
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          // Increment view count
          await supabase
            .from('blog_posts')
            .update({ views_count: (data.views_count || 0) + 1 })
            .eq('id', data.id);

          setPost({
            ...data,
            category: data.blog_categories,
            tags: data.blog_post_tags?.map((pt: any) => pt.blog_tags) || []
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Post non trovato');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
};

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;
        setCategories(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore nel caricamento delle categorie');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
