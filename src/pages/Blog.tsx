import React from 'react';
import { Helmet } from 'react-helmet';
import BlogFrame from '../components/blog/BlogFrame';
import { useBlogIntegration } from '../hooks/useBlogIntegration';
const Blog = () => {
  const {
    isLoading,
    error
  } = useBlogIntegration();
  return <div className="min-h-screen bg-gray-900 pt-[var(--header-height)] py-[22px]">
      <Helmet>
        <title>Blog - MUV Fitness | Consigli, Allenamenti e Nutrizione</title>
        <meta name="description" content="Scopri i nostri articoli su fitness, nutrizione, allenamento e benessere. Consigli professionali dai nostri esperti per raggiungere i tuoi obiettivi." />
        <meta name="keywords" content="blog fitness, consigli allenamento, nutrizione sportiva, benessere, MUV Fitness" />
        <link rel="canonical" href="https://www.muvfitness.it/blog" />
      </Helmet>

      <div className="container mx-auto py-0 px-[20px] bg-transparent">
        <div className="mb-8">
          
          
        </div>

        <BlogFrame isLoading={isLoading} error={error} />
      </div>
    </div>;
};
export default Blog;