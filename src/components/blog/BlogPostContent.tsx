import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Eye, User, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ArticleContentParser from './ArticleContentParser';
import BlogAnalytics from './BlogAnalytics';
import AIOptimizedContent from './AIOptimizedContent';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  author_name?: string;
  views_count?: number;
  reading_time?: number;
}

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || 'Leggi questo articolo interessante',
          url: url
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copiato!",
          description: "Il link dell'articolo è stato copiato negli appunti.",
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          title: "Errore",
          description: "Impossibile copiare il link.",
          variant: "destructive"
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Analytics e AI optimization invisibili */}
      <BlogAnalytics post={post} />
      <AIOptimizedContent post={post} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/blog')}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna al Blog
        </Button>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {post.author_name && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author_name}</span>
            </div>
          )}
          
          {post.published_at && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          )}
          
          {post.reading_time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min di lettura</span>
            </div>
          )}
          
          {post.views_count !== undefined && (
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.views_count} visualizzazioni</span>
            </div>
          )}
        </div>

        {/* Share Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Condividi
          </Button>
          
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Fitness & Benessere
          </Badge>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none blog-content bg-card rounded-lg p-6 shadow-sm border border-border">
        <ArticleContentParser content={post.content} />
      </article>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Vuoi risultati concreti e duraturi?
          </h3>
          <p className="text-muted-foreground mb-6">
            Prenota oggi la tua prova gratuita al Centro Fitness MUV a Legnago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/contatti')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Prenota la tua prova gratuita
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/blog')}
            >
              Leggi Altri Articoli
            </Button>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default BlogPostContent;