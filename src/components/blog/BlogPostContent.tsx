
import React, { useEffect } from 'react';
import { Calendar, Clock, Eye, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ArticleContentParser from './ArticleContentParser';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Content Container con sfondo più chiaro per la leggibilità */}
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="pt-8 pb-4">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center space-x-2 text-magenta-400 hover:text-magenta-300 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Torna al Blog</span>
          </button>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="aspect-video overflow-hidden rounded-2xl mb-8 shadow-2xl">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <div className="bg-gradient-to-r from-magenta-500/10 to-viola-500/10 rounded-xl p-6 mb-8 border border-magenta-500/20">
              <p className="text-xl text-gray-200 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 bg-gray-800/30 rounded-xl p-4">
            {post.author_name && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-magenta-400 to-viola-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {post.author_name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-white">
                  {post.author_name}
                </span>
              </div>
            )}
            
            {post.published_at && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-magenta-400" />
                <span>{formatDate(post.published_at)}</span>
              </div>
            )}
            
            {post.reading_time && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-viola-400" />
                <span>{post.reading_time} min di lettura</span>
              </div>
            )}
            
            {post.views_count !== undefined && (
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blu-400" />
                <span>{post.views_count} visualizzazioni</span>
              </div>
            )}
          </div>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Condividi Articolo
          </Button>
        </header>

        {/* Article Content con sfondo più chiaro */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
          <div className="flex items-center mb-8 text-gray-700">
            <BookOpen className="w-6 h-6 text-magenta-600 mr-3" />
            <span className="font-semibold text-lg">Contenuto dell'articolo</span>
            <div className="flex-1 h-px bg-gradient-to-r from-magenta-200 to-transparent ml-4"></div>
          </div>
          
          <div className="prose-custom">
            <ArticleContentParser content={post.content} />
          </div>
        </div>

        {/* Article Footer */}
        <footer className="pb-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Condividi questo articolo
            </Button>
            
            <Button
              onClick={() => navigate('/blog')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-xl font-medium transition-all"
            >
              Altri articoli
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostContent;
