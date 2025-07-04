import React from 'react';
import { Helmet } from 'react-helmet';

interface BlogSEOProps {
  title: string;
  description: string;
  keywords?: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  author?: string;
  type?: 'website' | 'article';
}

const BlogSEO: React.FC<BlogSEOProps> = ({
  title,
  description,
  keywords,
  slug,
  image = '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  publishedAt,
  author = 'MUV Fitness',
  type = 'article'
}) => {
  const canonicalUrl = `https://www.muvfitness.it/blog/${slug}`;
  const fullImage = image.startsWith('http') ? image : `https://www.muvfitness.it${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "BlogPosting" : "WebPage",
    "headline": title,
    "description": description,
    "image": fullImage,
    "url": canonicalUrl,
    "datePublished": publishedAt,
    "dateModified": publishedAt,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://www.muvfitness.it"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MUV Fitness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
        "width": 400,
        "height": 400
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MUV Fitness Blog" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article specific */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://www.muvfitness.it" />
      <link rel="dns-prefetch" href="https://www.muvfitness.it" />
    </Helmet>
  );
};

export default BlogSEO;