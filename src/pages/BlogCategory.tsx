import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LazyImage from '@/components/ui/LazyImage';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  reading_time?: number;
  views_count?: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

const BlogCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      if (!slug) return;

      try {
        // Fetch category
        const { data: categoryData, error: categoryError } = await supabase
          .from('blog_categories')
          .select('*')
          .eq('slug', slug)
          .single();

        if (categoryError) throw categoryError;
        setCategory(categoryData);

        // Fetch posts in this category
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, published_at, reading_time, views_count')
          .eq('category_id', categoryData.id)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData || []);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndPosts();
  }, [slug]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateExcerpt = (content?: string) => {
    if (!content) return 'Scopri i consigli di MUV Fitness per il tuo benessere.';
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > 180 ? text.substring(0, 180) + '...' : text;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
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
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background pt-[var(--header-height)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Categoria non trovata</h1>
          <Button onClick={() => navigate('/blog')}>
            Torna al Blog
          </Button>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://www.muvfitness.it/blog/categoria/${category.slug}`;

  return (
    <div className="min-h-screen bg-background pt-[var(--header-height)]">
      <Helmet>
        <title>{\`\${category.name} - Blog MUV Fitness | Articoli su \${category.name}\`}</title>
        <meta name="description" content={\`Scopri tutti gli articoli di MUV Fitness su \${category.name.toLowerCase()}. Consigli professionali e guide pratiche per il tuo benessere a Legnago.\`} />
        <meta name="keywords" content={\`\${category.name.toLowerCase()}, blog fitness, MUV Fitness, Legnago, allenamento, benessere\`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={\`\${category.name} - Blog MUV Fitness\`} />
        <meta property="og:description" content={\`Articoli professionali su \${category.name.toLowerCase()} dal blog di MUV Fitness\`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        
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
            }, {
              "@type": "ListItem",
              "position": 3,
              "name": "\${category.name}",
              "item": "\${canonicalUrl}"
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
              <li><button onClick={() => navigate('/blog')} className="hover:text-primary">Blog</button></li>
              <li>/</li>
              <li className="text-foreground">{category.name}</li>
            </ol>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/blog')} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Badge 
              variant="secondary" 
              style={{ backgroundColor: category.color || '#3B82F6' }}
              className="text-white"
            >
              {category.name}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          
          {category.description && (
            <p className="text-xl text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          )}
          
          <div className="mt-6 text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'articolo' : 'articoli'} in questa categoria
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {currentPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Nessun articolo in questa categoria</h2>
              <p className="text-muted-foreground mb-6">Torna presto per nuovi contenuti!</p>
              <Button onClick={() => navigate('/blog')}>
                Esplora tutti gli articoli
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post: BlogPost) => (
                <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => navigate(\`/blog/\${post.slug}\`)}>
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
            Pronto a mettere in pratica questi consigli?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Trasforma la teoria in risultati concreti con l'aiuto dei professionisti MUV Fitness
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

export default BlogCategory;