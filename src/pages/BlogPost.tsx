
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, AlertCircle } from 'lucide-react';
import BlogPostContent from '../components/blog/BlogPostContent';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  views_count?: number;
  reading_time?: number;
  author_name?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate('/blog');
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('Articolo non trovato');
          } else {
            throw fetchError;
          }
          return;
        }

        if (!data) {
          setError('Articolo non trovato');
          return;
        }

        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Errore nel caricamento dell\'articolo');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
              <span className="text-white text-lg">Caricamento articolo...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 pt-[var(--header-height)]">
        <Helmet>
          <title>Articolo non trovato - MUV Fitness Blog</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                {error || 'Articolo non trovato'}
              </h1>
              <p className="text-gray-400 mb-6">
                L'articolo che stai cercando non esiste o è stato rimosso.
              </p>
              <button
                onClick={() => navigate('/blog')}
                className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-6 py-3 rounded-lg transition-all"
              >
                Torna al Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pageTitle = post.meta_title || `${post.title} - MUV Fitness Blog`;
  const pageDescription = post.meta_description || post.excerpt || `Leggi "${post.title}" sul blog di MUV Fitness per consigli su fitness, nutrizione e benessere.`;
  const pageKeywords = post.meta_keywords || 'blog fitness, consigli allenamento, nutrizione sportiva, benessere, MUV Fitness';

  return (
    <div className="min-h-screen bg-gray-900 pt-[var(--header-height)]">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={`https://www.muvfitness.it/blog/${slug}`} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://www.muvfitness.it/blog/${slug}`} />
        <meta property="og:type" content="article" />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {post.featured_image && (
          <meta name="twitter:image" content={post.featured_image} />
        )}
        
        {/* Article specific meta tags */}
        {post.published_at && (
          <meta property="article:published_time" content={post.published_at} />
        )}
        {post.author_name && (
          <meta property="article:author" content={post.author_name} />
        )}
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <BlogPostContent post={post} />
      </div>
    </div>
  );
};

export default BlogPost;
