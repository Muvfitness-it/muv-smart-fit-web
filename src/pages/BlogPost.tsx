
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import BlogFrame from '../components/blog/BlogFrame';
import { useBlogIntegration } from '../hooks/useBlogIntegration';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isLoading, error, articleMeta } = useBlogIntegration(slug);

  useEffect(() => {
    if (!slug) {
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!slug) {
    return null;
  }

  const pageTitle = articleMeta.title 
    ? `${articleMeta.title} - MUV Fitness Blog`
    : `Articolo - MUV Fitness Blog`;
  
  const pageDescription = articleMeta.description 
    ? articleMeta.description
    : `Leggi questo articolo sul blog di MUV Fitness per consigli su fitness, nutrizione e benessere.`;

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="blog fitness, consigli allenamento, nutrizione sportiva, benessere, MUV Fitness" />
        <link rel="canonical" href={`https://www.muvfitness.it/blog/${slug}`} />
        
        {/* Open Graph meta tags per social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://www.muvfitness.it/blog/${slug}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center space-x-2 text-pink-600 hover:text-pink-500 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Torna al Blog</span>
        </button>

        <BlogFrame 
          slug={slug}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default BlogPost;
