
import React, { useEffect } from 'react';
import { Calendar, Clock, Eye, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface BlogPostContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    published_at?: string;
    views_count?: number;
    reading_time?: number;
    author_name?: string;
    meta_title?: string;
    meta_description?: string;
  };
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const navigate = useNavigate();

  // Increment view count when post is loaded
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await supabase.rpc('increment_article_views', { 
          article_id: post.id 
        });
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };

    incrementViews();
  }, [post.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center space-x-2 text-pink-600 hover:text-pink-500 transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Torna al Blog</span>
      </button>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
          {post.author_name && (
            <span className="font-medium text-white">
              di {post.author_name}
            </span>
          )}
          
          {post.published_at && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          )}
          
          {post.reading_time && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min di lettura</span>
            </div>
          )}
          
          {post.views_count !== undefined && (
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{post.views_count} visualizzazioni</span>
            </div>
          )}
        </div>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Condividi
        </Button>
      </header>

      {/* Article Content */}
      <div 
        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Condividi questo articolo
          </Button>
          
          <Button
            onClick={() => navigate('/blog')}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800"
          >
            Altri articoli
          </Button>
        </div>
      </footer>
    </article>
  );
};

export default BlogPostContent;
