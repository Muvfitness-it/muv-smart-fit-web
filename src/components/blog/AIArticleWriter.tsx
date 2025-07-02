
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Save, Eye } from 'lucide-react';
import { useGeminiAPI } from '@/hooks/useGeminiAPI';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AIArticleWriter = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [articleLength, setArticleLength] = useState('medium');
  const [tone, setTone] = useState('professionale');
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { callGeminiAPI } = useGeminiAPI();
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const generateArticle = async () => {
    if (!topic.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un argomento per l'articolo",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    const lengthMap = {
      short: '800-1000 parole',
      medium: '1200-1500 parole',
      long: '2000-2500 parole'
    };

    const prompt = `Scrivi un articolo completo per un blog di fitness professionale sull'argomento: "${topic}".

Specifiche:
- Lunghezza: ${lengthMap[articleLength as keyof typeof lengthMap]}
- Tono: ${tone}
- Parole chiave da includere: ${keywords}
- Target: appassionati di fitness, principianti e atleti
- Settore: MUV Fitness

Struttura richiesta:
1. Titolo accattivante e SEO-friendly
2. Introduzione coinvolgente (2-3 paragrafi)
3. Corpo dell'articolo con sottotitoli H2 e H3
4. Consigli pratici e actionable
5. Conclusione con call-to-action

Includi:
- Informazioni scientificamente accurate
- Esempi pratici e consigli applicabili
- Linguaggio accessibile ma professionale
- Riferimenti al mondo del fitness e benessere
- Call-to-action verso MUV Fitness quando appropriato

Formatta il testo in HTML con tag appropriati (h1, h2, h3, p, strong, em, ul, li).

Rispondi SOLO con il contenuto HTML dell'articolo, iniziando con il tag <h1> per il titolo.`;

    try {
      const response = await callGeminiAPI(prompt);
      
      // Estrai il titolo dal contenuto HTML
      const titleMatch = response.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const extractedTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : topic;
      
      // Genera excerpt dai primi paragrafi
      const paragraphMatches = response.match(/<p[^>]*>(.*?)<\/p>/gi);
      const extractedExcerpt = paragraphMatches 
        ? paragraphMatches.slice(0, 2).join(' ').replace(/<[^>]*>/g, '').substring(0, 200) + '...'
        : '';
      
      setGeneratedArticle(response);
      setTitle(extractedTitle);
      setExcerpt(extractedExcerpt);
      setMetaTitle(extractedTitle.substring(0, 60));
      setMetaDescription(extractedExcerpt.substring(0, 160));
      
      toast({
        title: "Successo",
        description: "Articolo generato con successo!"
      });
    } catch (error) {
      console.error('Errore generazione articolo:', error);
      toast({
        title: "Errore",
        description: "Errore nella generazione dell'articolo: " + (error instanceof Error ? error.message : 'Errore sconosciuto'),
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveArticle = async () => {
    if (!title.trim() || !generatedArticle.trim()) {
      toast({
        title: "Errore",
        description: "Titolo e contenuto sono obbligatori",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    try {
      // Verifica se l'utente è autenticato e ha i ruoli admin
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user);
      
      if (!user) {
        toast({
          title: "Errore",
          description: "Devi essere autenticato per salvare articoli",
          variant: "destructive"
        });
        return;
      }

      // Verifica i ruoli dell'utente
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      console.log('User roles:', userRoles, 'Error:', rolesError);

      if (!userRoles || userRoles.length === 0 || !userRoles.some(r => r.role === 'admin')) {
        toast({
          title: "Errore",
          description: "Non hai i permessi per creare articoli. Contatta l'amministratore.",
          variant: "destructive"
        });
        return;
      }

      const slug = generateSlug(title);
      const readingTime = Math.ceil((generatedArticle.match(/\S+/g) || []).length / 200);

      const articleData = {
        title: title.trim(),
        slug: slug,
        content: generatedArticle.trim(),
        excerpt: excerpt.trim() || generatedArticle.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
        meta_title: metaTitle.trim() || title.substring(0, 60),
        meta_description: metaDescription.trim() || excerpt.substring(0, 160),
        status: 'draft',
        author_name: 'MUV Team',
        reading_time: readingTime
      };

      console.log('Saving article data:', articleData);

      // Prova a inserire l'articolo
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(articleData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        // Se l'errore è di RLS, fornisci un messaggio più chiaro
        if (error.message.includes('row-level security')) {
          toast({
            title: "Errore di Permessi",
            description: "Non hai i permessi per creare articoli. Assicurati di essere autenticato come admin.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Errore",
            description: `Errore nel salvataggio: ${error.message}`,
            variant: "destructive"
          });
        }
        return;
      }

      toast({
        title: "Successo",
        description: "Articolo salvato come bozza!"
      });

      // Naviga alla pagina di modifica
      if (data) {
        navigate(`/blog/edit/${data.id}`);
      } else {
        navigate('/blog/admin');
      }

    } catch (error: any) {
      console.error('Errore salvataggio:', error);
      toast({
        title: "Errore",
        description: "Errore nel salvataggio: " + (error.message || 'Errore sconosciuto'),
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Scrivi Articolo con IA</h1>
        <p className="text-gray-400">Genera contenuti ottimizzati SEO per il blog MUV Fitness</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-magenta-500" />
            <span>Generatore IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-white">Argomento *</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="es. Benefici dell'allenamento HIIT"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-white">Parole chiave</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="fitness, allenamento, HIIT"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Lunghezza articolo</Label>
              <Select value={articleLength} onValueChange={setArticleLength}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Breve (800-1000 parole)</SelectItem>
                  <SelectItem value="medium">Medio (1200-1500 parole)</SelectItem>
                  <SelectItem value="long">Lungo (2000-2500 parole)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tono</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professionale">Professionale</SelectItem>
                  <SelectItem value="informale">Informale</SelectItem>
                  <SelectItem value="motivazionale">Motivazionale</SelectItem>
                  <SelectItem value="scientifico">Scientifico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateArticle}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generazione in corso...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Genera Articolo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedArticle && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500" />
              <span>Anteprima e Modifica</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Titolo *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaTitle" className="text-white">Titolo SEO</Label>
                <Input
                  id="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  maxLength={60}
                />
                <span className="text-xs text-gray-400">{metaTitle.length}/60</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-white">Estratto</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription" className="text-white">Meta Descrizione</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                rows={2}
                maxLength={160}
              />
              <span className="text-xs text-gray-400">{metaDescription.length}/160</span>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Anteprima Contenuto</Label>
              <div className="bg-white p-4 rounded-lg max-h-64 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: generatedArticle }} />
              </div>
            </div>

            <Button
              onClick={saveArticle}
              disabled={isSaving}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salva come Bozza
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIArticleWriter;
