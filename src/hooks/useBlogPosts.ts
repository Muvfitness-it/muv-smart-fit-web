
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  published_at?: string;
  views_count?: number;
  reading_time?: number;
  status: string;
  featured_image?: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async (publishedOnly: boolean = true) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, content, published_at, views_count, reading_time, status, featured_image')
        .order('published_at', { ascending: false, nullsFirst: false });

      if (publishedOnly) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Processa i post per assicurarsi che abbiano un excerpt
      const processedPosts = (data || []).map(post => ({
        ...post,
        reading_time: post.reading_time || 5, // Default 5 minuti se non specificato
        views_count: post.views_count || 0
      }));
      
      setPosts(processedPosts);
    } catch (error: any) {
      console.error('Errore caricamento posts:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento degli articoli",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    fetchPosts,
    refetch: () => fetchPosts()
  };
};
