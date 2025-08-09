
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Save, Eye } from 'lucide-react';
import { useGeminiAPI } from '@/hooks/useGeminiAPI';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AIProvider } from '@/hooks/useGeminiAPI';
import { Checkbox } from '@/components/ui/checkbox';
import ArticleContentParser from './ArticleContentParser';

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
  const [publishMode, setPublishMode] = useState<'draft' | 'immediate' | 'scheduled'>('draft');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { callAIAPI } = useGeminiAPI();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rewriteId = searchParams.get('rewrite');
  const [rewriteMode, setRewriteMode] = useState(false);
  const [replaceOriginal, setReplaceOriginal] = useState(true);
  const [originalPost, setOriginalPost] = useState<any | null>(null);

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

  // Carica articolo originale per RISCRITTURA
  useEffect(() => {
    const loadForRewrite = async () => {
      if (!rewriteId) return;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', rewriteId)
        .maybeSingle();
      if (data) {
        setRewriteMode(true);
        setOriginalPost(data);
        setTopic(data.title || '');
        setTitle(data.title || '');
        setExcerpt(data.excerpt || '');
        setMetaTitle((data.meta_title || data.title || '').substring(0, 60));
        setMetaDescription((data.meta_description || data.excerpt || '').substring(0, 160));
        setKeywords(data.meta_keywords || '');
      }
    };
    loadForRewrite();
  }, [rewriteId]);

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

    const rules = `AGISCI COME: Editor Senior SEO/SEM/Copywriting per il blog del Centro Fitness MUV (Legnago, VR).
OBIETTIVO: Creare o riscrivere articoli a partire dal titolo fornito, naturali, umani e coinvolgenti, perfettamente formattati in HTML e ottimizzati SEO.

REGOLE SCRITTURA:
- 1 solo <h1> con keyword principale all’inizio
- Introduzione 80–120 parole che incuriosisca e anticipi il contenuto
- Struttura ordinata con <h2> e <h3>
- Paragrafi max 4 righe, frasi max 20 parole
- Liste puntate/numerate dove utile
- Conclusione con sintesi + CTA standard: “Vuoi risultati concreti e duraturi? Prenota oggi la tua prova gratuita al Centro Fitness MUV a Legnago.”
- Slug breve, minuscolo, con trattini, senza stop words
- Meta title ≤ 60 caratteri con keyword principale
- Meta description ≤ 155 caratteri, persuasiva e con keyword
- Keyword principale: in H1, primo paragrafo, almeno un H2 e conclusione
- 3–6 keyword correlate distribuite naturalmente
- 2–4 link interni pertinenti con anchor descrittive
- Immagini con attributo alt descrittivo e loading="lazy"
- HTML valido, pulito e visivamente leggibile`;

    const taskLine = rewriteMode
      ? `RISCRITTURA: Riscrivi completamente l’articolo partendo dal titolo: "${title || topic}". Mantieni le info utili, aggiorna dati e migliora leggibilità e SEO.`
      : `SCRITTURA: Crea un nuovo articolo sull’argomento: "${topic}".`;

    const prompt = `${rules}

CONTESTO:
- Lunghezza: ${lengthMap[articleLength as keyof typeof lengthMap]}
- Tono: ${tone}
- Target: ${targetAudience}
- Parole chiave principali/correlate: ${keywords}

${taskLine}

FORMATTAZIONE:
- Usa solo HTML semantico (h1, h2, h3, p, strong, em, ul, li, a)
- Inserisci la CTA standard in chiusura

OUTPUT:
Rispondi SOLO con l’HTML completo dell’articolo, iniziando con <h1>.
Non includere testo fuori dall’HTML.`;

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

      let articleStatus = 'draft';
      let scheduledPublishAt = null;
      let publishedAt = null;

      // Determina status e date in base alla modalità scelta
      if (publishMode === 'immediate') {
        articleStatus = 'published';
        publishedAt = new Date().toISOString();
      } else if (publishMode === 'scheduled' && scheduledDate && scheduledTime) {
        const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
        if (scheduledDateTime > new Date()) {
          articleStatus = 'scheduled';
          scheduledPublishAt = scheduledDateTime.toISOString();
        } else {
          articleStatus = 'published';
          publishedAt = new Date().toISOString();
        }
      }

      const articleData = {
        title: title.trim(),
        slug: slug,
        content: generatedArticle.trim(),
        excerpt: excerpt.trim() || generatedArticle.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
        meta_title: metaTitle.trim() || title.substring(0, 60),
        meta_description: metaDescription.trim() || excerpt.substring(0, 160),
        status: articleStatus,
        author_name: 'MUV Team',
        reading_time: readingTime,
        featured_image: null,
        scheduled_publish_at: scheduledPublishAt,
        published_at: publishedAt
      };

      console.log('Saving article data:', articleData);

      // Inserimento o aggiornamento in base alla modalità
      if (rewriteMode && replaceOriginal && originalPost) {
        // Backup contenuto originale
        try {
          await supabase.from('blog_posts_backup').insert({
            id: originalPost.id,
            content_backup: originalPost.content || ''
          });
        } catch (e) {
          console.warn('Backup fallito (proseguo comunque):', e);
        }

        const updateData = {
          title: title.trim(),
          slug: originalPost.slug, // mantieni lo slug
          content: generatedArticle.trim(),
          excerpt: excerpt.trim() || generatedArticle.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
          meta_title: metaTitle.trim() || title.substring(0, 60),
          meta_description: metaDescription.trim() || excerpt.substring(0, 160),
          status: articleStatus,
          author_name: originalPost.author_name || 'MUV Team',
          reading_time: readingTime,
          featured_image: originalPost.featured_image || null,
          scheduled_publish_at: scheduledPublishAt,
          published_at: publishedAt
        };

        const { data: upd, error: updError } = await supabase
          .from('blog_posts')
          .update(updateData)
          .eq('id', originalPost.id)
          .select()
          .single();

        if (updError) {
          throw updError;
        }

        toast({
          title: 'Successo',
          description: `Articolo riscritto e ${articleStatus === 'published' ? 'pubblicato' : articleStatus === 'scheduled' ? 'programmato' : 'salvato'} con successo`
        });
        navigate(`/blog/edit/${originalPost.id}`);
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(articleData)
          .select()
          .single();

        if (error) {
          console.error('Supabase error:', error);
          if (error.message.includes('row-level security')) {
            toast({
              title: 'Errore di Permessi',
              description: 'Non hai i permessi per creare articoli. Assicurati di essere autenticato come admin.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Errore',
              description: `Errore nel salvataggio: ${error.message}`,
              variant: 'destructive'
            });
          }
          return;
        }

        toast({
          title: 'Successo',
          description: `Articolo ${articleStatus === 'published' ? 'pubblicato' : articleStatus === 'scheduled' ? 'programmato per pubblicazione' : 'salvato come bozza'}!`
        });

        if (data) {
          navigate(`/blog/edit/${data.id}`);
        } else {
          navigate('/blog/admin');
        }
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

      {rewriteMode && (
        <div className="p-4 border border-border rounded-lg bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Modalità RISCRITTURA attiva per: <strong>{originalPost?.title}</strong>
          </p>
          <label className="mt-2 flex items-center gap-2">
            <Checkbox checked={replaceOriginal} onCheckedChange={(v) => setReplaceOriginal(!!v)} />
            <span className="text-sm">Sostituisci l'articolo originale (backup automatico)</span>
          </label>
        </div>
      )}

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
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">Modalità di Pubblicazione</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="radio"
                        name="publishMode"
                        value="draft"
                        checked={publishMode === 'draft'}
                        onChange={(e) => setPublishMode(e.target.value as 'draft')}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <div>
                        <div className="font-medium text-foreground">Salva come Bozza</div>
                        <div className="text-sm text-muted-foreground">Salva senza pubblicare</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="radio"
                        name="publishMode"
                        value="immediate"
                        checked={publishMode === 'immediate'}
                        onChange={(e) => setPublishMode(e.target.value as 'immediate')}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <div>
                        <div className="font-medium text-foreground">Pubblica Subito</div>
                        <div className="text-sm text-muted-foreground">Pubblica immediatamente</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                      <input
                        type="radio"
                        name="publishMode"
                        value="scheduled"
                        checked={publishMode === 'scheduled'}
                        onChange={(e) => setPublishMode(e.target.value as 'scheduled')}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <div>
                        <div className="font-medium text-foreground">Programma Pubblicazione</div>
                        <div className="text-sm text-muted-foreground">Pubblica in una data specifica</div>
                      </div>
                    </label>
                  </div>
                </div>

                {publishMode === 'scheduled' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate" className="text-foreground font-medium">Data di Pubblicazione</Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime" className="text-foreground font-medium">Orario di Pubblicazione</Label>
                      <Input
                        id="scheduledTime"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Anteprima Contenuto</Label>
                <div className="bg-background border border-border rounded-lg p-6 max-h-96 overflow-y-auto prose-custom">
                  <ArticleContentParser content={generatedArticle} />
                </div>
              </div>

            <Button
              onClick={saveArticle}
              disabled={isSaving || (publishMode === 'scheduled' && (!scheduledDate || !scheduledTime))}
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
                  {publishMode === 'draft' ? 'Salva come Bozza' : 
                   publishMode === 'immediate' ? 'Pubblica Subito' : 
                   'Programma Pubblicazione'}
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
