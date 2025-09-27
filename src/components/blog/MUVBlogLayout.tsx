// Blog Layout Magazine MUV - Specifiche: thumbnail 420x280 px, titolo Poppins Bold 24px #1E3A8A, snippet 100 caratteri
import { Link } from "react-router-dom";
import LazyImage from "@/components/ui/LazyImage";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
}

interface MUVBlogLayoutProps {
  posts: BlogPost[];
}

const MUVBlogLayout = ({ posts }: MUVBlogLayoutProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateExcerpt = (text: string | null, maxLength: number = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Griglia Magazine Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            
            {/* Thumbnail - 420x280 px esatti */}
            {post.featured_image && (
              <Link to={`/${post.slug}`} className="block">
                <div className="w-full overflow-hidden" style={{ height: '280px' }}>
                  <LazyImage
                    src={post.featured_image}
                    alt={`Articolo ${post.title} - MUV Fitness Legnago`}
                    className="w-full object-cover hover:scale-105 transition-transform duration-300"
                    width={420}
                    height={280}
                  />
                </div>
              </Link>
            )}
            
            {/* Content */}
            <div className="p-6">
              
              {/* Data pubblicazione */}
              <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'Poppins' }}>
                {formatDate(post.published_at)}
              </p>
              
              {/* Titolo - Poppins Bold 24px #1E3A8A */}
              <h2 className="mb-3">
                <Link 
                  to={`/${post.slug}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                  style={{ 
                    fontFamily: 'Poppins',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    display: 'block'
                  }}
                >
                  {post.title}
                </Link>
              </h2>
              
              {/* Snippet - massimo 100 caratteri */}
              {post.excerpt && (
                <p 
                  className="text-gray-600 mb-4 leading-relaxed"
                  style={{ 
                    fontFamily: 'Poppins',
                    fontSize: '16px'
                  }}
                >
                  {truncateExcerpt(post.excerpt, 100)}
                </p>
              )}
              
              {/* Pulsante "Leggi di più" - arancione rounded corners 12px, font 16px */}
              <Button asChild>
                <Link 
                  to={`/${post.slug}`}
                  className="bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-2 transition-all duration-300"
                  style={{ 
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    borderRadius: '12px',
                    fontWeight: 'medium'
                  }}
                >
                  Leggi di più
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
      
      {/* Messaggio se nessun post */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p 
            className="text-gray-500 text-lg"
            style={{ fontFamily: 'Poppins' }}
          >
            Nessun articolo trovato.
          </p>
        </div>
      )}
    </div>
  );
};

export default MUVBlogLayout;