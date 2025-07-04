import React from 'react';
import { CheckCircle, Star, ArrowRight, Lightbulb, Target, Clock } from 'lucide-react';
interface ArticleContentParserProps {
  content: string;
}
const ArticleContentParser: React.FC<ArticleContentParserProps> = ({
  content
}) => {
  const parseContent = (rawContent: string) => {
    // Rimuovi i tag HTML esistenti e pulisci il contenuto
    let cleanContent = rawContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // Dividi in paragrafi basandosi su pattern comuni
    const paragraphs = cleanContent.split(/\.\s+(?=[A-Z])|[.!?]\s*\n|\n\s*\n/).filter(p => p.trim().length > 20);
    const sections: Array<{
      type: 'title' | 'paragraph' | 'list' | 'highlight' | 'tip';
      content: string;
      items?: string[];
    }> = [];
    paragraphs.forEach((paragraph, index) => {
      const text = paragraph.trim();

      // Identifica titoli (frasi corte con parole chiave)
      if (text.length < 100 && (text.toLowerCase().includes('ricette') || text.toLowerCase().includes('allenamento') || text.toLowerCase().includes('recupero') || text.toLowerCase().includes('nutrizione') || text.toLowerCase().includes('ingredienti') || text.toLowerCase().includes('benefici') || text.toLowerCase().includes('consigli') || index === 0)) {
        sections.push({
          type: 'title',
          content: text
        });
        return;
      }

      // Identifica liste (paragrafi con elementi separati da virgole o punti)
      if (text.includes(',') && text.split(',').length > 3) {
        const items = text.split(',').map(item => item.trim()).filter(item => item.length > 3);
        if (items.length > 2) {
          sections.push({
            type: 'list',
            content: 'Ingredienti e componenti principali:',
            items: items
          });
          return;
        }
      }

      // Identifica suggerimenti (frasi con parole chiave specifiche)
      if (text.toLowerCase().includes('consiglio') || text.toLowerCase().includes('suggerimento') || text.toLowerCase().includes('importante') || text.toLowerCase().includes('ricorda')) {
        sections.push({
          type: 'tip',
          content: text
        });
        return;
      }

      // Identifica highlight (frasi con benefici o risultati)
      if (text.toLowerCase().includes('benefici') || text.toLowerCase().includes('risultati') || text.toLowerCase().includes('migliora') || text.toLowerCase().includes('aiuta')) {
        sections.push({
          type: 'highlight',
          content: text
        });
        return;
      }

      // Paragrafo normale
      sections.push({
        type: 'paragraph',
        content: text
      });
    });
    return sections;
  };
  const highlightKeywords = (text: string) => {
    const keywords = ['proteine', 'carboidrati', 'vitamine', 'minerali', 'antiossidanti', 'recupero', 'allenamento', 'muscoli', 'energia', 'performance', 'nutrizione', 'salute', 'benessere', 'fitness', 'sport'];
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<strong class="text-magenta-400 font-semibold">$&</strong>`);
    });
    return highlightedText;
  };
  const sections = parseContent(content);
  return <div className="max-w-none">
      {sections.map((section, index) => {
      switch (section.type) {
        case 'title':
          return <div key={index} className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center">
                  <Target className="w-6 h-6 text-magenta-400 mr-3" />
                  {section.content}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-magenta-400 to-viola-400 rounded-full"></div>
              </div>;
        case 'list':
          return;
        case 'highlight':
          return <div key={index} className="mb-6 bg-gradient-to-r from-magenta-500/10 to-viola-500/10 rounded-xl p-6 border border-magenta-500/20">
                <div className="flex items-start">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
                  <p className="text-gray-200 leading-relaxed text-lg" dangerouslySetInnerHTML={{
                __html: highlightKeywords(section.content)
              }} />
                </div>
              </div>;
        case 'tip':
          return <div key={index} className="mb-6 bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">💡 Suggerimento</h4>
                    <p className="text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{
                  __html: highlightKeywords(section.content)
                }} />
                  </div>
                </div>
              </div>;
        case 'paragraph':
        default:
          return <div key={index} className="mb-6">
                <p className="text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{
              __html: highlightKeywords(section.content)
            }} />
              </div>;
      }
    })}
    </div>;
};
export default ArticleContentParser;