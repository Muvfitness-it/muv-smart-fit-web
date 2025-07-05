import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ArticleContentParser from './ArticleContentParser';
import BlogPostHeader from './BlogPostHeader';
import BlogPostFooter from './BlogPostFooter';
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
const BlogPostContent: React.FC<BlogPostContentProps> = ({
  post
}) => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();

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
    const shareData = {
      title: post.title,
      text: post.excerpt || '',
      url: window.location.href
    };
    try {
      // Prova prima con l'API nativa di condivisione
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Condiviso!",
          description: "Articolo condiviso con successo"
        });
      } else {
        // Fallback: copia il link negli appunti
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiato!",
          description: "Il link dell'articolo è stato copiato negli appunti"
        });
      }
    } catch (error) {
      // Se anche la clipboard fallisce, mostra il link
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiato!",
          description: "Il link dell'articolo è stato copiato negli appunti"
        });
      } catch (clipboardError) {
        toast({
          title: "Condivisione non disponibile",
          description: "Copia manualmente questo link: " + window.location.href,
          variant: "destructive"
        });
      }
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Content Container con sfondo più chiaro per la leggibilità */}
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="pt-8 pb-4">
          <button onClick={() => navigate('/blog')} className="flex items-center space-x-2 text-magenta-400 hover:text-magenta-300 transition-colors mb-6 group">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Torna al Blog</span>
          </button>
        </div>

        {/* Featured Image */}
        {post.featured_image && <div className="aspect-video overflow-hidden rounded-2xl mb-8 shadow-2xl">
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" loading="eager" />
          </div>}

        {/* Article Header */}
        <BlogPostHeader post={post} onShare={handleShare} />

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
        <BlogPostFooter onShare={handleShare} />
      </div>
    </div>;
};
export default BlogPostContent;