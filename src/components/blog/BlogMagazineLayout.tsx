import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowRight, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  published_at: string;
  reading_time: number;
  author_name: string;
  views_count: number;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

const BlogMagazineLayout = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogData();
  }, []);

  const loadBlogData = async () => {
    try {
      // Load categories
      const { data: categoriesData } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      // Load featured posts (most viewed)
      const { data: featuredData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('views_count', { ascending: false })
        .limit(3);

      // Load all posts
      const { data: postsData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(12);

      setCategories(categoriesData || []);
      setFeaturedPosts(featuredData || []);
      setPosts(postsData || []);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Caricamento blog...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Blog <span className="text-primary">Fitness & Benessere</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Scopri i segreti del fitness moderno, le tecnologie all'avanguardia e i consigli 
            degli esperti per raggiungere i tuoi obiettivi di benessere.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cerca articoli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Tutti
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-primary mr-3"></span>
              Articoli in Evidenza
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Featured */}
              <div className="lg:col-span-2">
                <Link to={`/blog/${featuredPosts[0].slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-800">
                    <OptimizedImage
                      src={featuredPosts[0].featured_image || '/placeholder.svg'}
                      alt={featuredPosts[0].title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featuredPosts[0].published_at)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPosts[0].reading_time} min lettura
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {featuredPosts[0].title}
                      </h3>
                      <p className="text-gray-300 line-clamp-2">
                        {featuredPosts[0].excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Secondary Featured */}
              <div className="space-y-6">
                {featuredPosts.slice(1, 3).map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                    <div className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
                      <div className="flex gap-4">
                        <OptimizedImage
                          src={post.featured_image || '/placeholder.svg'}
                          alt={post.title}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>{formatDate(post.published_at)}</span>
                            <span>•</span>
                            <span>{post.reading_time} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-1 h-6 bg-primary mr-3"></span>
            Tutti gli Articoli
            {searchQuery && (
              <span className="text-base font-normal text-gray-400 ml-4">
                • {filteredPosts.length} risultati per "{searchQuery}"
              </span>
            )}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">Nessun articolo trovato</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-primary hover:text-primary/80 mt-4 inline-flex items-center"
              >
                Rimuovi filtri
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <article className="bg-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:transform hover:scale-105">
                    <OptimizedImage
                      src={post.featured_image || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author_name}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.reading_time} min
                        </span>
                      </div>
                      
                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatDate(post.published_at)}
                        </span>
                        
                        <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-semibold mr-1">Leggi</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Tags Cloud */}
        <section className="mt-16 text-center">
          <h3 className="text-xl font-bold text-white mb-6">Esplora per Argomenti</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['EMS', 'Personal Training', 'Pilates', 'Dimagrimento', 'Postura', 'Nutrizione', 'Benessere', 'Tecnologie Fitness', 'Case Studies', 'Consigli Esperti'].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-4 py-2 bg-gray-800 hover:bg-primary transition-colors cursor-pointer"
                onClick={() => setSearchQuery(tag)}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogMagazineLayout;