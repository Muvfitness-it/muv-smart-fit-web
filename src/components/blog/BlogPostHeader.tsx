import React from 'react';
import { Calendar, Clock, Eye, Share2, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostHeaderProps {
  post: {
    title: string;
    excerpt?: string;
    published_at?: string;
    views_count?: number;
    reading_time?: number;
    author_name?: string;
  };
  onShare: () => void;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post, onShare }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
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
        onClick={onShare} 
        className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Condividi Articolo
      </Button>
    </header>
  );
};

export default BlogPostHeader;