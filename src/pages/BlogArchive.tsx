import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import LazyImage from '@/components/ui/LazyImage';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  reading_time?: number;
  category_id?: string;
  views_count?: number;
}

const BlogArchive = () => {
  const { posts, loading } = useBlogPosts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Filter posts
  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateExcerpt = (content?: string) => {
    if (!content) return 'Scopri i consigli e le strategie di MUV Fitness per raggiungere i tuoi obiettivi di benessere.';
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > 180 ? text.substring(0, 180) + '...' : text;
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height)]">
      <Helmet>
        <title>Blog - MUV Fitness | Articoli su Fitness, Allenamento e Nutrizione</title>
        <meta name="description" content="Scopri il blog di MUV Fitness con articoli professionali su allenamento, nutrizione e benessere. Contenuti ottimizzati per Google News e sistemi AI." />
        <meta name="keywords" content="blog fitness, articoli allenamento, nutrizione sportiva, benessere, personal training, MUV Fitness, Legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/blog" />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {\`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.muvfitness.it"
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://www.muvfitness.it/blog"
            }]
          }\`}
        </script>
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/20 via-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-muted-foreground">
              <li><button onClick={() => navigate('/')} className="hover:text-primary">Home</button></li>
              <li>/</li>
              <li className="text-foreground">Blog</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog <span className="text-primary">MUV Fitness</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Articoli professionali su fitness, allenamento e nutrizione. 
            Contenuti autorevoli per il tuo benessere a Legnago.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cerca articoli..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{filteredPosts.length} articoli trovati</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {currentPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Nessun articolo trovato</h2>
              <p className="text-muted-foreground">Prova a modificare i criteri di ricerca.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post: BlogPost) => (
                <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => handlePostClick(post.slug)}>
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <LazyImage
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt || generateExcerpt()}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {post.published_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={post.published_at}>
                              {formatDate(post.published_at)}
                            </time>
                          </div>
                        )}
                        {post.reading_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.reading_time} min</span>
                          </div>
                        )}
                      </div>
                      
                      {post.views_count && post.views_count > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {post.views_count} views
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Precedente
              </Button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Successivo
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto a trasformare il tuo corpo?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Metti in pratica i consigli del nostro blog con l'aiuto dei professionisti MUV Fitness
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/contatti')}
            className="bg-primary hover:bg-primary/90"
          >
            Prenota la tua prova gratuita
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlogArchive;