
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
import type { AIProvider } from '@/hooks/useGeminiAPI';

const AIArticleWriter = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [articleLength, setArticleLength] = useState('medium');
  const [tone, setTone] = useState('professionale');
  const [targetAudience, setTargetAudience] = useState('generale');
  const [aiProvider, setAiProvider] = useState<AIProvider>('gemini');
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { callAIAPI } = useGeminiAPI();
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

    const prompt = `Scrivi un articolo completo e professionale per un blog di fitness sull'argomento: "${topic}".

SPECIFICHE TECNICHE:
- Lunghezza: ${lengthMap[articleLength as keyof typeof lengthMap]}
- Tono: ${tone}
- Target audience: ${targetAudience}
- Parole chiave SEO da includere naturalmente: ${keywords}
- Settore: MUV Fitness (centro fitness innovativo a Legnago)

STRUTTURA ARTICOLO:
1. Titolo SEO-friendly e accattivante (max 60 caratteri)
2. Introduzione coinvolgente (2-3 paragrafi che catturano l'attenzione)
3. Corpo dell'articolo con:
   - Sottotitoli H2 e H3 ben strutturati
   - Paragrafi di 3-4 frasi ciascuno
   - Liste puntate quando appropriato
   - Esempi pratici e actionable tips
4. Sezione "Conclusioni" con call-to-action verso MUV Fitness
5. FAQ (3-5 domande frequenti) se appropriato

LINEE GUIDA CONTENUTO:
- Informazioni scientificamente accurate e aggiornate
- Linguaggio professionale ma accessibile
- Esempi concreti e situazioni reali
- Consigli pratici e immediatamente applicabili
- Citazioni di studi scientifici quando rilevante
- Integrazione naturale delle parole chiave
- Call-to-action che indirizzano verso i servizi MUV Fitness

OTTIMIZZAZIONE SEO:
- Densità keyword naturale (1-2%)
- Sinonimi e variazioni delle parole chiave
- Struttura gerarchica con H1, H2, H3
- Meta description accattivante inclusa

FORMATTAZIONE:
- Utilizza HTML semantico (h1, h2, h3, p, strong, em, ul, li)
- Grassetto per concetti chiave
- Corsivo per enfasi
- Liste puntate per consigli/benefici

Rispondi SOLO con il contenuto HTML dell'articolo, iniziando con <h1> per il titolo principale.`;

    try {
      const response = await callAIAPI(prompt, aiProvider);
      
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
      
      let errorMessage = 'Errore sconosciuto';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Errore",
        description: errorMessage,
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

      // Verifica se l'utente è admin
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (adminError || !adminUser) {
        toast({
          title: "Errore",
          description: "Non hai i permessi per creare articoli. Solo gli amministratori possono pubblicare.",
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
        reading_time: readingTime,
        featured_image: null
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
      <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
          Scrivi Articolo con IA
        </h1>
        <p className="text-muted-foreground text-lg">
          Genera contenuti ottimizzati SEO per il blog MUV Fitness con intelligenza artificiale avanzata
        </p>
      </div>

      <Card className="card-brand">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Wand2 className="h-6 w-6 text-brand-primary" />
            <span>Generatore IA Avanzato</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-foreground font-medium">Argomento *</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="es. Benefici dell'allenamento HIIT per la salute cardiovascolare"
                className="bg-muted border-border text-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-foreground font-medium">Parole chiave SEO</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="HIIT, cardio, fitness, allenamento"
                className="bg-muted border-border text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Provider IA</Label>
              <Select value={aiProvider} onValueChange={(value: AIProvider) => setAiProvider(value)}>
                <SelectTrigger className="bg-muted border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="gemini">
                     <div className="flex items-center space-x-2">
                       <span>Google Gemini</span>
                     </div>
                   </SelectItem>
                   <SelectItem value="openai">OpenAI GPT</SelectItem>
                 </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Lunghezza articolo</Label>
              <Select value={articleLength} onValueChange={setArticleLength}>
                <SelectTrigger className="bg-muted border-border text-foreground">
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
              <Label className="text-foreground font-medium">Tono di voce</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-muted border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professionale">Professionale</SelectItem>
                  <SelectItem value="informale">Informale</SelectItem>
                  <SelectItem value="motivazionale">Motivazionale</SelectItem>
                  <SelectItem value="scientifico">Scientifico</SelectItem>
                  <SelectItem value="educativo">Educativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Target audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger className="bg-muted border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="generale">Generale</SelectItem>
                  <SelectItem value="principianti">Principianti</SelectItem>
                  <SelectItem value="intermedi">Livello intermedio</SelectItem>
                  <SelectItem value="avanzati">Atleti avanzati</SelectItem>
                  <SelectItem value="over50">Over 50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


          <Button
            onClick={generateArticle}
            disabled={isGenerating}
            className="btn-brand w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generazione in corso...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Genera Articolo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedArticle && (
        <Card className="card-brand">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <Eye className="h-6 w-6 text-brand-secondary" />
              <span>Anteprima e Personalizzazione</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground font-medium">Titolo *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-muted border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground">{title.length}/100</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaTitle" className="text-foreground font-medium">Titolo SEO</Label>
                <Input
                  id="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="bg-muted border-border text-foreground"
                  maxLength={60}
                />
                <span className="text-sm text-muted-foreground">{metaTitle.length}/60</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-foreground font-medium">Estratto</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="bg-muted border-border text-foreground"
                rows={3}
              />
              <span className="text-sm text-muted-foreground">{excerpt.length}/300</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription" className="text-foreground font-medium">Meta Descrizione SEO</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="bg-muted border-border text-foreground"
                rows={2}
                maxLength={160}
              />
              <span className="text-sm text-muted-foreground">{metaDescription.length}/160</span>
            </div>

            {generatedArticle && (
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Anteprima Contenuto</Label>
                <div className="bg-background border border-border rounded-lg p-6 max-h-96 overflow-y-auto prose-custom">
                  <div dangerouslySetInnerHTML={{ __html: generatedArticle }} />
                </div>
              </div>
            )}

            <Button
              onClick={saveArticle}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Salvataggio in corso...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
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
