import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UnifiedSEO from '@/components/SEO/UnifiedSEO';
import CrawlerOptimizer from '@/components/SEO/CrawlerOptimizer';
import EnhancedBlogSEO from '@/components/blog/EnhancedBlogSEO';
import BlogPostContent from '@/components/blog/BlogPostContent';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  published_at?: string;
  author_name?: string;
  author_email?: string;
  views_count?: number;
  reading_time?: number;
  status: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('Slug del post non fornito');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch the blog post
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching post:', fetchError);
          setError('Errore nel caricamento del post');
          return;
        }

        if (!data) {
          setError('Post non trovato o non pubblicato');
          return;
        }

        setPost(data);
        
        // Increment view count
        try {
          await supabase.rpc('increment_article_views', { 
            article_id: data.id 
          });
        } catch (viewError) {
          console.error('Error incrementing views:', viewError);
          // Non bloccare il caricamento se l'incremento delle visualizzazioni fallisce
        }

      } catch (err) {
        console.error('Error in fetchPost:', err);
        setError('Errore nel caricamento del post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-foreground text-lg">Caricamento articolo...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {error || 'Articolo non trovato'}
            </h1>
            <p className="text-muted-foreground mb-8">
              L'articolo che stai cercando non esiste o è stato rimosso.
            </p>
            <Button
              onClick={() => navigate('/blog')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Prepare SEO data
  const seoTitle = post.meta_title || `${post.title} | MUV Fitness - Allenamento Professionale`;
  const seoDescription = post.meta_description || 
    post.excerpt || 
    post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  const canonicalUrl = `https://www.muvfitness.it/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height)]">
      {/* Unified SEO */}
      <UnifiedSEO
        title={seoTitle}
        description={seoDescription}
        keywords={post.meta_keywords}
        canonical={canonicalUrl}
        ogImage={post.featured_image || 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png'}
      />
      
      {/* Crawler Optimizer for AI and NotebookLM */}
      <CrawlerOptimizer
        title={post.title}
        description={seoDescription}
        content={post.content.replace(/<[^>]*>/g, '').substring(0, 1000)}
        services={['Articoli fitness', 'Guide allenamento', 'Consigli nutrizione']}
        location="Blog MUV Fitness"
      />
      
      {/* Enhanced SEO for advanced blog features */}
      <EnhancedBlogSEO post={post} />
      
      {/* Blog Post Content */}
      <BlogPostContent post={post} />
    </div>
  );
};

export default BlogPost;