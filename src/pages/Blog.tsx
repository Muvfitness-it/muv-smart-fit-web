
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const { posts, categories, postsLoading } = useBlog();

  useEffect(() => {
    document.title = "Blog - MUV Fitness";
  }, []);

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-gray-700" />
                  <Skeleton className="h-4 w-1/2 bg-gray-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            📝 Blog MUV Fitness
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Consigli, guide e novità dal mondo del fitness e del benessere
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Nessun articolo pubblicato</h2>
            <p className="text-gray-400">Gli articoli del blog appariranno qui una volta pubblicati.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  {post.featured_image && (
                    <div className="aspect-video bg-gray-700 rounded-t-lg overflow-hidden">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <User className="h-4 w-4" />
                      <span>{post.author_name}</span>
                      <Calendar className="h-4 w-4 ml-2" />
                      <span>{new Date(post.published_at || post.created_at).toLocaleDateString('it-IT')}</span>
                    </div>
                    <CardTitle className="text-white hover:text-pink-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.reading_time || 5} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views_count || 0}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
