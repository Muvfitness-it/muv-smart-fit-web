import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, User, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBlogPosts, useBlogCategories } from '@/hooks/useBlog';
import { BlogFilters } from '@/types/blog';
import PageSEO from '@/components/SEO/PageSEO';
const Blog = () => {
  const [filters, setFilters] = useState<BlogFilters>({
    page: 1,
    limit: 12
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const {
    posts,
    loading,
    error,
    totalCount
  } = useBlogPosts(filters);
  const {
    categories
  } = useBlogCategories();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      ...filters,
      search: searchTerm,
      page: 1
    });
  };
  const handleCategoryFilter = (categorySlug: string) => {
    setFilters({
      ...filters,
      category: filters.category === categorySlug ? undefined : categorySlug,
      page: 1
    });
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const totalPages = Math.ceil(totalCount / (filters.limit || 12));
  return <>
      <PageSEO title="Blog MUV Fitness - Consigli di Fitness, Nutrizione e Benessere" description="Scopri i nostri articoli su fitness, alimentazione, EMS, Pancafit e benessere. Consigli pratici dai nostri esperti per raggiungere i tuoi obiettivi." keywords="blog fitness, consigli nutrizionali, EMS, Pancafit, personal training, benessere, alimentazione sana" canonicalUrl="https://muvfitness.it/blog" />
      
      <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-white">Blog</span>
              <span className="text-green-400"> MUV</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Scopri consigli, guide e novità dal mondo del fitness, della nutrizione e del benessere
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="text" placeholder="Cerca articoli..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-gray-800 border-gray-700 text-white" />
              </div>
              <Button type="submit" variant="outline" className="text-slate-950">
                Cerca
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)} className="text-slate-950">
                <Filter className="w-4 h-4" />
              </Button>
            </form>

            {showFilters && <div className="flex flex-wrap gap-2">
                <Button variant={!filters.category ? "default" : "outline"} size="sm" onClick={() => handleCategoryFilter('')}>
                  Tutti
                </Button>
                {categories.map(category => <Button key={category.id} variant={filters.category === category.slug ? "default" : "outline"} size="sm" onClick={() => handleCategoryFilter(category.slug)} style={{
              borderColor: category.color
            }}>
                    {category.name}
                  </Button>)}
              </div>}
          </div>

          {/* Content */}
          {loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-700 rounded mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                  </CardContent>
                </Card>)}
            </div>}

          {error && <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Riprova
              </Button>
            </div>}

          {!loading && !error && posts.length === 0 && <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Nessun articolo trovato.</p>
            </div>}

          {!loading && !error && posts.length > 0 && <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map(post => <Card key={post.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                    {post.featured_image && <div className="h-48 overflow-hidden rounded-t-lg">
                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                      </div>}
                    <CardContent className="p-6">
                      {post.category && <Badge className="mb-3" style={{
                  backgroundColor: post.category.color
                }}>
                          {post.category.name}
                        </Badge>}
                      
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        <Link to={`/blog/${post.slug}`} className="hover:text-green-400 transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      
                      {post.excerpt && <p className="text-gray-400 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author_name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.reading_time} min
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views_count}
                        </div>
                      </div>
                      
                      {post.published_at && <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.published_at)}
                        </div>}
                    </CardContent>
                  </Card>)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && <div className="flex justify-center gap-2">
                  <Button variant="outline" disabled={filters.page === 1} onClick={() => setFilters({
              ...filters,
              page: (filters.page || 1) - 1
            })}>
                    Precedente
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = Math.max(1, (filters.page || 1) - 2) + i;
                if (pageNum > totalPages) return null;
                return <Button key={pageNum} variant={filters.page === pageNum ? "default" : "outline"} size="sm" onClick={() => setFilters({
                  ...filters,
                  page: pageNum
                })}>
                          {pageNum}
                        </Button>;
              })}
                  </div>
                  
                  <Button variant="outline" disabled={filters.page === totalPages} onClick={() => setFilters({
              ...filters,
              page: (filters.page || 1) + 1
            })}>
                    Successivo
                  </Button>
                </div>}
            </>}
        </div>
      </div>
    </>;
};
export default Blog;