import React from 'react';
interface ArticleContentParserProps {
  content: string;
}
const ArticleContentParser: React.FC<ArticleContentParserProps> = ({ content }) => {
  return (
    <div 
      className="prose prose-lg prose-invert max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-magenta-300
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:text-viola-300
        prose-h3:text-xl prose-h3:mb-3 prose-h3:text-blu-300
        prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-4
        prose-strong:text-magenta-400 prose-strong:font-semibold
        prose-em:text-viola-300 prose-em:italic
        prose-a:text-blu-400 prose-a:underline hover:prose-a:text-blu-300
        prose-ul:text-gray-200 prose-li:mb-2
        prose-ol:text-gray-200 prose-ol:list-decimal
        prose-blockquote:border-l-4 prose-blockquote:border-magenta-400
        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-300
        prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-600
        prose-code:text-magenta-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-6"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
export default ArticleContentParser;