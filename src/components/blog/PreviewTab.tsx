
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, BookOpen } from 'lucide-react';
import ArticleContentParser from './ArticleContentParser';

interface Article {
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  author_name: string;
}

interface PreviewTabProps {
  article: Article;
}

const PreviewTab: React.FC<PreviewTabProps> = ({ article }) => {
  const calculateReadingTime = (content: string) => {
    return Math.ceil((content.replace(/<[^>]*>/g, '').match(/\S+/g) || []).length / 200);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Anteprima Live
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-8 max-h-[80vh] overflow-y-auto">
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              {article.featured_image && (
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title || 'Titolo del tuo articolo'}
              </h1>
              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-6 font-medium">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500 border-b pb-4">
                <span>Di {article.author_name}</span>
                <span>•</span>
                <span>~{calculateReadingTime(article.content)} min di lettura</span>
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none">
              <ArticleContentParser content={article.content || 'Il contenuto del tuo articolo apparirà qui...'} />
            </div>
          </article>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewTab;
