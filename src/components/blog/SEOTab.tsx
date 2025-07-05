
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Article {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
}

interface SEOTabProps {
  article: Article;
  validationErrors: any;
  onUpdateField: (field: string, value: string) => void;
}

const SEOTab: React.FC<SEOTabProps> = ({ article, validationErrors, onUpdateField }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Ottimizzazione SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta_title" className="text-white">Titolo SEO</Label>
            <Input
              id="meta_title"
              value={article.meta_title}
              onChange={(e) => onUpdateField('meta_title', e.target.value)}
              placeholder="Titolo ottimizzato per i motori di ricerca"
              className={`bg-gray-700 border-gray-600 text-white ${validationErrors.meta_title ? 'border-red-500' : ''}`}
              maxLength={60}
            />
            <div className="flex justify-between items-center">
              {validationErrors.meta_title && (
                <p className="text-red-400 text-sm">{validationErrors.meta_title}</p>
              )}
              <p className={`text-sm ml-auto ${article.meta_title.length > 60 ? 'text-red-400' : article.meta_title.length > 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {article.meta_title.length}/60 caratteri
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description" className="text-white">Meta Descrizione</Label>
            <Textarea
              id="meta_description"
              value={article.meta_description}
              onChange={(e) => onUpdateField('meta_description', e.target.value)}
              placeholder="Descrizione che apparirà nei risultati di ricerca"
              className={`bg-gray-700 border-gray-600 text-white ${validationErrors.meta_description ? 'border-red-500' : ''}`}
              rows={3}
              maxLength={160}
            />
            <div className="flex justify-between items-center">
              {validationErrors.meta_description && (
                <p className="text-red-400 text-sm">{validationErrors.meta_description}</p>
              )}
              <p className={`text-sm ml-auto ${article.meta_description.length > 160 ? 'text-red-400' : article.meta_description.length > 140 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {article.meta_description.length}/160 caratteri
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Anteprima Google</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg">
            <div className="space-y-1">
              <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                {article.meta_title || article.title || 'Titolo articolo'}
              </div>
              <div className="text-green-700 text-sm">
                https://www.muvfitness.it/blog/{article.slug || 'slug-articolo'}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                {article.meta_description || article.excerpt || 'Descrizione che apparirà nei risultati di ricerca. Assicurati che sia convincente e includa le parole chiave principali.'}
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <h4 className="text-white font-semibold">Suggerimenti SEO:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Usa il titolo principale (H1) una sola volta
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Includi parole chiave nel titolo e sottotitoli
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Mantieni la meta descrizione sotto i 160 caratteri
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Usa immagini con attributi alt descrittivi
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTab;
