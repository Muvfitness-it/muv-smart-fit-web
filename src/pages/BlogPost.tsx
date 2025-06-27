
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, User, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, incrementViews } = useBlog();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostBySlug(slug);
        
        if (!fetchedPost) {
          setNotFound(true);
          return;
        }

        setPost(fetchedPost);
        document.title = `${fetchedPost.title} - MUV Fitness Blog`;
        
        // Increment views
        await incrementViews(fetchedPost.id);
      } catch (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, getPostBySlug, incrementViews]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiato negli appunti!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-500 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Torna al Blog
          </Link>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-8">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time || 5} min di lettura</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{(post.views_count || 0) + 1} visualizzazioni</span>
              </div>
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between">
              {post.blog_categories && (
                <Badge variant="secondary" className="bg-pink-600/20 text-pink-400 border-pink-600/30">
                  {post.blog_categories.name}
                </Badge>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Condividi
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <Link to="/blog" className="text-pink-600 hover:text-pink-500">
                ← Torna al Blog
              </Link>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Condividi questo articolo
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
