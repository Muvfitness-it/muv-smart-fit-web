import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Eye, Save, Send, FileUp } from 'lucide-react';
import { useGeminiAPI } from '@/hooks/useGeminiAPI';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ArticleData {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  slug: string;
  readingTime: number;
}

const AIArticleWriter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState('');
  const [tone, setTone] = useState('professionale');
  const [length, setLength] = useState('medio');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<ArticleData | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { callGeminiAPI } = useGeminiAPI();
  const { toast } = useToast();

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[àáâäã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const generateArticle = async () => {
    if (!topic.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci l'argomento dell'articolo",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const lengthMap = {
        breve: '500-800 parole',
        medio: '1000-1500 parole',
        lungo: '2000-3000 parole'
      };

      const prompt = `
      Scrivi un articolo completo e professionale per un blog di fitness su questo argomento: "${topic}"

      Parametri:
      - Lunghezza: ${lengthMap[length as keyof typeof lengthMap]}
      - Tono: ${tone}
      - Parole chiave da includere: ${keywords}
      - Categoria: ${category}

      Struttura l'articolo con:
      1. Titolo accattivante e SEO-friendly
      2. Introduzione coinvolgente (2-3 paragrafi)
      3. Corpo dell'articolo ben strutturato con sottotitoli H2 e H3
      4. Esempi pratici e consigli actionable
      5. Conclusione con call-to-action

      Inoltre fornisci:
      - Excerpt (riassunto di 150-160 caratteri)
      - Meta Title (50-60 caratteri)
      - Meta Description (150-160 caratteri)
      - 5-8 parole chiave pertinenti

      Formatta la risposta come JSON con questa struttura:
      {
        "title": "Titolo dell'articolo",
        "content": "Contenuto completo dell'articolo in formato HTML",
        "excerpt": "Breve riassunto",
        "metaTitle": "Meta title SEO",
        "metaDescription": "Meta description SEO",
        "keywords": ["keyword1", "keyword2", "keyword3"]
      }
      `;

      const result = await callGeminiAPI({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      });

      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const responseText = result.candidates[0].content.parts[0].text;
        
        // Prova a estrarre il JSON dalla risposta
        let jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Formato risposta non valido");
        }

        const articleData = JSON.parse(jsonMatch[0]);
        
        const article: ArticleData = {
          title: articleData.title,
          content: articleData.content,
          excerpt: articleData.excerpt,
          metaTitle: articleData.metaTitle,
          metaDescription: articleData.metaDescription,
          keywords: Array.isArray(articleData.keywords) ? articleData.keywords : [],
          slug: generateSlug(articleData.title),
          readingTime: calculateReadingTime(articleData.content)
        };

        setGeneratedArticle(article);
        
        toast({
          title: "Articolo generato!",
          description: "L'articolo è stato creato con successo dall'IA",
        });
      } else {
        throw new Error("Nessun contenuto generato");
      }
    } catch (error: any) {
      console.error('Errore generazione articolo:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore nella generazione dell'articolo",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveArticle = async (status: 'draft' | 'published' = 'draft') => {
    if (!generatedArticle) return;

    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: generatedArticle.title,
          content: generatedArticle.content,
          excerpt: generatedArticle.excerpt,
          meta_title: generatedArticle.metaTitle,
          meta_description: generatedArticle.metaDescription,
          meta_keywords: generatedArticle.keywords.join(', '),
          slug: generatedArticle.slug,
          reading_time: generatedArticle.readingTime,
          featured_image: featuredImage || null,
          status: status,
          author_name: 'AI Assistant'
        });

      if (error) throw error;

      toast({
        title: status === 'published' ? "Articolo pubblicato!" : "Bozza salvata!",
        description: `L'articolo è stato ${status === 'published' ? 'pubblicato' : 'salvato come bozza'} con successo`,
      });

      // Reset form
      setTopic('');
      setKeywords('');
      setCategory('');
      setFeaturedImage('');
      setGeneratedArticle(null);
      
    } catch (error: any) {
      console.error('Errore salvataggio:', error);
      toast({
        title: "Errore",
        description: "Errore nel salvataggio dell'articolo",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Scrivi Articolo con IA
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Descrivi l'argomento e lascia che l'intelligenza artificiale crei un articolo completo e ottimizzato SEO
        </p>
      </div>

      {!generatedArticle ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-magenta-400" />
              Configurazione Articolo
            </CardTitle>
            <CardDescription>
              Fornisci le informazioni per generare il contenuto perfetto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-white">Argomento *</Label>
              <Textarea
                id="topic"
                placeholder="Descrivi l'argomento dell'articolo (es. 'Benefici dell'allenamento HIIT per la perdita di peso')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-white">Parole Chiave</Label>
                <Input
                  id="keywords"
                  placeholder="HIIT, perdita peso, cardio"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Categoria</Label>
                <Input
                  id="category"
                  placeholder="Allenamento, Nutrizione, Benessere"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="text-white">Immagine di Copertina (URL)</Label>
              <Input
                id="featuredImage"
                placeholder="https://esempio.com/immagine.jpg"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Tono dell'articolo</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professionale">Professionale</SelectItem>
                    <SelectItem value="amichevole">Amichevole</SelectItem>
                    <SelectItem value="motivazionale">Motivazionale</SelectItem>
                    <SelectItem value="scientifico">Scientifico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Lunghezza</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breve">Breve (500-800 parole)</SelectItem>
                    <SelectItem value="medio">Medio (1000-1500 parole)</SelectItem>
                    <SelectItem value="lungo">Lungo (2000-3000 parole)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={generateArticle}
              disabled={isGenerating || !topic.trim()}
              className="w-full bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white py-3 text-lg font-bold"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Generazione in corso...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-2" />
                  Genera Articolo
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Article Preview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Articolo Generato</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPreview(!isPreview)}
                    className="border-gray-600 text-gray-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreview ? 'Modifica' : 'Anteprima'}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">
                  {generatedArticle.readingTime} min lettura
                </Badge>
                {generatedArticle.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="border-magenta-500 text-magenta-400">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white text-sm">Titolo</Label>
                <Input
                  value={generatedArticle.title}
                  onChange={(e) => setGeneratedArticle({...generatedArticle, title: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white font-bold text-lg"
                />
              </div>

              <div>
                <Label className="text-white text-sm">Slug URL</Label>
                <Input
                  value={generatedArticle.slug}
                  onChange={(e) => setGeneratedArticle({...generatedArticle, slug: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-white text-sm">Immagine di Copertina (URL)</Label>
                <Input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-white text-sm">Excerpt</Label>
                <Textarea
                  value={generatedArticle.excerpt}
                  onChange={(e) => setGeneratedArticle({...generatedArticle, excerpt: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-white text-sm">Contenuto</Label>
                {isPreview ? (
                  <div 
                    className="bg-gray-700 p-4 rounded border border-gray-600 text-white prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
                  />
                ) : (
                  <Textarea
                    value={generatedArticle.content}
                    onChange={(e) => setGeneratedArticle({...generatedArticle, content: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white min-h-[400px] font-mono text-sm"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => saveArticle('draft')}
                  disabled={isSaving}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salva Bozza
                </Button>
                
                <Button
                  onClick={() => saveArticle('published')}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Pubblica Articolo
                </Button>
                
                <Button
                  onClick={() => setGeneratedArticle(null)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  Nuovo Articolo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SEO Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Informazioni SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white text-sm">Meta Title</Label>
                <Input
                  value={generatedArticle.metaTitle}
                  onChange={(e) => setGeneratedArticle({...generatedArticle, metaTitle: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white text-sm">Meta Description</Label>
                <Textarea
                  value={generatedArticle.metaDescription}
                  onChange={(e) => setGeneratedArticle({...generatedArticle, metaDescription: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIArticleWriter;
