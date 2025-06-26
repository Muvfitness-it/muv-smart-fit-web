
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Eye, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBlogPost } from '@/hooks/useBlog';
import PageSEO from '@/components/SEO/PageSEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug || '');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiato negli appunti!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato negli appunti!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-4 w-1/4" />
              <div className="h-96 bg-gray-700 rounded mb-6" />
              <div className="h-6 bg-gray-700 rounded mb-2" />
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4" />
              <div className="space-y-3">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Post non trovato</h1>
            <p className="text-gray-400 mb-6">{error || 'Il post che stai cercando non esiste.'}</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna al Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title={post.meta_title || `${post.title} | Blog MUV Fitness`}
        description={post.meta_description || post.excerpt || post.title}
        keywords={post.meta_keywords || `fitness, ${post.category?.name || 'benessere'}, MUV`}
        canonicalUrl={`https://muvfitness.it/blog/${post.slug}`}
      />
      
      <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-gray-400 hover:text-white">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {post.category && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        href={`/blog?category=${post.category.slug}`}
                        className="text-gray-400 hover:text-white"
                      >
                        {post.category.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center text-green-400 hover:text-green-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Blog
            </Link>

            {/* Article Header */}
            <article>
              <header className="mb-8">
                {post.category && (
                  <Badge 
                    className="mb-4"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.name}
                  </Badge>
                )}
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author_name}</span>
                  </div>
                  
                  {post.published_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.reading_time} min di lettura</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views_count} visualizzazioni</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-400 hover:text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Condividi
                  </Button>
                </div>
              </header>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-lg prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Tag:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="text-gray-300">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Related Posts Section */}
            <Card className="bg-gray-800 border-gray-700 mt-12">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ti potrebbe interessare anche</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/muv-planner" className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <h4 className="font-semibold text-green-400 mb-2">MUV Planner</h4>
                    <p className="text-gray-300 text-sm">Crea il tuo piano alimentare personalizzato con l'AI</p>
                  </Link>
                  <Link to="/servizi" className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <h4 className="font-semibold text-green-400 mb-2">I Nostri Servizi</h4>
                    <p className="text-gray-300 text-sm">Scopri tutti i servizi offerti da MUV Fitness Center</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
