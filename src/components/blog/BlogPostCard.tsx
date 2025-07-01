
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Eye, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    published_at?: string;
    views_count?: number;
    reading_time?: number;
    content?: string;
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  // Genera automaticamente l'excerpt dal contenuto se non presente
  const getExcerpt = () => {
    if (post.excerpt) return post.excerpt;
    if (post.content) {
      // Rimuove tag HTML e limita a 150 caratteri
      const plainText = post.content.replace(/<[^>]*>/g, '');
      return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
    }
    return 'Leggi questo interessante articolo sul nostro blog di fitness...';
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigazione diretta e veloce all'articolo
    navigate(`/blog/${post.slug}`, { replace: false });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Permette il click su tutta la card per aprire l'articolo
    if ((e.target as HTMLElement).closest('button')) return; // Non interferire con il bottone
    handleReadMore(e);
  };

  return (
    <Card 
      className="bg-gray-800 border-gray-700 hover:border-magenta-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
      onClick={handleCardClick}
    >
      {post.featured_image && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
            }}
            loading="lazy"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-magenta-400 transition-colors">
          {post.title}
        </h3>
        <CardDescription className="text-gray-400 line-clamp-3 text-sm leading-relaxed">
          {getExcerpt()}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {post.reading_time && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.reading_time} min</span>
              </div>
            )}
            {post.views_count !== undefined && (
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views_count}</span>
              </div>
            )}
          </div>
          {post.published_at && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.published_at).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleReadMore}
          className="w-full bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white"
        >
          Leggi Articolo
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
