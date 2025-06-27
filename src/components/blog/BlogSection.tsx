
import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const { posts, postsLoading } = useBlog();

  if (postsLoading) {
    return (
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              📝 Dal nostro Blog
            </h2>
            <p className="text-gray-300 text-lg">
              Caricamento articoli...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  const latestPosts = posts.slice(0, 3);

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            📝 Dal nostro Blog
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Scopri i nostri ultimi consigli su fitness, nutrizione e benessere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {latestPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="bg-gray-900 border-gray-700 hover:border-pink-600 transition-all duration-300 hover:transform hover:scale-105 h-full">
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
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString('it-IT')}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{post.reading_time || 5} min</span>
                  </div>
                  <CardTitle className="text-white hover:text-pink-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              Vedi tutti gli articoli
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
