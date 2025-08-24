import React from 'react';
import { Helmet } from 'react-helmet';

interface ArticleSchemaProps {
  headline: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  excerpt?: string;
}

const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  headline,
  datePublished,
  dateModified,
  image = 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  url,
  excerpt
}) => {
  const siteUrl = 'https://www.muvfitness.it';
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": excerpt,
    "author": {
      "@type": "Organization",
      "name": "MUV Fitness Legnago",
      "url": "https://www.muvfitness.it/"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "MUV Fitness Legnago",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": [fullImage],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
    </Helmet>
  );
};

export default ArticleSchema;