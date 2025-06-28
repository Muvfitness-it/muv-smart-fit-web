
import React from 'react';
import { Helmet } from 'react-helmet';
import BlogFrame from '../components/blog/BlogFrame';
import { useBlogIntegration } from '../hooks/useBlogIntegration';

const Blog = () => {
  const { isLoading, error } = useBlogIntegration();

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>Blog - MUV Fitness | Consigli, Allenamenti e Nutrizione</title>
        <meta 
          name="description" 
          content="Scopri i nostri articoli su fitness, nutrizione, allenamento e benessere. Consigli professionali dai nostri esperti per raggiungere i tuoi obiettivi." 
        />
        <meta name="keywords" content="blog fitness, consigli allenamento, nutrizione sportiva, benessere, MUV Fitness" />
        <link rel="canonical" href="https://www.muvfitness.it/blog" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Blog MUV Fitness
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Scopri i nostri articoli dedicati al fitness, alla nutrizione e al benessere. 
            Consigli pratici e strategie efficaci dai nostri esperti per aiutarti a 
            raggiungere i tuoi obiettivi di salute e forma fisica.
          </p>
        </div>

        <BlogFrame 
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Blog;
