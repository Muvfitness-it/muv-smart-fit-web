import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { GEO_BLOG_ARTICLES } from '@/utils/geoBlogArticles';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

// Mapping delle categorie testuali agli UUID del database
const CATEGORY_MAPPING: Record<string, string> = {
  'Dimagrimento': 'd44d1da4-bd48-46c4-98be-84c4a52c43e0', // Fitness
  'Tecnologie Fitness': 'd44d1da4-bd48-46c4-98be-84c4a52c43e0', // Fitness
  'Postura e Benessere': '59b51208-1b5f-4b98-95c3-34e21dbe1fd3', // Benessere
  'Benessere e Recovery': '59b51208-1b5f-4b98-95c3-34e21dbe1fd3', // Benessere
  'Fitness Over 40': 'd44d1da4-bd48-46c4-98be-84c4a52c43e0', // Fitness
  'Postura e Salute': '59b51208-1b5f-4b98-95c3-34e21dbe1fd3', // Benessere
  'Estetica e Corpo': '59b51208-1b5f-4b98-95c3-34e21dbe1fd3', // Benessere
  'Senior Fitness': 'd44d1da4-bd48-46c4-98be-84c4a52c43e0', // Fitness
  'Programmi Dimagrimento': 'd44d1da4-bd48-46c4-98be-84c4a52c43e0', // Fitness
  'Benessere Olistico': '59b51208-1b5f-4b98-95c3-34e21dbe1fd3' // Benessere
};

interface GenerationStatus {
  total: number;
  completed: number;
  failed: number;
  current: string;
}

export const GEOBlogGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<GenerationStatus>({
    total: GEO_BLOG_ARTICLES.length,
    completed: 0,
    failed: 0,
    current: ''
  });

  const generateArticle = async (articleConfig: typeof GEO_BLOG_ARTICLES[0]) => {
    const prompt = `
Scrivi un articolo SEO/GEO ottimizzato in italiano per MUV Fitness Legnago.

TITOLO: ${articleConfig.title}
QUERY PRINCIPALE: ${articleConfig.mainQuery}
KEYWORDS TARGET: ${articleConfig.targetKeywords.join(', ')}

STRUTTURA OBBLIGATORIA:
${articleConfig.h2Sections.map((section, i) => `${i + 1}. ${section}`).join('\n')}

REQUISITI:
- Lunghezza: almeno ${articleConfig.minWords} parole
- Tono: professionale ma caldo, focalizzato su risultati reali
- Includi dati scientifici dove possibile
- Usa domande come sottotitoli H2/H3 (ottimizzazione per AI generative)
- Paragrafi brevi (max 3-4 righe)
- Inserisci 1 tabella riassuntiva con benefici/risultati
- CTA finale: "${articleConfig.cta}"
- Integra naturalmente questi link interni: ${articleConfig.internalLinks.join(', ')}

IMPORTANTE:
- Scrivi in HTML semantico (<h2>, <h3>, <p>, <ul>, <li>, <table>, <strong>)
- Evita markdown
- Usa <strong> per evidenziare parole chiave
- La tabella deve essere in formato HTML completo
- NON includere il titolo H1 nel contenuto (viene gestito separatamente)
`;

    try {
      console.log('🔍 Generando articolo:', articleConfig.title);
      
      const { data: functionData, error: functionError } = await supabase.functions.invoke('advanced-article-generator', {
        body: {
          topic: articleConfig.title,
          wordCount: articleConfig.minWords,
          tone: 'professional',
          additionalContext: prompt,
          qualityModel: 'gemini'
        }
      });

      if (functionError) {
        console.error('❌ Errore edge function:', functionError);
        throw functionError;
      }
      if (!functionData?.content) {
        console.error('❌ Nessun contenuto generato dalla funzione');
        throw new Error('Nessun contenuto generato');
      }

      console.log('✅ Contenuto generato, salvataggio nel DB...');

      // Mappa la categoria testuale all'UUID corretto
      const categoryId = CATEGORY_MAPPING[articleConfig.category] || 'd44d1da4-bd48-46c4-98be-84c4a52c43e0';

      // Salva nel database con i campi corretti
      const { error: dbError } = await supabase
        .from('blog_posts')
        .insert({
          title: articleConfig.title,
          slug: articleConfig.slug,
          content: functionData.content,
          excerpt: articleConfig.metaDescription,
          meta_description: articleConfig.metaDescription,
          meta_keywords: articleConfig.targetKeywords.join(', '), // ✅ Convertito in stringa
          category_id: categoryId, // ✅ UUID corretto
          status: 'draft',
          featured_image: null
        });

      if (dbError) {
        console.error('❌ Errore DB insert:', dbError);
        throw dbError;
      }

      console.log('✅ Articolo salvato con successo:', articleConfig.title);
      return { success: true };
    } catch (error) {
      console.error('❌ Errore generale generazione articolo:', error);
      return { success: false, error };
    }
  };

  const startGeneration = async () => {
    setIsGenerating(true);
    setStatus({ total: GEO_BLOG_ARTICLES.length, completed: 0, failed: 0, current: '' });

    for (const article of GEO_BLOG_ARTICLES) {
      setStatus(prev => ({ ...prev, current: article.title }));

      const result = await generateArticle(article);

      if (result.success) {
        setStatus(prev => ({ ...prev, completed: prev.completed + 1 }));
        toast({
          title: '✅ Articolo creato',
          description: article.title
        });
      } else {
        setStatus(prev => ({ ...prev, failed: prev.failed + 1 }));
        toast({
          title: '❌ Errore generazione',
          description: article.title,
          variant: 'destructive'
        });
      }

      // Pausa per evitare rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsGenerating(false);
    toast({
      title: '🎉 Generazione completata',
      description: `${status.completed} articoli creati, ${status.failed} errori`
    });
  };

  const progress = (status.completed + status.failed) / status.total * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generazione Articoli GEO</CardTitle>
        <CardDescription>
          Genera automaticamente {GEO_BLOG_ARTICLES.length} articoli ottimizzati per motori generativi
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{status.completed + status.failed}/{status.total}</span>
          </div>
          <Progress value={progress} />
        </div>

        {isGenerating && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">Generando: {status.current}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Completati: {status.completed}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>Falliti: {status.failed}</span>
          </div>
        </div>

        <Button 
          onClick={startGeneration} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generazione in corso...
            </>
          ) : (
            'Genera tutti gli articoli'
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          ⚠️ La generazione può richiedere 20-30 minuti. Gli articoli vengono salvati come bozze.
        </div>
      </CardContent>
    </Card>
  );
};
